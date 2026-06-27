export type DayTask = {
  id: string
  type: 'read' | 'watch' | 'task' | 'reflect'
  label: string
  detail: string
  duration: string
  searchQuery?: string
  chapter?: string
  // Links to module-level progress so daily completions sync to the progress bar
  moduleId?: string
  progressTaskId?: string  // maps to Task.id in curriculum.ts
  progressBookId?: string  // maps to Book.id in curriculum.ts (for read tasks)
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

export const DAILY_PLAN: DayPlan[] = [

  // ══ WEEK 1 — The Personal MBA: Value Creation & Business Fundamentals ══
  {
    day: 1, week: 1, phase: 1, module: 'mod-01',
    title: 'What is a Business?',
    focus: 'The Personal MBA — Understanding Value Creation',
    tasks: [
      { id: 'd1-t1', type: 'read',    label: 'Morning Read', detail: 'The Personal MBA', chapter: 'Ch. 1 — Value Creation (pp. 1–28)', duration: '30 min', moduleId: 'mod-01', progressBookId: 'b-01-1' },
      { id: 'd1-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'How to Start a Startup — Sam Altman', searchQuery: 'Sam Altman How to Start a Startup YC Lecture 1', duration: '45 min' },
      { id: 'd1-t3', type: 'task',    label: 'Evening Task', detail: 'Write one paragraph: what does your business actually do for its customers? Be specific — no jargon.', duration: '20 min', moduleId: 'mod-01', progressTaskId: 't-01-1' },
      { id: 'd1-t4', type: 'reflect', label: 'Journal',      detail: 'What was the biggest insight from today? How does it apply to your business?', duration: '10 min' },
    ]
  },
  {
    day: 2, week: 1, phase: 1, module: 'mod-01',
    title: 'The 12 Forms of Value',
    focus: 'The Personal MBA — Forms of Value',
    tasks: [
      { id: 'd2-t1', type: 'read',    label: 'Morning Read', detail: 'The Personal MBA', chapter: 'Ch. 1 — The 12 Forms of Value (pp. 29–52)', duration: '30 min', moduleId: 'mod-01', progressBookId: 'b-01-1' },
      { id: 'd2-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Value Proposition Design explained simply', searchQuery: 'Value Proposition Design Alex Osterwalder explained', duration: '20 min' },
      { id: 'd2-t3', type: 'task',    label: 'Evening Task', detail: 'List which of the 12 forms of value your business currently delivers. Circle your top 2. Write why those two are your strongest.', duration: '25 min', moduleId: 'mod-01', progressTaskId: 't-01-2' },
      { id: 'd2-t4', type: 'reflect', label: 'Journal',      detail: 'Is there a form of value you are NOT delivering that your customers actually want?', duration: '10 min' },
    ]
  },
  {
    day: 3, week: 1, phase: 1, module: 'mod-01',
    title: 'Markets & Customers',
    focus: 'The Personal MBA — Understanding Your Market',
    tasks: [
      { id: 'd3-t1', type: 'read',    label: 'Morning Read', detail: 'The Personal MBA', chapter: 'Ch. 2 — Marketing (pp. 53–78)', duration: '30 min', moduleId: 'mod-01', progressBookId: 'b-01-1' },
      { id: 'd3-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'How to find your target market and ideal customer', searchQuery: 'How to identify your target market startup founders YC', duration: '20 min' },
      { id: 'd3-t3', type: 'task',    label: 'Evening Task', detail: 'Write a 1-paragraph description of your single most important customer. Name them. Age. Job. What keeps them up at night.', duration: '30 min', moduleId: 'mod-01', progressTaskId: 't-01-3' },
      { id: 'd3-t4', type: 'reflect', label: 'Journal',      detail: 'Do you actually know your customer well enough? What would you need to learn?', duration: '10 min' },
    ]
  },
  {
    day: 4, week: 1, phase: 1, module: 'mod-01',
    title: 'Sales & Value Delivery',
    focus: 'The Personal MBA — Sales Fundamentals',
    tasks: [
      { id: 'd4-t1', type: 'read',    label: 'Morning Read', detail: 'The Personal MBA', chapter: 'Ch. 3 — Sales (pp. 79–108)', duration: '30 min', moduleId: 'mod-01', progressBookId: 'b-01-1' },
      { id: 'd4-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Sales fundamentals for founders with no sales background', searchQuery: 'Sales for founders no experience how to sell startup', duration: '25 min' },
      { id: 'd4-t3', type: 'task',    label: 'Evening Task', detail: 'Map your current sales process step by step from first contact to signed deal. Identify where you lose most prospects.', duration: '30 min', moduleId: 'mod-01', progressTaskId: 't-01-4' },
      { id: 'd4-t4', type: 'reflect', label: 'Journal',      detail: 'What is the #1 reason prospects say no to you? Write your honest answer.', duration: '10 min' },
    ]
  },
  {
    day: 5, week: 1, phase: 1, module: 'mod-01',
    title: 'Value Delivery & Finance',
    focus: 'The Personal MBA — Operations & Finance',
    tasks: [
      { id: 'd5-t1', type: 'read',    label: 'Morning Read', detail: 'The Personal MBA', chapter: 'Ch. 4–5 — Value Delivery & Finance (pp. 109–148)', duration: '35 min', moduleId: 'mod-01', progressBookId: 'b-01-1' },
      { id: 'd5-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Cash flow basics for small business owners explained simply', searchQuery: 'Cash flow basics small business explained simply', duration: '20 min' },
      { id: 'd5-t3', type: 'task',    label: 'Evening Task', detail: 'Write down your business revenue for last month and your 3 biggest costs. Calculate your rough profit margin.', duration: '25 min', moduleId: 'mod-01', progressTaskId: 't-01-5' },
      { id: 'd5-t4', type: 'reflect', label: 'Journal',      detail: 'Are you profitable? If not, what is the one change that would make the biggest difference?', duration: '10 min' },
    ]
  },
  {
    day: 6, week: 1, phase: 1, module: 'mod-01',
    title: 'Mental Models — Deep Dive Saturday',
    focus: 'Thinking in Systems + Business Model Snapshot',
    tasks: [
      { id: 'd6-t1', type: 'read',    label: 'Deep Read',     detail: 'Thinking in Systems', chapter: 'Ch. 1 — The Basics: How System Structure Produces System Behavior (pp. 1–34)', duration: '60 min', moduleId: 'mod-01', progressBookId: 'b-01-2' },
      { id: 'd6-t2', type: 'watch',   label: 'Watch Block',   detail: 'Farnam Street Mental Models overview — full talk', searchQuery: 'Shane Parrish Farnam Street mental models decision making talk', duration: '45 min' },
      { id: 'd6-t3', type: 'task',    label: 'Project',       detail: 'Draw your business as a system. Use boxes and arrows. Inputs → Process → Outputs. Show what reinforces growth and what creates drag.', duration: '60 min', moduleId: 'mod-01', progressTaskId: 't-01-4' },
      { id: 'd6-t4', type: 'reflect', label: 'Weekly Review', detail: 'What were your 3 biggest insights from Week 1? What will you do differently in your business next week?', duration: '20 min' },
    ]
  },
  {
    day: 7, week: 1, phase: 1, module: 'mod-01',
    title: 'Apply Day — Business Model Snapshot',
    focus: 'Gmax Application Sunday',
    tasks: [
      { id: 'd7-t1', type: 'read',    label: 'Light Review',      detail: 'Re-read your notes from Days 1–6. Highlight the 5 most important ideas.', chapter: 'Your notes', duration: '20 min' },
      { id: 'd7-t2', type: 'watch',   label: 'Watch',             detail: 'How the Economic Machine Works — Ray Dalio (foundational context)', searchQuery: 'Ray Dalio How the Economic Machine Works', duration: '31 min' },
      { id: 'd7-t3', type: 'task',    label: 'Major Deliverable', detail: 'Write your 1-page Business Model Snapshot: (1) What you do, (2) Who you serve, (3) How you make money, (4) Your biggest strength, (5) Your biggest weakness, (6) One thing you will change this month.', duration: '90 min', moduleId: 'mod-01', progressTaskId: 't-01-5' },
      { id: 'd7-t4', type: 'reflect', label: 'Journal',           detail: 'What surprised you most about your own business this week when you looked at it through these frameworks?', duration: '15 min' },
    ]
  },

  // ══ WEEK 2 — Mental Models + Financial Intelligence Intro ══
  {
    day: 8, week: 2, phase: 1, module: 'mod-01',
    title: 'Systems Thinking — Stocks & Flows',
    focus: 'Thinking in Systems — Ch. 2',
    tasks: [
      { id: 'd8-t1', type: 'read',    label: 'Morning Read', detail: 'Thinking in Systems', chapter: 'Ch. 2 — A Brief Visit to the Systems Zoo (pp. 35–76)', duration: '35 min', moduleId: 'mod-01', progressBookId: 'b-01-2' },
      { id: 'd8-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Systems thinking explained with business examples', searchQuery: 'Systems thinking business examples feedback loops explained', duration: '20 min' },
      { id: 'd8-t3', type: 'task',    label: 'Evening Task', detail: 'Identify 3 feedback loops in your business. Label them: reinforcing (growth) or balancing (limiting). Write what drives each one.', duration: '25 min', moduleId: 'mod-01', progressTaskId: 't-01-1' },
      { id: 'd8-t4', type: 'reflect', label: 'Journal',      detail: 'Which feedback loop is most critical to your growth right now?', duration: '10 min' },
    ]
  },
  {
    day: 9, week: 2, phase: 1, module: 'mod-01',
    title: "Charlie Munger — Mental Models",
    focus: "Poor Charlie's Almanack — Introduction",
    tasks: [
      { id: 'd9-t1', type: 'read',    label: 'Morning Read', detail: "Poor Charlie's Almanack", chapter: 'Introduction + The Art of Stock Picking (pp. 1–60)', duration: '30 min', moduleId: 'mod-01', progressBookId: 'b-01-3' },
      { id: 'd9-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Charlie Munger mental models compilation — best talks', searchQuery: 'Charlie Munger mental models best speeches compilation', duration: '30 min' },
      { id: 'd9-t3', type: 'task',    label: 'Evening Task', detail: 'Pick 3 mental models from Munger (inversion, first principles, opportunity cost). Write one sentence applying each to your business.', duration: '20 min', moduleId: 'mod-01', progressTaskId: 't-01-2' },
      { id: 'd9-t4', type: 'reflect', label: 'Journal',      detail: "What would happen if you INVERTED your biggest business assumption? (Munger's inversion technique)", duration: '10 min' },
    ]
  },
  {
    day: 10, week: 2, phase: 1, module: 'mod-01',
    title: 'Munger — Psychology of Human Misjudgment',
    focus: "Poor Charlie's Almanack — Psychology",
    tasks: [
      { id: 'd10-t1', type: 'read',    label: 'Morning Read', detail: "Poor Charlie's Almanack", chapter: 'The Psychology of Human Misjudgment (pp. 180–236)', duration: '35 min', moduleId: 'mod-01', progressBookId: 'b-01-3' },
      { id: 'd10-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Cognitive biases that affect business decisions', searchQuery: 'Cognitive biases business decisions entrepreneurs avoid', duration: '20 min' },
      { id: 'd10-t3', type: 'task',    label: 'Evening Task', detail: 'List 3 recent business decisions. For each one, identify which cognitive bias may have influenced you. Be brutally honest.', duration: '25 min', moduleId: 'mod-01', progressTaskId: 't-01-3' },
      { id: 'd10-t4', type: 'reflect', label: 'Journal',      detail: 'What is a decision you keep postponing because of bias? What would you do if you had to decide right now?', duration: '10 min' },
    ]
  },
  {
    day: 11, week: 2, phase: 1, module: 'mod-02',
    title: 'Financial Intelligence — Reading Numbers',
    focus: 'Financial Intelligence — Ch. 1–3',
    tasks: [
      { id: 'd11-t1', type: 'read',    label: 'Morning Read', detail: 'Financial Intelligence', chapter: 'Ch. 1–3 — The Art of Finance & The Income Statement (pp. 1–55)', duration: '35 min', moduleId: 'mod-02', progressBookId: 'b-02-1' },
      { id: 'd11-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'How to read a Profit and Loss statement for beginners', searchQuery: 'How to read a profit and loss statement small business beginners', duration: '20 min' },
      { id: 'd11-t3', type: 'task',    label: 'Evening Task', detail: 'Open your accounting software or bank statement. Identify your Revenue, COGS, and Gross Profit for last month. Write the numbers down.', duration: '30 min', moduleId: 'mod-02', progressTaskId: 't-02-1' },
      { id: 'd11-t4', type: 'reflect', label: 'Journal',      detail: 'Do you know your gross margin? What does that number tell you about your business health?', duration: '10 min' },
    ]
  },
  {
    day: 12, week: 2, phase: 1, module: 'mod-02',
    title: 'The Balance Sheet',
    focus: 'Financial Intelligence — Ch. 4–6',
    tasks: [
      { id: 'd12-t1', type: 'read',    label: 'Morning Read', detail: 'Financial Intelligence', chapter: 'Ch. 4–6 — The Balance Sheet & Cash Flow (pp. 56–102)', duration: '35 min', moduleId: 'mod-02', progressBookId: 'b-02-1' },
      { id: 'd12-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Balance sheet explained for entrepreneurs and founders', searchQuery: 'Balance sheet explained entrepreneurs non-accountants simple', duration: '20 min' },
      { id: 'd12-t3', type: 'task',    label: 'Evening Task', detail: 'Build a simple balance sheet for your business: list your assets (cash, equipment, receivables) and liabilities (loans, bills owed). Calculate net worth.', duration: '40 min', moduleId: 'mod-02', progressTaskId: 't-02-4' },
      { id: 'd12-t4', type: 'reflect', label: 'Journal',      detail: "What does your balance sheet reveal about your business that your bank balance doesn't show?", duration: '10 min' },
    ]
  },
  {
    day: 13, week: 2, phase: 1, module: 'mod-02',
    title: 'Cash Flow Deep Dive — Saturday',
    focus: 'Financial Intelligence + Damodaran Intro',
    tasks: [
      { id: 'd13-t1', type: 'read',    label: 'Deep Read',    detail: 'Financial Intelligence', chapter: 'Ch. 7–9 — The Cash Flow Statement & Financial Ratios (pp. 103–148)', duration: '60 min', moduleId: 'mod-02', progressBookId: 'b-02-1' },
      { id: 'd13-t2', type: 'watch',   label: 'Watch Block',  detail: 'Aswath Damodaran Introduction to Corporate Finance — Session 1', searchQuery: 'Aswath Damodaran Introduction Corporate Finance session 1 NYU', duration: '60 min' },
      { id: 'd13-t3', type: 'task',    label: 'Project',      detail: 'Build your 6-month cash flow projection in a spreadsheet. List every expected income source and every expected expense by month.', duration: '75 min', moduleId: 'mod-02', progressTaskId: 't-02-5' },
      { id: 'd13-t4', type: 'reflect', label: 'Weekly Review', detail: 'Based on your cash flow projection — do you have a cash problem coming? What is the one change that improves the picture most?', duration: '20 min' },
    ]
  },
  {
    day: 14, week: 2, phase: 1, module: 'mod-02',
    title: 'Apply Day — Financial Snapshot',
    focus: 'Gmax Financial Dashboard Sunday',
    tasks: [
      { id: 'd14-t1', type: 'read',    label: 'Review',            detail: 'Accounting Made Simple', chapter: 'Ch. 1–3 — Basic Accounting Concepts (pp. 1–50)', duration: '30 min', moduleId: 'mod-02', progressBookId: 'b-02-2' },
      { id: 'd14-t2', type: 'watch',   label: 'Watch',             detail: 'Key financial metrics every business owner must track', searchQuery: 'Key financial metrics every business owner must track LTV CAC margin', duration: '25 min' },
      { id: 'd14-t3', type: 'task',    label: 'Major Deliverable', detail: 'Complete your Financial Snapshot: (1) Monthly Revenue, (2) Gross Margin %, (3) LTV per client, (4) CAC per client, (5) LTV:CAC ratio, (6) Monthly burn or profit.', duration: '90 min', moduleId: 'mod-02', progressTaskId: 't-02-2' },
      { id: 'd14-t4', type: 'reflect', label: 'Journal',           detail: 'What is the one financial metric that, if improved by 20%, would transform your business?', duration: '15 min' },
    ]
  },

  // ══ WEEK 3 — Strategy Foundations ══
  {
    day: 15, week: 3, phase: 1, module: 'mod-02',
    title: 'The Intelligent Investor — Value Thinking',
    focus: 'The Intelligent Investor — Ch. 1–2',
    tasks: [
      { id: 'd15-t1', type: 'read',    label: 'Morning Read', detail: 'The Intelligent Investor', chapter: 'Ch. 1–2 — Investment vs Speculation & Inflation (pp. 1–40)', duration: '30 min', moduleId: 'mod-02', progressBookId: 'b-02-3' },
      { id: 'd15-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Warren Buffett explains value investing principles simply', searchQuery: 'Warren Buffett explains value investing principles simply beginners', duration: '25 min' },
      { id: 'd15-t3', type: 'task',    label: 'Evening Task', detail: 'Apply value thinking to your pricing. Are you pricing based on cost-plus or value delivered? Write what your service is actually worth to the client in dollar terms.', duration: '25 min', moduleId: 'mod-02', progressTaskId: 't-02-3' },
      { id: 'd15-t4', type: 'reflect', label: 'Journal',      detail: 'Are you undercharging? What evidence do you have either way?', duration: '10 min' },
    ]
  },
  {
    day: 16, week: 3, phase: 2, module: 'mod-03',
    title: 'Good Strategy — The Kernel',
    focus: 'Good Strategy / Bad Strategy — Ch. 1–3',
    tasks: [
      { id: 'd16-t1', type: 'read',    label: 'Morning Read', detail: 'Good Strategy / Bad Strategy', chapter: 'Ch. 1–3 — What is Strategy & Discovering Power (pp. 1–57)', duration: '35 min', moduleId: 'mod-03', progressBookId: 'b-03-1' },
      { id: 'd16-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Richard Rumelt Good Strategy Bad Strategy summary and key ideas', searchQuery: 'Richard Rumelt Good Strategy Bad Strategy summary key concepts', duration: '20 min' },
      { id: 'd16-t3', type: 'task',    label: 'Evening Task', detail: "Write your first draft Kernel of Strategy: (1) What is your honest diagnosis? (2) What is your guiding policy? (3) What are your 3 coherent actions?", duration: '40 min', moduleId: 'mod-03', progressTaskId: 't-03-3' },
      { id: 'd16-t4', type: 'reflect', label: 'Journal',      detail: "Is your current strategy 'good strategy' by Rumelt's definition — or is it a list of goals dressed up as strategy?", duration: '10 min' },
    ]
  },
  {
    day: 17, week: 3, phase: 2, module: 'mod-03',
    title: "Porter's Five Forces",
    focus: 'Competitive Strategy — Core Framework',
    tasks: [
      { id: 'd17-t1', type: 'read',    label: 'Morning Read', detail: 'Competitive Strategy', chapter: 'Ch. 1 — The Five Competitive Forces That Shape Strategy (pp. 1–32)', duration: '35 min', moduleId: 'mod-03', progressBookId: 'b-03-2' },
      { id: 'd17-t2', type: 'watch',   label: 'Lunch Watch',  detail: "Porter's Five Forces analysis explained with real examples", searchQuery: "Michael Porter Five Forces framework explained real examples business", duration: '20 min' },
      { id: 'd17-t3', type: 'task',    label: 'Evening Task', detail: "Run Porter's Five Forces on your industry. Score each force 1–5. Write 2 sentences on each: supplier power, buyer power, rivalry, new entrants, substitutes.", duration: '45 min', moduleId: 'mod-03', progressTaskId: 't-03-1' },
      { id: 'd17-t4', type: 'reflect', label: 'Journal',      detail: 'Which of the 5 forces is your biggest threat? What is one concrete thing you could do to reduce its power?', duration: '10 min' },
    ]
  },
  {
    day: 18, week: 3, phase: 2, module: 'mod-03',
    title: 'Competitive Advantage — Where to Play',
    focus: 'Playing to Win — Ch. 1–3',
    tasks: [
      { id: 'd18-t1', type: 'read',    label: 'Morning Read', detail: 'Playing to Win', chapter: "Ch. 1–3 — Strategy is Choice & What is Winning (pp. 1–56)", duration: '35 min', moduleId: 'mod-03', progressBookId: 'b-03-3' },
      { id: 'd18-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Roger Martin Playing to Win strategy framework explained', searchQuery: 'Roger Martin Playing to Win strategy where to play how to win', duration: '25 min' },
      { id: 'd18-t3', type: 'task',    label: 'Evening Task', detail: 'Answer the 5 cascading choices: (1) What is winning for you? (2) Where will you play? (3) How will you win? (4) What capabilities do you need? (5) What systems support this?', duration: '45 min', moduleId: 'mod-03', progressTaskId: 't-03-2' },
      { id: 'd18-t4', type: 'reflect', label: 'Journal',      detail: 'What market segment are you currently serving that you should STOP serving — because you cannot win there?', duration: '10 min' },
    ]
  },
  {
    day: 19, week: 3, phase: 2, module: 'mod-03',
    title: 'McKinsey Strategic Thinking',
    focus: 'Applied Strategy Frameworks',
    tasks: [
      { id: 'd19-t1', type: 'read',    label: 'Morning Read', detail: 'Good Strategy / Bad Strategy', chapter: 'Ch. 4–5 — Using Advantage & How to Think About Strategy (pp. 58–105)', duration: '30 min', moduleId: 'mod-03', progressBookId: 'b-03-1' },
      { id: 'd19-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'McKinsey strategic thinking frameworks for business leaders', searchQuery: 'McKinsey strategic thinking frameworks problem solving business', duration: '25 min' },
      { id: 'd19-t3', type: 'task',    label: 'Evening Task', detail: "Do a SWOT analysis of your business. For each Strength, ask: is this actually a competitive advantage? For each Opportunity, write the specific action to capture it.", duration: '40 min', moduleId: 'mod-03', progressTaskId: 't-03-4' },
      { id: 'd19-t4', type: 'reflect', label: 'Journal',      detail: "What is the one thing your business does that a competitor genuinely cannot copy easily? If the answer is nothing — that is your most urgent strategic problem.", duration: '10 min' },
    ]
  },
  {
    day: 20, week: 3, phase: 2, module: 'mod-03',
    title: 'Strategy Deep Dive — Saturday',
    focus: 'Strategy Document Build Day',
    tasks: [
      { id: 'd20-t1', type: 'read',    label: 'Deep Read',    detail: 'Playing to Win', chapter: 'Ch. 4–6 — How to Win & Capabilities (pp. 57–118)', duration: '60 min', moduleId: 'mod-03', progressBookId: 'b-03-3' },
      { id: 'd20-t2', type: 'watch',   label: 'Watch Block',  detail: 'Stanford GSB View from the Top — CEO strategy talk', searchQuery: 'Stanford GSB View from the Top CEO strategy interview 2024', duration: '50 min' },
      { id: 'd20-t3', type: 'task',    label: 'Project',      detail: 'Write your complete 1-page Strategy Document: (1) Market Diagnosis, (2) Guiding Policy, (3) 5 Coherent Actions you will actually do differently.', duration: '90 min', moduleId: 'mod-03', progressTaskId: 't-03-3' },
      { id: 'd20-t4', type: 'reflect', label: 'Weekly Review', detail: 'Is your strategy genuinely different from your competitors, or are you just doing the same thing slightly better?', duration: '20 min' },
    ]
  },
  {
    day: 21, week: 3, phase: 2, module: 'mod-03',
    title: 'Apply Day — Strategy in Action',
    focus: 'Strategy Sunday',
    tasks: [
      { id: 'd21-t1', type: 'watch',   label: 'Morning Watch', detail: 'HBR What is Strategy — Michael Porter full lecture', searchQuery: 'Michael Porter What is Strategy Harvard Business Review lecture', duration: '40 min' },
      { id: 'd21-t2', type: 'task',    label: 'Task 1',        detail: 'Map your 3 biggest competitors. For each: what is their strategy? Where do they play? How do they win? Write 3 lines on each.', duration: '40 min', moduleId: 'mod-03', progressTaskId: 't-03-1' },
      { id: 'd21-t3', type: 'task',    label: 'Task 2',        detail: 'Define the one market segment where YOU win consistently. Describe that client in detail. Write why you beat every competitor for that specific client.', duration: '35 min', moduleId: 'mod-03', progressTaskId: 't-03-5' },
      { id: 'd21-t4', type: 'reflect', label: 'Journal',       detail: 'Strategy week complete. What is the single most important strategic decision you need to make in the next 30 days?', duration: '15 min' },
    ]
  },

  // ══ WEEK 4 — Marketing & Brand Building ══
  {
    day: 22, week: 4, phase: 2, module: 'mod-04',
    title: 'StoryBrand — The Framework',
    focus: 'Building a StoryBrand — Ch. 1–3',
    tasks: [
      { id: 'd22-t1', type: 'read',    label: 'Morning Read', detail: 'Building a StoryBrand', chapter: 'Ch. 1–3 — The Story Framework & The Hero (pp. 1–54)', duration: '30 min', moduleId: 'mod-04', progressBookId: 'b-04-1' },
      { id: 'd22-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Donald Miller StoryBrand framework explained full', searchQuery: 'Donald Miller StoryBrand framework explained full talk', duration: '30 min' },
      { id: 'd22-t3', type: 'task',    label: 'Evening Task', detail: 'Write the first 3 elements of your BrandScript: (1) Who is your HERO? (2) What do they WANT? (3) What PROBLEM stands in their way?', duration: '35 min', moduleId: 'mod-04', progressTaskId: 't-04-1' },
      { id: 'd22-t4', type: 'reflect', label: 'Journal',      detail: 'Is your current marketing talking about YOU or about your customer? Be honest.', duration: '10 min' },
    ]
  },
  {
    day: 23, week: 4, phase: 2, module: 'mod-04',
    title: 'StoryBrand — The Guide & The Plan',
    focus: 'Building a StoryBrand — Ch. 4–6',
    tasks: [
      { id: 'd23-t1', type: 'read',    label: 'Morning Read', detail: 'Building a StoryBrand', chapter: 'Ch. 4–6 — The Guide, The Plan & Calls to Action (pp. 55–112)', duration: '30 min', moduleId: 'mod-04', progressBookId: 'b-04-1' },
      { id: 'd23-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'How to write a StoryBrand one-liner for your business', searchQuery: 'How to write a StoryBrand one liner business pitch', duration: '20 min' },
      { id: 'd23-t3', type: 'task',    label: 'Evening Task', detail: 'Complete your BrandScript elements 4–6: (4) You as the GUIDE — empathy + authority. (5) THE PLAN — your 3-step process. (6) CALL TO ACTION.', duration: '40 min', moduleId: 'mod-04', progressTaskId: 't-04-4' },
      { id: 'd23-t4', type: 'reflect', label: 'Journal',      detail: 'Write your StoryBrand one-liner: "We help [HERO] who want [GOAL] by [YOUR PROCESS] so they can [SUCCESS OUTCOME]."', duration: '15 min' },
    ]
  },
  {
    day: 24, week: 4, phase: 2, module: 'mod-04',
    title: 'Positioning — Own a Word',
    focus: 'Positioning: The Battle for Your Mind — Ch. 1–5',
    tasks: [
      { id: 'd24-t1', type: 'read',    label: 'Morning Read', detail: 'Positioning: The Battle for Your Mind', chapter: 'Ch. 1–5 — What Positioning Is & Repositioning (pp. 1–60)', duration: '30 min', moduleId: 'mod-04', progressBookId: 'b-04-2' },
      { id: 'd24-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Seth Godin on positioning and being remarkable', searchQuery: 'Seth Godin positioning being remarkable purple cow talk', duration: '25 min' },
      { id: 'd24-t3', type: 'task',    label: 'Evening Task', detail: 'What WORD do you want to own in your customer\'s mind? Write your positioning statement: "[Your brand] is the only [category] that [differentiator] for [target customer]."', duration: '30 min', moduleId: 'mod-04', progressTaskId: 't-04-3' },
      { id: 'd24-t4', type: 'reflect', label: 'Journal',      detail: "If your top 5 clients were asked 'what does [your business] do?' — what would they say? Is that the answer you want?", duration: '10 min' },
    ]
  },
  {
    day: 25, week: 4, phase: 2, module: 'mod-04',
    title: 'Why Things Spread — Contagious',
    focus: 'Contagious: Why Things Catch On — Ch. 1–3',
    tasks: [
      { id: 'd25-t1', type: 'read',    label: 'Morning Read', detail: 'Contagious: Why Things Catch On', chapter: 'Ch. 1–3 — Social Currency, Triggers & Emotion (pp. 1–91)', duration: '35 min', moduleId: 'mod-04', progressBookId: 'b-04-3' },
      { id: 'd25-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Jonah Berger Contagious why things go viral STEPPS framework', searchQuery: 'Jonah Berger Contagious STEPPS framework viral marketing talk', duration: '25 min' },
      { id: 'd25-t3', type: 'task',    label: 'Evening Task', detail: 'Score your business content on the first 3 STEPPS: Social Currency (1–10), Triggers (1–10), Emotion (1–10). Write what you would change to score higher on each.', duration: '30 min', moduleId: 'mod-04', progressTaskId: 't-04-5' },
      { id: 'd25-t4', type: 'reflect', label: 'Journal',      detail: 'What is one piece of content you could create this week that people would genuinely want to share?', duration: '10 min' },
    ]
  },
  {
    day: 26, week: 4, phase: 2, module: 'mod-04',
    title: 'Content & Brand Deep Dive — Saturday',
    focus: 'Marketing Build Day',
    tasks: [
      { id: 'd26-t1', type: 'read',    label: 'Deep Read',    detail: 'Contagious: Why Things Catch On', chapter: 'Ch. 4–6 — Public, Practical Value & Stories (pp. 92–198)', duration: '60 min', moduleId: 'mod-04', progressBookId: 'b-04-3' },
      { id: 'd26-t2', type: 'watch',   label: 'Watch Block',  detail: 'Gary Vaynerchuk content strategy for B2B service businesses', searchQuery: 'Gary Vee content strategy B2B service business 2024', duration: '40 min' },
      { id: 'd26-t3', type: 'task',    label: 'Project',      detail: 'Build your 90-day content calendar. For each week: 1 educational post, 1 story/case study, 1 direct offer. Fill in 4 weeks of specific topics mapped to your StoryBrand framework.', duration: '90 min', moduleId: 'mod-04', progressTaskId: 't-04-5' },
      { id: 'd26-t4', type: 'reflect', label: 'Weekly Review', detail: 'What is the #1 marketing activity that has brought you the most clients to date? Are you doing enough of it?', duration: '20 min' },
    ]
  },
  {
    day: 27, week: 4, phase: 2, module: 'mod-04',
    title: 'Apply Day — Rebuild Your Messaging',
    focus: 'Marketing Sunday',
    tasks: [
      { id: 'd27-t1', type: 'read',    label: 'Morning Read', detail: 'The One Page Marketing Plan', chapter: 'Ch. 1–3 — Before, During, After (pp. 1–60)', duration: '30 min', moduleId: 'mod-04', progressBookId: 'b-04-4' },
      { id: 'd27-t2', type: 'watch',   label: 'Morning Watch', detail: 'The One Page Marketing Plan Allan Dib — key concepts', searchQuery: 'Allan Dib One Page Marketing Plan summary key concepts', duration: '30 min' },
      { id: 'd27-t3', type: 'task',    label: 'Task 1',        detail: 'Rewrite your website homepage hero section using StoryBrand: Headline, Sub-headline, 3 benefit bullets, CTA button. Write the copy.', duration: '45 min', moduleId: 'mod-04', progressTaskId: 't-04-4' },
      { id: 'd27-t4', type: 'task',    label: 'Task 2',        detail: 'Complete your One Page Marketing Plan: (1) Target market, (2) Your message, (3) Channels, (4) Lead capture, (5) Lead nurture, (6) Sales conversion, (7) Deliver, (8) Retain, (9) Referrals.', duration: '60 min', moduleId: 'mod-04', progressTaskId: 't-04-6' },
    ]
  },

  // ══ WEEK 5 — Sales Mastery ══
  {
    day: 28, week: 5, phase: 2, module: 'mod-05',
    title: 'Never Split the Difference',
    focus: 'FBI Negotiation — Ch. 1–3',
    tasks: [
      { id: 'd28-t1', type: 'read',    label: 'Morning Read', detail: 'Never Split the Difference', chapter: 'Ch. 1–3 — The New Rules & Be a Mirror (pp. 1–72)', duration: '30 min', moduleId: 'mod-05', progressBookId: 'b-05-1' },
      { id: 'd28-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Chris Voss negotiation techniques for sales and business', searchQuery: 'Chris Voss negotiation techniques sales business Never Split Difference', duration: '30 min' },
      { id: 'd28-t3', type: 'task',    label: 'Evening Task', detail: "Write your 3 most common sales objections. For each one, write a Voss-style response using labeling: 'It seems like...' or 'It sounds like...' then a calibrated question.", duration: '35 min', moduleId: 'mod-05', progressTaskId: 't-05-3' },
      { id: 'd28-t4', type: 'reflect', label: 'Journal',      detail: 'Think of a deal you lost recently. Which negotiation mistake did you make? What would you do differently using Voss techniques?', duration: '10 min' },
    ]
  },
  {
    day: 29, week: 5, phase: 2, module: 'mod-05',
    title: 'SPIN Selling — The Framework',
    focus: 'SPIN Selling — Ch. 1–5',
    tasks: [
      { id: 'd29-t1', type: 'read',    label: 'Morning Read', detail: 'SPIN Selling', chapter: 'Ch. 1–5 — Sales Behavior & The SPIN Strategy (pp. 1–102)', duration: '35 min', moduleId: 'mod-05', progressBookId: 'b-05-2' },
      { id: 'd29-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'SPIN Selling explained with real examples B2B consultative selling', searchQuery: 'SPIN Selling explained real examples B2B consultative Neil Rackham', duration: '25 min' },
      { id: 'd29-t3', type: 'task',    label: 'Evening Task', detail: 'Write your SPIN discovery script: 3 Situation questions, 3 Problem questions, 3 Implication questions, 3 Need-Payoff questions — specific to YOUR business and YOUR ideal client.', duration: '45 min', moduleId: 'mod-05', progressTaskId: 't-05-1' },
      { id: 'd29-t4', type: 'reflect', label: 'Journal',      detail: 'In your last 5 sales conversations — were you doing most of the talking or asking questions? What does that tell you?', duration: '10 min' },
    ]
  },
  {
    day: 30, week: 5, phase: 2, module: 'mod-05',
    title: 'The Challenger Sale',
    focus: 'The Challenger Sale — Ch. 1–4',
    tasks: [
      { id: 'd30-t1', type: 'read',    label: 'Morning Read', detail: 'The Challenger Sale', chapter: 'Ch. 1–4 — The Evolving World of B2B Sales & The Challenger (pp. 1–87)', duration: '35 min', moduleId: 'mod-05', progressBookId: 'b-05-3' },
      { id: 'd30-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Challenger Sales model teach tailor take control explained', searchQuery: 'Challenger Sale model teach tailor take control sales explained', duration: '25 min' },
      { id: 'd30-t3', type: 'task',    label: 'Evening Task', detail: "Write your 'Teach' pitch — what insight can you share with a prospect that naturally leads to your solution? Write a 5-sentence commercial teaching script.", duration: '40 min', moduleId: 'mod-05', progressTaskId: 't-05-2' },
      { id: 'd30-t4', type: 'reflect', label: 'Journal',      detail: 'What is something counterintuitive about your industry that you could use to reframe how prospects think?', duration: '10 min' },
    ]
  },
  {
    day: 31, week: 5, phase: 2, module: 'mod-06',
    title: 'The E-Myth Revisited — Working On vs. In Your Business',
    focus: 'The E-Myth Revisited — Ch. 1–6',
    tasks: [
      { id: 'd31-t1', type: 'read',    label: 'Morning Read', detail: 'The E-Myth Revisited', chapter: 'Ch. 1–6 — The Fatal Assumption, The Three Personalities & The Stages of Growth (pp. 1–95)', duration: '35 min', moduleId: 'mod-06', progressBookId: 'b-06-1' },
      { id: 'd31-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Michael Gerber E-Myth working on your business not in it explained', searchQuery: 'Michael Gerber E-Myth work on your business not in it explained', duration: '25 min' },
      { id: 'd31-t3', type: 'task',    label: 'Evening Task', detail: "Identify the 3 most critical recurring tasks in your business that exist only in your head. Write the first version of a documented system (checklist or script) for one of them — written so a new hire could follow it without asking you a question.", duration: '45 min', moduleId: 'mod-06', progressTaskId: 't-06-1' },
      { id: 'd31-t4', type: 'reflect', label: 'Journal',      detail: 'Honestly: what percentage of your time this week was spent working IN your business (doing the work) versus ON your business (designing the systems)? What is one thing you will change about that ratio next week?', duration: '15 min' },
    ]
  },
  {
    day: 32, week: 5, phase: 2, module: 'mod-06',
    title: 'Traction — The Six Key Components of EOS',
    focus: 'Traction — Ch. 1–4',
    tasks: [
      { id: 'd32-t1', type: 'read',    label: 'Morning Read', detail: 'Traction', chapter: 'Ch. 1–4 — The EOS Model, Letting Go of the Vine, Vision & People (pp. 1–115)', duration: '35 min', moduleId: 'mod-06', progressBookId: 'b-06-2' },
      { id: 'd32-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Traction EOS Entrepreneurial Operating System six key components explained', searchQuery: 'Gino Wickman Traction EOS six key components explained', duration: '25 min' },
      { id: 'd32-t3', type: 'task',    label: 'Evening Task', detail: "Fill out the EOS Organizational Checkup — score your business 1-5 on all 20 statements. Identify your single lowest-scoring component (Vision, People, Data, Issues, Process, or Traction) and write 3 specific actions to strengthen it this quarter.", duration: '40 min', moduleId: 'mod-06', progressTaskId: 't-06-2' },
      { id: 'd32-t4', type: 'reflect', label: 'Journal',      detail: "If you asked every person on your team what your company's vision is, would you get the same answer twice? What's missing from how you communicate it?", duration: '10 min' },
    ]
  },
  {
    day: 33, week: 5, phase: 2, module: 'mod-06',
    title: 'The Goal — Theory of Constraints',
    focus: 'The Goal — Full Novel',
    tasks: [
      { id: 'd33-t1', type: 'read',    label: 'Morning Read', detail: 'The Goal', chapter: 'Full Novel — Throughput, Inventory, Operational Expense & The Five Focusing Steps', duration: '40 min', moduleId: 'mod-06', progressBookId: 'b-06-3' },
      { id: 'd33-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Theory of Constraints The Goal Goldratt bottleneck explained', searchQuery: 'Theory of Constraints The Goal Goldratt bottleneck explained', duration: '25 min' },
      { id: 'd33-t3', type: 'task',    label: 'Evening Task', detail: "Map your business as a sequence of dependent steps (like the hiking line). Identify your 'Herbie' — the single slowest step that caps your entire throughput. Write down one way to either exploit it (get more out of it without spending money) or elevate it (invest to remove the limit).", duration: '40 min', moduleId: 'mod-06', progressTaskId: 't-06-3' },
      { id: 'd33-t4', type: 'reflect', label: 'Journal',      detail: 'Where in your business have you been optimizing a step that isn\'t actually your bottleneck? What did that effort actually cost you?', duration: '15 min' },
    ]
  },
  {
    day: 34, week: 6, phase: 3, module: 'mod-07',
    title: 'High Output Management — Managerial Leverage',
    focus: 'High Output Management — Ch. on Managerial Leverage & Task-Relevant Maturity',
    tasks: [
      { id: 'd34-t1', type: 'read',    label: 'Morning Read', detail: 'High Output Management', chapter: 'Managerial Leverage & Task-Relevant Maturity (Andy Grove)', duration: '40 min', moduleId: 'mod-07', progressBookId: 'b-07-1' },
      { id: 'd34-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Andy Grove High Output Management managerial leverage one-on-one meetings explained', searchQuery: 'Andy Grove High Output Management managerial leverage explained', duration: '25 min' },
      { id: 'd34-t3', type: 'task',    label: 'Evening Task', detail: "List the 5-7 recurring activities that make up your week as a founder/manager. Score each as low, medium, or high leverage using Grove's definition (does it affect many people, affect someone for a long time, or supply unique knowledge that unlocks others' work?). Commit to doing more of your single highest-leverage activity this week.", duration: '40 min', moduleId: 'mod-07', progressTaskId: 't-07-1' },
      { id: 'd34-t4', type: 'reflect', label: 'Journal',      detail: "Pick one person on your team. What is their task-relevant maturity (TRM) on their current biggest responsibility — low, medium, or high? Are you managing them with the right style for that level, or out of habit?", duration: '15 min' },
    ]
  },
  {
    day: 35, week: 6, phase: 3, module: 'mod-07',
    title: 'Leaders Eat Last — Why Some Teams Pull Together',
    focus: 'Leaders Eat Last — The Circle of Safety',
    tasks: [
      { id: 'd35-t1', type: 'read',    label: 'Morning Read', detail: 'Leaders Eat Last', chapter: 'The Circle of Safety, Cortisol vs. Oxytocin, and Why Some Teams Pull Together', duration: '40 min', moduleId: 'mod-07', progressBookId: 'b-07-2' },
      { id: 'd35-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Simon Sinek Leaders Eat Last Circle of Safety explained', searchQuery: 'Simon Sinek Leaders Eat Last Circle of Safety explained', duration: '25 min' },
      { id: 'd35-t3', type: 'task',    label: 'Evening Task', detail: "Identify one source of chronic, low-grade stress (cortisol) on your team right now — unclear priorities, fear of blame, inconsistent leadership behavior, etc. Write down one specific, concrete action you can take this week to extend the Circle of Safety around your team instead of leaving them exposed to it.", duration: '40 min', moduleId: 'mod-07', progressTaskId: 't-07-2' },
      { id: 'd35-t4', type: 'reflect', label: 'Journal',      detail: 'Do the people on your team feel safe enough to tell you bad news immediately, or do they sit on it? What have you done, even unintentionally, that shaped that answer?', duration: '15 min' },
    ]
  },
  {
    day: 36, week: 6, phase: 3, module: 'mod-07',
    title: 'An Everyone Culture — Becoming a Deliberately Developmental Organization',
    focus: 'An Everyone Culture — Edge, Home & Groove',
    tasks: [
      { id: 'd36-t1', type: 'read',    label: 'Morning Read', detail: 'An Everyone Culture', chapter: "The 'Second Job', Edge/Home/Groove, and the Deliberately Developmental Organization (Kegan & Lahey)", duration: '40 min', moduleId: 'mod-07', progressBookId: 'b-07-3' },
      { id: 'd36-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Robert Kegan An Everyone Culture Deliberately Developmental Organization explained', searchQuery: 'Robert Kegan An Everyone Culture Deliberately Developmental Organization explained', duration: '25 min' },
      { id: 'd36-t3', type: 'task',    label: 'Evening Task', detail: "Write down the 'second job' you personally do at work — the energy you spend covering weaknesses or managing how you're perceived instead of doing real work. Then write one structural change (not a personality change) you could make to your team's culture that would make admitting a mistake or a weakness lower-risk than hiding it.", duration: '40 min', moduleId: 'mod-07', progressTaskId: 't-07-3' },
      { id: 'd36-t4', type: 'reflect', label: 'Journal',      detail: "Think about the last real mistake you made at work. Was it safe to admit it openly, or did you find yourself managing how it looked? What does your honest answer tell you about your own team's culture?", duration: '15 min' },
    ]
  },
  {
    day: 37, week: 6, phase: 3, module: 'mod-08',
    title: 'Zero to One — Why Competition Is for Losers',
    focus: 'Zero to One — Monopoly & The Four Characteristics',
    tasks: [
      { id: 'd37-t1', type: 'read',    label: 'Morning Read', detail: 'Zero to One', chapter: 'Monopoly, the Ideology of Competition & the Four Characteristics of Monopoly (Peter Thiel)', duration: '40 min', moduleId: 'mod-08', progressBookId: 'b-08-1' },
      { id: 'd37-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Peter Thiel Zero to One monopoly competition is for losers explained', searchQuery: 'Peter Thiel Zero to One monopoly competition is for losers explained', duration: '25 min' },
      { id: 'd37-t3', type: 'task',    label: 'Evening Task', detail: "Answer Thiel's interview question for your own business: what important truth about your market do very few people agree with you on? Then identify which of the four monopoly characteristics (proprietary technology, network effects, economies of scale, branding) is most realistic for you to build, and write one concrete step toward it.", duration: '40 min', moduleId: 'mod-08', progressTaskId: 't-08-1' },
      { id: 'd37-t4', type: 'reflect', label: 'Journal',      detail: 'Are you describing your market like a monopolist (downplaying your dominance) or like a competitor (narrowing your market until you appear to dominate it by definition)? Which is actually true?', duration: '15 min' },
    ]
  },
  {
    day: 38, week: 6, phase: 3, module: 'mod-08',
    title: "The Innovator's Dilemma — Why Good Companies Fail",
    focus: "The Innovator's Dilemma — Sustaining vs. Disruptive Technology",
    tasks: [
      { id: 'd38-t1', type: 'read',    label: 'Morning Read', detail: "The Innovator's Dilemma", chapter: 'Sustaining vs. Disruptive Technologies & Why Good Management Can Lead to Failure (Clayton Christensen)', duration: '40 min', moduleId: 'mod-08', progressBookId: 'b-08-2' },
      { id: 'd38-t2', type: 'watch',   label: 'Lunch Watch',  detail: "Clayton Christensen Innovator's Dilemma disruptive technology explained", searchQuery: "Clayton Christensen Innovator's Dilemma disruptive technology explained", duration: '25 min' },
      { id: 'd38-t3', type: 'task',    label: 'Evening Task', detail: "Identify one 'good enough' alternative in your industry that your best customers currently dismiss as inferior. Map whether its trajectory of improvement is rising faster than what the mainstream market actually needs — and write down what it would look like for your business to respond to it with a separate, appropriately-sized team rather than your main organization.", duration: '40 min', moduleId: 'mod-08', progressTaskId: 't-08-2' },
      { id: 'd38-t4', type: 'reflect', label: 'Journal',      detail: 'Are you overshooting your own market — still competing on dimensions of performance your customers stopped caring about years ago? Where might a simpler, cheaper alternative already be "good enough"?', duration: '15 min' },
    ]
  },
  {
    day: 39, week: 6, phase: 3, module: 'mod-08',
    title: 'Crossing the Chasm — The Gap That Kills Most New Products',
    focus: 'Crossing the Chasm — Technology Adoption Life Cycle & The D-Day Strategy',
    tasks: [
      { id: 'd39-t1', type: 'read',    label: 'Morning Read', detail: 'Crossing the Chasm', chapter: 'The Technology Adoption Life Cycle, the Chasm & the D-Day Niche Strategy (Geoffrey Moore)', duration: '40 min', moduleId: 'mod-08', progressBookId: 'b-08-3' },
      { id: 'd39-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Geoffrey Moore Crossing the Chasm technology adoption life cycle explained', searchQuery: 'Geoffrey Moore Crossing the Chasm technology adoption life cycle explained', duration: '25 min' },
      { id: 'd39-t3', type: 'task',    label: 'Evening Task', detail: "Define your single beachhead niche market — one narrowly bounded segment, not three. Write out what the complete 'whole product' (every supporting service, integration, and guarantee) would need to include to fully satisfy a pragmatist buyer in that niche, not just an early adopter.", duration: '40 min', moduleId: 'mod-08', progressTaskId: 't-08-3' },
      { id: 'd39-t4', type: 'reflect', label: 'Journal',      detail: "Honestly: is your company market-driven or sales-driven right now? Are you chasing every opportunity that presents itself, or concentrating on one beachhead the way the D-Day strategy demands?", duration: '15 min' },
    ]
  },
  {
    day: 40, week: 7, phase: 3, module: 'mod-09',
    title: 'Influence — The Six Weapons of Persuasion',
    focus: 'Influence — Reciprocation, Commitment, Social Proof & Scarcity',
    tasks: [
      { id: 'd40-t1', type: 'read',    label: 'Morning Read', detail: 'Influence: The Psychology of Persuasion', chapter: 'Reciprocation, Commitment & Consistency, Social Proof, and Scarcity (Robert Cialdini)', duration: '40 min', moduleId: 'mod-09', progressBookId: 'b-09-1' },
      { id: 'd40-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Robert Cialdini Influence six principles of persuasion explained', searchQuery: 'Robert Cialdini Influence six principles of persuasion explained', duration: '25 min' },
      { id: 'd40-t3', type: 'task',    label: 'Evening Task', detail: "Audit your own sales or marketing materials against the six principles (reciprocity, commitment/consistency, social proof, liking, authority, scarcity). Identify which ONE principle is most absent from your current customer journey, and write one concrete, ethical way to incorporate it this week.", duration: '40 min', moduleId: 'mod-09', progressTaskId: 't-09-1' },
      { id: 'd40-t4', type: 'reflect', label: 'Journal',      detail: 'Think of a recent purchase decision you made that you now regret. Which of the six weapons of influence was used on you, and how did it work?', duration: '15 min' },
    ]
  },
  {
    day: 41, week: 7, phase: 3, module: 'mod-09',
    title: 'The Trusted Advisor — The Trust Equation',
    focus: 'The Trusted Advisor — Credibility, Reliability, Intimacy & Self-Orientation',
    tasks: [
      { id: 'd41-t1', type: 'read',    label: 'Morning Read', detail: 'The Trusted Advisor', chapter: 'The Trust Equation and the Five Stages of Trust-Building (Maister, Green & Galford)', duration: '40 min', moduleId: 'mod-09', progressBookId: 'b-09-2' },
      { id: 'd41-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'The Trusted Advisor trust equation Maister explained', searchQuery: 'The Trusted Advisor trust equation Maister explained', duration: '25 min' },
      { id: 'd41-t3', type: 'task',    label: 'Evening Task', detail: "Score yourself 1-10 on each of the four components of the Trust Equation (Credibility, Reliability, Intimacy, Self-Orientation) as your most important client or stakeholder relationship would honestly rate you. Identify your lowest score and write one specific action to improve it this week.", duration: '40 min', moduleId: 'mod-09', progressTaskId: 't-09-2' },
      { id: 'd41-t4', type: 'reflect', label: 'Journal',      detail: 'Of the four trust components, which do you most often neglect under pressure — credibility, reliability, intimacy, or keeping your self-orientation low? Why that one?', duration: '15 min' },
    ]
  },
  {
    day: 42, week: 7, phase: 3, module: 'mod-09',
    title: 'Pitch Anything — Frame Control and the Croc Brain',
    focus: 'Pitch Anything — The STRONG Method',
    tasks: [
      { id: 'd42-t1', type: 'read',    label: 'Morning Read', detail: 'Pitch Anything', chapter: 'Frame Control, the Croc Brain, and the STRONG Method (Oren Klaff)', duration: '40 min', moduleId: 'mod-09', progressBookId: 'b-09-3' },
      { id: 'd42-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Oren Klaff Pitch Anything frame control STRONG method explained', searchQuery: 'Oren Klaff Pitch Anything frame control STRONG method explained', duration: '25 min' },
      { id: 'd42-t3', type: 'task',    label: 'Evening Task', detail: "Outline your next important pitch using the STRONG method: Setting the frame, Telling the story, Revealing the intrigue, Offering the prize, Nailing the hookpoint, Getting a decision. Write one sentence for each step.", duration: '40 min', moduleId: 'mod-09', progressTaskId: 't-09-3' },
      { id: 'd42-t4', type: 'reflect', label: 'Journal',      detail: 'Think of the last time someone took control of a meeting or negotiation away from you. What kind of frame were they using (power, time, analyst), and what could you have done differently?', duration: '15 min' },
    ]
  },
  /*
   * NOTE: Days 43-48 (Module 10 — Corporate Finance & Business Valuation,
   * and Module 11 — Venture Capital, M&A & Deal-Making) are intentionally
   * left as a gap here. Module 12 below was seeded ahead of those two
   * modules at the user's request. When Modules 10 and 11 are ready,
   * insert their day entries here (Days 43-48) without renumbering
   * anything below — Module 12 was deliberately pinned to Days 49-51
   * to preserve correct sequential numbering once the gap is filled.
   */
  {
    day: 49, week: 8, phase: 4, module: 'mod-12',
    title: 'Basic Economics — Prices, Scarcity & Why Good Intentions Are Not Enough',
    focus: 'Basic Economics — The Role of Prices & Price Controls',
    tasks: [
      { id: 'd49-t1', type: 'read',    label: 'Morning Read', detail: 'Basic Economics', chapter: 'What Is Economics?, The Role of Prices & Price Controls (Thomas Sowell)', duration: '40 min', moduleId: 'mod-12', progressBookId: 'b-12-1' },
      { id: 'd49-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Thomas Sowell Basic Economics prices scarcity explained', searchQuery: 'Thomas Sowell Basic Economics prices and scarcity explained', duration: '25 min' },
      { id: 'd49-t3', type: 'task',    label: 'Evening Task', detail: "Identify one price control, subsidy, or artificial price constraint that affects your business or industry directly (minimum wage, rent control, tariffs, price caps). Trace through Sowell's logic: who gains in the short term, who bears the hidden cost, and what shortage or surplus does it eventually create?", duration: '40 min', moduleId: 'mod-12', progressTaskId: 't-12-1' },
      { id: 'd49-t4', type: 'reflect', label: 'Journal',      detail: 'Where in your own business have you judged a decision by its intentions rather than its actual incentives and consequences? What did that cost you?', duration: '15 min' },
    ]
  },
  {
    day: 50, week: 8, phase: 4, module: 'mod-12',
    title: 'The Wealth of Nations — Division of Labour and the Invisible Hand',
    focus: 'The Wealth of Nations — Book I, Chapters I-II & Book IV',
    tasks: [
      { id: 'd50-t1', type: 'read',    label: 'Morning Read', detail: 'The Wealth of Nations (Abridged)', chapter: 'Of the Division of Labour & Of the Principle Which Gives Occasion to It (Adam Smith)', duration: '40 min', moduleId: 'mod-12', progressBookId: 'b-12-2' },
      { id: 'd50-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Adam Smith Wealth of Nations division of labour invisible hand explained', searchQuery: 'Adam Smith Wealth of Nations division of labour invisible hand explained', duration: '25 min' },
      { id: 'd50-t3', type: 'task',    label: 'Evening Task', detail: "Map your own business like Smith's pin factory: list every distinct step currently required to deliver your product or service. Identify one step that could be further divided or specialized to multiply output the way the ten pin-makers multiplied theirs.", duration: '40 min', moduleId: 'mod-12', progressTaskId: 't-12-2' },
      { id: 'd50-t4', type: 'reflect', label: 'Journal',      detail: "Smith argued we get more from others by appealing to their self-interest than their benevolence. Where in your own sales or hiring approach are you currently appealing to goodwill when you could instead appeal to genuine mutual benefit?", duration: '15 min' },
    ]
  },
  {
    day: 51, week: 8, phase: 4, module: 'mod-12',
    title: 'Principles — Radical Truth, Radical Transparency & the 5-Step Process',
    focus: 'Principles — Life Principles & Work Principles',
    tasks: [
      { id: 'd51-t1', type: 'read',    label: 'Morning Read', detail: 'Principles', chapter: 'The 5-Step Process & Building an Idea Meritocracy (Ray Dalio)', duration: '40 min', moduleId: 'mod-12', progressBookId: 'b-12-3' },
      { id: 'd51-t2', type: 'watch',   label: 'Lunch Watch',  detail: 'Ray Dalio Principles 5-Step Process idea meritocracy explained', searchQuery: 'Ray Dalio Principles 5-Step Process idea meritocracy explained', duration: '25 min' },
      { id: 'd51-t3', type: 'task',    label: 'Evening Task', detail: "Run one current challenge in your business through Dalio's 5-Step Process explicitly and in order: (1) state the goal clearly, (2) identify the specific problem blocking it, (3) diagnose its root cause, (4) design a plan around it, (5) write the specific action you'll take this week to push it through.", duration: '40 min', moduleId: 'mod-12', progressTaskId: 't-12-3' },
      { id: 'd51-t4', type: 'reflect', label: 'Journal',      detail: "Dalio says most people react emotionally to problems instead of diagnosing them calmly. Think of your last real setback — did you move straight to diagnosis, or did you skip straight to blame or excuses?", duration: '15 min' },
    ]
  },
]

/**
 * @deprecated This computes a day purely from calendar time elapsed since
 * enrollment, with no awareness of whether the student actually completed
 * any work. It will silently skip a student ahead even if they fell behind.
 * Use getCalendarDay() + getActiveDayNumber() instead. Kept only so any
 * remaining old call sites don't break the build; do not call this in new code.
 */
export function getTodayPlan(enrolledAt: Date): DayPlan | null {
  const daysElapsed = Math.floor((Date.now() - enrolledAt.getTime()) / 86400000)
  const dayNumber   = daysElapsed + 1
  return DAILY_PLAN.find(d => d.day === dayNumber) || DAILY_PLAN[DAILY_PLAN.length - 1]
}

export function getPlanByDay(day: number): DayPlan | null {
  return DAILY_PLAN.find(d => d.day === day) || null
}

export function getWeekDays(week: number): DayPlan[] {
  return DAILY_PLAN.filter(d => d.week === week)
}

/**
 * The highest day NUMBER that exists in the curriculum — not the array
 * length. These can differ on purpose: when a module's content hasn't
 * been written yet, its day numbers are deliberately left as a gap (see
 * the note above Day 49) so that later modules can be slotted in at
 * their correct numbers without a renumbering migration. Using
 * DAILY_PLAN.length here instead of the max day would under-count the
 * real upper bound and incorrectly clamp active-day calculations.
 */
export const TOTAL_PLANNED_DAYS = Math.max(...DAILY_PLAN.map(d => d.day))
export const TOTAL_WEEKS        = Math.max(...DAILY_PLAN.map(d => d.week))

/**
 * The calendar day number — how many days have elapsed since enrollment,
 * with no regard for progress. This is the UPPER BOUND on which day a
 * student is allowed to see; it represents "the latest day that exists
 * for them so far," not "the day they should be working on."
 *
 * A student can never be shown a day beyond this number, because that
 * day's content hasn't "unlocked" yet by the calendar — but they CAN be
 * held behind it if they haven't finished earlier work.
 */
export function getCalendarDay(enrolledAt: Date): number {
  const daysElapsed = Math.floor((Date.now() - enrolledAt.getTime()) / 86400000)
  return Math.max(1, daysElapsed + 1)
}

/**
 * Given any day number — including one that falls inside a gap where no
 * DayPlan exists yet (e.g. Days 43-48 before Modules 10-11 are added) —
 * returns the nearest day number at or after it that actually has
 * content. This is what keeps getActiveDayNumber/getActivePlan safe
 * against gaps: a student's progress is never pointed at a day with no
 * DayPlan to show.
 */
function nearestExistingDayAtOrAfter(day: number): number {
  const existingDays = DAILY_PLAN.map(d => d.day).sort((a, b) => a - b)
  for (const d of existingDays) {
    if (d >= day) return d
  }
  // day is past the end of all defined content — fall back to the last
  // real day rather than a number with nothing behind it.
  return existingDays[existingDays.length - 1]
}

/**
 * The day a student should actually land on when they open the app —
 * the heart of the "no auto-skip" fix.
 *
 * Definition: one past the highest day number that has at least one
 * completed task, clamped so it never exceeds the calendar day (a
 * student can't be pushed into content that hasn't calendar-unlocked
 * yet) and never exceeds the last day of the curriculum. If that lands
 * inside a gap with no content yet, it's nudged forward to the nearest
 * day that actually has a DayPlan.
 *
 * completedDays should be the distinct set of `day` values for which the
 * student has at least one DailyTask row with done = true. Passing an
 * empty set means a brand new student — they land on Day 1.
 *
 * Example: enrolled June 1, completed work through Day 10 on June 10,
 * then skipped 4 days. On June 15 the calendar day is 15, but this
 * function still returns 11 (pick up right where they left off) — not
 * 15. Once they complete Day 11's first task, this naturally advances
 * to 12 the next time it's called.
 */
export function getActiveDayNumber(enrolledAt: Date, completedDays: number[]): number {
  const calendarDay = getCalendarDay(enrolledAt)
  const highestCompleted = completedDays.length > 0 ? Math.max(...completedDays) : 0
  const progressDay = highestCompleted + 1

  const activeDay = Math.min(progressDay, calendarDay)
  const clamped   = Math.max(1, Math.min(activeDay, TOTAL_PLANNED_DAYS))
  return nearestExistingDayAtOrAfter(clamped)
}

/** Convenience wrapper: active day's full DayPlan, or null past the end. */
export function getActivePlan(enrolledAt: Date, completedDays: number[]): DayPlan | null {
  const day = getActiveDayNumber(enrolledAt, completedDays)
  return getPlanByDay(day)
}