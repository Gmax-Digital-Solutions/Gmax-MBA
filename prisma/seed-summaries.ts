/**
 * seed-module-10.ts
 * -------------------
 * Combined seed file for Module 10 — Corporate Finance & Business Valuation:
 *   Day 43 — Valuation: Measuring and Managing the Value of Companies (McKinsey & Company)
 *   Day 44 — The Outsiders (William Thorndike)
 *   Day 45 — Principles for Navigating Big Debt Crises (Ray Dalio)
 *
 * PREREQUISITE: Days 43-45 must exist in daily-plan.ts before running this.
 * They were inserted directly after Day 42 (Pitch Anything), narrowing the
 * remaining curriculum gap to just Days 46-48 (Module 11 — Venture Capital,
 * M&A & Deal-Making), which is still pending its own book uploads.
 *
 * Run with:
 *   npx tsx prisma/seed-module-10.ts
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

// ─── Book 1: Valuation (Day 43) ───────────────────────────────────────────────
const valuationSummaries = [
  {
    bookId:    'valuation-mckinsey',
    bookTitle: 'Valuation: Measuring and Managing the Value of Companies',
    dayNumber: 43,
    taskId:    'd43-t1',
    title:     'Valuation — The Two Numbers That Actually Drive What a Business Is Worth',
    readTime:  '8 min read',
    content:   `## The Gold-Standard Textbook of Investment Banking

McKinsey's *Valuation* is the book taught in nearly every serious corporate finance program and used inside virtually every investment bank and strategy consultancy in the world. It runs to dozens of dense chapters covering discounted cash flow modeling, cost of capital, multiples, M&A, and leveraged buyouts in granular detail. But underneath all of that complexity sits a small number of genuinely simple ideas — and once you understand them, most of the rest of the book is just careful elaboration of how to apply them correctly.

## The Core Valuation Principle: Just Two Numbers Matter

Strip away every spreadsheet, every discount rate, every adjustment for leases and pensions, and McKinsey's entire framework reduces to this: **the value of any business is driven by how much it grows and the return it earns on the capital invested to fuel that growth.** Everything else in the book — multiples, DCF mechanics, M&A frameworks — is just different lenses for measuring or applying these same two variables.

The key metric for the second variable is **Return on Invested Capital (ROIC)** — net operating profit after tax, divided by the capital invested to generate it. The simplified "value driver formula" the authors derive makes the relationship explicit: a company's value is a function of its NOPAT, its growth rate, its ROIC, and its cost of capital (WACC). Two findings fall directly out of this formula, and both run against common intuition:

**Improving ROIC always increases value, full stop — for any level of growth.** A higher ROIC means the company needs to invest less to generate each additional dollar of growth, which leaves more cash available to shareholders.

**Growth's effect is ambiguous — it depends entirely on whether ROIC exceeds the cost of capital.** When ROIC is comfortably above the cost of capital, faster growth genuinely increases value. But when ROIC sits *below* the cost of capital, growing faster actually *destroys* value, because the company is investing more and more capital into a business that returns less than what that capital actually costs to raise.

## The Treadmill

McKinsey's sharpest illustration of this: when a company's ROIC exactly equals its cost of capital, growth becomes irrelevant to value creation entirely. The authors describe this as being "on a treadmill" — management works hard, growth happens, but the company ends up exactly where it started in terms of value created, no matter how fast it runs. **Growth is not automatically good. Growth is only good when it happens at returns above the cost of capital — otherwise it's just compounding mediocrity faster.**

This directly contradicts a common boardroom assumption: that low-ROIC companies should chase growth because scale will naturally improve their returns over time. The authors are blunt that this is mostly a myth for any company past the early startup stage — in mature businesses, a persistently low ROIC almost always signals a flawed business model or an unattractive industry structure, not a temporary scale problem that more growth will fix.

## The Numbers Prove It, Not Just the Theory

The book backs this with real comparisons that founders will find more useful than the formula alone. At the end of 2022, Skechers and Ralph Lauren traded at the *same* valuation multiple (10x EBITA) despite wildly different growth — Skechers had grown revenue 12% annually over five years, Ralph Lauren only about 1%. The market didn't reward Skechers' faster growth with a higher multiple, because Ralph Lauren's ROIC (23%) nearly doubled Skechers' (12%). The market was pricing returns on capital, not top-line growth.

Rockwell Automation makes the point even more starkly: its revenue actually *shrank* from $13 billion to $7 billion between 1995 and 2021 (after divesting lower-margin divisions), yet it delivered a 15% annual shareholder return — top quartile among industrial companies — almost entirely because it nearly doubled its ROIC, from roughly 12% to 21%, over that period.

## The Conservation of Value — The Single Most Useful Idea for a Founder

If the ROIC/growth relationship is the "what," the **conservation of value principle** is the "how to tell if something is real." Rooted in Nobel Prize–winning work by Modigliani and Miller, the principle states simply: **a company's value changes only when its actual cash flows change — not when its accounting changes, not when its capital structure is rearranged, and not when financial engineering makes a number look better without making the business generate more cash.**

McKinsey applies this lens to several decisions founders and executives face constantly:

**Share buybacks** — a company can mechanically boost earnings-per-share by borrowing money to repurchase shares, since fewer shares means the same (slightly reduced) profit gets divided more ways. McKinsey walks through the exact math: a company that borrows to buy back 10% of its shares can lift EPS by roughly 5% even as its total earnings *fall* — pure arithmetic, no actual value created. The conservation of value principle explains why the market usually isn't fooled: the added debt increases the volatility of future cash flows, investors demand a higher return for that added risk, and the P/E multiple compresses to offset the EPS gain. The lesson: buybacks can be a genuinely good use of capital, but only when they're a sound investment in their own right at a fair price — never simply because they make a per-share number look better.

**Accounting changes** — when stock option expensing rules changed, or when goodwill amortization was eliminated by accounting standard-setters, many executives feared (or hoped) reported profits would move stock prices. They didn't, in either direction, because none of these changes affected the company's actual cash flows. The market had already priced in the economic reality; only the label on the number changed.

**The universal test**: before believing any proposed action creates value — an acquisition, a restructuring, a clever piece of financial engineering — ask specifically *how it increases the size of the actual cash flow pie*, not how it redistributes the existing pie or makes a reported number look more attractive. If you can't point to the tangible mechanism by which cash flow actually grows, McKinsey's blunt verdict: you're looking at an illusion, and the market will eventually see it as one too.

## Apply This Today

Three exercises drawn directly from the book's core principles:

1. **Estimate your business's ROIC.** Even roughly: take your net operating profit after tax and divide it by the capital you have invested in the business (equipment, working capital, any meaningful infrastructure). Compare that number, honestly, to what it costs you to raise capital — whether that's an investor's required return or simply the interest rate on your own debt. Are you meaningfully above that line, sitting right on the McKinsey "treadmill," or below it?

2. **Run your next growth decision through the matrix.** Before chasing the next unit of growth, ask explicitly: at the returns this growth will actually generate, does pursuing it create value or just make the business bigger? Bigger and more valuable are not the same thing — Rockwell Automation got smaller and dramatically more valuable at the same time.

3. **Apply the conservation-of-value test to your next "smart" financial move.** Whether it's a restructuring, a way of presenting your numbers to investors, or a clever capital structure idea someone's pitched you — ask the one question that cuts through all of it: does this change how much actual cash the business generates, or does it just change how the same cash flow looks on paper? If you can't answer that clearly, you likely haven't found real value — just a more attractive-looking illusion of it.`,
  },
]

// ─── Book 2: The Outsiders (Day 44) ────────────────────────────────────────────
const outsidersSummaries = [
  {
    bookId:    'the-outsiders',
    bookTitle: 'The Outsiders',
    dayNumber: 44,
    taskId:    'd44-t1',
    title:     'The Outsiders — The CEOs Who Mastered the Skill Business School Never Teaches',
    readTime:  '8 min read',
    content:   `## A Better Question Than "Who Was the Greatest CEO?"

Ask most people to name the greatest CEO of the last fifty years and they'll say Jack Welch — twenty years running General Electric, a 20.9% compound annual return, turning one dollar invested into $48. William Thorndike's answer: not even close. The actual answer is a man almost nobody has heard of: Henry Singleton, who ran a conglomerate called Teledyne for nearly thirty years and delivered a 20.4% annual return — slightly higher than Welch's, sustained for eight more years, and through multiple severe bear markets that Welch's tenure mostly avoided. A dollar invested with Singleton in 1963 was worth $180 by 1990; the same dollar in the S&P 500 was worth $15.

Thorndike's point isn't really about Singleton specifically — it's about the flawed way the business press, and most of us, measure CEO greatness in the first place. The correct measure isn't growth in revenue or profit, and it isn't charisma or magazine covers. **It's the compound return to shareholders relative to peers and the market, sustained over time.** Once you apply that actual standard, eight deeply unconventional, often publicity-shy CEOs — the "outsiders" of the title — turn out to have radically outperformed the most celebrated executives of their era, using an almost identical playbook that nobody taught them in business school.

## The Skill Nobody Teaches

CEOs need to do exactly two things well: run operations efficiently, and decide what to do with the cash those operations generate. Nearly every management book, business school course, and magazine profile focuses on the first task. The outsider CEOs concentrated overwhelmingly on the second — a discipline called **capital allocation** that Thorndike argues is the single most important and most neglected skill in corporate leadership.

The toolkit is genuinely small: a CEO has five ways to deploy capital (reinvest in operations, acquire other businesses, pay dividends, pay down debt, or repurchase stock) and three ways to raise it (internal cash flow, debt, or equity). Two companies with *identical* operating performance can produce wildly different shareholder outcomes purely based on which of these eight levers their CEO chooses and when. As Warren Buffett observed, the inadequacy of most CEOs at this task isn't surprising — they rose to the top through excellence in marketing, engineering, or operations, then suddenly found themselves responsible for decisions they'd never been trained to make. Buffett's analogy: it's as if a brilliant musician's final career step wasn't performing at Carnegie Hall, but being named Chairman of the Federal Reserve.

The stakes are larger than most executives realize. Buffett's own calculation: a CEO whose company retains earnings equal to 10% of net worth annually will, after just ten years, have personally been responsible for deploying more than 60% of all the capital at work in the entire business.

## Seven Traits Shared by Every Outsider CEO

Thorndike studied eight executives across wildly different industries and eras — broadcasting, conglomerates, cable television, newspapers, packaged foods, cinema, insurance and investing — who had never met each other and operated under completely different circumstances. Independently, they converged on a remarkably consistent set of behaviors.

**1. Always do the math.** Every investment decision generates a calculable return, and the outsider CEOs calculated it themselves, with conservative assumptions, before committing — rather than relying on elaborate spreadsheets built by subordinates or advisors. Many built deliberately simple one-page templates that forced focus on the few variables that actually mattered. At Teledyne, capital discipline was so deeply embedded that, according to COO George Roberts, "very few low-returning proposals are ever presented to us" in the first place — the discipline filtered out bad ideas before they ever reached a decision point.

**2. The denominator matters.** Most executives focus on growing total company value — the numerator — through any available means, including overpaying for acquisitions. The outsiders focused equally hard on the denominator: shares outstanding. They used buybacks not to flatter earnings-per-share or offset stock option grants (today's two most common rationales) but because the repurchases were, on their own merits, an attractive investment of the company's cash relative to every other available use.

**3. Feisty independence.** These CEOs delegated operating decisions aggressively to local managers but never delegated capital allocation. Charlie Munger described their organizational style as "an odd blend of decentralized operations and highly centralized capital allocation." They were also comfortable making major decisions with minimal external input — John Malone showing up alone to face a room of AT&T's lawyers and corporate development staff; Bill Stiritz doing multibillion-dollar acquisition due diligence with a single yellow legal pad; Warren Buffett deciding on an acquisition in a single day without ever visiting the company.

**4. Charisma is overrated.** None of the eight were natural promoters. They skipped earnings guidance, avoided Wall Street conferences, and generally had the "humility" Jim Collins highlighted in *Good to Great*. Their reluctance to court the spotlight meant they were often underappreciated by the financial press relative to flashier peers — right up until their actual returns spoke for themselves.

**5. A crocodile-like patience, with occasional bold action.** Most were willing to wait years — in Dick Smith's case at General Cinema, an entire decade — for a genuinely attractive opportunity, simply sitting out acquisition frenzies that consumed their peers. But when a compelling opportunity did appear, they moved with speed and size that looked almost reckless by comparison: Tom Murphy's acquisition of ABC was larger than his entire existing company; Exxon's 1999 acquisition of Mobil, at historically low oil prices, represented more than half of Exxon's own enterprise value.

**6. A long-term perspective that tolerated short-term pain.** They consciously sacrificed near-term earnings for long-term competitive position — Tom Murphy building an expensive new printing plant, John Malone investing in expensive cutting-edge cable infrastructure years before it paid off, ExxonMobil maintaining exploration spending through the 2008 financial crisis while every other major energy company retrenched.

**7. The consistent, almost mechanical application of rational analysis to decisions of every size.** This is the trait that ties the other six together. As Bill Stiritz's longtime lieutenant Pat Mulcahy put it: "We knew what we needed to focus on. Simple as that." This unglamorous consistency — not genius, not charisma, not even superior strategic vision — is what separated outperformance sustained across decades from the brief hot streaks that most celebrated CEOs eventually give back.

## The Cautionary Counter-Example

Thorndike pairs this with Citigroup's Chuck Prince, who at the height of the mid-2000s credit bubble famously declared, "As long as the music is playing, you've got to get up and dance." Citigroup's stock subsequently collapsed from $40 to under $3. Prince embodied the opposite mindset entirely — swept up in conventional wisdom and what Thorndike calls "the institutional imperative," he danced exactly when the outsider CEOs would have stood quietly at the edge of the floor, and stood frozen exactly when bold, calculated action was warranted. The outsiders' instinct, inverted: zig when peers zag, lean against the wall indefinitely when prices are unattractive, and act with size and conviction only when the math genuinely justifies it.

## Apply This Today

Three exercises drawn directly from the outsider playbook:

1. **List your own capital allocation toolkit.** Reinvestment, acquisition, debt paydown, distributions, buybacks if applicable — which of these have you actually used deliberately, and which have you simply never considered because nobody handed you a framework for evaluating them?

2. **"Always do the math" on your next major decision.** Before committing capital — hiring, equipment, a new line of business — write the expected return on a single page using conservative assumptions, the way the outsider CEOs did. Resist the temptation to build an elaborate model that obscures rather than clarifies the one or two assumptions that actually drive the outcome.

3. **Audit your own "feisty independence."** Where are you currently seeking outside validation — from advisors, peers, or conventional wisdom — for a decision you actually have enough information to make confidently yourself? The outsiders weren't reckless; they were simply willing to trust their own analysis once they'd done it rigorously, rather than outsourcing the final judgment to someone else's comfort level.`,
  },
]

// ─── Book 3: Principles for Navigating Big Debt Crises (Day 45) ───────────────
const bigDebtCrisesSummaries = [
  {
    bookId:    'principles-big-debt-crises',
    bookTitle: 'Principles for Navigating Big Debt Crises',
    dayNumber: 45,
    taskId:    'd45-t1',
    title:     'Principles for Navigating Big Debt Crises — The Four Levers and the Beautiful Deleveraging',
    readTime:  '8 min read',
    content:   `## A 100-Year Pattern Hiding in Plain Sight

Ray Dalio built Bridgewater Associates into the world's largest hedge fund partly on the strength of a single insight: debt crises, despite occurring across wildly different eras, countries, and political systems, follow a remarkably consistent underlying template. Dalio studied dozens of these crises in exhaustive detail — German hyperinflation in the 1920s, the U.S. Great Depression of the 1930s, the 2008 global financial crisis — and found the same basic mechanics playing out each time, simply dressed in the specific details of their moment in history.

The book's case studies — Weimar Germany, Depression-era America, and the 2008 crisis — aren't just historical curiosities. They're worked examples of a small number of universal levers that any government, company, or individual has available when debt becomes unsustainable. Understanding those levers, and the balance between them, is the single most transferable insight in the book.

## The Four Levers of a Debt Crisis

When a debt burden becomes unsustainable — whether for a country, a company, or a household — there are only ever four fundamental ways to close the gap between what's owed and what can actually be paid:

**1. Spend less (austerity).** The most direct lever, and politically the most dangerous. Dalio's account of Weimar Germany's reparations crisis shows exactly why: roughly half of Germany's government revenue was earmarked for reparations payments, meaning any meaningful spending cut had to come from the other half — overwhelmingly essential social services, unemployment relief, and subsidies for basic necessities. With a Communist revolution underway in Russia and far-right nationalism surging domestically, the government judged large spending cuts "politically impossible." Austerity that looks rational on a spreadsheet can be genuinely unworkable in the real political environment a leader actually has to govern within.

**2. Earn more (raise revenue / grow the economy).** Germany's equivalent lever was raising taxes, and it ran into the identical political wall — tax burdens were already pushed to their practical limit by prior reform, and Keynes himself wrote that "the whips and scorpions of any government recorded in history" wouldn't have been sufficient to extract the additional revenue reparations required from a population already that strained.

**3. Redistribute existing wealth (borrow against savings, or default/restructure debt).** Dalio frames a debt crisis as fundamentally the same problem at any scale — an individual, a company, or a nation must either pay from existing savings, borrow more, or default and ask creditors for relief. Germany had essentially no usable foreign reserves (frozen by the Treaty of Versailles), couldn't attract sufficient new foreign lending (other nations were managing their own postwar debt burdens and judged Germany uncreditworthy), and unilateral default was explicitly off the table — it had been threatened with invasion if it didn't pay.

**4. Print money / devalue the currency.** This lever is fundamentally different from the other three because it's only available to an entity that controls its own currency — and it's a double-edged one. Some targeted money printing, used moderately, genuinely helps: it prevents an economic contraction from becoming catastrophic. But unlimited reliance on this single lever, to the exclusion of the others, is how ordinary debt crises become runaway hyperinflations. With the first three levers politically or practically foreclosed, Germany's policymakers leaned on this lever almost exclusively — and Dalio's verdict, looking back, is direct: it was a mistake not to seek a better balance among all four levers, even given how constrained the other three genuinely were.

## Why the Spiral Accelerates

Dalio traces precisely how over-reliance on money printing becomes self-reinforcing. Currency depreciation and inflation triggered capital flight, which created a liquidity crisis; the central bank responded by printing more money and buying debt rather than allowing the economy to contract; that additional printing triggered further currency depreciation, more capital flight, and the cycle accelerated — feeding on itself with each rotation. **The defining feature of the cases that spiral into true hyperinflation isn't that policymakers printed money — virtually every crisis involves some money printing. It's that they never closed the actual gap between income and spending, and instead funded that unclosed gap indefinitely through printing**, long after the point where it was providing relief rather than fueling the spiral further.

## The Beautiful Deleveraging

Not every debt crisis ends in disaster. Dalio's case study of the U.S. recovery from 1933 to 1937 — what he calls a **"beautiful deleveraging"** — shows what successful balance across the four levers actually looks like in practice.

The precise condition for a deleveraging to be "beautiful" rather than catastrophic: **there must be enough stimulation (money printing and currency devaluation, used moderately) to push the nominal economic growth rate above the nominal interest rate** — without using so much stimulation that it spirals into the kind of runaway inflation that consumed Weimar Germany. Get that balance right, and a genuinely depressed economy can rebound with startling speed: in the U.S. case, heavy machinery orders climbed 100% and industrial production rose nearly 50% within months, with durable manufacturing production up 83% between March and July of the recovery period alone. These weren't isolated statistics — they fed on each other, turning a terrible starting position into a self-reinforcing recovery.

The 2008 case study, covered later in the book, shows the same template applied to a modern, more familiar crisis — and the same lesson: **the goal isn't to avoid every lever's downside entirely (that's impossible), it's to combine deflationary and inflationary tools in the right proportion** so neither the deflationary forces (recession, unemployment, debt restructuring) nor the inflationary ones (excessive money printing, currency collapse) are allowed to dominate and spiral unchecked.

## Why This Matters Beyond National Economies

Dalio is explicit that this isn't only a framework for central bankers. A balance-of-payments crisis, he notes, is structurally the same problem an individual, household, or company faces when they can't make a payment — you must spend less, earn more, draw on savings or borrow, or default and seek relief from whoever you owe. The specific levers available and their relative difficulty change with scale and circumstance, but the underlying menu of options, and the same need for balance among them rather than over-reliance on any single one, applies just as directly to a struggling business as to a struggling nation.

## Apply This Today

Three exercises drawing directly on Dalio's framework, scaled down to a business or personal level:

1. **Map your own four levers.** If your business or personal finances faced a genuine debt squeeze right now, where could you realistically: spend less, earn more, draw on savings or arrange new financing, or renegotiate/restructure what's owed? Be specific and honest about which levers are actually available to you versus which only look available on paper.

2. **Identify your "money printing" lever — the one you'd be tempted to over-rely on.** For many businesses, this is taking on more debt, extending more customer credit, or repeatedly delaying a hard decision rather than confronting it. Dalio's lesson is that this lever, used moderately, genuinely helps — but used as a substitute for ever closing the underlying gap, it becomes the mechanism of the spiral rather than the cure for it.

3. **Look for your own version of a "beautiful deleveraging."** If you're navigating any financial strain right now, are you balancing genuine belt-tightening with realistic, moderate use of financing or relief — or are you leaning entirely on one lever (cutting everything, or borrowing your way through) while ignoring the others? Dalio's central claim, true at every scale, is that balance across multiple smaller levers consistently outperforms maximum reliance on any single one.`,
  },
]

// ─── master runner ────────────────────────────────────────────────────────────

async function main() {
  const books: { label: string; data: Summary[] }[] = [
    { label: 'Valuation (Day 43)',                          data: valuationSummaries },
    { label: 'The Outsiders (Day 44)',                       data: outsidersSummaries },
    { label: 'Principles for Navigating Big Debt Crises (Day 45)', data: bigDebtCrisesSummaries },
  ]

  console.log('\n🚀 Seeding Module 10 — Days 43–45...\n')

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

  console.log('🎉 Module 10 (Days 43–45) seeded successfully!')
}

main().catch(e => {
  console.error('Error seeding database:', e)
  process.exit(1)
})