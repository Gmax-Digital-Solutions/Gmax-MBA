import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { z } from 'zod'

const schema = z.object({
  name:     z.string().min(2, 'Name must be at least 2 characters'),
  email:    z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  company:  z.string().optional(),
  role:     z.enum(['builder', 'founder', 'engineer', 'designer', 'other']).default('builder'),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)
    const existing = await db.user.findUnique({ where: { email: data.email } })
    if (existing) return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 400 })
    const hashed = await bcrypt.hash(data.password, 12)
    const user = await db.user.create({
      data: {
        name:      data.name,
        email:     data.email,
        password:  hashed,
        company:   data.company || null,
        role:      data.role,
        onboarded: false,
      },
    })
    return NextResponse.json({ id: user.id, name: user.name, email: user.email, onboarded: false }, { status: 201 })
  } catch (err: any) {
    if (err?.name === 'ZodError') return NextResponse.json({ error: err.errors[0]?.message || 'Validation failed' }, { status: 400 })
    console.error('[REGISTER ERROR]', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
