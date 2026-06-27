// seed-day-37.ts
// Module 08 — Innovation & Entrepreneurship, Book 1 of 3: Zero to One (Peter Thiel)
// Covers Day 37, which must already exist in src/lib/data/daily-plan.ts before running this.
// Run with: npx tsx prisma/seed-day-37.ts
// Uses a fresh PrismaClient + 300ms delay pattern to work around the Supabase
// pgBouncer "prepared statement does not exist" (Postgres 26000) error.

import { PrismaClient } from '@prisma/client'

type Summary = {
  bookId: string
  bookTitle: string
  dayNumber: number
  taskId: string
  title: string
  readTime: string
  content: string
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

const zeroToOneSummaries: Summary[] = [
  {
    bookId: 'zero-to-one',
    bookTitle: 'Zero to One',
    dayNumber: 37,
    taskId: 'd37-t1',
    title: 'Zero to One — Escaping Competition to Build a Monopoly',
    readTime: '9 min read',
    content: `## The Question Nobody Wants to Answer

Peter Thiel likes to ask job candidates one question: "What important truth do very few people agree with you on?" Almost nobody has a good answer, because saying something genuinely contrarian is both intellectually and socially hard. But the business version of that question is the one that actually matters for founders: **what valuable company is nobody building?**

That question is the whole spine of *Zero to One*. Thiel — who co-founded PayPal, made the first outside investment in Facebook, and co-founded Palantir — wrote the book from a course he taught at Stanford. His core claim cuts against almost everything "lean startup" culture preaches: competition doesn't make you better, it destroys value. The companies worth building are the ones that escape competition entirely.

## Two Kinds of Progress

Thiel splits progress into two types. **Horizontal progress** is copying things that work — taking something proven in one place and doing it everywhere else. That's globalization: 1 to n. **Vertical progress** is doing something nobody has done before — going from 0 to 1. That's technology, in the broadest sense: any new and better way of doing things.

Most of what looks like "innovation" today is actually horizontal — the 50th food delivery app, the 30th project management tool with a slightly different UI. Real value creation is vertical: building something where there was nothing.

## Why Competition Is the Enemy, Not the Goal

Here's the idea that reorders everything else in the book: **competition and capitalism are opposites.** Capitalism is premised on accumulating capital — but under perfect competition, profits get competed away to zero. Airlines serve hundreds of millions of passengers and generate hundreds of billions in revenue, but in 2012 they made just 37 cents of profit per passenger trip. Google, by contrast, captured 21% of its revenue as profit — over 100 times the airline industry's margin — because it faced no real competition in search.

This is why Thiel says **"competition is an ideology"** — not an economic fact we're stuck with, but a belief system we've been trained into since grade school, where grades, class rank, and college admissions condition us to fight over the same narrow prizes. The lesson for entrepreneurs: if you want to create and capture lasting value, don't build an undifferentiated commodity business. Find or create a monopoly.

Crucially, Thiel isn't talking about illegal monopolies built on cornering a market through force or government favor. He means a company so good at solving a real problem that nothing else is a meaningful substitute — the way Google so thoroughly out-executed Microsoft and Yahoo! in search that it stopped having real competitors.

## Lies People Tell About Their Market

Companies lie about competition in opposite directions depending on what they're hiding. **Monopolists downplay their dominance** — Google insists it's "just one player in a competitive landscape," framing itself against the entire global advertising market instead of admitting it owns 68% of search, because admitting monopoly invites scrutiny.

**Non-monopolists exaggerate their uniqueness** — describing their market so narrowly that they appear to dominate it by definition. A new British restaurant in Palo Alto might claim "no one else is doing British food here" — true, but irrelevant, because the real market is "restaurants in Palo Alto," and that market is brutally competitive.

The practical lesson: be honest with yourself about how big and how contested your real market actually is. If your story about your market only works because you've drawn the boundary suspiciously narrow, you haven't found a monopoly — you've found a delusion.

## Start Small, Then Scale

The paradox Thiel hammers home: **every startup should start with a very small market.** It's far easier to dominate a tiny, specific niche than to win a fraction of a giant one. PayPal didn't try to serve "everyone who sends money" — it targeted eBay's PowerSellers, a few thousand high-volume sellers who desperately needed a better way to get paid. Within three months, PayPal served 25% of them.

Amazon didn't start as "the everything store" — it started as the largest bookstore, a market it could fully dominate because of its no-inventory model, before deliberately expanding into adjacent categories (music, video, software) one step at a time. The biodiversity metaphor in the company's name was intentional: start in one ecosystem, then expand outward.

The red flag Thiel calls out by name: any entrepreneur who pitches "we just need 1% of a $100 billion market." In practice, a market that large is either already crowded or has no clear point of entry — and if you do somehow grab 1% of it, brutal competition will mean you keep almost none of the profit.

## What a Durable Monopoly Looks Like

Four characteristics tend to show up in companies that can defend their position for years, not months: **proprietary technology** that's at least 10x better than the nearest substitute (not 20% better — genuinely transformative, the kind of gap that makes comparison shopping pointless); **network effects**, where the product gets more valuable as more people use it (which paradoxically means you have to start in a market small enough that the network is still useful with just a few early users); **economies of scale**, where the cost of serving one more customer keeps shrinking; and **branding**, which only works as reinforcement of real substance — Apple's brand means something because of the technology and integration underneath it, not the other way around.

None of these is a checklist to force into your pitch deck. They're lenses for diagnosing whether your business can actually hold its position once it has one.

## The Power Law and the Founder's Paradox

Thiel closes with two ideas that matter beyond Silicon Valley. The **power law**: in venture capital, the single best investment in a fund often returns more than every other investment combined. The implication for any individual career or company: most of the value in any outcome comes from a small number of extreme, asymmetric bets — not from spreading effort evenly across many safe, mediocre ones.

And the **founder's paradox**: the people who build category-defining companies are often unusually distinctive — sometimes to the point of seeming eccentric or extreme. Thiel's point isn't that weirdness is a virtue in itself; it's that founders willing to hold a genuinely contrarian, secret belief about the world — and bet everything on it — are the ones capable of building something that doesn't already exist.

## Apply This Today

1. **Answer the contrarian question for your business.** Write one sentence: "Most people in my industry believe X, but I believe the opposite is true, and here's why." If you can't write that sentence honestly, you may be running a competitive business, not a monopoly-in-progress.
2. **Define your real market — not your flattering one.** Write down the actual competitive set you're fighting in, drawn as broadly and honestly as a skeptical investor would draw it. If your story about your edge only survives when the market is drawn narrowly, that's a warning sign, not a strength.
3. **Find your smallest dominable market.** Identify the narrowest, most specific group of customers you could realistically own completely in the next 6–12 months — even if it feels too small to matter. Plan your first expansion step from there, the way PayPal moved from PowerSellers to all of eBay.
4. **Stress-test your "10x" claim.** Pick your single best differentiator and ask honestly: is this 10x better for the customer, or just incrementally nicer? If it's not a clear order-of-magnitude improvement, decide what would need to change to make it one.`,
  },
]

async function main() {
  console.log('🌱  Seeding Day 37 — Zero to One (Module 08)...\n')

  const db = makeClient()
  await upsertSummaries(db, zeroToOneSummaries)
  await db.$disconnect()

  console.log('\n✅  Day 37 seed complete!')
}

main().catch(e => {
  console.error('Error seeding database:', e)
  process.exit(1)
})