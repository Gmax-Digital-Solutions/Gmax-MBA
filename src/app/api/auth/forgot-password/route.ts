import { NextRequest, NextResponse } from 'next/server'
import { db }     from '@/lib/db'
import { Resend } from 'resend'
import crypto     from 'crypto'

const resend = new Resend(process.env.RESEND_API_KEY)
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://gmaxmba.com'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

    const user = await db.user.findUnique({ where: { email } })

    // Always return success to prevent email enumeration
    if (!user || !user.password) {
      return NextResponse.json({ success: true })
    }

    // Delete any existing tokens for this email
    await db.passwordResetToken.deleteMany({ where: { email } })

    // Create new token (expires in 1 hour)
    const token   = crypto.randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + 60 * 60 * 1000)
    await db.passwordResetToken.create({ data: { email, token, expires } })

    const resetUrl = `${APP_URL}/auth/reset-password?token=${token}`

    await resend.emails.send({
      from:    'Gmax MBA <hello@gmaxdigitals.com>',
      to:      email,
      subject: 'Reset your Gmax MBA password',
      html: `
        <!DOCTYPE html>
        <html>
        <body style="background:#171214;color:#f0f0f0;font-family:'Outfit',sans-serif;padding:40px;max-width:600px;margin:0 auto;">
          <div style="text-align:center;margin-bottom:32px;">
            <h1 style="font-size:28px;color:#58f5df;margin:0;">Gmax MBA</h1>
            <p style="color:#606070;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;margin:4px 0 0;">Free Business School</p>
          </div>
          <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:32px;">
            <h2 style="color:#f0f0f0;margin:0 0 16px;">Reset your password</h2>
            <p style="color:#a0a0b0;line-height:1.6;margin:0 0 24px;">
              We received a request to reset the password for your Gmax MBA account. Click the button below to set a new password. This link expires in <strong style="color:#f0f0f0;">1 hour</strong>.
            </p>
            <div style="text-align:center;margin:32px 0;">
              <a href="${resetUrl}" style="background:#2ed8c3;color:#003731;font-weight:700;padding:14px 32px;border-radius:8px;text-decoration:none;display:inline-block;font-size:13px;letter-spacing:0.1em;text-transform:uppercase;">
                Reset Password
              </a>
            </div>
            <p style="color:#606070;font-size:12px;margin:24px 0 0;text-align:center;">
              If you didn't request this, you can safely ignore this email. Your password won't change.
            </p>
          </div>
          <p style="color:#606070;font-size:11px;text-align:center;margin-top:24px;">
            © ${new Date().getFullYear()} Gmax MBA · <a href="${APP_URL}" style="color:#58f5df;">gmaxmba.com</a>
          </p>
        </body>
        </html>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Forgot password error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
