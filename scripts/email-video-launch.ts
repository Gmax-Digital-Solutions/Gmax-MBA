/**
 * scripts/email-video-launch.ts
 * ----------------------------------------
 * One-time script to announce the new inline video player feature
 * to all enrolled Gmax MBA members.
 *
 * RUN (from your project root):
 *   npx tsx scripts/email-video-launch.ts
 *
 * SAFE TO RE-RUN:
 *   Tracks every send in email-video-log.json (keyed by user.id).
 *   Users already recorded as 'sent' are skipped, so the script
 *   can be interrupted and restarted without double-sending.
 *
 * WHAT IT DOES:
 *   1. Validates RESEND_API_KEY is present — exits immediately if not
 *   2. Fetches ALL users (no onboarded filter — real members can have
 *      onboarded === false if they skipped the onboarding flow)
 *   3. Sends each user a personalised HTML email via Resend
 *   4. Throttles at 1 send per 500ms to stay within rate limits
 *   5. Persists log after every send so interruption loses no progress
 *   6. Prints a final summary: sent / skipped / errors
 */

import { PrismaClient } from '@prisma/client'
import { Resend }       from 'resend'
import * as fs          from 'fs'
import * as path        from 'path'
import * as dotenv      from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config({ path: '.env' })

// ─── clients ──────────────────────────────────────────────────────────────────

const db     = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)

// ─── log file ─────────────────────────────────────────────────────────────────

const LOG_FILE = path.join(process.cwd(), 'email-video-log.json')

type LogEntry = { sentAt: string; status: 'sent' | 'error'; error?: string }
type Log      = Record<string, LogEntry>

function loadLog(): Log {
  if (!fs.existsSync(LOG_FILE)) return {}
  try { return JSON.parse(fs.readFileSync(LOG_FILE, 'utf8')) as Log }
  catch { return {} }
}

function saveLog(log: Log): void {
  fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2))
}

// ─── utilities ────────────────────────────────────────────────────────────────

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function firstName(name: string | null): string {
  if (!name || name.trim() === '') return 'Founder'
  return name.trim().split(' ')[0]
}

// ─── email template ───────────────────────────────────────────────────────────

function buildEmail(name: string): string {
  const greeting  = firstName(name)
  const dashboard = 'https://gmaxmba.com/dashboard/daily'
  const year      = new Date().getFullYear()

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New: Curriculum videos now play inside Gmax MBA</title>
</head>
<body style="margin:0;padding:0;background-color:#171214;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0"
         style="background-color:#171214;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0"
               style="max-width:600px;width:100%;">

          <!-- ── HEADER ── -->
          <tr>
            <td align="center" style="padding-bottom:28px;">
              <p style="margin:0 0 4px 0;font-size:22px;font-weight:700;
                         color:#58f5df;letter-spacing:-0.5px;
                         font-family:Georgia,'Times New Roman',serif;">
                Gmax MBA
              </p>
              <p style="margin:0;font-size:10px;color:#5c5558;
                         letter-spacing:0.2em;text-transform:uppercase;
                         font-family:'Courier New',Courier,monospace;">
                Free Business School
              </p>
            </td>
          </tr>

          <!-- ── MAIN CARD ── -->
          <tr>
            <td style="background-color:rgba(255,255,255,0.03);
                       border:1px solid rgba(255,255,255,0.07);
                       border-radius:16px;padding:40px 36px;">

              <!-- label -->
              <p style="margin:0 0 10px 0;font-size:11px;color:#58f5df;
                         font-family:'Courier New',Courier,monospace;
                         letter-spacing:0.18em;text-transform:uppercase;">
                &#9654; New Feature
              </p>

              <!-- headline -->
              <h1 style="margin:0 0 20px 0;font-size:26px;font-weight:700;
                          color:#f0ebe8;line-height:1.25;
                          font-family:Georgia,'Times New Roman',serif;">
                Hey ${greeting} — curriculum videos now play inside the app
              </h1>

              <!-- intro -->
              <p style="margin:0 0 20px 0;font-size:15px;color:#a09898;
                         line-height:1.7;font-family:Arial,Helvetica,sans-serif;">
                Quick update &mdash; we just shipped something that makes the daily
                curriculum significantly better.
              </p>
              <p style="margin:0 0 24px 0;font-size:15px;color:#a09898;
                         line-height:1.7;font-family:Arial,Helvetica,sans-serif;">
                Every watch task in Gmax MBA now plays directly inside the app.
                No more clicking out to YouTube, losing your place, or getting pulled
                into an algorithm of unrelated videos. You open your daily plan,
                hit the watch task, and the video loads right there in your task
                card &mdash; right next to your reading summary and your journal.
              </p>

              <!-- divider -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                     style="margin:0 0 24px 0;">
                <tr>
                  <td style="border-top:1px solid rgba(255,255,255,0.07);
                              font-size:0;line-height:0;">&nbsp;</td>
                </tr>
              </table>

              <!-- "Here's what changed" heading -->
              <p style="margin:0 0 16px 0;font-size:13px;color:#5c5558;
                         font-family:'Courier New',Courier,monospace;
                         text-transform:uppercase;letter-spacing:0.12em;">
                Here&#39;s what changed
              </p>

              <!-- feature highlight box -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                     style="margin:0 0 28px 0;">
                <tr>
                  <td style="background-color:rgba(88,245,223,0.06);
                              border:1px solid rgba(88,245,223,0.18);
                              border-radius:12px;padding:24px 28px;">

                    <!-- feature row 1 -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0"
                           style="margin-bottom:14px;">
                      <tr>
                        <td width="28" valign="top"
                            style="font-size:16px;color:#58f5df;padding-top:1px;
                                   font-family:Arial,Helvetica,sans-serif;">
                          &#9654;
                        </td>
                        <td>
                          <p style="margin:0;font-size:14px;color:#f0ebe8;
                                     font-family:Arial,Helvetica,sans-serif;
                                     line-height:1.5;">
                            <strong>Inline video player</strong>
                            <span style="color:#a09898;">
                              &mdash; curriculum videos now embed directly in the task
                              card, same place you read your book summary and write
                              your journal reflection
                            </span>
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- feature row 2 -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0"
                           style="margin-bottom:14px;">
                      <tr>
                        <td width="28" valign="top"
                            style="font-size:16px;color:#58f5df;padding-top:1px;
                                   font-family:Arial,Helvetica,sans-serif;">
                          &#128218;
                        </td>
                        <td>
                          <p style="margin:0;font-size:14px;color:#f0ebe8;
                                     font-family:Arial,Helvetica,sans-serif;
                                     line-height:1.5;">
                            <strong>Stays inside the app</strong>
                            <span style="color:#a09898;">
                              &mdash; no redirects, no new tabs, no YouTube
                              rabbit holes
                            </span>
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- feature row 3 -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="28" valign="top"
                            style="font-size:16px;color:#58f5df;padding-top:1px;
                                   font-family:Arial,Helvetica,sans-serif;">
                          &#10003;
                        </td>
                        <td>
                          <p style="margin:0;font-size:14px;color:#f0ebe8;
                                     font-family:Arial,Helvetica,sans-serif;
                                     line-height:1.5;">
                            <strong>Works alongside everything else</strong>
                            <span style="color:#a09898;">
                              &mdash; the video panel opens and closes
                              independently, so you can read the summary, watch
                              the video, and complete your reflection all in one
                              flow without switching context
                            </span>
                          </p>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>

              <!-- live notice -->
              <p style="margin:0 0 28px 0;font-size:15px;color:#a09898;
                         line-height:1.7;font-family:Arial,Helvetica,sans-serif;">
                The feature is live now. If you&rsquo;re currently working through
                the curriculum, just open your daily plan and look for the
                <span style="background-color:rgba(88,245,223,0.1);color:#58f5df;
                              padding:2px 7px;border-radius:4px;font-size:13px;
                              font-family:'Courier New',Courier,monospace;
                              white-space:nowrap;">
                  &#9654; Watch Inline
                </span>
                button on any watch task.
              </p>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                     style="margin:0 0 32px 0;">
                <tr>
                  <td align="center">
                    <a href="${dashboard}"
                       style="display:inline-block;background-color:#58f5df;
                              color:#171214;font-weight:700;font-size:14px;
                              letter-spacing:0.02em;padding:15px 40px;
                              border-radius:10px;text-decoration:none;
                              font-family:Arial,Helvetica,sans-serif;">
                      Open My Daily Plan &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <!-- divider -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                     style="margin:0 0 24px 0;">
                <tr>
                  <td style="border-top:1px solid rgba(255,255,255,0.07);
                              font-size:0;line-height:0;">&nbsp;</td>
                </tr>
              </table>

              <!-- sign-off -->
              <p style="margin:0 0 4px 0;font-size:15px;color:#a09898;
                         line-height:1.7;font-family:Arial,Helvetica,sans-serif;">
                More updates coming. We&rsquo;re building this alongside you.
              </p>
              <p style="margin:0;font-size:15px;color:#a09898;
                         line-height:1.7;font-family:Arial,Helvetica,sans-serif;">
                Billy<br>
                <span style="color:#5c5558;">Founder, Gmax MBA</span><br>
                <a href="https://gmaxmba.com"
                   style="color:#58f5df;text-decoration:none;">gmaxmba.com</a>
              </p>

            </td>
          </tr>

          <!-- ── FOOTER ── -->
          <tr>
            <td align="center" style="padding-top:28px;">
              <p style="margin:0 0 6px 0;font-size:11px;color:#5c5558;
                         line-height:1.6;font-family:Arial,Helvetica,sans-serif;">
                You&rsquo;re receiving this because you&rsquo;re enrolled in
                Gmax MBA.<br>
                <a href="https://gmaxmba.com"
                   style="color:#58f5df;text-decoration:none;">gmaxmba.com</a>
                &nbsp;&middot;&nbsp;
                <a href="https://gmaxmba.com/dashboard/profile"
                   style="color:#5c5558;text-decoration:none;">Manage account</a>
              </p>
              <p style="margin:0;font-size:10px;color:#3a3438;
                         font-family:'Courier New',Courier,monospace;">
                &copy; ${year} Gmax Digital Solutions
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

async function main(): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.error(
      '\n❌  RESEND_API_KEY not found in environment. Check your .env.local file.\n'
    )
    process.exit(1)
  }

  const log = loadLog()

  const users = await db.user.findMany({
    select:  { id: true, email: true, name: true },
    orderBy: { enrolledAt: 'asc' },
  })

  console.log(`\n📬  Found ${users.length} users\n`)

  let sent = 0, skipped = 0, errors = 0

  for (const user of users) {
    // Skip if this user was already successfully emailed in a previous run
    if (log[user.id]?.status === 'sent') {
      console.log(`  ⏭️  Skip  ${user.email} (already sent)`)
      skipped++
      continue
    }

    try {
      const { error } = await resend.emails.send({
        from:    'Billy @ Gmax MBA <hello@gmaxdigitals.com>',
        to:      user.email,
        subject: '📺 New: Curriculum videos now play inside Gmax MBA',
        html:    buildEmail(user.name),
      })

      if (error) throw new Error(error.message)

      log[user.id] = { sentAt: new Date().toISOString(), status: 'sent' }
      saveLog(log)

      console.log(`  ✅  Sent  ${user.email}`)
      sent++

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)

      log[user.id] = { sentAt: new Date().toISOString(), status: 'error', error: msg }
      saveLog(log)

      console.error(`  ❌  Error ${user.email}: ${msg}`)
      errors++
    }

    // 1 email per 500ms — well within Resend rate limits on all plans
    await delay(500)
  }

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊  Campaign complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✅  Sent:    ${sent}
  ⏭️  Skipped: ${skipped}
  ❌  Errors:  ${errors}
  📄  Log:     ./email-video-log.json
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => db.$disconnect())
