import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getSupabaseAdmin, AVATAR_BUCKET } from '@/lib/supabase'

const MAX_BYTES = 5 * 1024 * 1024

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const formData = await req.formData()
    const file = formData.get('avatar') as File | null
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Only JPEG, PNG, WebP, or GIF allowed' }, { status: 400 })
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: 'Image must be under 5MB' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Resize to 400×400 with sharp
    let processedBuffer: Buffer
    let contentType = 'image/jpeg'
    try {
      const sharp = (await import('sharp')).default
      processedBuffer = await sharp(buffer)
        .resize(400, 400, { fit: 'cover', position: 'centre' })
        .jpeg({ quality: 85 })
        .toBuffer()
    } catch {
      processedBuffer = buffer
      contentType = file.type
    }

    const supabase  = getSupabaseAdmin()
    const ext       = contentType === 'image/jpeg' ? 'jpg' : 'png'
    const filePath  = `${session.user.id}/avatar.${ext}`

    const { error: uploadError } = await supabase.storage
      .from(AVATAR_BUCKET)
      .upload(filePath, processedBuffer, { contentType, upsert: true })

    if (uploadError) {
      console.error('[AVATAR UPLOAD]', uploadError)
      return NextResponse.json({ error: 'Upload failed: ' + uploadError.message }, { status: 500 })
    }

    const { data: { publicUrl } } = supabase.storage
      .from(AVATAR_BUCKET)
      .getPublicUrl(filePath)

    const imageUrl = `${publicUrl}?t=${Date.now()}`

    await db.user.update({
      where: { id: session.user.id },
      data:  { image: imageUrl },
    })

    return NextResponse.json({ imageUrl })
  } catch (err: any) {
    console.error('[AVATAR UPLOAD ERROR]', err)
    return NextResponse.json({ error: err.message || 'Something went wrong' }, { status: 500 })
  }
}
