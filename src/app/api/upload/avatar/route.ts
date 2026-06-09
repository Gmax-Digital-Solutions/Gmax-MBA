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
    // Check environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('[AVATAR UPLOAD] Missing Supabase environment variables')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File | null
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

    // Try to resize with sharp, but don't fail if it errors
    let processedBuffer: Buffer = buffer
    let contentType: string = file.type || 'image/jpeg'
    
    try {
      const sharp = (await import('sharp')).default
      processedBuffer = await sharp(buffer)
        .resize(400, 400, { fit: 'cover', position: 'centre' })
        .jpeg({ quality: 85 })
        .toBuffer()
      contentType = 'image/jpeg'
    } catch (sharpError) {
      console.warn('[AVATAR UPLOAD] Sharp processing failed, uploading original:', sharpError)
      // Use original file if sharp fails
    }

    const supabase  = getSupabaseAdmin()
    const ext       = contentType === 'image/jpeg' ? 'jpg' : 'png'
    const filePath  = `${session.user.id}/avatar.${ext}`

    console.log('[AVATAR UPLOAD] Uploading to:', filePath)

    const { error: uploadError } = await supabase.storage
      .from(AVATAR_BUCKET)
      .upload(filePath, processedBuffer, { contentType, upsert: true })

    if (uploadError) {
      console.error('[AVATAR UPLOAD ERROR]', uploadError)
      return NextResponse.json({ error: 'Upload failed: ' + uploadError.message }, { status: 500 })
    }

    const { data: { publicUrl } } = supabase.storage
      .from(AVATAR_BUCKET)
      .getPublicUrl(filePath)

    const imageUrl = `${publicUrl}?t=${Date.now()}`

    console.log('[AVATAR UPLOAD] Success, URL:', imageUrl)

    await db.user.update({
      where: { id: session.user.id },
      data:  { image: imageUrl },
    })

    return NextResponse.json({ url: imageUrl })
  } catch (err: any) {
    console.error('[AVATAR UPLOAD ERROR]', err)
    return NextResponse.json({ error: err.message || 'Something went wrong' }, { status: 500 })
  }
}
