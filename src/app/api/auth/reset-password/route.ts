import { NextRequest, NextResponse } from 'next/server'
import { db }    from '@/lib/db'
import bcrypt    from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json()
    if (!token || !password) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    if (password.length < 8)  return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })

    const resetToken = await db.passwordResetToken.findUnique({ where: { token } })
    if (!resetToken)                       return NextResponse.json({ error: 'Invalid or expired reset link' }, { status: 400 })
    if (resetToken.expires < new Date())   return NextResponse.json({ error: 'Reset link has expired' },      { status: 400 })

    const hashed = await bcrypt.hash(password, 12)
    await db.user.update({ where: { email: resetToken.email }, data: { password: hashed } })
    await db.passwordResetToken.delete({ where: { token } })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Reset password error:', err)
    return NextResponse.json({ error: 'Failed to reset password' }, { status: 500 })
  }
}
