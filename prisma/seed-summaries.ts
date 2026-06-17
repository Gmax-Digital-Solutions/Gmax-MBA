/**
 * seed-week5-and-negotiation.ts
 * ------------------------------
 * Combined seed file for the four most recently written books:
 *   Day 27 — The 1-Page Marketing Plan
 *   Day 28 — Never Split the Difference
 *   Day 29 — SPIN Selling
 *   Day 30 — The Challenger Sale
 *
 * Run with:
 *   npx tsx prisma/seed-week5-and-negotiation.ts
 *
 * Uses a fresh PrismaClient connection and a short delay between each
 * book to avoid the Supabase pgBouncer "prepared statement does not
 * exist" error (Postgres code 26000) that occurs after several
 * sequential upserts on the pooled connection.
 */

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
  return new PrismaClient({
    datasources: { db: { url: process.env.DATABASE_URL } },
  })
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

// ─── Book 1: The 1-Page Marketing Plan (Day 27) ───────────────────────────────
// ─── Book 1: The 1-Page Marketing Plan (Day 27) ───────────────────────────────
const onePageMarketingPlan = [
  {
    bookId: '1-page-marketing-plan', bookTitle: 'The 1-Page Marketing Plan',
    dayNumber: 27, taskId: 'd27-t1',
    title: 'The 1-Page Marketing Plan — Before, During & After', readTime: '8 min read',
    content: `## The Brutal Truth About Marketing

Most small businesses spend money on marketing with no idea whether it's working. They copy what they see big companies do — brand awareness campaigns, logo placements, slick ads — and wonder why nothing converts.

Allan Dib's brutal diagnosis: they're using a strategy designed for billion-dollar brands with enormous budgets and years of runway. A business with fifty customers and limited cash needs something completely different.

The 1-Page Marketing Plan is built on one foundational distinction: **direct-response marketing vs. brand advertising.** Brand advertising says "Here we are." Direct-response marketing says "Here's an irresistible offer — here's how to take it." Every small business needs direct-response marketing. Almost none practice it.

## The Canvas: Before, During, After

The 1-Page Marketing Plan organizes all marketing activity into three phases that map to the customer journey:

**Before** — People who don't know you exist yet (prospects)
**During** — People who know you and are considering buying (leads)
**After** — People who have bought from you (customers)

Each phase has three squares, for nine total. Together they form a complete marketing system.

## BEFORE — Getting Prospects' Attention

**Square 1: Target Market**

The single biggest marketing mistake is trying to reach everybody. "Anybody who needs X" is not a target market — it is a recipe for vague messaging that connects with nobody.

Dib's instruction: define your ideal customer so specifically that when they read your ad, they think it was written personally for them. Age. Gender. Income. Job title. Fears. Goals. Hobbies. The itch they can't scratch.

The narrower the target, the more powerful the message. A retirement planning firm that targets "divorced women over 55 who are anxious about outliving their money" will dramatically outperform one targeting "anyone who wants financial advice" — using the same budget.

**The PVP Index** — score each potential niche on three dimensions:
- **Personal Fulfilment** — how much do you enjoy working with this customer type?
- **Value to the Marketplace** — how much value can you deliver and therefore charge?
- **Profitability** — how profitable is this niche?

Pick the niche that scores highest across all three.

**Square 2: Message to Target Market**

Once you know exactly who you're talking to, you need an irresistible message. Most business owners describe what they do: "We're a digital marketing agency." Dib's approach: engineer a Unique Selling Proposition (USP) that answers the prospect's unspoken question — "Why should I choose you over every other option, including doing nothing?"

The USP is not a slogan or a tagline. It's a complete, competitive promise. Domino's "Fresh, hot pizza delivered in 30 minutes or it's free" is a USP — it names exactly what the customer is worried about (cold, late pizza) and makes a risk-reversing guarantee around it. Before Domino's articulated this, every pizza place offered roughly the same product. Domino's carved out a position and owned it.

**Square 3: Media to Reach Target Market**

Once you have a clear target and a compelling message, you need to put that message in front of the right people. The question is not "where should I advertise?" — it's "where does my target market already congregate?"

Different niches live in different channels. Founders read specific newsletters. Restaurant owners attend specific trade shows. Executives listen to specific podcasts. Go where they already are.

Dib emphasizes one discipline above all: **track everything.** Every ad, every channel, every campaign. If you don't know which half of your marketing budget is working, you don't have a marketing strategy — you have a spending habit.

## DURING — Converting Leads into Customers

**Square 4: Capture Leads**

Most marketing tries to go from stranger to customer in one step. For high-consideration purchases, this fails almost every time. The solution: capture the lead first with a low-commitment offer, then convert to a sale through a relationship.

The best lead capture mechanism is a high-value free offer — Dib calls it a "bribe." Not a brochure. Not a consultation. A piece of content so genuinely useful that your ideal customer would pay for it if you charged. A checklist, a video series, a calculator, a diagnostic tool.

In exchange for their contact information, the prospect gets value immediately. You get the ability to continue the relationship on your terms, without the pressure of a cold pitch.

**Square 5: Nurture Leads**

Most leads are not ready to buy when they first encounter your business. Research consistently shows that buyers need multiple touchpoints before they trust a vendor enough to purchase.

Dib's prescription: build a nurture system that regularly delivers value to prospects in your database — weekly or fortnightly, at minimum. Not sales pitches. Not newsletters about your company. Content that genuinely helps them solve problems related to what you sell.

The goal of nurturing is to occupy the position of "trusted advisor" in the prospect's mind so that when they're ready to buy, you are the only logical choice. The business that stays in touch with leads for twelve months while competitors give up after two weeks wins the sale without competing on price.

Dib's model: think of prospects as "not yet customers." The nurture sequence is the system that converts "not yet" to "yes" over time.

**Square 6: Sales Conversion**

When a lead is ready to buy, conversion should feel easy and inevitable — not pressured. This requires two things:

**A high-converting sales process.** Know your customer's objections in advance and address them proactively. Use social proof (testimonials, case studies, data) to transfer the burden of proof. Frame risk reversal through guarantees that remove the fear of a bad decision.

**A premium price.** Dib spends unusual time on pricing, making an uncomfortable argument: most small businesses undercharge, which paradoxically makes them less competitive. Low prices signal low quality. Buyers associate price with value. A business that charges a premium attracts better customers, delivers better outcomes (because adequate margins fund adequate service), and creates more word of mouth. The race to the bottom is the most crowded and least profitable race in business.

## AFTER — Turning Customers into a Growth Engine

**Square 7: Deliver a World-Class Experience**

Getting the customer is the cost. Keeping the customer is the profit.

Dib uses "Tribal Knowledge" — the institutional know-how to systematize the customer experience so it is consistently excellent regardless of which team member is delivering it. This means documented processes, checklists, scripts, and standards.

The goal is to engineer "wow" moments — moments where the customer receives something they didn't expect and didn't pay for. A handwritten note. A follow-up call two weeks after purchase. A small gift on their anniversary. These moments cost almost nothing and generate disproportionate loyalty and referrals.

**Square 8: Increase Lifetime Value**

The most overlooked profit lever in any business: selling more to existing customers.

- **Ascension:** offer a premium version or next tier to satisfied customers
- **Frequency:** create reasons for customers to transact more often
- **Upsell at purchase:** "Would you like X with that?" at the moment of sale
- **Reactivation:** systematically contact customers who haven't bought recently

Dib's calculation: increasing average transaction value by 10%, transaction frequency by 10%, and customer lifespan by 10% increases business value by 33% — without acquiring a single new customer.

**Square 9: Orchestrate Referrals**

Word of mouth is the most trusted and lowest-cost acquisition channel for almost every business. But most businesses wait for referrals to happen randomly. They don't create systems that generate them predictably.

Dib's referral playbook:
1. **Ask at the peak moment.** After a customer says "This is great" — that's the exact moment to ask "Is there anyone in your network who'd benefit from the same thing?"
2. **Make referring easy.** Give customers language, a link, and a reason.
3. **Create a referral incentive.** Not a discount — an experience or gift that makes referring feel rewarding.
4. **Thank referrers visibly.** Recognition is often more motivating than cash.

A business with a systematic referral process pays less to acquire each new customer, gets higher-quality customers (referred customers trust you before they meet you), and grows faster than competitors with identical products.

## The One Page

The power of the framework is that it fits on one page. Print it. Post it on your wall. Review it weekly.

If any square is empty, that's not a gap in your document — it's a gap in your marketing strategy. Fill it.

| BEFORE | DURING | AFTER |
|---|---|---|
| 1. Target Market | 4. Lead Capture | 7. World-Class Experience |
| 2. Message | 5. Lead Nurture | 8. Increase Lifetime Value |
| 3. Media | 6. Sales Conversion | 9. Orchestrate Referrals |

## Apply This Today

Fill in your 1-Page Marketing Plan right now — one sentence per square:

1. Who specifically is my ideal customer?
2. What is my USP that makes them choose me over every alternative?
3. Where does this customer already congregate that I can reach them?
4. What free, high-value offer captures their contact information?
5. How do I stay in front of leads weekly until they're ready to buy?
6. What is my sales process — and what objection does it need to resolve?
7. What "wow" moment does every new customer receive that they didn't expect?
8. What is my first upsell or ascension offer?
9. How do I systematically ask for and reward referrals?

Nine sentences. One page. A complete marketing strategy.`,
  },
]

// ─── Book 2: SPIN Selling (Day 29) ────────────────────────────────────────────
const spinSelling = [
  {
    bookId: 'spin-selling', bookTitle: 'SPIN Selling',
    dayNumber: 29, taskId: 'd29-t1',
    title: 'SPIN Selling — The Research-Proven Path to Winning Complex Sales', readTime: '8 min read',
    content: `## The Largest Sales Research Study Ever Conducted

Neil Rackham spent twelve years, $1 million, and 35,000 sales calls to answer a question nobody had ever scientifically investigated: what actually separates top salespeople from average ones in complex, high-value sales?

The results were not what anyone expected.

Rackham's team at Huthwaite discovered that almost everything taught in traditional sales training was either irrelevant in large sales or actively harmful. Opening techniques mattered almost nothing. Closing techniques — the obsession of the entire sales training industry — were negatively correlated with success in major accounts. And the holy war between open and closed questions was completely beside the point.

What actually predicted success was a specific pattern of four question types, used in a specific sequence. Rackham called it SPIN.

## The Death of Closing

The first and most controversial finding: **traditional closing techniques reduce success rates in complex sales.**

Rackham's research tracked 190 calls at a large office equipment company. The calls with the highest number of closing techniques had fewer sales than those with the fewest. In a subsequent study, intensive closing training increased the frequency of closing behaviors — and decreased overall sales results.

Why? In small, low-risk, single-transaction sales, aggressive closing can push hesitant buyers over the line. In complex sales — where the buyer is spending significant money, multiple stakeholders are involved, and the decision will affect the organization for years — closing pressure triggers resistance. It signals that the seller is prioritizing their commission over the buyer's interests. Buyers disengage, delay, or simply disappear.

The two outcomes that actually indicate success in a complex sales call are:
- **Advance** — the buyer agrees to a specific next action that moves the sale forward (a meeting, a trial, a proposal review with the full team)
- **Order** — the sale is made

Continuations ("I'll think about it") and No-sales are failures. The goal of each call is to get an Advance, not to extract a premature commitment.

## The Four Stages of Every Sales Call

Every sales call, regardless of complexity or industry, moves through four stages:

1. **Opening** — establishing context, building rapport, setting the purpose
2. **Investigating** — finding out about the customer's situation and needs
3. **Demonstrating Capability** — showing how you can help
4. **Obtaining Commitment** — getting the buyer to take a next step

Rackham's research found that in large sales, the **Investigating stage determines everything else.** How deeply and skillfully you understand the customer's situation, problems, and implications directly determines how compelling your capability demonstration will be — and how naturally commitment follows.

## The SPIN Question Sequence

Four types of questions, used in sequence, define the Investigating stage.

### S — Situation Questions

Fact-finding questions about the customer's current circumstances.

*"How many people are in your sales team?" "What CRM do you currently use?" "How long have you had this system?"*

Situation Questions are necessary — you need context. But they are low-value to the buyer. The buyer already knows their own situation. Too many Situation Questions bore and irritate.

Rackham's finding: top performers ask **fewer** Situation Questions than average performers, not more. They do their research in advance, ask only what they can't find elsewhere, and move quickly to Problem Questions.

### P — Problem Questions

Questions that explore difficulties, dissatisfactions, and problems in areas where your solution can help.

*"Are you happy with the accuracy of your current forecast?" "What are the biggest challenges with your existing process?" "Does your current system cause any problems when you're trying to scale?"*

Problem Questions matter because they establish that a problem exists. Without a problem, there is no reason to buy. But in large sales, discovering a problem is necessary but insufficient — it does not, by itself, create the urgency to act.

Rackham's finding: inexperienced salespeople ask too few Problem Questions and rush to demo. Experienced salespeople develop problems more fully before moving on.

### I — Implication Questions

Questions that explore the consequences, effects, and downstream impact of the customer's problems.

*"If your forecast accuracy stays at this level, what effect does that have on inventory planning?" "When this problem occurs, how does it affect your team's productivity?" "What happens to your customer relationships when this breaks down?"*

Implication Questions are the most powerful — and the least used — question type in complex selling. They work because they transform a small problem into a serious problem. A buyer who acknowledges "our reporting is slow" has a minor inconvenience. A buyer who has walked through the implications — delayed decisions, missed opportunities, frustrated managers, increased headcount to compensate — now has an urgent problem that is costing real money and creating real pain.

Rackham's finding: top performers ask **more than ten times as many Implication Questions** per call as average performers. This is the single biggest behavioral gap between high and low performers in complex sales.

The reason Implication Questions are underused: they require genuine curiosity and preparation. You must understand the customer's business well enough to ask intelligent questions about downstream effects. You cannot improvise them in the moment without sounding foolish. Top salespeople prepare their Implication Questions before every significant call.

### N — Need-Payoff Questions

Questions that get the buyer to articulate the value of solving the problem.

*"If we could eliminate this reporting delay, how much time would that save your team per week?" "How valuable would it be to have this automated?" "If we solved this, what would that mean for your quarterly planning process?"*

Need-Payoff Questions are the mirror image of Implication Questions. Implication Questions make problems feel larger and more urgent. Need-Payoff Questions make solutions feel more valuable and desirable.

Critically, Need-Payoff Questions shift the conversation: instead of the seller telling the buyer why the solution is valuable, the **buyer** tells the seller. This is far more persuasive. People believe what they say themselves more than what they hear from others. When the buyer says "If you could do that, it would save us about $200,000 a year," they have convinced themselves. The seller doesn't need to.

Need-Payoff Questions also prepare the ground for the capability demonstration. If the buyer has just articulated three specific benefits they want, the capability demo becomes a direct response: "Here's exactly how we deliver each of the three things you just described."

## The Difference Between Features, Advantages, and Benefits

One of SPIN Selling's most important and underappreciated insights: **most sellers demo features and advantages when they should demo benefits.**

- **Feature** — a fact about the product. "Our system has real-time sync."
- **Advantage** — how the feature could help. "That means your data is always current."
- **Benefit** — how the feature addresses an Explicit Need the buyer has already expressed. "You mentioned that stale data was causing forecast errors — this means your forecast will always reflect the most current reality."

Benefits can only be stated after the buyer has expressed an Explicit Need. Without that Need, a Benefit is just an Advantage — and Advantages produce a high rate of objections.

Rackham's research finding: in large sales, the number of Benefits stated is uncorrelated with call success. The number of Explicit Needs the seller has developed — through Implication and Need-Payoff Questions — is strongly correlated with success.

The implication: **don't show up and pitch. Develop needs first. Then connect your capabilities precisely to those needs.**

## Preventing Objections vs. Handling Them

Traditional sales training invests heavily in objection-handling techniques. SPIN Selling's finding is more radical: **in successful calls, there are almost no objections to handle.**

Why? Because objections are usually triggered by premature capability statements. The seller mentions a feature before the buyer has expressed a need for it. The buyer objects. The seller "handles" the objection. This is a cycle that could have been avoided entirely.

The prevention approach: use Problem, Implication, and Need-Payoff Questions to develop an Explicit Need first. Then state the capability in response to the expressed need. The buyer has already told you they want it. There is nothing to object to.

Rackham's data: calls in which sellers used the SPIN sequence had dramatically fewer objections than calls following traditional approaches — not because of better objection-handling, but because the question sequence eliminated most objections before they arose.

## Apply This Today

Before your next significant sales call, prepare your SPIN questions in writing:

**Situation (2–3):** What context do I need that I can't research in advance?

**Problem (3–4):** What difficulties or dissatisfactions is this customer likely experiencing that my solution addresses?

**Implication (4–6):** For each problem — what are the downstream consequences? What does this cost them? What does it prevent them from doing? Who else is affected?

**Need-Payoff (2–3):** What questions will get them to articulate the value of solving this?

Walk into the call with these prepared. Do not pitch until you have developed at least two or three Explicit Needs. When you do demonstrate capability, connect each feature directly to a need the buyer expressed using their own words.

This discipline — prepare questions before pitch — is the single biggest behavioral shift separating top performers from the rest.`,
  },
]

// ─── Book 3: The Challenger Sale (Day 30) ─────────────────────────────────────
const challengerSale = [
  {
    bookId: 'challenger-sale', bookTitle: 'The Challenger Sale',
    dayNumber: 30, taskId: 'd30-t1',
    title: 'The Challenger Sale — Teach, Tailor, Take Control', readTime: '8 min read',
    content: `## The Finding That Upended Sales Orthodoxy

In 2009, the Corporate Executive Board studied nearly 6,000 salespeople across dozens of industries. Their goal: identify which attributes and behaviors predicted high performance in complex B2B sales. They expected to confirm what almost every sales leader believed — that the best salespeople built the deepest relationships.

They were wrong.

The Challenger Sale is built on two findings that contradict a decade of sales training orthodoxy:

**Finding 1:** Sales reps fall into one of five distinct profiles — the Hard Worker, the Relationship Builder, the Lone Wolf, the Reactive Problem Solver, and the Challenger. Among average performers, no profile dominates. Among star performers, one profile dominates decisively: **the Challenger, comprising nearly 40% of all top performers.**

**Finding 2:** The profile least likely to produce a star performer is the one most sales organizations actively recruit, train, and celebrate: **the Relationship Builder.** In complex sales, only 7% of star performers fell into this category. In extremely complex solution sales, the Relationship Builder profile's contribution to top performance falls to nearly zero.

## The Five Sales Rep Profiles

**The Hard Worker** shows up early, stays late, makes more calls, does more demos. Motivated by self-improvement and rarely gives up. Performs adequately across most sales environments. Wins on effort, not differentiation.

**The Relationship Builder** focuses on building personal relationships and being liked. Generous with time, accommodating to customer requests, averse to conflict. Creates goodwill but avoids the constructive tension that drives complex purchasing decisions.

**The Lone Wolf** follows their own instincts rather than the process. High performers but difficult to manage and nearly impossible to scale. Hard to find, hard to control.

**The Reactive Problem Solver** responds reliably to customer service and implementation issues. Detail-oriented and trustworthy. Strong in account management but rarely drives new business proactively.

**The Challenger** has a deep understanding of the customer's business and uses it to push the customer's thinking. Comfortable sharing views that are different — even controversial. Presses customers on both their thinking and on pricing. Not afraid to create productive tension.

## Why the Relationship Builder Fails in Complex Sales

The Relationship Builder's failure in complex sales is not about competence or effort. It is structural.

Complex sales in 2009 (and increasingly since) take place in an environment where:
- Buyers have more information and are further along in their process before engaging a salesperson
- Purchasing decisions require consensus across multiple stakeholders with different interests
- Risk aversion is high — buyers are worried about making the wrong decision, not just finding the best product
- Differentiation between vendors is often difficult to establish on features alone

In this environment, a sales strategy built on being helpful and available and accommodating is insufficient. The Relationship Builder resolves tension. But in complex sales, some productive tension — tension around whether the buyer's current thinking is correct, whether they've identified the right problem, whether inaction has a cost — is exactly what drives purchasing decisions forward.

The buyer who is comfortable with their current situation doesn't buy. It takes a shift in perspective — a new way of seeing their own situation — to create the urgency to act.

## The Three Pillars of the Challenger Selling Model

The Challenger is defined by three abilities used in combination:

### 1. Teach for Differentiation

The defining Challenger attribute. Challengers offer customers unique perspectives on their own business — insights the customer didn't have before the conversation that reframe how they see their problem, their market, or their opportunity.

Critically, this teaching does **not** start with the product. It starts with a business insight the customer values independently of whether they buy anything. The teaching earns the right to the sales conversation.

The pharmaceutical company example from the research: competing for face time with overloaded physicians was a zero-sum game for every pharma rep. One company's solution was to arm its reps to teach physicians about the complete lifecycle of specific illnesses — information that helped doctors provide better patient care. Reps weren't talking about their drugs. They were providing clinical insight physicians genuinely valued. As a result, physicians consistently made time for that company's reps while turning away competitors.

The furniture rep example: instead of pitching a product to fill a new conference room, the rep taught the facilities director that research shows collaboration happens in groups of two to three, not eight — meaning the conference rooms being built were the wrong size. That insight reframed the conversation entirely, and the rep reshaped the account.

**The teach pitch formula:**
1. Lead with a unique insight about the customer's business or market
2. Reframe the problem — show them something they hadn't seen
3. Rationally drown — provide evidence that this insight is real and their current approach has a cost
4. Introduce your solution as the natural response to the problem you've defined

### 2. Tailor for Resonance

Teaching without tailoring is irrelevant. The Challenger's teaching pitch must be customized to the specific business priorities, pressures, and language of the individual buyer.

Two dimensions of tailoring:
- **By stakeholder type** — a CFO cares about cost, risk, and capital efficiency; a COO cares about process reliability and operational leverage; an end user cares about ease and time savings. The same solution delivers different value to each.
- **By industry and company context** — the insight that lands for a healthcare company will not land for a manufacturing company, even if the underlying solution is identical.

The Challenger knows enough about each stakeholder to lead with the outcome they're most measured on. Teaching the right thing to the right person — in their language, about their priorities — is what makes the pitch stick.

### 3. Take Control of the Sale

Challengers maintain a productive level of tension throughout the sales process. This does not mean being aggressive or confrontational. It means:

- Being willing to push back on a customer's conclusion when evidence suggests they're wrong
- Declining to compete in a race to the bottom on price ("If price is the only variable, this isn't a partnership I can build for you")
- Keeping the conversation moving forward rather than allowing indefinite deliberation
- Helping the customer build the business case for the purchase internally — because most complex B2B purchases fail due to internal consensus problems, not vendor selection

The Challenger who helped an employee benefits supplier reshape an RFP illustrates this perfectly. Rather than competing for a bid designed around price, the supplier declined to participate — and instead offered to help the customer build a better RFP. In doing so, they defined the requirements in ways that uniquely favored their own capabilities, and then re-entered the process on their own terms. This is what taking control looks like: not aggressive pressure, but confident guidance.

## Challengers Are Made, Not Just Born

The most commercially important finding in the research: **Challenger behaviors can be taught.**

Every rep in the study showed traces of the Challenger profile — it just wasn't their primary mode. With the right tools, coaching, and practice:
- Hard Workers can learn to deliver insight-led pitches
- Relationship Builders can learn to create constructive tension without sacrificing rapport
- Problem Solvers can learn to proactively lead the conversation rather than respond to it

The caveat: moving a sales organization to the Challenger model is a commercial transformation, not a training program. It requires:
- Marketing to build the teaching content (the rep cannot create original insight at scale alone)
- Managers to coach the new behaviors and reinforce them in deal reviews
- Leadership to align rewards and recognition with Challenger behaviors, not just relationship scores

Organizations that have successfully made this transition report it takes 18–36 months to fully embed. Those who treat it as a training course get a temporary bump and then revert to previous patterns.

## The Commercial Teaching Pitch — What Good Looks Like

The highest-leverage place to start: building a commercial teaching pitch for your most important customer segment.

A commercial teaching pitch:
1. Opens with a **reframe** — a counterintuitive insight about the customer's business that they couldn't have arrived at on their own
2. Provides **rational drowning** — data and evidence that the problem is real and the cost of inaction is measurable
3. Creates **emotional impact** — a story or case that makes the problem vivid and personal
4. Presents **a new way** — a framework or approach that resolves the tension the reframe created
5. Connects **your solution** as the natural delivery mechanism for the new approach

The structure is borrowed from a great TED Talk: start with something surprising, take the audience somewhere uncomfortable, then resolve it with a new perspective that happens to align precisely with what you offer.

## Apply This Today

Two exercises to close out the Gmax MBA curriculum with:

**Identify your teaching insight.** What do you know about your customers' industry or situation that they don't know themselves? What data, pattern, or perspective could genuinely reframe how they see their problem? This is the foundation of your commercial teaching pitch.

**Diagnose your sales approach.** In your last five significant sales conversations: did you lead with insight, or did you lead with product? Did you create any productive tension, or did you accommodate every direction the buyer wanted to take? Were you a Challenger or a Relationship Builder?

The Challenger Sale doesn't ask you to stop caring about customer relationships. It asks you to care enough about your customers to tell them what they need to hear — even when it's uncomfortable — rather than what they want to hear. That distinction is the difference between being liked and being valuable.

And in complex B2B sales, valuable wins.`,
  },
]


// ─── Book 4: Never Split the Difference (Day 28) ──────────────────────────────
const neverSplitSummaries = [
  {
    bookId:    'never-split-the-difference',
    bookTitle: 'Never Split the Difference',
    dayNumber: 28,
    taskId:    'd28-t1',
    title:     'Never Split the Difference — Negotiation as Empathy, Not Argument',
    readTime:  '8 min read',
    content:   `## The FBI Negotiator Who Rewrote the Rules

Chris Voss spent two decades as the FBI's lead international hostage negotiator. He didn't negotiate at a conference table with lawyers and spreadsheets — he negotiated over the phone with bank robbers, kidnappers, and terrorists, where getting it wrong meant someone died.

When Voss began studying negotiation academically, he discovered that almost everything taught in business schools was built on a flawed premise: that negotiation is a rational exercise, and that the path to agreement is logic, compromise, and problem-solving.

His experience told him something different. **Negotiation is not a rational exercise. It is an emotional one.** Every human being makes decisions based on emotion and justifies them with logic afterward. The negotiator who ignores emotion — or tries to suppress it — loses to the negotiator who understands and leverages it.

Never Split the Difference is the system Voss built from fifteen years of hostage negotiations, refined through Harvard Law and MBA classrooms, and proven in boardrooms, salary negotiations, and business deals worldwide.

## The Biggest Mistake in Every Negotiation

Most negotiators make one foundational error: they arrive at the table with an agenda and spend the conversation trying to convince the other side to accept it.

This is the wrong goal. The goal is not to convince. The goal is to **discover.**

Every negotiation contains information you don't have. What does the other person actually need (not want, but need)? What are they afraid of? What would make this a win for them? What constraints are they operating under that they haven't told you? What is the emotional reality behind their stated position?

The negotiator who uncovers this information wins. The negotiator who arrives with a script and delivers it loses — because they're answering questions the other side never asked.

Voss's rule: **Negotiation is a process of discovery. Your sole focus must be the other person.**

## The Tactical Toolkit

### Active Listening — The Foundation of Everything

Before any technique, before any move, Voss installs a mindset: your only job in the first half of any negotiation is to make the other person feel understood. Not agreed with. Not validated. *Understood.*

Most people listen to respond. Voss trains people to listen to understand — to gather information, to feel the emotional state of the other person, to notice what's said and what isn't. Three voice tones matter:

- **The late-night FM DJ voice** — slow, calm, deliberate, with a slight downward inflection. Conveys authority and safety without aggression. Used when you need to make something unmistakably clear.
- **The positive/playful voice** — warm, easy, default. Keeps the other person open and reduces defensiveness.
- **The assertive voice** — direct and declarative. Used rarely. Creates pushback almost every time.

### Mirroring — The Simplest Powerful Tool

Repeat the last three words (or the most important one to three words) of what the other person just said. That's it.

Mirroring works because it signals that you are listening deeply, encourages the other person to keep talking and elaborate, and keeps you from filling silence with your own agenda. It requires almost no skill to execute and produces remarkable results.

Voss's student used mirroring to stop her impulsive boss from creating a week of unnecessary work. When he said "Let's make two copies of all the paperwork," she responded: "Two copies?" He re-explained. She mirrored again. Within three exchanges, he had talked himself out of the request entirely — and sent an email the next day saying two digital backups were fine. She never argued. She never said no. She just reflected his words back.

The rule: after mirroring, go silent. Let the mirror do its work. Resist the urge to fill the space.

### Labeling — Naming the Emotion

Once you've identified what the other person is feeling — from their words, tone, body language, the "words, music, and dance" — name it aloud:

*"It seems like you're frustrated with how this has gone."*
*"It looks like there's some hesitation here."*
*"It sounds like this is important to you."*

Labeling works at a neurological level. Naming a negative emotion moves it from the amygdala (the brain's fear center) to the prefrontal cortex (rational thinking). You literally reduce the intensity of a negative emotion by giving it a name.

The label always starts with "It seems like..." / "It sounds like..." / "It looks like..." — never "I think..." or "I feel..." The "I" makes it about you. The "It" keeps the observation external and non-judgmental.

After labeling — silence. Let it sink in.

Negative labels defuse tension. Positive labels reinforce good dynamics. The Girl Scout fund-raiser used this to close a $10,000 gift from a "difficult" donor who had rejected every project presented. The second label — "It seems like you're really passionate about this and want to find the right project that reflects what the Girl Scouts gave you" — unlocked everything. "You understand me," the donor said. "I trust you'll find the right project." And signed the check without picking one.

### The Accusation Audit

Before entering a high-stakes negotiation, list every negative thing the other side could say or think about you. Every accusation, every grievance, every resentment.

Then name them first, out loud, at the start of the negotiation.

Anna used this when negotiating a contract cut that would reduce a partner firm's pay by nearly half. Before making the ask, she opened: *"We understand you may feel like we're the typical prime contractor trying to force out the small business. You may feel like we promised you this work and changed the deal."*

The partner's representative's immediate response: *"No, no, we don't think that."*

By naming every accusation in advance, Anna's team had disarmed all of them. The conversation that followed was collaborative, not defensive. The contract was restructured. The deal added $1 million to Anna's firm's bottom line.

The psychological principle: when you name your own worst fears about yourself, you remove the power of those accusations. The other person stops defending and starts collaborating.

### The Power of "No"

The entire negotiation training industry is built around getting to "Yes." Voss argues this is backwards.

"Yes" is a commitment that people resist making because they know they will be held to it. "No" is not a failure — it is a gift. "No" creates safety. It gives the speaker a sense of control. It reduces defensiveness and opens the conversation.

A "No" almost always means one of several things that are not "No forever": *not yet, I need more information, I don't understand, I'm not comfortable, I have another option I'm considering.*

Voss teaches his students to trigger "No" deliberately: instead of asking "Is this a good time to talk?" ask "Is now a bad time?" The respondent says "No, it's actually fine" — and has now made a small commitment and feels in control. The conversation starts better than if they'd said "Yes" to the first question under mild social pressure.

The email technique: when you've stopped getting responses, send: *"Have you given up on this project?"* People respond to "No" far more readily than to "Yes" — the question activates their instinct to correct the record.

### Calibrated Questions — "How" and "What"

Calibrated questions give your counterpart the illusion of control while steering the conversation. They are open-ended, begin with "What" or "How," and invite the other side to solve the problem.

*"How am I supposed to do that?"* — the single most powerful response to an ultimatum or an unreasonable demand. It signals that you're not refusing but that you need help finding a path forward. It puts the onus of problem-solving on the other side.

*"What is it that brought us to this situation?"*
*"How does this affect the rest of your team?"*
*"What would need to be true for this to work?"*

Never use "Why" — it puts people on the defensive and sounds like an accusation.

### Bending Reality — Anchoring and Deadlines

Two psychological principles Voss deploys deliberately:

**Anchoring.** Set an extreme anchor early. In salary negotiations, Voss teaches to open with a number so low (when you're the employer) or so high (when you're the employee) that it reframes the entire range of negotiation. The final number will be pulled toward wherever the anchor sits.

**Deadlines create movement.** People make concessions as deadlines approach. When you know the other side's deadline (which they will often hide), you have enormous power — you can wait them out. Voss's rule: never reveal your deadline. The deadline almost never matters as much as people think.

**Loss aversion beats gain.** Frame offers in terms of what the other side will lose by not agreeing, not what they will gain by agreeing. Research consistently shows that the pain of a loss is twice as powerful as the pleasure of an equivalent gain.

### Black Swans — The Unknown Unknowns

In every negotiation, there are one to three pieces of hidden information — Black Swans — that, if discovered, would completely change the dynamic. 

Black Swans are never found by arguing or presenting. They are found by listening — to what the other side says casually, to what they seem to care about that they haven't explained, to the contradictions between their stated position and their emotional reality.

Voss discovered in one kidnapping case that a gang holding a hostage had no leverage at all — they couldn't pay their own rent. This Black Swan changed the negotiation from a high-stakes confrontation to a simple cash-flow problem. He paid their rent and recovered the hostage.

The rule: **Enter every negotiation assuming there are Black Swans you haven't found yet.** The moment you think you have all the information is the moment you stop listening — and stop discovering.

## The System in One Page

| Tool | What It Does | How to Use It |
|---|---|---|
| Active Listening | Makes the other side feel understood | Slow down, smile, stay focused on them |
| Mirroring | Encourages elaboration | Repeat last 3 words, then silence |
| Labeling | Defuses negative emotions | "It seems like..." then silence |
| Accusation Audit | Pre-empts objections | Name every grievance before they do |
| "No" | Creates safety and commitment | Ask "Is this a bad time?" not "Is this a good time?" |
| Calibrated Questions | Transfers problem-solving | "How" and "What" questions only |
| Anchoring | Sets the range | Open extreme, adjust from there |
| Black Swan hunting | Finds hidden information | Listen for what's unsaid and contradictory |

## Apply This Today

Before your next significant negotiation — a client deal, a salary conversation, a vendor negotiation — prepare three things:

1. **Your accusation audit.** List every negative thing they could say or think about you or your offer. Plan to name these first.

2. **Your calibrated questions.** Write three "What" or "How" questions that will help you understand their real needs, constraints, and fears.

3. **Your labels.** Based on what you know about the situation, what emotions is the other side likely to be feeling? Prepare labels in advance: "It seems like..." and "It sounds like..."

Then walk in with one goal: discover more than you reveal. The negotiator with more information always wins.`,
  },
]

// ─── master runner ────────────────────────────────────────────────────────────

async function main() {
  const books: { label: string; data: Summary[] }[] = [
    { label: 'The 1-Page Marketing Plan (Day 27)', data: onePageMarketingPlan },
    { label: 'Never Split the Difference (Day 28)', data: neverSplitSummaries },
    { label: 'SPIN Selling (Day 29)',               data: spinSelling },
    { label: 'The Challenger Sale (Day 30)',         data: challengerSale },
  ]

  console.log('\n🚀 Seeding Days 27–30...\n')

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
    // breathing room between books to avoid pgBouncer prepared-statement errors
    await new Promise(r => setTimeout(r, 300))
  }

  console.log('🎉 Days 27–30 seeded successfully!')
}

main().catch(e => {
  console.error('Error seeding database:', e)
  process.exit(1)
})