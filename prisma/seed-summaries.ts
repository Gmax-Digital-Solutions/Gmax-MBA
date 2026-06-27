/**
 * seed-module-12.ts
 * -------------------
 * Combined seed file for Module 12 — Economics, Macro & Global Markets:
 *   Day 49 — Basic Economics (Thomas Sowell)
 *   Day 50 — The Wealth of Nations (Adam Smith)
 *   Day 51 — Principles (Ray Dalio)
 *
 * PREREQUISITE: Days 49-51 must exist in daily-plan.ts before running this.
 * They were seeded ahead of Modules 10 and 11 at the user's request — Days
 * 43-48 (Corporate Finance & Business Valuation, and Venture Capital, M&A
 * & Deal-Making) are intentionally left as a gap in daily-plan.ts to be
 * filled in later without needing to renumber Module 12.
 *
 * Run with:
 *   npx tsx prisma/seed-module-12.ts
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

// ─── Book 1: Basic Economics (Day 49) ─────────────────────────────────────────
const basicEconomicsSummaries = [
  {
    bookId:    'basic-economics',
    bookTitle: 'Basic Economics',
    dayNumber: 49,
    taskId:    'd49-t1',
    title:     'Basic Economics — Why Good Intentions Are Not Enough',
    readTime:  '8 min read',
    content:   `## No Graphs, No Equations, No Excuses

Thomas Sowell wrote Basic Economics with a deliberate constraint: no graphs, no equations, no jargon. His argument for why this matters goes beyond accessibility. Every voter and every politician they elect affects economic policy whether they understand economics or not — there's no opting out. The only choice is whether you're informed, uninformed, or misinformed when those decisions get made. This book exists to move people from the second or third category into the first, using real historical examples instead of abstract models.

## What Economics Actually Is

Sowell starts from a definition borrowed from economist Lionel Robbins: **economics is the study of the use of scarce resources which have alternative uses.** Every word in that definition is load-bearing.

"Scarce" doesn't mean rare in some absolute sense — it means that what everybody wants, added together, exceeds what exists. Sowell illustrates this with a *New York Times* feature on a middle-class American family, photographed beside their own swimming pool, under the headline "The American Middle, Just Getting By." A Harvard sociologist is quoted describing how "budget-constrained" they are. Sowell's point is sharp: it's not a budget constraining them. **It's reality.** Even some of the most prosperous people who have ever lived face the same underlying condition every human society has always faced — there has never been enough to satisfy everyone completely. That's scarcity, and no economic system, capitalist, socialist, or otherwise, makes it disappear. Different systems are just different ways of making the unavoidable trade-offs.

"Alternative uses" is the other half of the definition, and it's why economics is genuinely difficult rather than mechanical. Water can become ice, steam, or a thousand industrial compounds. Petroleum becomes gasoline, but also plastics, asphalt, and Vaseline. Every economy, regardless of ideology, has to decide how much of each scarce resource goes toward which of its competing uses — and that decision, made well or badly, directly shapes the standard of living of everyone in it.

## Resources Don't Create Wealth — Decisions Do

One of Sowell's most counterintuitive data points: the value of natural resources per capita in Uruguay and Venezuela is several times higher than in Japan or Switzerland. Yet real income per capita in Japan and Switzerland is more than double Uruguay's, and several times Venezuela's. Resource abundance and prosperity aren't the same thing — **what matters is how efficiently inputs get turned into outputs**, and that's a function of decisions and institutions, not geology.

The Soviet Union is Sowell's starkest illustration: a country so rich in natural resources it remains one of the few industrial nations that produces more oil than it consumes, yet its industries used *more* electricity than American industries while producing *less* total output. Abundant resources, badly allocated, still produce scarcity in the form people actually experience — a lower standard of living than the raw materials alone would predict.

## The Real Lesson: Incentives, Not Intentions

Sowell's central methodological point, repeated throughout the book: **the test of an economic policy is its consequences, not its stated goals.** Good intentions, without an understanding of how an economy actually responds to incentives, routinely produce disastrous results — and most economic disasters in history were the product of policies that were *meant* to help.

The book treats this as a matter of cause and effect, not opinion. Sowell points out that a Marxist economist analyzing supply and demand uses fundamentally the same analytical method as a free-market economist — the disagreements that exist in economics are about values and predictions, not about whether cause-and-effect relationships exist at all.

## Why Prices Move — And What Happens When You Stop Them

Sowell's clearest demonstration of consequences-over-intentions is rent control, examined in depth in the chapter on price controls. The logic of free prices is simple: prices rise when the amount people want exceeds the amount available at the current price; they fall when supply exceeds demand. A "shortage" and a "surplus" are both, by definition, *price-dependent* conditions — not fixed facts about how much of something physically exists.

During and after World War II, the United States had a severe housing shortage — even though both population and housing supply had each grown by roughly 10% from prewar levels, meaning the actual ratio of housing to people hadn't worsened at all. The shortage was real and painful anyway, because wartime rent control laws held prices artificially below where supply and demand would have settled them. At that artificially low price, more people wanted more housing than before: young adults moved out of their parents' homes sooner, childless couples kept larger apartments than they needed, and — in one of Sowell's sharper details — some people kept rent-controlled apartments in cities they didn't even live in, purely because the price was too good to give up. Hollywood stars kept empty rent-controlled apartments in New York; a couple living in Hawaii kept one in San Francisco.

When rent control ended after the war, the shortage dissolved almost immediately — *before any new housing was built.* Couples who no longer needed four bedrooms at an artificially cheap price downsized voluntarily. Young adults waited a bit longer before moving out. The same physical housing stock simply got reallocated toward people with more urgent needs, the moment prices were allowed to do the job they exist to do: **communicating real scarcity and letting people respond to it.**

This is Sowell's recurring move throughout the book: take a policy with an obviously sympathetic goal — affordable housing, protecting jobs, helping struggling businesses — and trace what actually happens once people respond to the *changed incentives*, not the *stated intentions*, of the policy.

## Apply This Today

Sowell's lens works on far more than government policy — it applies to any situation where you're tempted to judge a decision by what it was meant to accomplish rather than what it will actually cause people to do.

1. **Find a price control or constraint that touches your own business or industry directly** — a minimum wage, a rent cap, a tariff, a subsidy, a price ceiling somewhere in your supply chain. Trace it the way Sowell traces rent control: who benefits in the short term, who bears the cost that doesn't show up in the headline, and what shortage or surplus does it eventually create?

2. **Look at one internal policy in your own company through the same lens.** A rule meant to prevent one bad outcome often quietly creates incentives nobody intended — free unlimited PTO that nobody feels safe using, a "no questions asked" return policy that gets systematically abused, a flat bonus structure that rewards the wrong behavior. Good intentions are not a substitute for tracing where the incentives actually point.

3. **Ask the consequence question before the intention question.** Not "what is this rule trying to accomplish?" but "given how people actually respond to incentives, what is this rule going to cause?" Sowell's entire body of work rests on the gap between those two questions — and how often the gap is wider than anyone expects.`,
  },
]

// ─── Book 2: The Wealth of Nations (Day 50) ────────────────────────────────────
const wealthOfNationsSummaries = [
  {
    bookId:    'wealth-of-nations',
    bookTitle: 'The Wealth of Nations',
    dayNumber: 50,
    taskId:    'd50-t1',
    title:     'The Wealth of Nations — The Pin Factory and the Invisible Hand',
    readTime:  '7 min read',
    content:   `## The Book That Founded an Entire Discipline

Published in 1776, Adam Smith's *An Inquiry into the Nature and Causes of the Wealth of Nations* is the founding text of modern economics. Two and a half centuries later, two of its core ideas — the division of labour and the invisible hand — are still the starting point for understanding how markets actually create wealth, and they remain just as counterintuitive to most people today as they were to Smith's contemporaries.

## Ten Men, Forty-Eight Thousand Pins

Smith opens his case for the division of labour with what he deliberately calls "a very trifling manufacture" — the trade of the pin-maker. A single worker, untrained and unfamiliar with the specialized tools of the trade, could scarcely make one pin a day, Smith argues, and certainly not twenty. But in a proper pin manufactory, the work is divided into roughly eighteen distinct operations: one man draws out the wire, another straightens it, a third cuts it, a fourth points it, a fifth grinds the top to receive the head — and making the head alone requires two or three further separate operations.

Smith had personally observed a small workshop of this kind employing just ten men, some of whom performed two or three of the eighteen operations each. Poorly equipped and modestly resourced as they were, those ten workers together produced about twelve pounds of pins a day. At roughly 4,000 pins per pound, that's upward of **48,000 pins a day** — about 4,800 pins per person. Had each of those ten men worked separately, with no division of labour and no specialized training, Smith estimates they could not have made twenty pins a day each, and quite possibly not even one. The division of labour, in this single trifling example, multiplied output by a factor of hundreds.

**The principle generalizes far beyond pins.** Smith's claim is that this same multiplication — proportionate increases in productive power through specialization — shows up in every trade and manufacture where division of labour can be introduced, even when the work can't be subdivided as neatly as pin-making. The reason wealthy, industrially advanced nations look the way they do, with farmers who are only farmers and manufacturers who are only manufacturers, rather than everyone doing a little of everything, is this same principle operating at the scale of an entire economy.

## Why We Divide Labour at All

What causes this division to happen in the first place? Smith locates the answer not in any deliberate plan or far-sighted policy, but in something much more basic: **a fundamental human propensity to truck, barter, and exchange one thing for another.** Nobody designed the division of labour to produce general prosperity — it emerged gradually and almost accidentally, as people who were good at one thing realized they could trade their surplus for things other people were good at producing.

This is the seed of one of Smith's most quoted and most misunderstood observations, found later in the same chapter:

> *"It is not from the benevolence of the butcher, the brewer, or the baker, that we expect our dinner, but from their regard to their own interest. We address ourselves, not to their humanity but to their self-love, and never talk to them of our own necessities but of their advantages."*

This is not a claim that self-interest is good or noble. It's a claim about **what actually moves people to cooperate reliably, at scale, with strangers they will never personally know.** Begging works occasionally and unpredictably; even a beggar, Smith notes, doesn't depend on charity entirely. But trade — proposing "give me what I want, and you shall have this which you want" — works dependably, every day, between people with no personal relationship at all, because it appeals to something present in essentially everyone: regard for their own advantage. Smith's insight isn't cynicism about human nature; it's a structural observation about which motive scales reliably across millions of anonymous transactions, and which one doesn't.

## The Invisible Hand

The phrase Smith is most famous for appears, somewhat surprisingly, just once in the entire book — in a passage about why individuals investing capital tend to favor domestic industry over foreign industry, given equal returns. But the underlying logic of that single passage became the most influential idea in the history of economics:

> *"By directing that industry in such a manner as its produce may be of the greatest value, he intends only his own gain, and he is in this, as in many other cases, led by an invisible hand to promote an end which was no part of his intention... By pursuing his own interest he frequently promotes that of the society more effectually than when he really intends to promote it."*

The mechanism Smith describes: every individual, in choosing how to deploy their own capital, naturally tries to use it where they judge the return will be highest — because that judgment serves their own gain. They are not trying to maximize national output, and most have no idea how much they're contributing to it. Yet the aggregate effect of millions of individuals each making self-interested judgments about their own best use of their own resources is that the nation's total output tends toward being higher than it would be under any centralized attempt to direct it.

Smith's argument against centralized direction is not just practical but specifically epistemic: **the individual, in his own local situation, can judge what's the most valuable use of his own capital far better than any statesman or lawgiver could judge it for him.** A central planner attempting to direct millions of individual capital decisions would need knowledge no single person or institution could possibly possess — not just data, but the kind of local, particular, constantly shifting knowledge that exists only in the heads of the people actually making each decision, in their own specific circumstances.

This is the deepest version of Smith's claim: it isn't that self-interest is morally superior to benevolence as a motive. It's that **a system built on dispersed self-interested decision-making, coordinated through prices and voluntary exchange, can productively use a kind of localized knowledge that no centralized system can ever fully collect or act on.**

## Why These Two Ideas Belong Together

The division of labour and the invisible hand aren't separate insights — they're two views of the same underlying mechanism. The division of labour explains how specialization multiplies what a society can produce. The invisible hand explains *why specialization happens in the right places without anyone planning it that way* — because self-interested individuals, each pursuing their own gain through voluntary exchange, end up allocating labour and capital toward their most valuable uses, guided by nothing more than the price signals and trading opportunities directly in front of them.

Smith's deeper point, threading through both ideas: **a vast, productive, coordinated economic order can emerge from nobody's master plan** — assembled instead from millions of small, self-interested decisions, none of which were intended to produce that order, all of which nonetheless add up to it.

## Apply This Today

Two exercises drawn directly from Smith's own method — starting from a concrete, almost trivial example and reasoning up to the general principle:

1. **Map your own "pin factory."** List every distinct step currently required to deliver your product or service from start to finish, the way Smith mapped the eighteen operations of pin-making. Is there a single step still being handled by one generalist that could instead be split into specialized, repeatable parts — the way drawing the wire, cutting it, and pointing it became three separate jobs instead of one? Where would dividing it multiply your output the way it multiplied the pin-makers'?

2. **Find a place where you're appealing to benevolence instead of mutual interest.** Smith's insight about the butcher and the baker applies directly to sales, hiring, and partnerships: relationships built on asking people to be generous or understanding scale poorly and unpredictably. Relationships built on genuine, clearly demonstrated mutual advantage scale reliably, because they don't depend on anyone's goodwill holding up under pressure. Where in your current pitch, offer, or ask are you quietly relying on someone's charity rather than making the case for their own clear self-interest?`,
  },
]

// ─── Book 3: Principles (Day 51) ───────────────────────────────────────────────
const principlesSummaries = [
  {
    bookId:    'principles',
    bookTitle: 'Principles',
    dayNumber: 51,
    taskId:    'd51-t1',
    title:     'Principles — The 5-Step Process and the Idea Meritocracy',
    readTime:  '8 min read',
    content:   `## "I'm a Dumb Shit Who Doesn't Know Much"

Ray Dalio opens *Principles* with a line that sounds like false modesty from the founder of the world's largest hedge fund, but he means it literally: whatever success he's had has come less from what he knows and more from **knowing how to deal with what he doesn't know.** That single reframe — from "I know I'm right" to "how do I know I'm right?" — is the foundation everything else in the book is built on.

Dalio built Bridgewater Associates from a two-bedroom apartment into, by his account, the fifth most important private company in the U.S. according to Fortune. The principles in this book are his attempt to extract the *transferable logic* behind that outcome — not a memoir of what happened, but a set of decision-making tools meant to work for anyone, in any domain, regardless of whether they ever manage a dollar of anyone else's money.

## Principles Are Recipes, Not Rules Handed Down From Above

Dalio's definition: **principles are fundamental truths that serve as the foundation for behavior that gets you what you want out of life**, and they work because they let you classify situations into types you've encountered before, rather than reacting to every new problem as if it's never happened to anyone. "Having a good set of principles," he writes, "is like having a good collection of recipes for success."

Crucially, Dalio is explicit that he does not want readers to adopt his principles wholesale. The point of the book is to prompt you to discover and write down your *own* — ideally in writing, because writing forces the kind of precision that vague mental rules never achieve. A principle you can't clearly explain isn't really a principle yet; it's just an instinct you haven't examined.

## Believability-Weighted Decision Making

Dalio's core epistemic move, the one that shapes almost everything else in the book, came from a brutal early-career lesson: making a famously wrong, highly public bet on the markets in 1982 that nearly destroyed his firm. The experience shifted him permanently from a posture of "I know I'm right" to "how do I know I'm right?" — and that shift produced a specific practical habit: **seek out the smartest people who disagree with you, and try to genuinely understand their reasoning before assuming you're correct.**

This evolved into what Dalio calls **believability-weighted decision making** — instead of treating every opinion as equally valid (pure democracy) or deferring entirely to whoever's in charge (pure autocracy), you weigh people's input according to their track record and demonstrated reasoning ability on the specific question at hand. Bridgewater is built, in Dalio's words, as **an idea meritocracy** — not a system where he leads and everyone follows, and not a system where every vote counts equally, but one that explicitly weighs opinions in proportion to their merit. The goal, as he puts it bluntly: "I just want to be right — I don't care if the right answer comes from me."

## The 5-Step Process

The single most actionable framework in the book is what Dalio calls the **5-Step Process** — his model for how anyone moves from where they are to where they want to be, applicable to a single decision or an entire life:

**1. Have clear goals.** Dalio's first warning here is about prioritization: you can have virtually anything you want, but not everything you want, and many people fail before they even start by refusing to choose between good alternatives. He also draws a sharp distinction between goals and desires — a goal is something you genuinely need to achieve; a desire (his example: wanting good-tasting but unhealthy food when your goal is fitness) is often the very thing standing between you and your goal. Don't mistake the trappings of success — the expensive car, the recognition — for success itself; people chasing trappings rather than goals are rarely satisfied even when they get them.

**2. Identify and don't tolerate the problems that stand in the way.** Dalio's instruction here cuts against instinct: view painful problems as improvements screaming at you, not as threats to your ego. Most people avoid surfacing problems precisely because doing so exposes their own weaknesses — but acknowledging a weakness is the first step toward overcoming it, not a surrender to it. Critically, **be specific.** "I can't get enough sleep" is not a problem — it's a possible cause of one. The actual problem might be "I'm performing poorly at work," and you can't accurately diagnose that until you've named it precisely rather than naming a symptom next to it.

**3. Diagnose problems to get at their root cause.** Dalio insists on separating "what is" from "what to do about it" — diagnosing thoroughly before jumping to solutions, because premature solution-jumping is one of the most common ways people solve the wrong problem entirely. This step asks specifically *why* a problem exists, not just *what* the problem is — and the two questions require genuinely different thinking, done one at a time rather than blended together.

**4. Design plans that will get you around the problems.** Only once the root cause is genuinely understood does Dalio move to designing a path around it — and he's explicit that the steps must be done in order. Designing solutions before diagnosis is complete leads to fixing symptoms instead of causes.

**5. Push the designs through to results.** The final step is simply execution — doing what's necessary, consistently, to convert the plan into an actual outcome. Dalio frames the whole process as a loop: you push through to results, then look at those results and start the cycle again, ideally setting your goals successively higher each time.

His blunt instruction for the discipline this requires: do each step **one at a time, in order.** When you're setting goals, just set goals — don't simultaneously worry about how you'll achieve them. When you're diagnosing, just diagnose — don't jump to solving. Blurring the steps together, in Dalio's experience, is one of the most reliable ways to arrive at a worse answer than doing them sequentially and rigorously.

## Radical Truth and Radical Transparency

The cultural principle underneath the idea meritocracy is what Dalio calls **radical truth and radical transparency** — an operating norm at Bridgewater where people are expected to say what they really think, even when it's uncomfortable, and where as much information as possible is made visible to as many people as possible, rather than filtered through hierarchy.

Dalio's reasoning is structural, not merely cultural: an idea meritocracy cannot actually function unless disagreements are surfaced openly and resolved through genuine reasoning rather than suppressed out of politeness or deference to seniority. A culture of radical transparency makes it far harder for bad ideas — including the leader's own — to survive simply because no one wanted to be the one to point out the problem.

## Apply This Today

Three concrete moves to start applying Dalio's framework immediately:

1. **Run one real, current challenge through the full 5-Step Process, in writing, in order.** State the goal in one sentence. Identify the specific problem blocking it — not a symptom of the problem, the problem itself. Diagnose its root cause before letting yourself think about solutions at all. Only then design a plan. Only then commit to one specific action this week to push it through.

2. **Find one person who disagrees with your current approach to something important — and seek them out deliberately.** Not to be persuaded automatically, and not to dismiss them automatically, but to genuinely understand their reasoning the way Dalio describes doing after his 1982 mistake. Ask yourself afterward: did weighing their view change how confident you are in your original position?

3. **Audit one decision-making process in your own team or business for radical transparency.** Is there a disagreement currently being smoothed over rather than surfaced and resolved? Dalio's claim is that the discomfort of surfacing it is almost always smaller than the long-term cost of letting a bad idea survive because nobody wanted to be the one to say so.`,
  },
]

// ─── master runner ────────────────────────────────────────────────────────────

async function main() {
  const books: { label: string; data: Summary[] }[] = [
    { label: 'Basic Economics (Day 49)',      data: basicEconomicsSummaries },
    { label: 'The Wealth of Nations (Day 50)', data: wealthOfNationsSummaries },
    { label: 'Principles (Day 51)',            data: principlesSummaries },
  ]

  console.log('\n🚀 Seeding Module 12 — Days 49–51...\n')

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

  console.log('🎉 Module 12 (Days 49–51) seeded successfully!')
}

main().catch(e => {
  console.error('Error seeding database:', e)
  process.exit(1)
})