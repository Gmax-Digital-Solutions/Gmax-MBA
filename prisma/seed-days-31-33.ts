/**
 * seed-days-31-33.ts
 * -------------------
 * Backfill seed for Days 31-33 (close of Module 06 — Operations, Systems & Execution):
 *   Day 31 — The E-Myth Revisited (Michael Gerber)
 *   Day 32 — Traction (Gino Wickman)
 *   Day 33 — The Goal (Eliyahu Goldratt)
 *
 * These three days existed in daily-plan.ts but were never seeded — git history
 * shows seed-summaries.ts jumped from Days 27-30 straight to Days 34-36 across
 * commits, skipping this trio. This file fills that gap using the same pattern
 * as seed-summaries.ts (Module 07).
 *
 * Run with:
 *   npx tsx prisma/seed-days-31-33.ts
 *
 * Uses a fresh PrismaClient connection and a short delay between each
 * book to avoid the Supabase pgBouncer "prepared statement does not
 * exist" error (Postgres code 26000).
 */

import { PrismaClient } from '@prisma/client'

type Summary = {
  bookId: string; bookTitle: string; dayNumber: number; taskId: string
  title: string; readTime: string; content: string
}

function makeClient() {
  return new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL } } })
}

async function upsertSummaries(db: PrismaClient, summaries: Summary[]) {
  for (const s of summaries) {
    await db.bookSummary.upsert({
      where:  { dayNumber_taskId: { dayNumber: s.dayNumber, taskId: s.taskId } },
      update: { title: s.title, content: s.content, readTime: s.readTime, bookTitle: s.bookTitle },
      create: s,
    })
    console.log(`  ✓ Day ${s.dayNumber} — ${s.title.slice(0, 60)}`)
  }
}

// ─── Book 1: The E-Myth Revisited (Day 31) ─────────────────────────────────────
const eMythSummaries = [
  {
    bookId:    'e-myth-revisited',
    bookTitle: 'The E-Myth Revisited',
    dayNumber: 31,
    taskId:    'd31-t1',
    title:     'The E-Myth Revisited — Why Working In Your Business Is Killing It',
    readTime:  '8 min read',
    content:   `## The Fatal Assumption

Michael Gerber opens with a diagnosis he calls the **Fatal Assumption**: that if you understand the technical work of a business, you understand a business that does that technical work. A great baker assumes that because she can bake extraordinary bread, she can run an extraordinary bakery. The skills are almost entirely unrelated, and the gap between them is where most small businesses die.

Gerber's data point, drawn from decades of consulting with small business owners: the overwhelming majority of small businesses fail within their first few years, and the ones that survive usually do so by accident, not by design. The common thread in nearly every failing business he studied wasn't a bad product or an incompetent owner — it was an owner who never stopped being a technician doing technical work, and never started being a businessperson building a business.

## The Three Personalities Living Inside Every Business Owner

Gerber argues every business owner is actually three people in conflict, and most businesses suffer because one of the three dominates the other two.

**The Entrepreneur** lives in the future. She's the dreamer, the visionary, the one who sees possibility and turns it into projects. She thrives on change and is the engine of innovation — but left unchecked, she creates chaos, starting new initiatives faster than the business can absorb them.

**The Manager** lives in the past. He's pragmatic, craves order, and builds the systems, schedules, and structure that make a business predictable. Without him, the Entrepreneur's vision never becomes operational reality. Left unchecked, he resists all change and calcifies the business into rigid bureaucracy.

**The Technician** lives in the present. She does the actual work — baking the bread, writing the code, cutting the hair. She finds deep satisfaction in getting things done with her own hands, and she is innately suspicious of ideas she didn't come up with herself. Left unchecked, she insists on doing everything personally, which is exactly the trap that caps a business's growth at the limit of one person's time.

Gerber's claim, backed by what he observed across thousands of small businesses: the typical founder is **10% Entrepreneur, 20% Manager, and 70% Technician** — meaning almost everyone starts a business from the Technician's seat, working IN the business doing the technical work, with neither the vision nor the systems to ever build something larger than themselves.

## The Turn-Key Revolution — Building a Business, Not a Job

Gerber's central prescription is what he calls the **Turn-Key Revolution**: build your business the way a great franchise builds itself — not around your personal technical skill, but around a system so well-designed that *any* reasonably competent person can run it and produce the same predictable result every time.

This is the difference between owning a job and owning a business. If your business cannot run, generate revenue, and serve customers well for an extended period without your direct, personal, hands-on technical involvement, you don't own a business — you own a job that happens to have your name on the door, and you've traded a boss for a much harder one.

Gerber's litmus test: imagine you had to leave for six months tomorrow, for reasons entirely outside your control. Would the business still be standing — still serving customers at the same level of quality — when you returned? For most small business owners, the honest answer is no. That gap is precisely the work this book exists to close.

## The Business Development Process — Three Stages

Gerber lays out a Business Development Process most growing companies pass through, often without realizing it:

**Infancy** — the Technician's phase. The owner does everything personally. It works as long as the owner can absorb infinite hours, but it caps growth at exactly one person's physical capacity.

**Adolescence** — the business has grown past what the owner alone can do, so she hires help — but typically hires people to do the technical work she doesn't want to do anymore, without ever building the systems that would let those people operate independently. This is where most small businesses get permanently stuck: too big for the owner to do everything, too unsystemized for anyone else to do it reliably.

**Maturity** — not a function of company size or age, but of how the business was *conceived* from day one. A mature business is built like a model that can be replicated — Gerber's most vivid example is Ray Kroc looking at McDonald's not as a hamburger stand but as a hamburger-making **system**, so precisely documented and so thoroughly engineered that it could be reproduced thousands of times by people who had never met him.

## The Franchise Prototype — Thinking Like a Franchisor Even If You'll Never Franchise

Whether or not you ever intend to actually franchise your business, Gerber argues every business owner should build as if they will — because that discipline forces you to systemize everything. He outlines the requirements of a true Franchise Prototype:

1. **It provides consistent value** to customers, employees, suppliers, and lenders — beyond what they expect, every time.
2. **It is operated by people with the lowest possible level of skill** — meaning the system, not the individual, carries the quality. This is not an insult to your team; it's a design discipline that prevents your business from depending on irreplaceable heroics.
3. **Order is preserved through documented operating systems** — manuals, checklists, scripts — that are tested in the real world, refined, and only then standardized.
4. **All systems are reduced to writing** in an Operations Manual, so the knowledge lives in the business, not exclusively in the founder's head.
5. **It guarantees uniform predictability** — a customer gets the same experience whether they're served by you or by an employee you hired last week.

## Working ON the Business, Not IN It

The book's most quoted distinction is also its simplest: every hour you spend **doing** the technical work of your business is an hour you are not spending **designing the systems** that would let someone else do that work. Both are necessary at the very beginning. Neither should remain your full-time job forever.

Gerber's practical reframe: stop asking "what work needs to be done today?" and start asking "what system would let this work get done correctly without me?" The first question keeps you a Technician indefinitely. The second is the only question that builds something you can eventually step back from — or sell.

## Apply This Today

1. **Run Gerber's six-month test honestly.** If you disappeared for six months starting tomorrow, what would happen to your business? Write down, specifically, which parts would collapse and why.

2. **Identify your dominant personality.** Are you currently operating mostly as Entrepreneur, Manager, or Technician? Which of the other two is most neglected, and what is that neglect costing your business right now?

3. **Pick one recurring task that only exists in your head** and write the first version of a documented system for it — detailed enough that someone with no prior experience could follow it and get the same result you would.

4. **Audit your calendar from last week.** What percentage of your hours were spent doing the technical work of your business versus designing systems, hiring, or building structure? Is that ratio actually moving you toward a business you could eventually leave — or just toward a more exhausting job?

The business that survives and scales isn't the one with the most talented owner doing the work. It's the one where the owner's most important work was building a system that no longer needs her to do it personally.`,
  },
]

// ─── Book 2: Traction (Day 32) ─────────────────────────────────────────────────
const tractionSummaries = [
  {
    bookId:    'traction',
    bookTitle: 'Traction',
    dayNumber: 32,
    taskId:    'd32-t1',
    title:     'Traction — The Six Key Components Every Business Needs to Run On',
    readTime:  '8 min read',
    content:   `## Why Most Entrepreneurs Hit the Same Ceiling

Gino Wickman built the Entrepreneurial Operating System (EOS) after years of watching the same pattern repeat across hundreds of small and mid-sized businesses: a founder builds something real through sheer will and talent, growth is exciting for a while, and then somewhere between 10 and 100 employees, the business stalls. Not because the market disappeared, but because the informal, founder-in-every-decision way of operating that worked at 5 people quietly stops working at 25.

Wickman's core claim: every business, regardless of industry, runs — well or poorly — on exactly **Six Key Components**. Most struggling businesses aren't failing at all six; they're usually weak in one or two, and that weakness is what's actually capping growth, even if the owner is convinced the problem is sales, or cash, or a difficult employee.

## The Six Key Components

**1. Vision** — Does everyone in the organization know exactly where the company is going and how it's going to get there? Wickman's test, echoed across nearly every operations book in this genre: ask five people on your team what the company's top priority is this quarter. If you get five different answers, you don't have a vision problem in the abstract sense — you have a communication system failure with concrete operational cost.

**2. People** — Do you have the right people in the right seats? Wickman's filter here is famously simple: **GWC** — does this person **Get it** (genuinely understand the role), **Want it** (actually want to do this work, not just tolerate it), and have the **Capacity** to do it (the time, skill, and intellectual capability required)? A person can fail at GWC and still be a great employee — just not in that particular seat. Misdiagnosing a seat problem as a people problem is one of the most common and costly mistakes Wickman sees.

**3. Data** — Do you manage the business by a small handful of objective numbers instead of gut feeling and anecdote? EOS prescribes a **Scorecard**: 5–15 weekly numbers that are leading indicators (not lagging financial results you find out about a month too late), reviewed by the leadership team every single week without exception.

**4. Issues** — Are problems surfaced and actually resolved, or do they linger, get worked around, and quietly compound? EOS uses an **Issues List** and a simple three-step discipline called **IDS — Identify, Discuss, Solve** — identify the real issue (not just its symptom), discuss it openly until the team genuinely understands it, and solve it with a decision and an owner, in that meeting, rather than letting it roll over to be re-discussed next week.

**5. Process** — Are your core processes documented, followed, and the same way every time, or does quality depend on which employee happens to handle a given job that day? Wickman's standard: document your **20% of processes that drive 80% of results**, get the whole organization following them consistently, and you've effectively built the "Franchise Prototype" idea from a different angle — the same discipline that frees an owner from being the bottleneck.

**6. Traction** — Does the organization actually execute, or does it have great plans that go nowhere? This is the discipline component: turning Vision into reality through **Rocks** (90-day priorities — typically 3–7 per person, the most important things that must get done this quarter) and a weekly **Level 10 Meeting**, a tightly structured, same-agenda-every-week leadership meeting designed to solve issues in real time rather than let them drift.

## The Level 10 Meeting

Wickman is unusually specific and prescriptive about meeting structure, because he's seen how much organizational dysfunction is actually a meeting-discipline problem in disguise. The Level 10 Meeting runs the same 90-minute agenda every week, same day, same time, no exceptions: a quick personal/business check-in, a scorecard review, a Rock review, customer/employee headlines, a to-do list review, and then the bulk of the time — roughly an hour — spent purely on IDS-ing the Issues List.

The discipline of running the *same* meeting *every* week, rather than an ad hoc meeting whenever something feels urgent, is itself the point: it creates a forcing function where issues can't be quietly avoided for more than seven days, and it trains a leadership team to solve problems together instead of routing every decision through the founder.

## The V/TO — Getting the Vision Out of Your Head

Wickman observed that most founders carry a complete, vivid picture of where the company is going — and almost never write it down in a way the rest of the organization can actually use. The **Vision/Traction Organizer (V/TO)** is EOS's tool for forcing that vision into a concrete, two-page document: core values, core focus (your niche and your purpose/cause/passion), 10-year target, marketing strategy, 3-year picture, 1-year plan, and quarterly Rocks.

The value isn't the document itself — it's the discipline of getting specific enough, in writing, that everyone in the company can actually see the same destination you see, instead of guessing at it from your mood that week.

## Why Weakness in One Component Sabotages the Rest

The six components interact. A company with a crystal-clear Vision but no Data discipline will drift off course without anyone noticing until it's expensive to fix. A company with great People but no Process will depend entirely on those specific individuals never leaving. A company that's strong everywhere except Traction will produce beautiful plans every quarter and execute almost none of them.

Wickman's diagnostic tool, the EOS Organizational Checkup, scores a business 1–5 on a set of statements mapped to each component — and his finding, consistent across the businesses he's worked with, is that most owners can name their weakest component almost instantly once they actually sit down and score it honestly. The gap usually isn't diagnosis. It's the discipline to actually fix the lowest score instead of the most urgent-feeling fire.

## Apply This Today

1. **Score yourself, right now, 1–5 on each of the six components**, being brutally honest rather than generous. Don't average them — identify your single lowest score. That is very likely your actual growth bottleneck, even if it doesn't feel like the most urgent problem today.

2. **Run the five-person vision test.** Ask five people on your team, separately, what the company's single most important priority is this quarter. Count how many different answers you get.

3. **Pick one person in a role and run the GWC filter honestly.** Do they Get it, Want it, and have the Capacity for that specific seat — not for the company in general, but for this exact role?

4. **Try one real Level 10 Meeting this week** using the actual agenda structure — even just with two or three people. Notice how much different it feels to deliberately IDS an issue to a real decision versus letting it resurface unresolved next week.

The businesses that scale past the founder-dependent stage aren't the ones with smarter founders. They're the ones that installed an operating system strong enough that the business runs on its components, not on any one person's daily heroics — including the founder's.`,
  },
]

// ─── Book 3: The Goal (Day 33) ─────────────────────────────────────────────────
const theGoalSummaries = [
  {
    bookId:    'the-goal',
    bookTitle: 'The Goal',
    dayNumber: 33,
    taskId:    'd33-t1',
    title:     'The Goal — Find Your Bottleneck, Then Stop Optimizing Everything Else',
    readTime:  '8 min read',
    content:   `## A Business Novel With a Brutally Simple Idea at Its Core

Eliyahu Goldratt made the unusual choice to teach a serious operations framework through a novel rather than a textbook. Alex Rogo is a plant manager given three months to turn around a failing manufacturing plant before it gets shut down. Through conversations with a mentor figure named Jonah, Alex discovers that nearly everything his plant has been measuring and optimizing — machine efficiency, individual department output, keeping every worker and every machine busy — has been actively making the plant *less* productive, not more.

The book's central question, which Jonah keeps forcing Alex back to whenever he gets lost in operational detail, is deceptively simple: **what is the actual goal of your business?** Not "reduce costs" or "improve efficiency" — those are means, not ends. Goldratt's answer: the goal of a business is to make money, now and in the future. Every operational decision should be measured against whether it actually moves the needle on that goal — not whether it looks efficient on a departmental report.

## Throughput, Inventory, and Operational Expense

Goldratt reframes the entire plant — and by extension, any business — using three measures, deliberately chosen because they connect directly to the actual goal of making money, instead of the abstract local efficiency metrics most operations were (and often still are) run on:

**Throughput** — the rate at which the system generates money through sales. Not units produced, not units sitting finished in a warehouse — money that has actually come in the door from a completed sale.

**Inventory** — all the money the system has invested in things it intends to sell, including raw materials and work-in-process sitting half-finished on the floor.

**Operational Expense** — all the money the system spends turning inventory into throughput: labor, utilities, depreciation, everything that keeps the operation running.

The reframe this produces is sharp: a machine running at 100% utilization, producing parts as fast as possible, isn't necessarily helping the plant make money — if those parts pile up as inventory in front of a slower downstream step, that "efficient" machine is actually just converting cash into unsold inventory faster, which is the opposite of the actual goal.

## The Bottleneck — Your "Herbie"

The book's most memorable scene is a Boy Scout hiking trip Alex chaperones, where a slow, overweight kid named Herbie keeps falling behind, stretching the line of hikers longer and longer no matter how fast the kids ahead of him walk. Alex eventually realizes the entire troop's pace is set by Herbie — not by the average pace of the group, not by the fastest hiker, but specifically by the single slowest point in the line. Speeding up the front of the line doesn't get the troop to the campsite faster; it just creates a longer gap and more disorder.

Every production line — every business process — has a Herbie: a bottleneck, a single constraint that limits the throughput of the entire system. Goldratt's insight, which directly attacks decades of "keep every resource maximally busy" management thinking: **the capacity of your entire system equals the capacity of your bottleneck, full stop.** Improving any non-bottleneck step does nothing for total output — it just produces more inventory piling up in front of the next slow step, exactly like the hikers bunching up behind Herbie.

## The Five Focusing Steps

Goldratt's Theory of Constraints gives a repeatable process for managing any system around its bottleneck:

1. **Identify the constraint.** Find the actual bottleneck — the resource or step whose capacity is genuinely lower than demand and is therefore capping the whole system's throughput.

2. **Exploit the constraint.** Before spending a dollar on new capacity, get everything possible out of the bottleneck you already have — eliminate idle time on it, never let it sit unused for breaks or changeovers, make sure it's never starved of work or stopped by upstream problems.

3. **Subordinate everything else to the constraint.** This is the most counterintuitive step: deliberately slow down or pace every non-bottleneck resource to the bottleneck's rhythm. A non-bottleneck step producing at full speed isn't a bonus — it's waste, because it produces inventory the bottleneck can't yet absorb. In Alex's plant, this meant putting the strongest hiker at the back of the line right behind Herbie, and the original front-runner directly behind him, redistributing the line's weight so the whole troop's pace matched its actual limiting capacity.

4. **Elevate the constraint.** Once you've genuinely exploited and subordinated around the bottleneck and it's still limiting you, invest in actually increasing its capacity — new equipment, more shifts on that one resource, additional staff specifically there.

5. **Go back to step one.** Once you elevate a constraint enough, it stops being the bottleneck — and the constraint moves somewhere else in the system. The Five Focusing Steps are not a one-time fix; they're a permanent operating discipline, because there is always a constraint somewhere. The goal is never "eliminate all bottlenecks" — that's impossible — it's "always know exactly where yours is and manage the system around it deliberately."

## Local Efficiency vs. The Whole System

The deepest lesson under all of this: optimizing any individual part of a system in isolation, measured by its own local efficiency, can make the system as a whole *worse*. A department head optimizing his own efficiency number by keeping his machines running flat-out, regardless of whether downstream steps can use the output, isn't helping the company — he's hitting his personal metric while burying the plant in unsold inventory and unmet cash flow.

This is why Goldratt has Jonah keep redirecting Alex away from departmental efficiency reports and back toward the three system-level measures: throughput, inventory, and operational expense. Local optimization metrics feel productive and are easy to measure, which is exactly why they're dangerous — they reward activity that often has nothing to do with the actual goal.

## Apply This Today

1. **Map your business as a sequence of dependent steps**, the way Alex mapped the hiking line. From first contact with a prospect to delivered, paid work — where does work actually queue up and wait the longest?

2. **Identify your "Herbie."** Which single step caps your entire throughput — the one place where, if it ran faster, everything downstream would genuinely move faster too? Be specific; it's usually not the step that *feels* the busiest.

3. **Check whether you're optimizing a non-bottleneck.** Is there a step in your business you've been working hard to make more "efficient" that isn't actually your constraint? What has that effort cost you in attention that could have gone to your real bottleneck instead?

4. **Apply the Five Focusing Steps to your Herbie this week.** Before you spend money to expand its capacity, write down exactly how you'll first exploit it (stop wasting any of its existing capacity) and subordinate everything else to its pace.

The plant Alex Rogo saves isn't saved by everyone working harder everywhere. It's saved by finding the one place that actually limits the whole system, and having the discipline to manage everything else in service of that one constraint — instead of chasing the comforting illusion of every department looking busy and efficient on its own report.`,
  },
]

// ─── master runner ────────────────────────────────────────────────────────────

async function main() {
  const books: { label: string; data: Summary[] }[] = [
    { label: 'The E-Myth Revisited (Day 31)', data: eMythSummaries },
    { label: 'Traction (Day 32)',             data: tractionSummaries },
    { label: 'The Goal (Day 33)',             data: theGoalSummaries },
  ]

  console.log('\n🚀 Backfilling Days 31-33 (Module 06 close)...\n')

  for (const book of books) {
    console.log(`📖 ${book.label}`)
    const db = makeClient()
    try {
      await upsertSummaries(db, book.data)
      console.log(`  ✅ Done\n`)
    } catch (err) {
      console.error(`  ❌ Failed seeding ${book.label}:`, err)
      throw err
    } finally {
      await db.$disconnect()
    }
    await new Promise(r => setTimeout(r, 300))
  }

  console.log('🎉 Days 31-33 backfilled successfully!')
}

main().catch(e => {
  console.error('Error seeding database:', e)
  process.exit(1)
})