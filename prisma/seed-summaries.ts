import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

const summaries = [
  {
    bookId:    'personal-mba',
    bookTitle: 'The Personal MBA',
    dayNumber: 1,
    taskId:    'd1-t1',
    title:     'The 5 Parts of Every Business & How to Know If Your Market Is Real',
    readTime:  '6 min read',
    content:   `## Every Business Is the Same Five Things

Strip away the complexity, the pitch decks, the investor jargon — every business that has ever worked, from a street food stall to Apple, does exactly five things:

1. **Value Creation** — figures out what people want and builds it
2. **Marketing** — gets people to notice it
3. **Sales** — converts that attention into money
4. **Value Delivery** — actually gives people what was promised
5. **Finance** — makes sure the money coming in is more than what's going out

Remove any single one of these and you don't have a business. You have a project, a charity, a scam, or a money pit. This is your first diagnostic tool — whenever a business is struggling, it's always breaking down in one of these five areas.

## The Iron Law of the Market

Here's the uncomfortable truth most founders learn the hard way: **your product does not matter if the market doesn't exist.**

Dean Kamen spent over $100 million building the Segway. The technology worked. The design was brilliant. Nobody bought it. Five years in, they had sold 23,000 units — less than 10% of their projections. The market for $5,000 electric scooters simply wasn't there.

The market always wins. A great team building the wrong thing loses to a mediocre team building something people desperately need. Before you invest another hour, ask: is there a large, reachable group of people who already want what I'm building?

## What Humans Actually Buy

All purchasing decisions connect to one of five core drives:

- **Acquire** — wealth, status, power, influence
- **Bond** — love, belonging, relationships, being liked
- **Learn** — knowledge, skills, competence, curiosity satisfied
- **Defend** — safety, protection, removing threats, peace of mind
- **Feel** — pleasure, excitement, entertainment, anticipation

Every successful business is selling a promise connected to one or more of these. The more drives your offer touches, the more compelling it becomes.

## The 10-Point Market Scorecard

Before building anything, score your market idea on these 10 factors (0–10 each):

| Factor | What to Ask |
|---|---|
| **Urgency** | How badly do they need this right now? |
| **Market Size** | How many people have this problem? |
| **Pricing Potential** | What's the max a buyer would pay? |
| **Acquisition Cost** | How hard is it to reach a customer? |
| **Delivery Cost** | How expensive is it to fulfil the promise? |
| **Uniqueness** | How easy are you to copy? |
| **Speed to Market** | How fast can you launch? |
| **Up-front Investment** | How much do you need before first sale? |
| **Upsell Potential** | Can you sell them more over time? |
| **Evergreen Potential** | Does it sell without constant effort? |

**Score under 50:** Walk away. **Score 50–75:** Viable but hard work. **Score above 75:** Move fast.

## Apply This Today

Take your current product, service, or side project and map it to the 5 parts of every business. Write one sentence for each. Where are the gaps? Which part is weakest right now? That's where to focus this week.`,
  },
  {
    bookId:    'personal-mba',
    bookTitle: 'The Personal MBA',
    dayNumber: 2,
    taskId:    'd2-t1',
    title:     'The 12 Forms of Value — What Are You Actually Selling?',
    readTime:  '6 min read',
    content:   `## You Are Not Selling a Product. You Are Selling a Form of Value.

Most founders think of their business as "I sell X." But X is just the container. What you're actually selling is a specific *type of value* — and understanding which type you're in changes how you price, market, and scale.

There are 12 distinct forms of value:

**1. Product** — a tangible object (app, physical good, template). Create it once, sell it many times.

**2. Service** — you do something on behalf of someone else. Trading time for money. Scales poorly unless you systematise.

**3. Shared Resource** — give many people access to one thing (a SaaS platform, a gym). Build once, sell access repeatedly.

**4. Subscription** — predictable recurring access. The holy grail for cash flow. Works best when value compounds over time.

**5. Resale** — buy low, sell higher. You're not creating the value — you're making it more accessible.

**6. Lease** — let someone use an asset for a period. You retain ownership while monetising the utility.

**7. Agency** — connect buyers and sellers and take a cut. Marketplaces, brokerages, referral businesses.

**8. Audience Aggregation** — build an audience, then sell access to it. Newsletters, podcasts, media businesses.

**9. Loan** — lend money or assets in exchange for return plus interest.

**10. Option** — sell the right (not obligation) to take a future action. Deposits, reservations, early access.

**11. Insurance** — take on risk in exchange for payment.

**12. Capital** — invest money in exchange for equity or future returns.

## Why This Matters Right Now

Most early-stage builders default to **Service** because it has the lowest barrier to entry. The problem is services are almost impossible to scale without burning yourself out.

The transition that changes everything: **Service → Product** or **Service → Subscription**.

Every successful software company is built on **Shared Resource** (one codebase, many users) combined with **Subscription** (recurring revenue). That's the model that creates enterprise value.

## Perceived Value vs. Actual Cost

Price is anchored to *perceived* value, not your cost to deliver. A logo designed in 2 hours can sell for $5,000 if the buyer believes it will transform their brand.

**Always think about what the buyer compares you to** — not your cost, but the alternative they'd otherwise pay for (or live without).

## The Iteration Cycle

Don't wait until you've built the perfect thing. The cycle is:

**Idea → Build → Test → Feedback → Improve → Repeat**

The faster you move through this loop, the faster you find what actually works.

## Apply This Today

Look at your current offer. Which of the 12 forms of value are you actually selling? Now ask: is there a higher-leverage form of the same value you could shift to? Can a service become a product? Can a product become a subscription?`,
  },
  {
    bookId:    'personal-mba',
    bookTitle: 'The Personal MBA',
    dayNumber: 3,
    taskId:    'd3-t1',
    title:     'Marketing — Getting Noticed Without a Budget',
    readTime:  '6 min read',
    content:   `## Marketing Is Not Advertising

For a solo founder or small team, marketing is one thing: **getting the right people to notice you, care about what you do, and trust you enough to give it a shot.**

You do not need a marketing budget. You need clarity.

## Step 1: Attention (Without Paying For It)

You cannot market to someone who isn't paying attention. Two filters determine whether someone will pay attention:

- **Receptivity** — people only absorb messages they're already open to. Match your message to the mental state of your prospect at the exact moment they encounter it.
- **Remarkability** — is your offer interesting enough to be worth sharing? If describing your offer doesn't make people say "that's interesting" — go back and sharpen it.

## Step 2: Know Your Probable Purchaser

The biggest marketing mistake is trying to talk to everyone. "Everyone" is no one.

A Probable Purchaser is the specific person most likely to buy — right now, today, without a lot of convincing. They already have the problem. They're already looking for a solution. They have the budget and authority to say yes.

Describe them precisely: their role, their biggest frustration, the exact words they use when complaining about the problem you solve.

## Step 3: Levels of Awareness

Not everyone is ready to buy. There are five levels:

1. **Unaware** — doesn't know they have the problem
2. **Problem-aware** — knows the pain, doesn't know solutions exist
3. **Solution-aware** — knows solutions exist, hasn't found yours
4. **Product-aware** — knows you exist, hasn't committed
5. **Most Aware** — knows you and is almost ready to buy

Your marketing needs a different message for each level. Talking to a Level 1 audience about features is wasted effort.

## Step 4: From Interest to Desire

- **Visualisation** — help them vividly imagine the outcome. Not "saves time" but "picture never chasing a late invoice again."
- **Framing** — "$100/month" feels expensive. "$3.33/day — less than a coffee" feels trivial. Same price, very different perception.
- **Demonstration** — let people experience the value before they pay. Free trials, demos, detailed case studies. Showing beats telling every time.

## Step 5: Trust and Reputation

In the age of infinite options, trust is the ultimate competitive advantage. Trust is built by:
- Consistently delivering what you promise
- Being transparent about limitations
- Publishing evidence (results, testimonials, case studies)
- Showing up regularly where your audience already is

Reputation compounds. One person who trusts you tells five. This is the only sustainable marketing strategy for a solo founder.

## Apply This Today

Write one sentence: who is your Probable Purchaser, and what is the exact outcome they want? If it takes more than one sentence, you haven't found it yet. This becomes the foundation of every piece of marketing you produce.`,
  },
  {
    bookId:    'personal-mba',
    bookTitle: 'The Personal MBA',
    dayNumber: 4,
    taskId:    'd4-t1',
    title:     'Sales — Helping People Make Good Decisions',
    readTime:  '6 min read',
    content:   `## Reframe What Sales Actually Is

Most engineers hate the idea of "selling." They associate it with manipulation and pressure.

Here's the reframe: **sales is the process of helping people who have a problem find the solution that's right for them.** If your product genuinely solves their problem, selling is a service. If it doesn't, no sales technique will save you.

## The Foundation: Trust

Nothing happens without trust. The buyer is risking their money and reputation on your promise. They will only do this if they trust you can deliver.

Build trust before the sale through:
- Consistent content that demonstrates expertise
- Social proof — who else trusted you and what happened
- Transparency — admitting what you're not good at actually builds credibility
- Common Ground — finding genuine shared context before trying to sell

## Value-Based Selling

Nobody buys features. They buy outcomes.

Value-based selling means anchoring the conversation to **what the buyer's world looks like after** the problem is solved. When you frame a $500/month tool as "you'll close two additional deals a month that you're currently losing," the conversation shifts from "is this expensive?" to "when can we start?"

## The Three Universal Currencies

Every buyer weighs three things:

1. **Time** — how long to implement and see results?
2. **Money** — total cost including switching costs and effort?
3. **Flexibility** — what are they giving up by committing?

Understanding which currency your buyer values most lets you structure your offer accordingly.

## Five Barriers to Purchase

When someone doesn't buy, they're hitting one of these:

1. **It costs too much** — they don't see enough value. Go back to value-based framing.
2. **It won't work for me** — they doubt the outcome applies to them. Use more specific case studies.
3. **I don't believe you** — lack of trust. More social proof, more transparency.
4. **I don't need it right now** — low urgency. Help them calculate the cost of waiting.
5. **I can't justify it** — they need internal approval. Give them the language to make the case.

Most sales collapse because founders try to push through instead of understanding *which* barrier they're actually hitting.

## Risk Reversal

The single highest-leverage sales tool: **remove the risk from the buyer.**

A money-back guarantee, a free trial, or a pilot project at reduced commitment shifts risk from buyer to seller. When you believe in your product enough to absorb the risk, buyers believe in it too.

## Reactivation

The easiest sale is always to a past customer. Someone who has bought from you once has already cleared every trust hurdle. Staying in contact with past customers and proactively offering them relevant solutions costs almost nothing and converts at rates new customer acquisition never matches.

## Apply This Today

Think about the last three potential customers who didn't buy. Which specific barrier stopped them? Was it price, belief, trust, urgency, or internal approval? Identify the most common one — that's the single thing to fix in your sales process this week.`,
  },
  {
    bookId:    'personal-mba',
    bookTitle: 'The Personal MBA',
    dayNumber: 5,
    taskId:    'd5-t1',
    title:     'Value Delivery & Finance — Building the Machine That Keeps Running',
    readTime:  '7 min read',
    content:   `## Value Delivery: The Part Everyone Underestimates

Most founders obsess over building the product and getting the sale. Value delivery — actually giving customers what you promised, reliably, at scale — is the part that determines whether your business survives year two.

**The experience of receiving value is the product.** A customer who gets exactly what was promised becomes an evangelist. A customer who gets something different — even if technically better — becomes a complaint and a warning.

## The Value Stream

Your value stream is every step between someone paying you and them receiving the value. Map it:

**Payment → Onboarding → First result → Ongoing delivery → Support**

Every step is an opportunity to delight or disappoint. The first question: which step has the most friction? That's where to spend your next sprint.

## Duplication, Multiplication, and Scale

Three concepts that separate businesses that grow from businesses that plateau:

- **Duplication** — doing the same thing twice exactly. The second time should be cheaper and faster. If it isn't, you don't have a repeatable process yet.
- **Multiplication** — taking something that works in one place and replicating it simultaneously (franchise model, software deployed to 1,000 users at once).
- **Scale** — handling 10x the volume without 10x the cost. Software scales. People do not.

If you want a business that doesn't require you to personally deliver every unit of value, you must systematise. Document every process, automate what can be automated, delegate what cannot.

## Finance: The Only Scoreboard That Matters

You can have great product, great marketing, loyal customers — and still go bankrupt.

### Profit Is Not Revenue

- **Revenue** — money received
- **Cost of Goods Sold (COGS)** — direct cost to deliver
- **Gross Profit** = Revenue − COGS
- **Operating Expenses** — tools, salaries, rent
- **Net Profit** = Gross Profit − Operating Expenses

Many businesses with impressive revenue are quietly losing money every month.

### The 4 Ways to Increase Revenue

There are only four levers:

1. **More customers** — most expensive growth lever
2. **Higher average transaction value** — better packages, upsells
3. **Higher purchase frequency** — retention, subscriptions
4. **Higher prices** — the most underused lever; most founders charge too little

Most founders default to option 1 and ignore 2, 3, and 4. Increasing what existing customers spend is almost always faster and cheaper than acquiring new ones.

### Lifetime Value (LTV) — The Number You Must Know

LTV is the total revenue a single customer generates over the entire relationship.

A customer who pays $50/month and stays 24 months has an LTV of $1,200. If it costs $200 to acquire that customer, you have a viable business. If acquisition costs $1,500, you have an expensive hobby.

### Breakeven

**Breakeven = Fixed Costs ÷ Gross Margin**

If your monthly fixed costs are $5,000 and your gross margin is 50%, you need $10,000/month to break even. Every founder should know this number without looking it up.

## Apply This Today

Calculate your LTV for your best customer. Then calculate what it cost to acquire them (time, ads, referrals). Is LTV greater than acquisition cost? If you don't know these numbers, finding them is your most important task this week — everything else in your business depends on this ratio.`,
  },
]

async function seedPersonalMBA() {
  console.log('Seeding Personal MBA summaries...')
  for (const s of summaries) {
    await db.bookSummary.upsert({
      where:  { dayNumber_taskId: { dayNumber: s.dayNumber, taskId: s.taskId } },
      update: { title: s.title, content: s.content, readTime: s.readTime },
      create: s,
    })
    console.log(`✓ Day ${s.dayNumber}: ${s.title.slice(0, 50)}...`)
  }
  console.log('\n✅ Personal MBA summaries seeded!')
}

// ── THINKING IN SYSTEMS ────────────────────────────────────────────────────

const tisSummaries = [
  {
    bookId:    'thinking-in-systems',
    bookTitle: 'Thinking in Systems',
    dayNumber: 6,
    taskId:    'd6-t1',
    title:     'The Basics — How System Structure Drives Everything',
    readTime:  '7 min read',
    content:   `## Your Business Is a System. Start Seeing It That Way.

Most founders fight fires. They fix the symptom that's burning right now — a churn spike, a conversion drop, a hiring bottleneck — without realising these are outputs of an underlying structure. Donella Meadows' central insight is this: **the structure of a system determines its behaviour.** If you want different behaviour, you have to change the structure — not just push harder on the current one.

## What a System Actually Is

A system is not just a collection of parts. It has three components:

- **Elements** — the visible, tangible pieces (people, inventory, cash, customers, code)
- **Interconnections** — the relationships and information flows that hold elements together
- **Function or Purpose** — what the system actually does (not what you say it does — what it *does*)

Here's the uncomfortable truth: **the purpose of a system is revealed by its behaviour, not its stated goals.** If your company says it values customer success but consistently ships features over fixing bugs, the system's real purpose is feature output. The gap between stated purpose and actual behaviour is one of the most diagnostic things you can observe about any organisation.

## Stocks: Where Value Accumulates

A **stock** is any measurable quantity that accumulates or depletes over time:

- Cash in the bank
- Customers in your pipeline
- Technical debt in your codebase
- Trust in your brand
- Skills on your team

Stocks change slowly. You cannot instantly fill a pipeline, build a reputation, or drain technical debt overnight. This is why systems resist fast change — **stocks create inertia.** Understanding your key stocks tells you where your constraints actually live.

## Flows: What Changes Stocks

**Flows** are the rates that increase (inflows) or decrease (outflows) a stock:

| Stock | Inflow | Outflow |
|---|---|---|
| Customers | New signups | Churn |
| Cash | Revenue | Expenses |
| Team skill | Learning, hiring | Turnover, forgetting |
| Brand trust | Good experiences | Failures, bad press |

The critical insight: **inflows and outflows are independent.** You can have high revenue (inflow) and still run out of cash if expenses (outflow) are higher. You can hire fast and still shrink your team if attrition is faster. Never look at one side of a flow in isolation.

## Feedback Loops: Why Systems Behave the Way They Do

A **feedback loop** exists when a change in a stock affects the flows that change that stock. There are two types:

### Reinforcing Loops (R) — Engines of Growth and Collapse

Reinforcing loops amplify change. More leads → more sales → more revenue → more marketing budget → more leads. This is the virtuous cycle. But reinforcing loops also run in reverse: fewer customers → less revenue → less team → worse product → fewer customers. The same structure that creates hypergrowth creates death spirals.

**Every startup is trying to find and activate a reinforcing loop.** The ones that survive are the ones whose reinforcing loop kicks in before they run out of runway.

### Balancing Loops (B) — The Invisible Hand Pushing Back

Balancing loops resist change and push systems toward a goal or equilibrium. They're why growth always slows, why costs always expand to meet revenue, and why you hire to fix a capacity problem and then have a management problem.

When a system keeps returning to the same outcome despite your interventions — you keep hitting the same revenue ceiling, the same team dysfunction, the same churn rate — a balancing loop is at work. You are pushing against a structure that is designed to maintain the status quo.

## The Most Important Insight: Delays

Systems don't respond instantly. There is always a **delay** between an action and its effect. This is why:

- You cut marketing spend and sales look fine — for three months. Then the pipeline is empty.
- You over-hire to fix a delivery problem and end up with coordination overhead that slows delivery further.
- You fix a bug that caused churn and NPS improves — six weeks later.

Delays cause founders to either give up on good strategies too early or keep doubling down on bad ones too long. **When you understand delays, you stop reacting to noise and start acting on signal.**

## Apply This Today

Draw your business as a system. Pick your most important stock (probably customers or cash). Identify the two or three flows that most directly affect it. Then ask: what feedback loops are currently active? Which reinforcing loop are you trying to build? Which balancing loops are working against you right now?`,
  },
  {
    bookId:    'thinking-in-systems',
    bookTitle: 'Thinking in Systems',
    dayNumber: 8,
    taskId:    'd8-t1',
    title:     'The Systems Zoo — Recognising the Patterns Behind Every Business Problem',
    readTime:  '7 min read',
    content:   `## Every Business Problem Has Already Happened Before

Chapter 2 of Thinking in Systems makes a powerful argument: despite the infinite variety of businesses, markets, and organisations, the underlying system structures that cause their problems repeat. Once you learn to recognise the archetypes — what Meadows calls the Systems Zoo — you stop being surprised by business behaviour and start predicting it.

## One-Stock Systems: The Foundation

The simplest systems have one stock regulated by balancing and reinforcing loops. These produce three fundamental behaviours:

### 1. Growth (Reinforcing Loop Dominates)
One reinforcing loop unconstrained: exponential growth. Compound interest, viral user growth, word-of-mouth referrals. Beautiful while it lasts. Nothing grows exponentially forever — a balancing loop or constraint always eventually kicks in.

### 2. Goal-Seeking (Balancing Loop Dominates)
The system has a goal and keeps trying to reach it. A thermostat seeking room temperature. A company trying to hit quarterly targets. A team trying to maintain a deployment cadence. These systems are stable but slow — they resist both improvement and deterioration.

### 3. Oscillation (Balancing Loop with Delay)
The most common business pathology. A balancing loop with a significant delay causes the system to overshoot and undershoot repeatedly:

- You under-hire → delivery suffers → you over-hire → coordination breaks down → you over-fire → delivery suffers again
- You under-invest in marketing → pipeline dries up → you over-invest → sales team is overwhelmed → quality drops
- Inventory swings in supply chains — the classic "bullwhip effect"

**Oscillation is not randomness. It is a predictable consequence of a balancing loop with a long delay.** The fix is never to push harder in either direction — it is to shorten the delay or reduce the correction size.

## Two-Stock Systems: Where Real Complexity Lives

Most business problems involve two interacting stocks. Here are the patterns that matter:

### Renewable Stock + Nonrenewable Stock
A production system that depletes a finite resource. Your founding team's energy is nonrenewable in the short term. Your market's early adopters are nonrenewable. Your VC runway is nonrenewable.

The pattern: rapid growth in the renewable stock (revenue, team size, users) while the nonrenewable stock (runway, founder energy, market patience) depletes. Systems like this always end the same way — collapse — unless the renewable stock can generate enough return before the nonrenewable one runs out.

**This is literally the structure of every venture-backed startup.** You're trying to build a self-sustaining reinforcing loop (product-market fit → revenue → growth) before the nonrenewable stock (runway) hits zero.

### Predator-Prey Dynamics
Two stocks that regulate each other. Classic examples:
- Salespeople (predators) and leads (prey) — too many salespeople exhaust leads, leads recover, cycle repeats
- Features (complexity) and developer productivity — more features → more complexity → slower shipping → backlog grows
- Price increases (predator) and customers (prey) — push prices too hard, customers leave, market shrinks

The insight: **both stocks need each other to survive.** If you aggressively harvest one, you destroy the conditions for the other. Founders who extract maximum value from customers in the short term destroy the customer base they need for the long term.

## The Key Lesson: Systems Cause Their Own Behaviour

This is Meadows' most important point in Chapter 2: **the system generates its own behaviour.** External events don't cause your oscillating sales cycles, your recurring team dysfunction, or your feast-and-famine cash flow. The structure of your system does.

This means blaming people is almost always wrong. The salesperson who keeps over-promising isn't the problem — the incentive structure that rewards closed deals over customer success is. The engineer who cuts corners isn't the problem — the deployment pressure created by unrealistic timelines is.

When you see a persistent problem in your business, ask: what system structure is generating this? That question leads to real solutions. Blaming the person in the loop leads to nothing changing.

## Three Questions to Apply Right Now

1. **What is your most important reinforcing loop?** If it's not activated yet, why not? What's blocking it?
2. **Where are your biggest delays?** Between action and feedback — in your sales cycle, product cycle, hiring cycle?
3. **Where do you see oscillation?** Hiring-firing cycles, over/under-investment patterns, feast-and-famine revenue? That's a balancing loop with a delay. Don't push harder — shorten the delay.

## Apply This Today

Look at your biggest recurring business problem — the one that keeps coming back no matter what you do. Draw it as a system: what are the stocks, flows, and feedback loops? Where is the delay? You will almost certainly find that the solution is not "try harder" but "change the structure."`,
  },
]

async function seedTIS() {
  console.log('\nSeeding Thinking in Systems summaries...')
  for (const s of tisSummaries) {
    await db.bookSummary.upsert({
      where:  { dayNumber_taskId: { dayNumber: s.dayNumber, taskId: s.taskId } },
      update: { title: s.title, content: s.content, readTime: s.readTime },
      create: s,
    })
    console.log(`✓ Day ${s.dayNumber}: ${s.title.slice(0, 50)}...`)
  }
  console.log('✅ Thinking in Systems summaries seeded!')
}

// ── POOR CHARLIE'S ALMANACK ───────────────────────────────────────────────

const pcaSummaries = [
  {
    bookId:    'poor-charlies-almanack',
    bookTitle: "Poor Charlie's Almanack",
    dayNumber: 9,
    taskId:    'd9-t1',
    title:     "Munger's Mental Models — The Latticework That Makes You Dangerous",
    readTime:  '7 min read',
    content:   `## Why Smart People Keep Making the Same Mistakes

Charlie Munger has one core argument that he's made in every speech for 50 years: **the specialist is dangerous.** An accountant who only thinks like an accountant, a marketer who only thinks like a marketer, an engineer who only thinks like an engineer — they will all, predictably, make the same category of mistake over and over because their single-discipline lens cannot see what lies outside it.

The antidote is what Munger calls a **latticework of mental models** — a collection of the most powerful ideas from across every major discipline, held together so they can be applied simultaneously to any problem.

> *"You must know the big ideas in the big disciplines and use them routinely — all of them, not just a few. Most people are trained in one model — economics, for instance — and try to solve all problems in one way. You know the old saying: to the man with a hammer, every problem looks like a nail."*

## The Most Important Mental Models for Founders

### 1. Inversion — Always Invert

This is Munger's most cited technique and the most underused by founders.

Instead of asking "how do I make this business succeed?" ask: **"what would guarantee this business fails?"** Then avoid doing those things.

Instead of "how do I get more customers?" ask: "what makes customers leave and never come back?" 

Inversion forces you to confront uncomfortable truths your forward-thinking optimism would have skipped. Most startup failures are predictable in hindsight — a founder who had inverted their assumptions at the start would have seen them coming.

**Apply it:** Write down 10 ways your current strategy could catastrophically fail. That list is your real risk register.

### 2. Opportunity Cost — The Decision You're Actually Making

Every decision is not just a choice between options — it's a choice between what you pick and the best alternative you're giving up.

Munger and Buffett famously passed on buying Walmart stock because it had moved up a few percent from where they first noticed it. That "missed" saving cost them $10 billion. They acknowledge this openly: **mistakes of omission are invisible, which is why most people don't pay attention to them.**

For founders, opportunity cost shows up constantly:
- Spending six months building a feature vs. talking to 100 customers
- Hiring a generalist vs. a specialist for a critical role  
- Raising a round now vs. waiting for better terms

The question is never "should I do X?" — it's always "should I do X instead of the best thing I could do with those same resources?"

### 3. Circle of Competence — Know What You Don't Know

Every person has a circle of competence — domains where they genuinely understand the mechanics, not just the surface. The size of that circle is less important than knowing its edges precisely.

Most catastrophic business decisions happen when founders operate confidently outside their circle of competence without realising it. A technical founder building sales processes. An operator making investment decisions. A solo founder hiring for a culture they've never managed.

**Munger's rule:** You don't need a large circle. You need to know exactly where the boundaries are, and either stay inside them or explicitly acknowledge when you're operating outside.

### 4. The Lollapalooza Effect — When Forces Combine

This is Munger's term for when multiple mental models or forces all point in the same direction simultaneously. The results are not additive — they are explosive, like a critical mass in physics.

This explains why some businesses grow seemingly out of nowhere and why some failures accelerate suddenly. It's rarely one thing — it's three or four reinforcing factors hitting at the same time.

Understanding lollapalooza works both offensively and defensively:
- **Offensive:** Design your business so multiple growth forces align simultaneously (network effects + switching costs + brand trust = near-unassailable position)
- **Defensive:** When you see a business collapsing fast, look for the combination of factors creating the cascade — not the single proximate cause everyone blames

### 5. First Principles + Compound Learning

Munger attributes almost everything to reading. Not casual reading — voracious, cross-disciplinary, relentless reading applied with a "why, why, why?" interrogation.

The mental models are not memorised facts. They are internalised structures that change how you see the world. When a biologist reads history, they see evolutionary pressures. When an economist reads psychology, they see incentive structures. **The goal is to build so many lenses that no problem can be fully opaque to you.**

> *"Develop into a lifelong self-learner through voracious reading; cultivate curiosity and strive to become a little wiser every day."*

## The Three-Model Exercise (Your Task Today)

Pick any three of these models:
- Inversion
- Opportunity Cost  
- Circle of Competence
- First Principles
- Lollapalooza Effect

For each one, write a single sentence applying it to your current business or project. Not abstractly — specifically. "Applying inversion to our pricing means asking: what prices would cause our best customers to leave immediately?"

That exercise, done honestly, will surface more strategic clarity in 20 minutes than most founder retreats deliver in two days.

## Apply This Today

Identify the single biggest decision you're facing in your business right now. Apply inversion to it: what is the most likely way this decision leads to a bad outcome? Now apply opportunity cost: what is the best thing you could do instead? The gap between those two analyses is your decision.`,
  },
  {
    bookId:    'poor-charlies-almanack',
    bookTitle: "Poor Charlie's Almanack",
    dayNumber: 10,
    taskId:    'd10-t1',
    title:     'The Psychology of Human Misjudgment — 25 Bugs in Every Human Brain',
    readTime:  '8 min read',
    content:   `## Your Brain Is Not Your Friend

This is one of the most important pieces of writing in business literature and almost nobody treats it that way. In "The Psychology of Human Misjudgment," Munger catalogues 25 hardwired cognitive tendencies that cause smart, well-intentioned people to make consistently terrible decisions.

These are not personality flaws. They are **evolutionary features** — instincts that were genuinely useful for survival on the African savanna that are now liabilities in a modern business environment.

Understanding them does not make you immune. But it makes you significantly less likely to be blindsided by them.

## The 10 That Will Most Affect Your Business

### 1. Reward and Punishment Superresponse Tendency
**The bug:** People respond to incentives far more powerfully than to instructions, beliefs, or culture.

Munger's most cited example: FedEx couldn't get their night shift to finish loading planes on time — until they changed from hourly pay to shift pay (go home when done). Problem solved overnight. The people hadn't changed. The incentive had.

**For founders:** Your team is doing exactly what your incentive structure tells them to do. If you don't like the behaviour, look at the incentives first. What does your compensation structure actually reward? What does your promotion process signal? The answers are usually uncomfortable.

### 2. Liking/Loving Tendency
**The bug:** We grant excessive credit, forgive faults, and distort facts in favour of people and things we like or love.

This is why founders overpay for acquisitions of companies they admire. Why they keep underperforming founding team members too long. Why they fall in love with their own product's elegance and miss the user's actual experience.

**For founders:** Build explicit processes that force you to evaluate people and decisions on objective criteria — especially when you already have a strong positive feeling. The stronger the liking, the more important the process.

### 3. Doubt-Avoidance Tendency
**The bug:** The brain is wired to resolve uncertainty quickly, often by arriving at a confident conclusion before having enough information.

Humans are deeply uncomfortable with ambiguity. We rush to a decision — any decision — to escape the discomfort of not knowing. This is why founders commit to a go-to-market strategy after two customer conversations. Why they hire the first "good enough" candidate rather than the right one.

**For founders:** Learn to sit with uncertainty longer than feels comfortable. The best decisions often require gathering more signal than your brain wants to wait for.

### 4. Inconsistency-Avoidance Tendency (Commitment Bias)
**The bug:** Once committed to a belief or course of action, the brain actively resists changing it — even when new evidence demands change.

This is the sunk cost fallacy's cognitive root. It's why founders keep investing in a strategy that isn't working ("we've come this far"). Why they defend architectural decisions long after they know they were wrong. Why pivoting feels like failure rather than intelligence.

**For founders:** Treat your current strategy as a hypothesis, not an identity. When evidence contradicts it, updating is not weakness — it is the entire point.

### 5. Social Proof Tendency
**The bug:** When uncertain, humans default to copying the behaviour of others — especially others in their peer group.

This creates cascades. Everyone follows the same VCs, pursues the same distribution channels, adopts the same pricing models, and copies the same product features — because everyone else is doing it. Markets become crowded precisely in the areas where social proof is strongest.

**For founders:** The places where social proof is weakest — the ideas that seem weird, the markets that seem too small, the approaches that seem naive — are exactly where genuine advantage lives.

### 6. Availability-Misweighing Tendency
**The bug:** We overweight information that is easy to recall and underweight information that is hard to access, regardless of actual frequency or importance.

A single dramatic customer complaint feels more significant than 50 quiet churns. A viral story about a competitor's failure shapes strategy more than a decade of base rate data. A recent fundraising success makes the market feel easier than it is.

**For founders:** Deliberately seek out base rates and systematic data. Ask: "is this memorable because it's important, or important because it's memorable?"

### 7. Authority-Misinfluence Tendency
**The bug:** We over-defer to authority figures — titles, credentials, confident posture — even when their domain expertise doesn't apply.

A famous investor's opinion on your go-to-market strategy. An Ivy League MBA's advice on a market they've never operated in. Your most senior employee's strong view on a technical decision outside their expertise.

**For founders:** Titles are proxies for past performance in specific contexts. Always ask: "does this person's authority actually extend to this specific question?"

### 8. The Lollapalooza of Bias — When They Combine

The most dangerous situations are when multiple tendencies fire simultaneously and in the same direction. Munger calls this the lollapalooza effect applied to psychology.

A classic startup example: a founder loves their product *(Liking Tendency)*, has already announced it publicly *(Commitment Bias)*, all their peers are building in the same space *(Social Proof)*, and a well-known investor has praised it *(Authority Misinfluence)*. The result: they march confidently toward a market that doesn't exist, and every piece of incoming information gets distorted to confirm the narrative.

**This is not stupidity. This is human hardware running as designed.**

## The Practical Checklist

Munger's solution is a pre-mortem checklist: before any major decision, run through the relevant tendencies and ask which ones might be distorting your thinking right now.

For business decisions specifically, always check:
- Am I doing this because the incentives favour it, or because it's right?
- Am I keeping this person/strategy/product because I love it, or because it's working?
- Am I rushing to a conclusion to escape discomfort?
- Am I copying competitors because they're right, or because everyone else is?
- Whose authority am I deferring to, and does their expertise actually apply here?

## Apply This Today

Identify the biggest decision you've made in the last 90 days that you're now uncertain about. Run it through the checklist above. Which tendencies were most active when you made it? What would you do differently with that awareness?`,
  },
]

async function seedPCA() {
  console.log('\nSeeding Poor Charlie\'s Almanack summaries...')
  for (const s of pcaSummaries) {
    await db.bookSummary.upsert({
      where:  { dayNumber_taskId: { dayNumber: s.dayNumber, taskId: s.taskId } },
      update: { title: s.title, content: s.content, readTime: s.readTime },
      create: s,
    })
    console.log(`✓ Day ${s.dayNumber}: ${s.title.slice(0, 55)}...`)
  }
  console.log("✅ Poor Charlie's Almanack summaries seeded!")
}

// ── Financial Intelligence ───────────────────────────────────────────────

const fiSummaries = [
  {
    bookId:    'financial-intelligence',
    bookTitle: 'Financial Intelligence',
    dayNumber: 11,
    taskId:    'd11-t1',
    title:     'Finance Is an Art, Not Just Numbers',
    readTime:  '6 min read',
    content:   `## The Dirty Secret Nobody Tells You

Every financial statement you will ever read is, to some degree, a work of art.

Not because anyone is lying — though some do. But because accounting is built on estimates, assumptions, and judgments. When a company reports a profit of $10 million, that number reflects dozens of decisions made by accountants: How long will this machine last? When do we count that sale as real? How much of that bad debt will we actually collect?

Those decisions are not random — they follow rules. But the rules allow room. Berman and Knight call this **the art of finance**, and understanding it is the first step toward real financial intelligence.

## The Three Statements and What They're Actually For

Every business produces three financial statements. Most people have heard of them. Almost nobody knows what each one is truly designed to measure.

**The Income Statement** measures whether your products or services are profitable over a period of time. It records sales when they are *earned*, not necessarily when cash changes hands, and matches costs to those sales. It answers: *Are we making money?*

**The Balance Sheet** is a snapshot of the company's financial position at a single point in time. It shows what the company owns (assets), what it owes (liabilities), and what belongs to shareholders (equity). It answers: *Are we financially healthy?*

**The Cash Flow Statement** tracks actual dollars flowing in and out of the business. It strips away the accounting estimates and shows the raw reality of the bank account. It answers: *Can we pay our bills?*

These three statements are connected. Every sale on the income statement affects either cash or receivables on the balance sheet. Every profit eventually flows into equity. Understanding the links between them is what separates financially intelligent managers from everyone else.

## Why Profit Is Not Cash

This is the concept that trips up more founders and managers than any other.

A company can be profitable and broke at the same time. A company can be losing money on paper and be flush with cash. These are not paradoxes — they are features of the accounting system.

When a business delivers a product or service, it records the sale immediately, even if the customer hasn't paid yet. That sale shows up as profit on the income statement. But the cash hasn't arrived. Meanwhile, expenses like payroll and rent must be paid right now, in actual money.

This gap — between recorded profit and real cash — is why profitable companies go bankrupt. They run out of money while waiting to collect revenue they've already "earned."

Warren Buffett understood this better than almost anyone. When evaluating companies, he focuses not on reported profit but on **owner earnings** — the real cash the business generates that an owner could actually take out and spend. That discipline turned him into one of the greatest investors in history.

## The Numbers People Can Be Wrong

One more liberating truth: the finance department does not have a monopoly on truth.

Berman and Knight surveyed thousands of managers across the US and found deep financial illiteracy at every level — including among the people managing the numbers. Accountants make judgment calls. CFOs make strategic choices about how to present results. Auditors miss things.

This doesn't mean financials are useless — it means they should be read critically, not reverently.

## Apply This Today

Before looking at any financial statement, ask three questions:

- **What period does this cover?** Income statements are for a span of time; balance sheets are a single moment.
- **What assumptions are buried in here?** Every number has estimates behind it.
- **Where is the cash?** Whatever the income statement says, the cash flow statement shows what's actually real.

That's the foundation. Everything else in finance is built on these three questions.`,
  },
  {
    bookId:    'financial-intelligence',
    bookTitle: 'Financial Intelligence',
    dayNumber: 12,
    taskId:    'd12-t1',
    title:     'The Balance Sheet & Cash Flow Statement Revealed',
    readTime:  '7 min read',
    content:   `## The Statement Savvy Investors Read First

When sophisticated investors analyze a company, they don't start with the income statement. They start with the balance sheet.

The income statement shows what happened over a period of time. The balance sheet shows the cumulative result of everything that has ever happened to the company — a financial GPA going back to day one. It answers the question every lender, investor, and creditor wants answered: *Is this company actually healthy?*

The fundamental equation is simple and unbreakable:

**Assets = Liabilities + Owners' Equity**

If this equation doesn't hold, you don't have a balance sheet.

## Assets: What the Company Owns

**Current Assets** (can be converted to cash within a year):
- **Cash and Cash Equivalents** — The only truly objective number on the balance sheet. What's in the bank is what's in the bank.
- **Accounts Receivable (A/R)** — Money customers owe. It's an asset because it will convert to cash — but note the "allowance for bad debt" subtracted from it, which is an estimate.
- **Inventory** — The cost of products ready to sell. All inventory costs money. Reducing it raises cash.

**Long-Term Assets** (useful life over one year):
- **Property, Plant & Equipment (PPE)** — Recorded at purchase price, not current market value. Land bought for $500k in 1990 still sits on the books at $500k even if it's worth $5 million today.
- **Less: Accumulated Depreciation** — Subtracted from PPE to show "net" value after wear and tear.
- **Goodwill** — Created when a company acquires another and pays more than the physical assets are worth. The excess is "goodwill" — brand, customer base, talent.

## Liabilities and Equity

**Current Liabilities** (due within a year): accounts payable, accrued expenses, the current portion of long-term debt.

**Long-Term Liabilities**: bonds, mortgages, long-term loans.

**Owners' Equity** = Assets − Liabilities. It includes original capital plus all accumulated profits (retained earnings) minus dividends paid out. A net profit flows into retained earnings, growing equity. Consecutive losses eventually produce negative equity — a sign of potential insolvency.

## The Statement That Can't Lie

Warren Buffett has compounded wealth at exceptional rates for decades. His edge, distilled: he focuses on cash, not reported profit.

The income statement can be shaped. The balance sheet contains estimates. But the **cash flow statement** tracks actual dollars moving in and out of the business. You can't fake an empty bank account.

## The Three Sections of the Cash Flow Statement

**1. Cash from Operating Activities**
The most important section. Starts with net profit and adjusts for everything that makes profit different from cash:
- Add back depreciation (non-cash — money was spent when the asset was bought, not monthly)
- Subtract increases in accounts receivable (sales recorded but not yet collected)
- Subtract increases in inventory (cash spent but not yet sold)
- Add increases in accounts payable (bills owed but not yet paid)

The result is **operating cash flow** — how much actual cash the business generated from its core operations.

**2. Cash from Investing Activities**
Cash spent on or received from long-term assets: buying equipment, acquiring companies, selling property. Almost always negative for growing businesses — they're reinvesting.

**3. Cash from Financing Activities**
Cash flows between the company and its capital providers: borrowing, repaying loans, issuing stock, paying dividends.

## Free Cash Flow — What's Actually Left

Most analysts use **free cash flow** as the ultimate health metric:

> **Free Cash Flow = Operating Cash Flow − Capital Expenditures**

This is what's left after the company has paid to maintain and grow its asset base. Companies with strong free cash flow have options — they can pay dividends, repay debt, acquire competitors, or build a war chest. Companies with consistently negative free cash flow are dependent on external financing to survive.

## The Warning Signs

| Signal | What It Might Mean |
|---|---|
| High profit, low operating cash flow | Revenue booked but not collected — watch A/R |
| Negative operating cash flow | Core business is consuming cash, not generating it |
| Operating cash flow > net profit consistently | Strong, cash-generative business — the Buffett signal |
| Repeated financing inflows | Dependent on external capital to stay alive |

## Apply This Today

Build a simple balance sheet for your business right now — even a rough one:

1. List your assets: cash, equipment, money owed to you
2. List your liabilities: loans, bills owed, credit lines
3. Calculate equity: assets minus liabilities

Then answer: is your equity positive and growing? If not, the business is being consumed by its obligations — and the income statement might not be showing you that clearly.`,
  },
  {
    bookId:    'financial-intelligence',
    bookTitle: 'Financial Intelligence',
    dayNumber: 13,
    taskId:    'd13-t1',
    title:     'Ratios, ROI & Working Capital — Reading Between the Lines',
    readTime:  '7 min read',
    content:   `## The Analyst Who Caught the Fraud

In 1997, Sunbeam's CEO Al Dunlap was under pressure to make the company attractive for acquisition. In Q4, Sunbeam reported a stunning quarter — sales and profits dramatically above expectations. Wall Street celebrated.

Andrew Shore, an analyst at Paine Webber, was skeptical. He calculated a single ratio: **days sales outstanding (DSO)** — how many days it takes the company to collect payment from customers. The number was enormous, far outside normal range.

He investigated. Sunbeam had booked $36 million in sales for products sitting in warehouses that retailers hadn't agreed to buy on normal terms. The whole quarter was manufactured.

Shore downgraded the stock. The fraud unraveled. Sunbeam went bankrupt.

One ratio. That's the power of financial ratios.

## Why Raw Numbers Lie

Is $10 million in net profit good or bad? Nobody can answer that without context. Ratios create context by expressing the relationship between two numbers. There are four categories every manager needs.

## Category 1: Profitability Ratios

**Gross Margin** = Gross Profit ÷ Revenue
The profitability of the product itself. A falling gross margin means prices are being cut or production costs are rising.

**Operating Margin** = Operating Profit ÷ Revenue
How efficiently the whole operation runs before financing costs and taxes.

**Net Profit Margin** = Net Profit ÷ Revenue
Highly variable by industry — grocery stores run 1–2%, software companies can run 20–30%.

**Return on Assets (ROA)** = Net Profit ÷ Total Assets
How effectively the company uses its asset base to generate profit.

**Return on Equity (ROE)** = Net Profit ÷ Owners' Equity
The return generated for shareholders. Can be artificially inflated by high debt — always examine alongside leverage ratios.

## Category 2: Leverage Ratios

**Debt-to-Equity** = Total Debt ÷ Owners' Equity
High leverage amplifies returns in good times and accelerates collapse in bad ones.

**Interest Coverage** = Operating Profit ÷ Interest Expense
Below 2x is a warning sign; below 1x means the business can't pay its interest from operations.

## Category 3: Liquidity Ratios

**Current Ratio** = Current Assets ÷ Current Liabilities
Above 2.0 is comfortable; below 1.0 is dangerous.

**Quick Ratio** = (Cash + Receivables) ÷ Current Liabilities
Strips out inventory — a more conservative liquidity measure.

## Category 4: Efficiency Ratios

**Days Sales Outstanding (DSO)** = (Accounts Receivable ÷ Revenue) × 365
The ratio Shore used to catch Sunbeam. A rising DSO means the company is struggling to collect — or booking revenue prematurely.

**Inventory Turnover** = Revenue ÷ Inventory
How many times per year inventory is sold. Low turnover means cash is sitting in warehouses.

## ROI — The Investment Question Every Manager Has to Answer

At some point, every manager is asked to justify an investment. A machine. A hire. A marketing campaign. The question is always the same: *is this worth it?*

The wrong answer: "I think so." The right answer: a disciplined ROI analysis that compares future **cash flows** (not profit) to the cost of the investment. Profit and cash are different — comparing a cash investment to a profit return is like measuring distance in kilograms.

**The three tools:**

- **Payback Period** — How long until the initial investment is recovered? Simple, but ignores everything after payback.
- **Net Present Value (NPV)** — All future cash flows discounted back to today. NPV positive = creates value. The gold standard.
- **Internal Rate of Return (IRR)** — The annualized return the investment generates. If IRR > your cost of capital, proceed.

## Working Capital — The Cash Trapped in Operations

Working capital is the cash tied up in daily operations:

**Working Capital = Accounts Receivable + Inventory − Accounts Payable**

This is cash the business needs but can't spend. Three levers to manage it:

- **Shorten DSO** — collect from customers faster. Every day shortened on $10M in annual revenue frees ~$27k in cash.
- **Reduce DIO** — don't let inventory sit. Lean inventory is cash in the bank.
- **Extend DPO** — take the full time allowed to pay suppliers (without damaging relationships).

The **cash conversion cycle** = DSO + DIO − DPO. The goal is to minimize it. Amazon famously achieved a *negative* cash conversion cycle — customers paid before Amazon paid its suppliers, meaning growth actually *generated* cash rather than consuming it.

## Economic Value Added — True Profit

The most important question isn't whether you made a profit. It's whether you made *more than your capital cost to use*.

**EVA = Return on Total Capital − Weighted Average Cost of Capital (WACC)**

If your business earns a 9.6% return on capital and your WACC is 10.45%, your EVA is −0.85%. You made a profit. But you didn't earn enough to justify what it cost investors to provide that capital. You destroyed value — even in a profitable year.

This reframes every business conversation. The question is never just "are we profitable?" It's "are we profitable *enough* to justify the capital we're using?"

## Apply This Today

Pick one company — yours or one you follow. Calculate these five ratios from the most recent financial data:

| Ratio | Your Number |
|---|---|
| Gross Margin % | |
| Operating Margin % | |
| Current Ratio | |
| DSO (days) | |
| Return on Assets | |

Then find the same five ratios from 2–3 years ago. The direction of movement tells you more than any single number. Rising gross margins with improving DSO? Healthy. Falling margins with rising DSO? Time to dig deeper.`,
  },
]

async function seedFinancialIntelligence() {
  console.log('\nSeeding Financial Intelligence summaries...')
  for (const s of fiSummaries) {
    await db.bookSummary.upsert({
      where:  { dayNumber_taskId: { dayNumber: s.dayNumber, taskId: s.taskId } },
      update: { title: s.title, content: s.content, readTime: s.readTime },
      create: s,
    })
    console.log(`✓ Day ${s.dayNumber}: ${s.title.slice(0, 55)}...`)
  }
  console.log('✅ Financial Intelligence summaries seeded!')
}

seedFinancialIntelligence().catch(e => { console.error(e); process.exit(1) }).finally(() => db.$disconnect())


// ACCOUNTING MADE SIMPLE ───────────────────────────────────────────────────────────────

const accountingSummaries = [
  {
    bookId:    'accounting-made-simple',
    bookTitle: 'Accounting Made Simple',
    dayNumber: 14,
    taskId:    'd14-t1',
    title:     'The Complete Accounting Playbook — Everything in One Place',
    readTime:  '8 min read',
    content:   `## Why Every Founder Needs to Understand This

You do not need to become an accountant. But you do need to understand the language accountants speak — because every decision about hiring, pricing, investment, and survival is made using numbers that accountants produce.

Accounting Made Simple by Mike Piper is a 100-page distillation of everything that matters. This summary covers all of it: the financial statements, the rules behind them, and the mechanics of how it all works together.

## The Accounting Equation — The Foundation of Everything

All of accounting rests on one equation that is always, always true:

**Assets = Liabilities + Owners' Equity**

- **Assets** — Everything the business owns or is owed: cash, equipment, inventory, accounts receivable
- **Liabilities** — Everything the business owes to others: loans, accounts payable, tax obligations
- **Owners' Equity** — What's left for the owners after all debts are paid

Every single transaction that ever occurs in a business is just a rearrangement of this equation. Buy equipment with cash? Assets shift but the total stays the same. Take out a loan? Assets and liabilities both rise by the same amount. Make a profit? Equity grows.

## The Four Financial Statements

**The Income Statement** covers a *period of time* (a month, quarter, or year) and answers: *are we profitable?*

| Line | What It Means |
|---|---|
| Revenue | Total sales earned in the period |
| − Cost of Goods Sold | Direct cost of what was sold |
| = Gross Profit | Profit from the core product |
| − Operating Expenses | Salaries, rent, overhead |
| = Net Income | The bottom line |

**The Balance Sheet** is a snapshot at a *single moment* and answers: *are we financially healthy?*
It lists all assets, all liabilities, and the resulting owners' equity. The equation must always balance.

**The Statement of Retained Earnings** bridges the two: it shows how net income from the income statement flows into owners' equity on the balance sheet, minus any dividends paid.

**The Cash Flow Statement** answers: *can we pay our bills?* It tracks actual cash moving in and out — from operations, investing, and financing.

## Ratios — How to Read the Health of Any Business

Raw numbers mean nothing without context. Ratios create that context.

**Profitability Ratios:**
- **Gross Profit Margin** = Gross Profit ÷ Revenue — how much profit the product itself generates before overhead
- **Return on Assets (ROA)** = Net Income ÷ Total Assets — how efficiently assets are used to generate profit
- **Return on Equity (ROE)** = Net Income ÷ Owners' Equity — the return on shareholder investment

**Liquidity Ratios** (can you pay short-term bills?):
- **Current Ratio** = Current Assets ÷ Current Liabilities — above 2.0 is comfortable; below 1.0 is a warning
- **Quick Ratio** = (Cash + Receivables) ÷ Current Liabilities — same as current ratio but strips out inventory for a more conservative read

**Leverage Ratios** (how much debt?):
- **Debt Ratio** = Total Liabilities ÷ Total Assets
- **Debt-to-Equity** = Total Debt ÷ Owners' Equity — more leverage means higher returns for equity holders *and* higher risk

**Asset Turnover Ratios** (how efficiently are assets used?):
- **Inventory Turnover** = COGS ÷ Average Inventory — how many times per year inventory is sold and replaced
- **Average Collection Period** = (Accounts Receivable ÷ Credit Sales) × 365 — how long customers take to pay

## GAAP — The Rules of the Game

Generally Accepted Accounting Principles (GAAP) is the rulebook all public companies must follow, enforced by the SEC. It exists so that financial statements from different companies can be compared meaningfully.

The four most important GAAP principles every founder should know:

**Historical Cost** — Assets are recorded at what you paid for them, not what they're worth today. Your office bought in 2010 sits on the books at its 2010 price. Objective, but sometimes misleading.

**Matching Principle** — Expenses must be recorded in the same period as the revenue they help generate. If you spend $10,000 in March to produce March's sales, that cost belongs in March — not when you pay the invoice in April.

**Entity Assumption** — The business is legally and financially separate from its owners. Every transfer between your personal account and the company account must be recorded.

**Materiality** — Small errors that wouldn't change anyone's decision don't need to be obsessed over. A $15 stapler doesn't need to be depreciated over 5 years. Significant items do.

## Double-Entry Accounting & Journal Entries

GAAP requires **double-entry accounting**: every transaction creates two entries — a debit and a credit — that keep the accounting equation in balance.

**The rule:**
- **Debit** increases assets and expenses; decreases liabilities and equity
- **Credit** increases liabilities, equity, and revenue; decreases assets

Think of it this way: debits are the left side of the accounting equation, credits are the right. Every transaction moves something from one side to the other, or rearranges within a side — but the equation always balances.

**Example journal entries:**

*Company takes out a $50,000 loan:*
\`\`\`
DR. Cash              50,000
    CR. Notes Payable         50,000
\`\`\`

*Company pays $4,500 monthly rent:*
\`\`\`
DR. Rent Expense      4,500
    CR. Cash                   4,500
\`\`\`

*Company makes a $1,000 cash sale of inventory that cost $450:*
\`\`\`
DR. Cash              1,000
    CR. Sales                  1,000
DR. Cost of Goods Sold  450
    CR. Inventory               450
\`\`\`

All journal entries flow into the **general ledger** — the master record of every transaction — which is then used to build the financial statements.

## Cash vs. Accrual Accounting

This is the distinction that confuses more founders than any other.

**Cash method** — Record revenue when cash arrives; record expenses when cash leaves. Simple and intuitive. The problem: it can wildly distort profitability. If you prepay 3 months of rent in January, cash accounting shows a terrible January and great February and March — even if nothing else changed.

**Accrual method** — Record revenue when it's *earned* (goods delivered, service performed). Record expenses in the period they *relate to*, regardless of when cash moves. GAAP requires accrual for all but the smallest businesses.

Key accrual concepts:
- **Accounts Receivable** — Revenue earned but not yet collected. An asset.
- **Accounts Payable** — Expenses incurred but not yet paid. A liability.
- **Prepaid Expenses** — Cash paid in advance for future benefit (e.g., prepaid insurance). An asset that converts to expense over time.
- **Unearned Revenue** — Cash received before the service is delivered. A liability until earned.

## Depreciation — Spreading Asset Costs Over Time

When a business buys equipment that lasts multiple years, GAAP's matching principle says the cost should be spread across those years — not expensed all at once.

**Straight-line depreciation** is the simplest: divide the asset's cost (minus any expected salvage value) evenly across its useful life.

*Example: $5,000 machine, 5-year life, no salvage value → $1,000 depreciation per year*

Each year:
\`\`\`
DR. Depreciation Expense     1,000
    CR. Accumulated Depreciation    1,000
\`\`\`

The **Accumulated Depreciation** account is a contra-asset — it offsets the original asset on the balance sheet. The difference is the asset's **net book value**.

Other methods exist (double declining balance, units of production) for situations where assets lose value faster early on or based on usage. **Amortization** is the same concept applied to intangible assets like patents and trademarks.

## Inventory — FIFO, LIFO, and Average Cost

When inventory costs change over time, a business must choose an assumption about which units were sold first. The choice materially affects both COGS and the ending inventory balance.

| Method | Assumption | Effect in Rising Prices |
|---|---|---|
| **FIFO** (First-In, First-Out) | Oldest units sold first | Lower COGS → higher profit |
| **LIFO** (Last-In, First-Out) | Newest units sold first | Higher COGS → lower profit, lower taxes |
| **Average Cost** | Blended average per unit | Middle ground |

All three are GAAP-compliant. The method chosen must be disclosed and applied consistently. The difference isn't trivial — in a business with large inventory and volatile costs, FIFO vs. LIFO can mean millions of dollars difference in reported profit.

## The Journal Entry That Ties Everything Together

Every piece of accounting — every ratio, every financial statement, every tax return — traces back to individual journal entries recorded by accountants and accounting software around the world.

Understanding the logic of a journal entry (what gets debited, what gets credited, and why) gives you the ability to trace any financial result back to the transaction that created it. That's the real skill: not memorizing rules, but understanding *why* the rules exist — so that when something doesn't look right in your financials, you know exactly where to look.

## Apply This Today

Run through this checklist for your own business:

1. **Do you use accrual accounting?** If not, your profit numbers may not reflect reality.
2. **Do you know your current ratio?** Current assets ÷ current liabilities. If it's below 1.5, liquidity deserves attention.
3. **What's your inventory method?** If you hold inventory with changing costs, make sure your accountant has chosen deliberately — not by default.
4. **Are your fixed assets being depreciated correctly?** Every piece of equipment should have a depreciation schedule.
5. **Do you reconcile your accounts monthly?** The general ledger only stays accurate if every transaction is recorded promptly and correctly.

These five questions surface 80% of the accounting problems that blindside founders.`,
  },
]

async function seedAccountingMadeSimple() {
  console.log('\nSeeding Accounting Made Simple summaries...')
  for (const s of accountingSummaries) {
    await db.bookSummary.upsert({
      where:  { dayNumber_taskId: { dayNumber: s.dayNumber, taskId: s.taskId } },
      update: { title: s.title, content: s.content, readTime: s.readTime },
      create: s,
    })
    console.log(`✓ Day ${s.dayNumber}: ${s.title}`)
  }
  console.log('✅ Accounting Made Simple summary seeded!')
}

async function main() {
  await seedPersonalMBA()
  await seedTIS()
  await seedPCA()
  await seedFinancialIntelligence()
  await seedAccountingMadeSimple()
}

main().catch(e => { console.error(e); process.exit(1) }).finally(() => db.$disconnect())