/**
 * scripts/email-book-summaries-launch.ts
 * ----------------------------------------
 * One-time script to notify all enrolled founders about the new
 * in-app book summary feature and remind them to continue their
 * curriculum.
 *
 * RUN (from your project root):
 *   npx tsx scripts/email-book-summaries-launch.ts
 *
 * SAFE TO RUN MULTIPLE TIMES:
 *   The script tracks sent emails in a local log file
 *   (email-send-log.json) in your project root and skips anyone
 *   who was already emailed, so it won't double-send if interrupted.
 *
 * WHAT IT DOES:
 *   1. Fetches all users from the database who have completed onboarding
 *   2. Sends each one a personalised email via Resend
 *   3. Throttles at 2 emails/second to stay well within Resend rate limits
 *   4. Logs every result (success / skip / error) to console + log file
 *   5. Prints a summary when done
 */

import { PrismaClient } from '@prisma/client'
import { Resend }       from 'resend'
import * as fs          from 'fs'
import * as path        from 'path'
import * as dotenv      from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config({ path: '.env' })

const db     = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://gmaxmba.com'

const LOG_FILE = path.join(process.cwd(), 'email-send-log.json')

// ─── helpers ─────────────────────────────────────────────────────────────────

function loadLog(): Record<string, { sentAt: string; status: 'sent' | 'error'; error?: string }> {
  if (!fs.existsSync(LOG_FILE)) return {}
  try { return JSON.parse(fs.readFileSync(LOG_FILE, 'utf8')) } catch { return {} }
}

function saveLog(log: Record<string, { sentAt: string; status: string; error?: string }>) {
  fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2))
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// ─── email template ───────────────────────────────────────────────────────────

function buildEmail(firstName: string, activeDay: number): string {
  const dashboardUrl = `${APP_URL}/dashboard/daily`
  const year = new Date().getFullYear()

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New: In-App Book Summaries — Gmax MBA</title>
</head>
<body style="margin:0;padding:0;background:#171214;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#171214;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <p style="margin:0 0 4px;font-size:22px;font-weight:700;color:#58f5df;letter-spacing:-0.5px;">Gmax MBA</p>
              <p style="margin:0;font-size:10px;color:#5c5558;letter-spacing:0.2em;text-transform:uppercase;font-family:monospace;">Free Business School</p>
            </td>
          </tr>

          <!-- MAIN CARD -->
          <tr>
            <td style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:40px 36px;">

              <!-- greeting -->
              <p style="margin:0 0 8px;font-size:12px;color:#58f5df;font-family:monospace;letter-spacing:0.15em;text-transform:uppercase;">
                📚 New Feature
              </p>
              <h1 style="margin:0 0 20px;font-size:26px;font-weight:700;color:#f0ebe8;line-height:1.25;">
                Hey ${firstName} — your books are now inside the app
              </h1>
              <p style="margin:0 0 20px;font-size:15px;color:#a09898;line-height:1.7;">
                Every book in the Gmax MBA curriculum now has a full in-app summary — 
                written from the actual text, mapped to your exact day in the curriculum, 
                and available right inside the task card without leaving the app.
              </p>

              <!-- feature highlight box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
                <tr>
                  <td style="background:rgba(88,245,223,0.06);border:1px solid rgba(88,245,223,0.18);border-radius:12px;padding:24px 28px;">
                    <p style="margin:0 0 16px;font-size:11px;font-family:monospace;color:#58f5df;text-transform:uppercase;letter-spacing:0.15em;">What's included</p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:6px 0;font-size:14px;color:#f0ebe8;">
                          <span style="color:#58f5df;margin-right:10px;">→</span>
                          6–8 minute deep summaries of every assigned book
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:14px;color:#f0ebe8;">
                          <span style="color:#58f5df;margin-right:10px;">→</span>
                          Key frameworks, real examples, and apply-it-today sections
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:14px;color:#f0ebe8;">
                          <span style="color:#58f5df;margin-right:10px;">→</span>
                          Mapped directly to your daily task card — Day ${activeDay} and beyond
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:14px;color:#f0ebe8;">
                          <span style="color:#58f5df;margin-right:10px;">→</span>
                          No separate tabs, no external links — reads inline as you go
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- books preview -->
              <p style="margin:0 0 14px;font-size:13px;color:#5c5558;font-family:monospace;text-transform:uppercase;letter-spacing:0.1em;">Summaries live now</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
                ${[
                  ['The Personal MBA', 'Josh Kaufman'],
                  ['Financial Intelligence', 'Karen Berman & Joe Knight'],
                  ['Good Strategy / Bad Strategy', 'Richard Rumelt'],
                  ['Competitive Strategy', 'Michael Porter'],
                  ['The Intelligent Investor', 'Benjamin Graham'],
                  ['Building a StoryBrand', 'Donald Miller'],
                  ['Contagious', 'Jonah Berger'],
                  ['Never Split the Difference', 'Chris Voss'],
                  ['SPIN Selling', 'Neil Rackham'],
                  ['The Challenger Sale', 'Dixon & Adamson'],
                ].map(([title, author]) => `
                <tr>
                  <td style="padding:7px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
                    <span style="font-size:13px;color:#f0ebe8;">${title}</span>
                    <span style="font-size:12px;color:#5c5558;margin-left:8px;">— ${author}</span>
                  </td>
                </tr>`).join('')}
                <tr>
                  <td style="padding:10px 0;font-size:12px;color:#58f5df;font-family:monospace;">
                    + ${30 - 10} more summaries across the full 30-day curriculum
                  </td>
                </tr>
              </table>

              <!-- divider -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
                <tr>
                  <td style="border-top:1px solid rgba(255,255,255,0.07);font-size:0;">&nbsp;</td>
                </tr>
              </table>

              <!-- resume nudge -->
              <p style="margin:0 0 8px;font-size:15px;color:#a09898;line-height:1.7;">
                You're on <strong style="color:#f0ebe8;">Day ${activeDay}</strong> of your curriculum.
                Open today's plan and look for the
                <span style="background:rgba(88,245,223,0.1);color:#58f5df;padding:1px 6px;border-radius:4px;font-size:13px;font-family:monospace;">📖 Read Summary (In-App)</span>
                button on any reading task.
              </p>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0 0;">
                <tr>
                  <td align="center">
                    <a href="${dashboardUrl}"
                       style="display:inline-block;background:#58f5df;color:#171214;font-weight:700;font-size:13px;letter-spacing:0.1em;text-transform:uppercase;padding:15px 40px;border-radius:10px;text-decoration:none;">
                      Continue Day ${activeDay} →
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- footer -->
          <tr>
            <td align="center" style="padding-top:28px;">
              <p style="margin:0 0 8px;font-size:11px;color:#5c5558;line-height:1.6;">
                You're receiving this because you're enrolled in Gmax MBA.<br>
                <a href="${APP_URL}" style="color:#58f5df;text-decoration:none;">gmaxmba.com</a>
                &nbsp;·&nbsp;
                <a href="${APP_URL}/dashboard/profile" style="color:#5c5558;text-decoration:none;">Manage account</a>
              </p>
              <p style="margin:0;font-size:10px;color:#3a3438;font-family:monospace;">
                © ${year} Gmax Digital Solutions
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

// ─── main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!process.env.RESEND_API_KEY) {
    console.error('\n❌  RESEND_API_KEY not found in environment. Check your .env.local file.\n')
    process.exit(1)
  }

  const log = loadLog()

  // Fetch all users who have completed onboarding
  const users = await db.user.findMany({
    where:  { onboarded: true },
    select: { id: true, email: true, name: true, enrolledAt: true },
    orderBy: { enrolledAt: 'asc' },
  })

  console.log(`\n📬  Found ${users.length} enrolled founders\n`)

  let sent = 0, skipped = 0, errors = 0

  for (const user of users) {
    // Skip if already emailed
    if (log[user.id]?.status === 'sent') {
      console.log(`  ⏭️  Skip  ${user.email} (already sent)`)
      skipped++
      continue
    }

    const firstName  = (user.name || 'Founder').split(' ')[0]
    const calendarDay = Math.max(1, Math.floor((Date.now() - new Date(user.enrolledAt).getTime()) / 86400000) + 1)

    try {
      const { data, error } = await resend.emails.send({
        from:    'Billy @ Gmax MBA <hello@gmaxdigitals.com>',
        to:      user.email,
        subject: '📚 New: Every curriculum book now has an in-app summary',
        html:    buildEmail(firstName, Math.min(calendarDay, 30)),
      })

      if (error) throw new Error(error.message)

      log[user.id] = { sentAt: new Date().toISOString(), status: 'sent' }
      saveLog(log)

      console.log(`  ✅  Sent  ${user.email}`)
      sent++

      // 2 emails/second — stays well within Resend free + paid limits
      await delay(500)

    } catch (err: any) {
      const msg = err?.message || String(err)
      log[user.id] = { sentAt: new Date().toISOString(), status: 'error', error: msg }
      saveLog(log)
      console.error(`  ❌  Error ${user.email}: ${msg}`)
      errors++
      await delay(500)
    }
  }

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊  Campaign complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✅  Sent:    ${sent}
  ⏭️  Skipped: ${skipped}
  ❌  Errors:  ${errors}
  📄  Log:     ./email-send-log.json
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => db.$disconnect())