export type DayTask = {
  id: string
  type: 'read' | 'watch' | 'task' | 'reflect'
  label: string
  detail: string
  duration: string
  searchQuery?: string    // for YouTube searches
  chapter?: string        // specific chapter reference
}

export type DayPlan = {
  day: number
  week: number
  phase: number
  module: string
  title: string
  focus: string
  tasks: DayTask[]
}

// ─── PHASE 1 — BUSINESS FOUNDATIONS (Days 1–80) ───────────────────────────

export const DAILY_PLAN: DayPlan[] = [

  // ══ WEEK 1 — The Personal MBA: Value Creation & Business Fundamentals ══
  {
    day: 1, week: 1, phase: 1, module: 'mod-01',
    title: 'What is a Business?',
    focus: 'The Personal MBA — Understanding Value Creation',
    tasks: [
      { id: 'd1-t1', type: 'read',    label: 'Morning Read', detail: 'The Personal MBA', chapter: 'Ch. 1 — Value Creation (pp. 1–28)', duration: '30 min' },
      { id: 'd1-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'How to Start a Startup — Sam Altman', searchQuery: 'Sam Altman How to Start a Startup YC Lecture 1', duration: '45 min' },
      { id: 'd1-t3', type: 'task',    label: 'Evening Task', detail: 'Write one paragraph: what does your business actually do for its customers? Be specific — no jargon.', duration: '20 min' },
      { id: 'd1-t4', type: 'reflect', label: 'Journal',      detail: 'What was the biggest insight from today? How does it apply to your business?', duration: '10 min' },
    ]
  },
  {
    day: 2, week: 1, phase: 1, module: 'mod-01',
    title: 'The 12 Forms of Value',
    focus: 'The Personal MBA — Forms of Value',
    tasks: [
      { id: 'd2-t1', type: 'read',    label: 'Morning Read', detail: 'The Personal MBA', chapter: 'Ch. 1 — The 12 Forms of Value (pp. 29–52)', duration: '30 min' },
      { id: 'd2-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Value Proposition Design explained simply', searchQuery: 'Value Proposition Design Alex Osterwalder explained', duration: '20 min' },
      { id: 'd2-t3', type: 'task',    label: 'Evening Task', detail: 'List which of the 12 forms of value your business currently delivers. Circle your top 2. Write why those two are your strongest.', duration: '25 min' },
      { id: 'd2-t4', type: 'reflect', label: 'Journal',      detail: 'Is there a form of value you are NOT delivering that your customers actually want?', duration: '10 min' },
    ]
  },
  {
    day: 3, week: 1, phase: 1, module: 'mod-01',
    title: 'Markets & Customers',
    focus: 'The Personal MBA — Understanding Your Market',
    tasks: [
      { id: 'd3-t1', type: 'read',    label: 'Morning Read', detail: 'The Personal MBA', chapter: 'Ch. 2 — Marketing (pp. 53–78)', duration: '30 min' },
      { id: 'd3-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'How to find your target market and ideal customer', searchQuery: 'How to identify your target market startup founders YC', duration: '20 min' },
      { id: 'd3-t3', type: 'task',    label: 'Evening Task', detail: 'Write a 1-paragraph description of your single most important customer. Name them. Age. Job. What keeps them up at night.', duration: '30 min' },
      { id: 'd3-t4', type: 'reflect', label: 'Journal',      detail: 'Do you actually know your customer well enough? What would you need to learn?', duration: '10 min' },
    ]
  },
  {
    day: 4, week: 1, phase: 1, module: 'mod-01',
    title: 'Sales & Value Delivery',
    focus: 'The Personal MBA — Sales Fundamentals',
    tasks: [
      { id: 'd4-t1', type: 'read',    label: 'Morning Read', detail: 'The Personal MBA', chapter: 'Ch. 3 — Sales (pp. 79–108)', duration: '30 min' },
      { id: 'd4-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'The Sales Playbook For Founders | Startup School', searchQuery: 'Sales for founders no experience how to sell startup', duration: '25 min' },
      { id: 'd4-t3', type: 'task',    label: 'Evening Task', detail: 'Map your current sales process step by step from first contact to signed deal. Identify where you lose most prospects.', duration: '30 min' },
      { id: 'd4-t4', type: 'reflect', label: 'Journal',      detail: 'What is the #1 reason prospects say no to you? Write your honest answer.', duration: '10 min' },
    ]
  },
  {
    day: 5, week: 1, phase: 1, module: 'mod-01',
    title: 'Value Delivery & Finance',
    focus: 'The Personal MBA — Operations & Finance',
    tasks: [
      { id: 'd5-t1', type: 'read',    label: 'Morning Read', detail: 'The Personal MBA', chapter: 'Ch. 4 — Value Delivery & Ch. 5 — Finance (pp. 109–148)', duration: '35 min' },
      { id: 'd5-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Cash flow basics for small business owners explained simply', searchQuery: 'Cash flow basics small business explained simply', duration: '20 min' },
      { id: 'd5-t3', type: 'task',    label: 'Evening Task', detail: 'Write down your business revenue for last month and your 3 biggest costs. Calculate your rough profit margin.', duration: '25 min' },
      { id: 'd5-t4', type: 'reflect', label: 'Journal',      detail: 'Are you profitable? If not, what is the one change that would make the biggest difference?', duration: '10 min' },
    ]
  },
  {
    day: 6, week: 1, phase: 1, module: 'mod-01',
    title: 'Mental Models — Deep Dive Saturday',
    focus: 'Thinking in Systems + Business Model Snapshot',
    tasks: [
      { id: 'd6-t1', type: 'read',    label: 'Deep Read',    detail: 'Thinking in Systems', chapter: 'Ch. 1 — The Basics: How System Structure Produces System Behavior (pp. 1–34)', duration: '60 min' },
      { id: 'd6-t2', type: 'watch',   label: 'Watch Block',  detail: 'Farnam Street Mental Models overview — full talk', searchQuery: 'Shane Parrish Farnam Street mental models decision making talk', duration: '45 min' },
      { id: 'd6-t3', type: 'task',    label: 'Project',      detail: 'Draw your business as a system. Use boxes and arrows. Inputs → Process → Outputs. Show what reinforces growth and what creates drag.', duration: '60 min' },
      { id: 'd6-t4', type: 'reflect', label: 'Weekly Review', detail: 'What were your 3 biggest insights from Week 1? What will you do differently in your business next week?', duration: '20 min' },
    ]
  },
  {
    day: 7, week: 1, phase: 1, module: 'mod-01',
    title: 'Apply Day — Business Model Snapshot',
    focus: 'Gmax Application Sunday',
    tasks: [
      { id: 'd7-t1', type: 'read',    label: 'Light Review',  detail: 'Re-read your notes from Days 1–6. Highlight the 5 most important ideas.', chapter: 'Your notes', duration: '20 min' },
      { id: 'd7-t2', type: 'watch',   label: 'Watch',         detail: 'How the Economic Machine Works — Ray Dalio (foundational context)', searchQuery: 'Ray Dalio How the Economic Machine Works', duration: '31 min' },
      { id: 'd7-t3', type: 'task',    label: 'Major Deliverable', detail: 'Write your 1-page Business Model Snapshot: (1) What you do, (2) Who you serve, (3) How you make money, (4) Your biggest strength, (5) Your biggest weakness, (6) One thing you will change this month.', duration: '90 min' },
      { id: 'd7-t4', type: 'reflect', label: 'Journal',       detail: 'What surprised you most about your own business this week when you looked at it through these frameworks?', duration: '15 min' },
    ]
  },

  // ══ WEEK 2 — Mental Models + Financial Intelligence Intro ══
  {
    day: 8, week: 2, phase: 1, module: 'mod-01',
    title: 'Systems Thinking — Stocks & Flows',
    focus: 'Thinking in Systems — Ch. 2',
    tasks: [
      { id: 'd8-t1', type: 'read',    label: 'Morning Read', detail: 'Thinking in Systems', chapter: 'Ch. 2 — A Brief Visit to the Systems Zoo (pp. 35–76)', duration: '35 min' },
      { id: 'd8-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Systems thinking explained with business examples', searchQuery: 'Systems thinking business examples feedback loops explained', duration: '20 min' },
      { id: 'd8-t3', type: 'task',    label: 'Evening Task', detail: 'Identify 3 feedback loops in your business. Label them: reinforcing (growth) or balancing (limiting). Write what drives each one.', duration: '25 min' },
      { id: 'd8-t4', type: 'reflect', label: 'Journal',      detail: 'Which feedback loop is most critical to your growth right now?', duration: '10 min' },
    ]
  },
  {
    day: 9, week: 2, phase: 1, module: 'mod-01',
    title: 'Charlie Munger — Mental Models',
    focus: "Poor Charlie's Almanack — Introduction",
    tasks: [
      { id: 'd9-t1', type: 'read',    label: 'Morning Read', detail: "Poor Charlie's Almanack", chapter: 'Introduction + The Art of Stock Picking (pp. 1–60)', duration: '30 min' },
      { id: 'd9-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Charlie Munger mental models compilation — best talks', searchQuery: 'Charlie Munger mental models best speeches compilation', duration: '30 min' },
      { id: 'd9-t3', type: 'task',    label: 'Evening Task', detail: 'Pick 3 mental models from Munger (inversion, first principles, opportunity cost). Write one sentence applying each to your business.', duration: '20 min' },
      { id: 'd9-t4', type: 'reflect', label: 'Journal',      detail: 'What would happen if you INVERTED your biggest business assumption? (Munger\'s inversion technique)', duration: '10 min' },
    ]
  },
  {
    day: 10, week: 2, phase: 1, module: 'mod-01',
    title: 'Munger — Psychology of Human Misjudgment',
    focus: "Poor Charlie's Almanack — Psychology",
    tasks: [
      { id: 'd10-t1', type: 'read',    label: 'Morning Read', detail: "Poor Charlie's Almanack", chapter: 'The Psychology of Human Misjudgment (pp. 180–236)', duration: '35 min' },
      { id: 'd10-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Cognitive biases that affect business decisions', searchQuery: 'Cognitive biases business decisions entrepreneurs avoid', duration: '20 min' },
      { id: 'd10-t3', type: 'task',    label: 'Evening Task', detail: 'List 3 recent business decisions. For each one, identify which cognitive bias may have influenced you. Be brutally honest.', duration: '25 min' },
      { id: 'd10-t4', type: 'reflect', label: 'Journal',      detail: 'What is a decision you keep postponing because of bias? What would you do if you had to decide right now?', duration: '10 min' },
    ]
  },
  {
    day: 11, week: 2, phase: 1, module: 'mod-02',
    title: 'Financial Intelligence — Reading Numbers',
    focus: 'Financial Intelligence — Ch. 1–3',
    tasks: [
      { id: 'd11-t1', type: 'read',    label: 'Morning Read', detail: 'Financial Intelligence', chapter: 'Ch. 1–3 — The Art of Finance & The Income Statement (pp. 1–55)', duration: '35 min' },
      { id: 'd11-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'How to read a Profit and Loss statement for beginners', searchQuery: 'How to read a profit and loss statement small business beginners', duration: '20 min' },
      { id: 'd11-t3', type: 'task',    label: 'Evening Task', detail: 'Open your accounting software or bank statement. Identify your Revenue, COGS, and Gross Profit for last month. Write the numbers down.', duration: '30 min' },
      { id: 'd11-t4', type: 'reflect', label: 'Journal',      detail: 'Do you know your gross margin? What does that number tell you about your business health?', duration: '10 min' },
    ]
  },
  {
    day: 12, week: 2, phase: 1, module: 'mod-02',
    title: 'The Balance Sheet',
    focus: 'Financial Intelligence — Ch. 4–6',
    tasks: [
      { id: 'd12-t1', type: 'read',    label: 'Morning Read', detail: 'Financial Intelligence', chapter: 'Ch. 4–6 — The Balance Sheet & Cash Flow (pp. 56–102)', duration: '35 min' },
      { id: 'd12-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Balance sheet explained for entrepreneurs and founders', searchQuery: 'Balance sheet explained entrepreneurs non-accountants simple', duration: '20 min' },
      { id: 'd12-t3', type: 'task',    label: 'Evening Task', detail: 'Build a simple balance sheet for your business: list your assets (cash, equipment, receivables) and liabilities (loans, bills owed). Calculate net worth.', duration: '40 min' },
      { id: 'd12-t4', type: 'reflect', label: 'Journal',      detail: 'What does your balance sheet reveal about your business that your bank balance doesn\'t show?', duration: '10 min' },
    ]
  },
  {
    day: 13, week: 2, phase: 1, module: 'mod-02',
    title: 'Cash Flow Deep Dive — Saturday',
    focus: 'Financial Intelligence + Damodaran Intro',
    tasks: [
      { id: 'd13-t1', type: 'read',    label: 'Deep Read', detail: 'Financial Intelligence', chapter: 'Ch. 7–9 — The Cash Flow Statement & Financial Ratios (pp. 103–148)', duration: '60 min' },
      { id: 'd13-t2', type: 'watch',   label: 'Watch Block', detail: 'Aswath Damodaran Introduction to Corporate Finance — Session 1', searchQuery: 'Aswath Damodaran Introduction Corporate Finance session 1 NYU', duration: '60 min' },
      { id: 'd13-t3', type: 'task',    label: 'Project', detail: 'Build your 6-month cash flow projection in a spreadsheet. List every expected income source and every expected expense by month. Calculate your cash position at end of each month.', duration: '75 min' },
      { id: 'd13-t4', type: 'reflect', label: 'Weekly Review', detail: 'Based on your cash flow projection — do you have a cash problem coming? What is the one change that improves the picture most?', duration: '20 min' },
    ]
  },
  {
    day: 14, week: 2, phase: 1, module: 'mod-02',
    title: 'Apply Day — Financial Snapshot',
    focus: 'Gmax Financial Dashboard Sunday',
    tasks: [
      { id: 'd14-t1', type: 'read',    label: 'Review',    detail: 'Accounting Made Simple', chapter: 'Ch. 1–3 — Basic Accounting Concepts (pp. 1–50)', duration: '30 min' },
      { id: 'd14-t2', type: 'watch',   label: 'Watch',     detail: 'Key financial metrics every business owner must track', searchQuery: 'Key financial metrics every business owner must track LTV CAC margin', duration: '25 min' },
      { id: 'd14-t3', type: 'task',    label: 'Major Deliverable', detail: 'Complete your Financial Snapshot document: (1) Monthly Revenue, (2) Gross Margin %, (3) LTV per client, (4) CAC per client, (5) LTV:CAC ratio, (6) Monthly burn or profit. Interpret what each number means for your business.', duration: '90 min' },
      { id: 'd14-t4', type: 'reflect', label: 'Journal',   detail: 'What is the one financial metric that, if improved by 20%, would transform your business?', duration: '15 min' },
    ]
  },

  // ══ WEEK 3 — Strategy Foundations ══
  {
    day: 15, week: 3, phase: 1, module: 'mod-02',
    title: 'The Intelligent Investor — Value Thinking',
    focus: 'The Intelligent Investor — Ch. 1–2',
    tasks: [
      { id: 'd15-t1', type: 'read',    label: 'Morning Read', detail: 'The Intelligent Investor', chapter: 'Ch. 1–2 — Investment vs Speculation & The Investor and Inflation (pp. 1–40)', duration: '30 min' },
      { id: 'd15-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Warren Buffett explains value investing principles simply', searchQuery: 'Warren Buffett explains value investing principles simply beginners', duration: '25 min' },
      { id: 'd15-t3', type: 'task',    label: 'Evening Task', detail: 'Apply value thinking to your pricing. Are you pricing based on cost-plus or value delivered? Write what your service is actually worth to the client in dollar terms.', duration: '25 min' },
      { id: 'd15-t4', type: 'reflect', label: 'Journal',      detail: 'Are you undercharging? What evidence do you have either way?', duration: '10 min' },
    ]
  },
  {
    day: 16, week: 3, phase: 2, module: 'mod-03',
    title: 'Good Strategy — The Kernel',
    focus: 'Good Strategy / Bad Strategy — Ch. 1–3',
    tasks: [
      { id: 'd16-t1', type: 'read',    label: 'Morning Read', detail: 'Good Strategy / Bad Strategy', chapter: 'Ch. 1–3 — What is Strategy & Discovering Power (pp. 1–57)', duration: '35 min' },
      { id: 'd16-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Richard Rumelt Good Strategy Bad Strategy summary and key ideas', searchQuery: 'Richard Rumelt Good Strategy Bad Strategy summary key concepts', duration: '20 min' },
      { id: 'd16-t3', type: 'task',    label: 'Evening Task', detail: 'Write your first draft Kernel of Strategy: (1) What is your honest diagnosis of your current situation? (2) What is your guiding policy? (3) What are your 3 coherent actions?', duration: '40 min' },
      { id: 'd16-t4', type: 'reflect', label: 'Journal',      detail: 'Is your current strategy "good strategy" by Rumelt\'s definition — or is it a list of goals dressed up as strategy?', duration: '10 min' },
    ]
  },
  {
    day: 17, week: 3, phase: 2, module: 'mod-03',
    title: "Porter's Five Forces",
    focus: 'Competitive Strategy — Core Framework',
    tasks: [
      { id: 'd17-t1', type: 'read',    label: 'Morning Read', detail: 'Competitive Strategy', chapter: 'Ch. 1 — The Five Competitive Forces That Shape Strategy (pp. 1–32)', duration: '35 min' },
      { id: 'd17-t2', type: 'watch',   label: 'Lunch Watch',  detail: "Porter's Five Forces analysis explained with real examples", searchQuery: "Michael Porter Five Forces framework explained real examples business", duration: '20 min' },
      { id: 'd17-t3', type: 'task',    label: 'Evening Task', detail: "Run Porter's Five Forces on your industry. Score each force 1–5 (1=weak, 5=strong). Write 2 sentences on each: supplier power, buyer power, rivalry, new entrants, substitutes.", duration: '45 min' },
      { id: 'd17-t4', type: 'reflect', label: 'Journal',      detail: 'Which of the 5 forces is your biggest threat? What is one concrete thing you could do to reduce its power over your business?', duration: '10 min' },
    ]
  },
  {
    day: 18, week: 3, phase: 2, module: 'mod-03',
    title: 'Competitive Advantage — Where to Play',
    focus: 'Playing to Win — Ch. 1–3',
    tasks: [
      { id: 'd18-t1', type: 'read',    label: 'Morning Read', detail: 'Playing to Win', chapter: 'Ch. 1–3 — Strategy is Choice & What is Winning (pp. 1–56)', duration: '35 min' },
      { id: 'd18-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Roger Martin Playing to Win strategy framework explained', searchQuery: 'Roger Martin Playing to Win strategy where to play how to win', duration: '25 min' },
      { id: 'd18-t3', type: 'task',    label: 'Evening Task', detail: 'Answer the 5 cascading choices for your business: (1) What is winning for you? (2) Where will you play? (3) How will you win? (4) What capabilities do you need? (5) What systems support this?', duration: '45 min' },
      { id: 'd18-t4', type: 'reflect', label: 'Journal',      detail: 'What market segment are you currently serving that you should STOP serving — because you cannot win there?', duration: '10 min' },
    ]
  },
  {
    day: 19, week: 3, phase: 2, module: 'mod-03',
    title: 'McKinsey Strategic Thinking',
    focus: 'Applied Strategy Frameworks',
    tasks: [
      { id: 'd19-t1', type: 'read',    label: 'Morning Read', detail: 'Good Strategy / Bad Strategy', chapter: 'Ch. 4–5 — Using Advantage & How to Think About Strategy (pp. 58–105)', duration: '30 min' },
      { id: 'd19-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'McKinsey strategic thinking frameworks for business leaders', searchQuery: 'McKinsey strategic thinking frameworks problem solving business', duration: '25 min' },
      { id: 'd19-t3', type: 'task',    label: 'Evening Task', detail: 'Do a SWOT analysis of your business. But go deeper — for each Strength, ask: is this actually a competitive advantage or just a feature? For each Opportunity, write the specific action to capture it.', duration: '40 min' },
      { id: 'd19-t4', type: 'reflect', label: 'Journal',      detail: 'What is the one thing your business does that a competitor genuinely cannot copy easily? If the answer is nothing — that is your most urgent strategic problem.', duration: '10 min' },
    ]
  },
  {
    day: 20, week: 3, phase: 2, module: 'mod-03',
    title: 'Strategy Deep Dive — Saturday',
    focus: 'Strategy Document Build Day',
    tasks: [
      { id: 'd20-t1', type: 'read',    label: 'Deep Read',   detail: 'Playing to Win', chapter: 'Ch. 4–6 — How to Win & Capabilities (pp. 57–118)', duration: '60 min' },
      { id: 'd20-t2', type: 'watch',   label: 'Watch Block', detail: 'Stanford GSB View from the Top — CEO strategy talk', searchQuery: 'Stanford GSB View from the Top CEO strategy interview 2024', duration: '50 min' },
      { id: 'd20-t3', type: 'task',    label: 'Project',     detail: 'Write your complete 1-page Strategy Document: (1) Market Diagnosis — where you are now, (2) Guiding Policy — how you compete, (3) 5 Coherent Actions — what you will actually do differently.', duration: '90 min' },
      { id: 'd20-t4', type: 'reflect', label: 'Weekly Review', detail: 'Is your strategy genuinely different from your competitors, or are you just doing the same thing slightly better?', duration: '20 min' },
    ]
  },
  {
    day: 21, week: 3, phase: 2, module: 'mod-03',
    title: 'Apply Day — Strategy in Action',
    focus: 'Strategy Sunday',
    tasks: [
      { id: 'd21-t1', type: 'watch',   label: 'Morning Watch', detail: 'HBR What is Strategy — Michael Porter full lecture', searchQuery: 'Michael Porter What is Strategy Harvard Business Review lecture', duration: '40 min' },
      { id: 'd21-t2', type: 'task',    label: 'Task 1',        detail: 'Map your 3 biggest competitors. For each: what is their strategy? Where do they play? How do they win? Write 3 lines on each.', duration: '40 min' },
      { id: 'd21-t3', type: 'task',    label: 'Task 2',        detail: 'Define the one market segment where YOU win consistently. Describe that client in detail. Write why you beat every competitor for that specific client.', duration: '35 min' },
      { id: 'd21-t4', type: 'reflect', label: 'Journal',       detail: 'Strategy week complete. What is the single most important strategic decision you need to make in the next 30 days?', duration: '15 min' },
    ]
  },

  // ══ WEEK 4 — Marketing & Brand Building ══
  {
    day: 22, week: 4, phase: 2, module: 'mod-04',
    title: 'StoryBrand — The Framework',
    focus: 'Building a StoryBrand — Ch. 1–3',
    tasks: [
      { id: 'd22-t1', type: 'read',    label: 'Morning Read', detail: 'Building a StoryBrand', chapter: 'Ch. 1–3 — The Story Framework & The Hero (pp. 1–54)', duration: '30 min' },
      { id: 'd22-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Donald Miller StoryBrand framework explained full', searchQuery: 'Donald Miller StoryBrand framework explained full talk', duration: '30 min' },
      { id: 'd22-t3', type: 'task',    label: 'Evening Task', detail: 'Write the first 3 elements of your BrandScript: (1) Who is your HERO (ideal client)? (2) What do they WANT? (3) What PROBLEM stands in their way (external, internal, philosophical)?', duration: '35 min' },
      { id: 'd22-t4', type: 'reflect', label: 'Journal',      detail: 'Is your current marketing talking about YOU or about your customer? Be honest.', duration: '10 min' },
    ]
  },
  {
    day: 23, week: 4, phase: 2, module: 'mod-04',
    title: 'StoryBrand — The Guide & The Plan',
    focus: 'Building a StoryBrand — Ch. 4–6',
    tasks: [
      { id: 'd23-t1', type: 'read',    label: 'Morning Read', detail: 'Building a StoryBrand', chapter: 'Ch. 4–6 — The Guide, The Plan & Calls to Action (pp. 55–112)', duration: '30 min' },
      { id: 'd23-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'How to write a StoryBrand one-liner for your business', searchQuery: 'How to write a StoryBrand one liner business pitch', duration: '20 min' },
      { id: 'd23-t3', type: 'task',    label: 'Evening Task', detail: 'Complete your BrandScript elements 4–6: (4) You as the GUIDE — what is your empathy statement and authority proof? (5) THE PLAN — your 3-step process. (6) CALL TO ACTION — direct and transitional.', duration: '40 min' },
      { id: 'd23-t4', type: 'reflect', label: 'Journal',      detail: 'Write your StoryBrand one-liner: "We help [HERO] who want [GOAL] by [YOUR PROCESS] so they can [SUCCESS OUTCOME]."', duration: '15 min' },
    ]
  },
  {
    day: 24, week: 4, phase: 2, module: 'mod-04',
    title: 'Positioning — Own a Word',
    focus: 'Positioning: The Battle for Your Mind — Ch. 1–5',
    tasks: [
      { id: 'd24-t1', type: 'read',    label: 'Morning Read', detail: 'Positioning: The Battle for Your Mind', chapter: 'Ch. 1–5 — What Positioning Is & Repositioning (pp. 1–60)', duration: '30 min' },
      { id: 'd24-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Seth Godin on positioning and being remarkable', searchQuery: 'Seth Godin positioning being remarkable purple cow talk', duration: '25 min' },
      { id: 'd24-t3', type: 'task',    label: 'Evening Task', detail: 'What WORD do you want to own in your customers mind? Write your positioning statement: "[Your brand] is the only [category] that [differentiator] for [target customer]."', duration: '30 min' },
      { id: 'd24-t4', type: 'reflect', label: 'Journal',      detail: 'If your top 5 clients were asked "what does [your business] do?" — what would they say? Is that the answer you want?', duration: '10 min' },
    ]
  },
  {
    day: 25, week: 4, phase: 2, module: 'mod-04',
    title: 'Why Things Spread — Contagious',
    focus: 'Contagious: Why Things Catch On — Ch. 1–3',
    tasks: [
      { id: 'd25-t1', type: 'read',    label: 'Morning Read', detail: 'Contagious: Why Things Catch On', chapter: 'Ch. 1–3 — Social Currency, Triggers & Emotion (pp. 1–91)', duration: '35 min' },
      { id: 'd25-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Jonah Berger Contagious why things go viral STEPPS framework', searchQuery: 'Jonah Berger Contagious STEPPS framework viral marketing talk', duration: '25 min' },
      { id: 'd25-t3', type: 'task',    label: 'Evening Task', detail: 'Score your business content on the first 3 STEPPS: Social Currency (1–10), Triggers (1–10), Emotion (1–10). Write what you would change to score higher on each.', duration: '30 min' },
      { id: 'd25-t4', type: 'reflect', label: 'Journal',      detail: 'What is one piece of content you could create this week that people would genuinely want to share?', duration: '10 min' },
    ]
  },
  {
    day: 26, week: 4, phase: 2, module: 'mod-04',
    title: 'Content & Brand Deep Dive — Saturday',
    focus: 'Marketing Build Day',
    tasks: [
      { id: 'd26-t1', type: 'read',    label: 'Deep Read',   detail: 'Contagious: Why Things Catch On', chapter: 'Ch. 4–6 — Public, Practical Value & Stories (pp. 92–198)', duration: '60 min' },
      { id: 'd26-t2', type: 'watch',   label: 'Watch Block', detail: 'Gary Vaynerchuk content strategy for B2B service businesses', searchQuery: 'Gary Vee content strategy B2B service business 2024', duration: '40 min' },
      { id: 'd26-t3', type: 'task',    label: 'Project',     detail: 'Build your 90-day content calendar. For each week: 1 educational post, 1 story/case study, 1 direct offer. Fill in 4 weeks of specific topics mapped to your StoryBrand framework.', duration: '90 min' },
      { id: 'd26-t4', type: 'reflect', label: 'Weekly Review', detail: 'What is the #1 marketing activity that has brought you the most clients to date? Are you doing enough of it?', duration: '20 min' },
    ]
  },
  {
    day: 27, week: 4, phase: 2, module: 'mod-04',
    title: 'Apply Day — Rebuild Your Messaging',
    focus: 'Marketing Sunday',
    tasks: [
      { id: 'd27-t1', type: 'watch',   label: 'Morning Watch', detail: 'The One Page Marketing Plan Allan Dib — book summary and key concepts', searchQuery: 'Allan Dib One Page Marketing Plan summary key concepts', duration: '30 min' },
      { id: 'd27-t2', type: 'task',    label: 'Task 1',        detail: 'Rewrite your website homepage hero section using StoryBrand: Headline (what you offer + who for), Sub-headline (how you make life better), 3 benefit bullets, CTA button. Write the copy.', duration: '45 min' },
      { id: 'd27-t3', type: 'task',    label: 'Task 2',        detail: 'Complete your One Page Marketing Plan: (1) Target market, (2) Your message, (3) Channels, (4) Lead capture, (5) Lead nurture, (6) Sales conversion, (7) Deliver, (8) Retain, (9) Referrals.', duration: '60 min' },
      { id: 'd27-t4', type: 'reflect', label: 'Journal',       detail: 'Marketing week done. What is the one marketing change you will implement THIS week — not next month, this week?', duration: '15 min' },
    ]
  },

  // ══ WEEK 5 — Sales Mastery ══
  {
    day: 28, week: 5, phase: 2, module: 'mod-05',
    title: 'Never Split the Difference',
    focus: 'FBI Negotiation — Ch. 1–3',
    tasks: [
      { id: 'd28-t1', type: 'read',    label: 'Morning Read', detail: 'Never Split the Difference', chapter: 'Ch. 1–3 — The New Rules & Be a Mirror (pp. 1–72)', duration: '30 min' },
      { id: 'd28-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Chris Voss negotiation techniques for sales and business', searchQuery: 'Chris Voss negotiation techniques sales business Never Split Difference', duration: '30 min' },
      { id: 'd28-t3', type: 'task',    label: 'Evening Task', detail: 'Write your 3 most common sales objections. For each one, write a Voss-style response using labeling: "It seems like..." or "It sounds like..." then a calibrated question.', duration: '35 min' },
      { id: 'd28-t4', type: 'reflect', label: 'Journal',      detail: 'Think of a deal you lost recently. Which negotiation mistake did you make? What would you do differently using Voss techniques?', duration: '10 min' },
    ]
  },
  {
    day: 29, week: 5, phase: 2, module: 'mod-05',
    title: 'SPIN Selling — The Framework',
    focus: 'SPIN Selling — Ch. 1–5',
    tasks: [
      { id: 'd29-t1', type: 'read',    label: 'Morning Read', detail: 'SPIN Selling', chapter: 'Ch. 1–5 — Sales Behavior & The SPIN Strategy (pp. 1–102)', duration: '35 min' },
      { id: 'd29-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'SPIN Selling explained with real examples B2B consultative selling', searchQuery: 'SPIN Selling explained real examples B2B consultative Neil Rackham', duration: '25 min' },
      { id: 'd29-t3', type: 'task',    label: 'Evening Task', detail: 'Write your SPIN discovery script: 3 Situation questions, 3 Problem questions, 3 Implication questions, 3 Need-Payoff questions — specific to YOUR business and YOUR ideal client.', duration: '45 min' },
      { id: 'd29-t4', type: 'reflect', label: 'Journal',      detail: 'In your last 5 sales conversations — were you doing most of the talking or asking questions? What does that tell you?', duration: '10 min' },
    ]
  },
  {
    day: 30, week: 5, phase: 2, module: 'mod-05',
    title: 'The Challenger Sale',
    focus: 'The Challenger Sale — Ch. 1–4',
    tasks: [
      { id: 'd30-t1', type: 'read',    label: 'Morning Read', detail: 'The Challenger Sale', chapter: 'Ch. 1–4 — The Evolving World of B2B Sales & The Challenger (pp. 1–87)', duration: '35 min' },
      { id: 'd30-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Challenger Sales model teach tailor take control explained', searchQuery: 'Challenger Sale model teach tailor take control sales explained', duration: '25 min' },
      { id: 'd30-t3', type: 'task',    label: 'Evening Task', detail: 'Write your "Teach" pitch — what insight can you share with a prospect that they don\'t already know, that naturally leads to your solution? Write a 5-sentence commercial teaching script.', duration: '40 min' },
      { id: 'd30-t4', type: 'reflect', label: 'Journal',      detail: 'What is something counterintuitive about your industry that you could use to reframe how prospects think?', duration: '10 min' },
    ]
  },
]

// Get today's plan based on enrollment date
export function getTodayPlan(enrolledAt: Date): DayPlan | null {
  const daysElapsed = Math.floor((Date.now() - enrolledAt.getTime()) / 86400000)
  const dayNumber = daysElapsed + 1
  return DAILY_PLAN.find(d => d.day === dayNumber) || DAILY_PLAN[DAILY_PLAN.length - 1]
}

export function getPlanByDay(day: number): DayPlan | null {
  return DAILY_PLAN.find(d => d.day === day) || null
}

export function getWeekDays(week: number): DayPlan[] {
  return DAILY_PLAN.filter(d => d.week === week)
}

export const TOTAL_PLANNED_DAYS = DAILY_PLAN.length
export const TOTAL_WEEKS = Math.max(...DAILY_PLAN.map(d => d.week))
