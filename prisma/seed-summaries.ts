/**
 * seed-module-07.ts
 * -------------------
 * Combined seed file for Module 07 — Leadership & Organizational Behavior:
 *   Day 34 — High Output Management (Andy Grove)
 *   Day 35 — Leaders Eat Last (Simon Sinek)
 *   Day 36 — An Everyone Culture (Kegan & Lahey)
 *
 * PREREQUISITE: Days 34-36 must exist in daily-plan.ts before running this.
 * They were added directly after Day 33 (The Goal), opening Phase 3 of the
 * curriculum (Advanced Strategy & Leadership) and completing Module 07.
 *
 * Run with:
 *   npx tsx prisma/seed-module-07.ts
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

// ─── Book 1: High Output Management (Day 34) ──────────────────────────────────
const highOutputManagementSummaries = [
  {
    bookId:    'high-output-management',
    bookTitle: 'High Output Management',
    dayNumber: 34,
    taskId:    'd34-t1',
    title:     'High Output Management — The Equation Every Manager Should Know',
    readTime:  '8 min read',
    content:   `## The Single Most Important Sentence in the Book

Andy Grove ran Intel through the most brutal competitive period in its history — fighting off the Japanese DRAM onslaught in the 1980s, eventually rebuilding the company around microprocessors, and turning it into the most valuable semiconductor company in the world. Along the way he wrote what Ben Horowitz calls, in the foreword, the single best book on management ever written.

Grove states the book's central idea in one sentence, and asks readers to treat it as the foundation for everything else:

> **The output of a manager is the output of the organizational units under his or her supervision or influence.**

This sounds obvious until you actually sit with it. It means a manager's personal productivity — how many emails she answers, how many hours she works, how polished her own individual work is — is *not* her output. Her output is what her team, and the people she influences beyond her direct team, actually produce.

This reframes the entire job. The question stops being "am I working hard?" and becomes "is the output of my organization increasing because of what I do?"

## A Manager Is Not Defined by Activities

Grove asked a room of middle managers what a manager's output is. Their answers: judgments, opinions, direction, resource allocation, mistakes detected, people trained. He rejects all of them — not because they're wrong, but because they're **activities**, not output.

A surgeon's activities are scrubbing, cutting, and suturing. His output is a healed patient. A manager's activities are meetings, reviews, emails, and conversations. Her output is what her team — and the "neighboring organizations" she influences without direct authority — actually produces.

This distinction matters because it stops managers from confusing busyness with effectiveness. Grove tracked his own day hour by hour and found it looked chaotic — dozens of short, disconnected activities, two-thirds of it in meetings. The chaos isn't the problem. The question is whether each activity, however brief, contributed to the output of the organizations under his influence.

## The Leverage Equation

Grove introduces the concept that gives the chapter its name and gives this whole philosophy its operating logic:

**Managerial Output = L₁ × A₁ + L₂ × A₂ + …**

Every activity (A) a manager performs has a leverage factor (L) attached to it — the degree to which that activity multiplies into organizational output. A manager's total output is the sum of all her activities, each weighted by its leverage.

This means managerial productivity can be increased in exactly three ways:
1. **Work faster** — speed up the activities you already do
2. **Increase the leverage of activities** — find ways to make the same activity matter more
3. **Shift your time toward high-leverage activities and away from low-leverage ones**

Of the three, the third is by far the most powerful, and it's the one most managers neglect because it requires honestly auditing how they spend their time — not just trying to do more of everything.

## Three Ways an Activity Becomes High-Leverage

**1. When many people are affected by one action.** Grove's example: Robin, an Intel finance manager, spends time in advance defining exactly what information needs to be gathered at each stage of the annual planning process. That work, done once, removes confusion for roughly two hundred people who participate in planning. The same hour of work has wildly different leverage depending on *when* it happens — done in advance, it prevents confusion for hundreds; done reactively after confusion has already spread, it merely cleans up a mess that high-leverage work would have prevented.

**2. When a brief, well-focused action affects someone's behavior over a long time.** A performance review takes a manager a few hours to prepare and deliver, but it can shape a subordinate's effort and direction for months. A "tickler file" — a simple system to track follow-ups — takes minutes to set up but improves a manager's productivity indefinitely. The leverage isn't in the time spent; it's in the duration of the effect.

**3. When one person's unique knowledge unlocks the work of many others.** A pricing analyst who sets prices too high or too low affects every salesperson trying to sell the product. A development engineer with uniquely detailed knowledge of a manufacturing process effectively controls how dozens of other engineers can use it. Grove calls this the "know-how manager" — someone whose specialized knowledge gives them enormous leverage even without direct supervisory authority over anyone.

## Negative Leverage Is Just as Real

Leverage cuts both ways, and Grove is explicit that the negative version is common and often invisible to the person causing it.

**Showing up unprepared to a meeting** doesn't just waste your own time — it wastes everyone else's, and denies them the chance to use that time elsewhere. **A manager's visible depression or discouragement** after bad news spreads through a team faster than almost anything else, and is far harder to "retrain" away than a bad sales pitch. **Waffling** — failing to make a decision — is functionally identical to making a *negative* decision, because the absence of a green light is a red light; the whole organization can stall waiting for a call that never comes.

**Managerial meddling** is Grove's sharpest example. When a manager uses superior knowledge or experience to step in and dictate exactly what a subordinate should do — rather than letting them work through the problem — the immediate problem may get solved faster. But the subordinate learns, over repeated instances, to bring every decision upward rather than develop their own judgment. The organization's output shrinks in the long run, even though each individual instance of meddling looked like "helping."

## Task-Relevant Maturity — Why One Management Style Doesn't Work for Everyone

Grove dismantles the search for a single "best" leadership style with a finding that should reshape how every manager thinks about delegation: the right approach depends entirely on the **Task-Relevant Maturity (TRM)** of the person doing the work — not on their general experience or seniority, but specifically on their readiness for *this particular task*.

Grove gives a vivid example: Intel moved an outstanding sales manager into a factory role of comparable size and scope. His performance collapsed — not because he'd become less capable as a person, but because his TRM for *this specific job* was low. He'd never run a manufacturing unit before. Over time, as he learned the role, his performance climbed back toward his earlier excellence. **The mistake was confusing general competence with task-specific readiness.**

TRM is also highly situational — it can be high in one context and collapse the moment conditions shift. Grove compares it to an experienced driver on quiet country roads suddenly thrown onto a crowded metropolitan freeway: the years of driving experience didn't disappear, but the TRM for *this specific driving task* dropped sharply.

## Matching Management Style to TRM

| TRM Level | Effective Management Style |
|---|---|
| Low | Structured and task-oriented — tell them exactly what, when, and how |
| Medium | Individual-oriented — two-way communication, support, mutual reasoning |
| High | Minimal involvement — agree on objectives, then monitor without micromanaging |

Grove draws a direct parallel to parenting: you don't let a toddler near a busy street without explicit rules, but you don't recite the same rules to a teenager who has internalized them. **As TRM increases, structure doesn't disappear — it moves from being externally imposed to being internally held.** This is the entire goal of developing someone: not removing structure, but helping them carry it themselves so a manager's direct involvement can shrink without risk increasing.

One important caution: regardless of TRM level, Grove insists a manager must always monitor closely enough to avoid surprises. The difference between delegating a task and abandoning it is exactly this — continued monitoring at a level appropriate to the person's maturity, never zero.

## Why Raising TRM Is a Manager's Best Long-Term Investment

The practical payoff of all this: the appropriate management style for someone with high TRM takes dramatically less of a manager's time than the structured approach low TRM requires. Every hour spent deliberately developing a subordinate's task-relevant maturity is an hour that compounds — it converts a relationship that requires constant structured input into one that requires only periodic monitoring, freeing the manager's leverage for other high-value activities.

This is why training, in Grove's view (the subject of an entire chapter titled "Why Training Is the Boss's Job"), isn't HR's responsibility delegated away from managers — it's one of the highest-leverage activities a manager can personally perform, precisely because of this compounding effect on TRM.

## Apply This Today

Run Grove's leverage audit on your own week:

1. **List your 5–7 most time-consuming recurring activities** as a founder or manager.
2. **Score each one** using the three high-leverage tests: does it affect many people? Does it affect someone's behavior over a long period from a brief action? Does it transfer unique knowledge that unlocks others' work?
3. **Identify your negative-leverage habits.** Are you meddling in decisions your team should be making themselves? Are you waffling on calls that are stalling other people's work?
4. **Pick one person and assess their TRM** on their current biggest responsibility. Are you managing them with a style suited to their actual readiness level, or out of habit — too hands-on for someone ready to be trusted, or too hands-off for someone who actually needs more structure right now?

The output of your business this quarter is not a function of how hard you personally worked. It's a function of where your leverage actually went.`,
  },
]

// ─── Book 2: Leaders Eat Last (Day 35) ─────────────────────────────────────────
const leadersEatLastSummaries = [
  {
    bookId:    'leaders-eat-last',
    bookTitle: 'Leaders Eat Last',
    dayNumber: 35,
    taskId:    'd35-t1',
    title:     'Leaders Eat Last — The Circle of Safety and Why Some Teams Pull Together',
    readTime:  '8 min read',
    content:   `## Why Marines Eat Last

In the United States Marine Corps, when a unit gathers to eat, the most junior members are served first. The most senior — the officers, the leaders — eat last. No order is ever given. Marines simply do it.

At the heart of this small, wordless ritual is the entire thesis of Simon Sinek's book: **the true price of leadership is the willingness to place the needs of others above your own.** Leadership is not a rank. It's not a title, a corner office, or a bigger paycheck. It's a responsibility — and the organizations that thrive long-term are the ones whose leaders actually understand and live this distinction.

## Johnny Bravo and the Cost of Caring

In August 2002, an Air Force pilot with the call sign Johnny Bravo was circling above a valley in Afghanistan in his A-10 Warthog. Below him, twenty-two Special Operations soldiers were pinned down by enemy fire in pitch darkness. He wasn't ordered to descend through the dangerous cloud cover into a mountain valley with old Soviet maps and degraded visibility. If anything, the safer order would have been to hold position.

He went down anyway. He made pass after pass, firing on the enemy positions, counting seconds aloud to avoid slamming into the unseen mountain walls. When he ran out of ammunition, he brought his wingman down too. All twenty-two men went home alive that night.

Why did he do it? Not for a bonus, a promotion, or recognition. Sinek's answer, drawn directly from Johnny Bravo's own words: empathy. *"Because they would have done it for me."* This is the emotional foundation the entire book is built on — and Sinek argues that the conditions that produce a Johnny Bravo aren't a matter of rare personal heroism. They're a matter of organizational design. Put people in the right environment, and this kind of selflessness becomes the norm rather than the exception.

## The Day the Bells Stopped Ringing

Sinek's other foundational story is less dramatic but just as instructive. Bob Chapman, CEO of the manufacturing company Barry-Wehmiller, acquired a struggling factory called HayssenSandiacre. Rather than bringing in consultants with a turnaround strategy, Chapman started by listening.

One factory veteran, Ron Campbell, finally admitted what was really going on: factory workers punched a time clock and waited for bells to tell them when they could take a break, use the bathroom, or go to lunch — while office employees, walking through the very same door each morning, were trusted to manage their own time freely. The factory floor and the office were, in every meaningful way, two different companies under one roof, and the difference was trust.

Chapman's response: remove the time clocks. Remove the bells. Take down the locked cage around spare parts, which existed to prevent theft but communicated, every single day, that management didn't trust its own people. Make company phones available to everyone, no permission required.

None of this was about being "nicer." It was a structural decision about where leadership chooses to extend trust — and that decision, multiplied across thousands of small moments, is what determines whether an organization's culture pulls people together or quietly tears them apart.

## The Circle of Safety

Sinek's central organizing concept ties both stories together. Every organization faces two categories of danger:

**External dangers** — competitors, market shifts, economic downturns, new technology that makes your business model obsolete overnight. These are constant, real, and entirely outside your control. They will never go away.

**Internal dangers** — office politics, layoffs, humiliation, isolation, fear of looking incompetent, fear of being blamed. Unlike external dangers, these are entirely within an organization's control. And unlike external dangers, they can be eliminated.

The **Circle of Safety** is what leaders build when they deliberately remove internal danger from their people's daily experience. When people feel genuinely protected from threats *inside* the organization, they redirect all the energy they would have spent on self-protection — political maneuvering, hiding mistakes, guarding information — toward facing the dangers *outside* the organization instead.

Sinek borrows the metaphor of the Spartan shield: a Spartan soldier carried his helmet and breastplate for his own protection, but his shield for the safety of the entire battle line. Losing your shield in battle, unlike losing a helmet, was the single greatest disgrace a Spartan could commit — because the shield wasn't about you. It was about everyone beside you.

**The leader's job is to be the shield.** Not to protect their own position, but to extend protection to everyone inside the Circle — and the size of that Circle is a direct, measurable reflection of leadership quality. Weak leaders extend the Circle of Safety only to a small inner circle of fellow executives, leaving everyone else to fend for themselves, form silos, hide mistakes, and protect their own turf. Strong leaders extend the Circle to include every single person in the organization.

## The Whitehall Studies — Stress Isn't About Workload

A series of landmark British studies, known as the Whitehall Studies, set out to confirm what everyone assumed: that executives at the top of an organization suffer the most stress, given their immense responsibility.

The actual finding inverted the assumption entirely. **Stress was not driven by the demands of the job or the level of responsibility.** It was driven by how much control a person felt they had over their work, and by the imbalance between the effort they put in and the reward — recognition, respect, security — they received back. Lower-ranking employees, who often have the least control and the least recognition, showed the highest stress-related health risks. The senior leaders, despite carrying more formal responsibility, often had *lower* stress, because they typically had more autonomy.

A related 2011 Australian study found something equally striking: people in jobs they hated showed depression and anxiety levels equal to or worse than people who were unemployed entirely. And a 2013 Gallup poll found that when bosses completely ignore their employees, 40% actively disengage from their work — but if a boss criticizes them regularly, only 22% disengage, because even harsh attention beats indifference. When a boss recognizes just one of an employee's strengths, disengagement drops to just 1%.

The lesson for any founder or manager: the absence of recognition is more corrosive than almost anything else you could do. People don't need constant praise. They need to know someone sees them.

## The Four Chemicals That Run Your Culture

Sinek grounds the entire Circle of Safety concept in basic human neurochemistry — four chemicals he summarizes with the acronym **E.D.S.O.**

**Endorphins** mask physical pain with pleasure — the "runner's high." Evolutionarily, they rewarded our ancestors for the physical endurance required to hunt and gather over long distances. In modern organizations, endorphins show up as the satisfaction of pushing through genuinely hard, demanding work.

**Dopamine** rewards us for making progress toward a goal — the small hit of satisfaction every time we cross something off a to-do list, hit a milestone, or close a deal. This is why specific, visible, measurable goals motivate people far more effectively than vague aspirations like "be the best." But dopamine has a dark side: it's highly addictive, and organizations that reward *only* hitting numbers — with no attention to how people feel along the way — risk creating a culture of dopamine addicts who will eventually burn out or cut corners to keep getting the hit.

Endorphins and dopamine are what Sinek calls the **"selfish" chemicals** — they evolved to drive individual survival, individual achievement, individual progress.

**Serotonin** is the chemical of pride and status — the feeling of being respected and valued by people whose opinion matters to you. It's why an award means more in front of an audience than received by email alone, and why the first thing people do when they win something is thank the people who supported them. Serotonin reinforces the bond between leader and follower, parent and child, coach and player.

**Oxytocin** is the chemical of trust, friendship, and love — released through generosity, physical touch, and acts of genuine human connection. It's the chemical most responsible for the feeling that we belong, that we're safe, that the people around us have our backs.

Serotonin and oxytocin are the **"selfless" chemicals** — they evolved specifically to make cooperation and group loyalty feel good, because a species that couldn't cooperate couldn't have survived the dangers of the natural world.

## Why This Matters for How You Lead

A strong Circle of Safety depends on serotonin and oxytocin flowing freely — recognition given generously, trust extended deliberately, genuine care for people's wellbeing expressed regularly. A culture run purely on dopamine — hit the number, get the bonus, nothing else discussed — will produce short bursts of performance and long-term burnout, because it never engages the chemicals that make people actually want to stay, actually want to look out for each other, actually want to sacrifice for the team the way Johnny Bravo did.

The leader's actual job, in Sinek's framing, isn't to be the smartest person in the room or to have all the answers. It's to control the conditions inside the organization so that the four chemicals work *for* the culture instead of against it — extending trust, removing arbitrary internal threats, recognizing effort visibly, and building an environment where people feel safe enough to bring their full energy to facing the very real dangers outside.

## Apply This Today

1. **Map your Circle of Safety.** Who in your organization currently feels fully protected and trusted? Who is still operating in survival mode — guarding information, afraid to admit mistakes, unsure where they stand? Be honest about where the boundary of your Circle actually sits today, not where you wish it sat.

2. **Find one bell or time clock.** What's one structural, low-trust policy or practice in your business — something that exists "just in case" but quietly signals distrust — that you could remove this week, the way Chapman removed the factory bells?

3. **Audit your recognition habits.** Given the Gallup finding that even criticism beats silence, who on your team have you gone the longest without acknowledging? A specific, genuine note about something they did well costs you five minutes and may be the single highest-leverage thing you do this week.

The companies that win long-term aren't the ones with the smartest strategy or the most resources. They're the ones whose people trust each other enough to stop protecting themselves from each other — and start protecting the mission together.`,
  },
]

// ─── Book 3: An Everyone Culture (Day 36) ──────────────────────────────────────
const everyoneCultureSummaries = [
  {
    bookId:    'an-everyone-culture',
    bookTitle: 'An Everyone Culture',
    dayNumber: 36,
    taskId:    'd36-t1',
    title:     'An Everyone Culture — The Second Job You\'re Not Getting Paid For',
    readTime:  '8 min read',
    content:   `## The Single Biggest Waste of Resources in Business

Robert Kegan and Lisa Lahey, both developmental psychologists at Harvard, open with a claim that sounds extreme until you actually sit with it: in nearly every ordinary organization, **almost everyone is doing a second job no one is paying them for.**

That second job is hiding. Covering up weaknesses. Managing other people's impressions of you. Showing yourself to your best advantage. Hiding uncertainty. Hiding inadequacy. Hiding limitations.

This isn't an occasional behavior reserved for bad days — Kegan and Lahey argue it's the default operating mode of most professionals in most organizations, all day, every day. And the cost is staggering: you are paying a full-time wage for what amounts to part-time work, because a meaningful fraction of every employee's energy is being spent on self-protection rather than on the actual job.

Consider it from the employee's side too. What does it cost *you* to live a double life at work every day — to know, underneath the professional performance, that you're not quite the person you're presenting yourself to be? Research on workplace burnout backs this up directly: the single biggest cause of burnout isn't work overload. It's working for a long time without experiencing genuine personal development.

## What If an Organization Was Built Differently?

Kegan and Lahey spent years studying a small number of companies where this dynamic essentially doesn't exist — organizations where people genuinely, visibly come out of hiding. They call these **Deliberately Developmental Organizations (DDOs)**.

A DDO isn't a company with a generous benefits package, a wellness program, or a "people-first" mission statement bolted onto business as usual. It's something structurally different: an organization built from the ground up on the conviction that the company's business success and its people's personal growth are not two separate goals — they're the same goal, pursued through the same daily mechanisms.

The three companies the authors studied in depth — Bridgewater Associates (the world's largest hedge fund), Decurion (a movie theater and senior living company), and Next Jump (a tech company) — had never heard of each other and operate in wildly different industries. Yet independently, all three arrived at strikingly similar cultural architectures.

## The Twentieth-Century Answer Was Always "Something Extra"

To understand what makes a DDO different, it helps to see what it's reacting against. Executive coaching, leadership retreats, mentoring programs, corporate universities — these are the standard twentieth-century tools for developing people, and Kegan and Lahey identify four problems common to all of them:

1. **They're punctuated, not continuous.** A weekend retreat or a once-a-year off-site is too thin an intervention to produce fundamental change.
2. **They're "something extra."** They sit outside the normal flow of work, which raises the question of whether anything learned actually transfers back to the day-to-day job.
3. **They're reserved for the few.** Most companies funnel development resources toward the 5–10% identified as "high potential," implicitly writing off the other 90%.
4. **The individual, not the organization, is the point of intervention.** The assumption is always: give the person a coach, a course, a mentor — some additive — while the organization itself stays exactly the same.

A DDO inverts all four. Development isn't an extra program — it's baked into the daily operating rhythm of the business itself. And it isn't reserved for high-potentials — it's for everyone. Hence the book's title.

## Edge, Home, and Groove — The Architecture of a DDO

Kegan and Lahey describe the conceptual structure of a DDO using three intersecting dimensions, like three legs of a stool — remove any one and the whole thing collapses.

**Edge: Developmental Aspiration**

Every DDO is organized around the explicit, structural belief that **adults can grow** — not just children, not just "high potentials," but every single person, continuously, throughout their career. This sounds obvious stated aloud, but almost no organization is actually *designed* from the ground up to support it.

At Next Jump, this shows up in a formula employees recite: **Better Me + Better You = Better Us.** Half of every employee's compensation is tied to *culture* — specifically, to how much they're working on their own growth and helping others do the same — not just to revenue performance. You can be a revenue superstar at Next Jump and still take a smaller bonus if you're not actively working on yourself.

Tied directly to this is the second edge principle: **weakness is a potential asset, and error is an opportunity** — not something to be hidden, but something to be surfaced, examined, and worked on publicly. At Bridgewater, every employee is required to log mistakes and failures — their own and others' — in a company-wide "Issues Log." Failing to log a mistake is treated as a more serious breach than the mistake itself. Founder Ray Dalio's mantra, "Pain + Reflection = Progress," is operationalized into an actual daily practice, not just a poster on the wall.

**Home: Developmental Community**

None of this works without psychological safety. Kegan and Lahey are explicit that working at one's growing edge requires shared vulnerability inside a genuinely trustworthy community — and that takes deliberate design, not good intentions.

Inside a DDO's "home," rank does not carry its usual privileges when it comes to development — a senior executive's weaknesses get examined with the same rigor as a junior employee's. Everyone, regardless of title, is expected to do active "people development" work on others, not just receive it from above. And critically: everyone needs a "crew" — a trusted small group who knows your specific growing edge and is actively invested in helping you work through it, rather than simply watching you struggle alone.

**Groove: Developmental Practices**

Aspiration and community alone produce good intentions, not change. The "groove" is the set of sustained, repeated practices that actually anchor development in daily behavior. At Next Jump, this takes the form of weekly "situational workshops" — structured group sessions where an employee brings a real, current struggle, and the group's job isn't to solve the situation itself, but to help that person see the deeper pattern in themselves that keeps producing similar situations. The tone, deliberately, is never "gotcha" — it's closer to tending a plant that needs regular attention to grow.

## The Fixed Mind-Set Trap

Kegan and Lahey connect this directly to psychologist Carol Dweck's well-known distinction between a "fixed" mind-set (success comes from innate talent) and a "growth" mind-set (success comes from sustained effort through expected setbacks). Their honest admission: even the authors themselves, despite decades of studying human development, still catch traces of fixed-mind-set thinking in themselves.

The trap for high performers specifically: many arrive at a DDO assuming their development simply means getting *even better* at what they're already good at — a fuller expression of talents they already possess. They're in for a surprise. Real growth, Kegan and Lahey argue, requires first experiencing some genuine limitation at your *core* — not at the edges of your skill set, but in some fundamental, taken-for-granted assumption about yourself. Until that happens, you haven't actually engaged with what a DDO offers.

This is also why DDOs are not comfortable places to work, and the authors are honest about it. People describe the experience in nearly identical terms across all three companies: "It's not always fun. It can be painful. And it's the most exhilarating place I've ever worked, and I'd never want to work anywhere else." It's also normal for DDOs to see higher-than-typical turnover in an employee's first twelve to eighteen months — the environment isn't for everyone, and the companies don't pretend otherwise.

## Run on Developmental Principles, Not Slogans

Most organizations have mission statements, mottos, and stated values — "the client comes first," "progress is our most important product." Kegan and Lahey's pointed observation: without an entire supporting ecology of structures, daily practices, tools, and shared language to actually embody those words, they remain slogans rather than forces that genuinely shape behavior.

A DDO is run, instead, by a small set of deeply held principles that visibly shape decisions at every scale — from the smallest daily interaction to the most strategic company-wide choice. Decurion describes its purpose simply as providing "places for people to flourish" — and that principle shows up concretely in something as small as a movie theater crew member starting his shift by consciously connecting his specific tasks that day to his own deeper sense of purpose as a person, not just running through a checklist.

## Why This Is "Strictly Business" and Not Just Nice-to-Have

It would be easy to dismiss all of this as soft, feel-good HR philosophy with no real business case. Kegan and Lahey devote real attention to refuting that — pointing to measurable outcomes across the three DDOs they studied: increases in profitability and employee retention, faster paths to promotion, more candid internal communication, better detection of operational and strategic errors before they become costly, more effective delegation, and stronger accountability throughout the organization.

The mechanism behind all of it traces back to the opening diagnosis: if hiding weaknesses is the default mode in a normal organization, and that hiding consumes a meaningful fraction of every employee's energy and attention every single day, then an organization that successfully eliminates the need to hide has just recovered an enormous amount of previously wasted human capacity — redirected toward the actual work, the actual mission, and each other.

## Apply This Today

This isn't a framework you implement by issuing a memo. But you can start testing where you stand:

1. **Name your own "second job."** Be specific: where, this week, did you spend energy managing how you looked instead of doing the actual work — smoothing over a mistake, avoiding a hard conversation, performing confidence you didn't actually feel?

2. **Find one structural change, not a personality change.** The goal isn't to tell your team to "be more open" — that's exactly the kind of slogan Kegan and Lahey warn against. What's one concrete mechanism — a regular practice, a changed incentive, a new ritual — that would make admitting a mistake measurably lower-risk than hiding it, the way Bridgewater's Issues Log does?

3. **Identify your "crew" question.** Is there at least one person at work who knows your specific current growing edge and is actively invested in helping you work through it — not just your manager evaluating your performance, but someone genuinely on your side in that struggle? If the honest answer is no, that absence is itself useful information about your current culture.

The promise Kegan and Lahey make is not modest: that the culture you build *is* your strategy, and that the organizations capable of developing everyone — not just the chosen few — are the ones that will out-think, out-adapt, and out-last everyone still paying full-time wages for half-time work.`,
  },
]

// ─── master runner ────────────────────────────────────────────────────────────

async function main() {
  const books: { label: string; data: Summary[] }[] = [
    { label: 'High Output Management (Day 34)', data: highOutputManagementSummaries },
    { label: 'Leaders Eat Last (Day 35)',        data: leadersEatLastSummaries },
    { label: 'An Everyone Culture (Day 36)',      data: everyoneCultureSummaries },
  ]

  console.log('\n🚀 Seeding Module 07 — Days 34–36...\n')

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

  console.log('🎉 Module 07 (Days 34–36) seeded successfully!')
}

main().catch(e => {
  console.error('Error seeding database:', e)
  process.exit(1)
})