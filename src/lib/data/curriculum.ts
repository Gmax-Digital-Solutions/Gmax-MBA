export type Phase = { id: string; number: number; title: string; duration: string; months: string; color: string; badge: string; description: string; modules: Module[] }
export type Module = { id: string; number: string; title: string; tag: string; phase: string; books: Book[]; youtube: YTResource[]; deliverable: string; tasks: Task[] }
export type Book = { id: string; title: string; author: string; why: string; amazonUrl?: string; googleBooksUrl?: string; freeUrl?: string; freeLabel?: string }
export type YTResource = { name: string; desc: string }
export type Task = { id: string; text: string }

export const CURRICULUM: Phase[] = [
  {
    id: 'phase-1', number: 1, title: 'Business Foundations', duration: '4 months',
    months: 'Months 1–4', color: 'blue', badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    description: 'Build the mental architecture every serious business person needs — how to read a business, how money moves, and how to think in systems.',
    modules: [
      {
        id: 'mod-01', number: '01', title: 'Business Thinking & Mental Models', tag: 'Thinking & Mental Models', phase: 'Phase 1',
        books: [
          {
            id: 'b-01-1', title: 'The Personal MBA', author: 'Josh Kaufman', why: 'Best single-volume practical business education that skips academic fluff.',
            amazonUrl: 'https://www.amazon.com/Personal-MBA-Master-Art-Business/dp/1591845572',
            googleBooksUrl: 'https://books.google.com/books?id=Personal+MBA+Josh+Kaufman',
            freeUrl: 'https://personalmba.com/', freeLabel: 'Free summary + concepts at personalmba.com',
          },
          {
            id: 'b-01-2', title: 'Thinking in Systems', author: 'Donella Meadows', why: 'Teaches you to see any business as interconnected loops.',
            amazonUrl: 'https://www.amazon.com/Thinking-Systems-Donella-H-Meadows/dp/1603580557',
            googleBooksUrl: 'https://books.google.com/books?id=CpbLAgAAQBAJ',
            freeUrl: 'https://archive.org/search?query=thinking+in+systems+meadows', freeLabel: 'Borrow free on Open Library',
          },
          {
            id: 'b-01-3', title: "Poor Charlie's Almanack", author: 'Charlie Munger', why: 'Mental models used by one of the world\'s greatest investors.',
            amazonUrl: 'https://www.amazon.com/Poor-Charlies-Almanack-Essential-Charles/dp/1953953239',
            googleBooksUrl: 'https://books.google.com/books?q=poor+charlies+almanack',
            freeUrl: 'https://www.youtube.com/results?search_query=Charlie+Munger+mental+models+full+talk', freeLabel: 'Watch Charlie Munger talks free on YouTube',
          },
        ],
        youtube: [
          { name: 'Y Combinator – Startup School', desc: 'First-principles business thinking from builders.' },
          { name: 'Stanford eCorner', desc: 'Entrepreneurship talks from Stanford — raw founder wisdom.' },
          { name: 'Farnam Street (fs.blog)', desc: 'Mental models, decision-making, psychology of great thinking.' },
        ],
        deliverable: 'Map your business as a complete system. Identify the value creation loop, revenue engine, cost drivers, and feedback mechanisms. Write a 1-page Business Model Snapshot.',
        tasks: [
          { id: 't-01-1', text: 'Draw your business system map: clients → deliverables → revenue → reinvestment' },
          { id: 't-01-2', text: 'List your top 5 mental model blind spots as a business owner' },
          { id: 't-01-3', text: "Write your value proposition in one sentence using Kaufman's framework" },
          { id: 't-01-4', text: 'Map your business feedback loops — what reinforces growth? What creates drag?' },
          { id: 't-01-5', text: 'Write a 1-page Business Model Snapshot for your company' },
        ],
      },
      {
        id: 'mod-02', number: '02', title: 'Financial Intelligence & Accounting', tag: 'Financial Intelligence', phase: 'Phase 1',
        books: [
          {
            id: 'b-02-1', title: 'Financial Intelligence', author: 'Karen Berman & Joe Knight', why: 'Makes financial statements accessible for non-accountants running real businesses.',
            amazonUrl: 'https://www.amazon.com/Financial-Intelligence-Revised-Managers-Knowing/dp/1422144119',
            googleBooksUrl: 'https://books.google.com/books?id=Financial+Intelligence+Berman',
            freeUrl: 'https://open.library.ubc.ca/', freeLabel: 'Borrow via your local library with Libby app',
          },
          {
            id: 'b-02-2', title: 'Accounting Made Simple', author: 'Mike Piper', why: 'Covers the mechanics quickly so you can read and build your own statements.',
            amazonUrl: 'https://www.amazon.com/Accounting-Made-Simple-Accounting-Explained/dp/0981454224',
            googleBooksUrl: 'https://books.google.com/books?id=accounting+made+simple+piper',
            freeUrl: 'https://www.khanacademy.org/economics-finance-domain/core-finance/accounting-and-financial-statements', freeLabel: 'Free accounting course on Khan Academy',
          },
          {
            id: 'b-02-3', title: 'The Intelligent Investor', author: 'Benjamin Graham', why: 'Teaches financial discipline and value thinking for capital decisions.',
            amazonUrl: 'https://www.amazon.com/Intelligent-Investor-Definitive-Investing-Essentials/dp/0060555661',
            googleBooksUrl: 'https://books.google.com/books?id=The+Intelligent+Investor+Graham',
            freeUrl: 'https://archive.org/search?query=intelligent+investor+benjamin+graham', freeLabel: 'Borrow free on Open Library / Internet Archive',
          },
        ],
        youtube: [
          { name: 'Aswath Damodaran (NYU Stern)', desc: 'World-class corporate finance and valuation — free university-level course.' },
          { name: 'Ben Felix — Common Sense Investing', desc: 'Rigorous, evidence-based financial reasoning.' },
          { name: 'Harvard Business School Online', desc: 'Short finance case-study videos and accounting fundamentals.' },
        ],
        deliverable: "Build your company's complete financial picture: P&L, cash flow statement, LTV:CAC ratio per service, and gross margin analysis.",
        tasks: [
          { id: 't-02-1', text: 'Build a 12-month P&L in a spreadsheet for your business' },
          { id: 't-02-2', text: 'Calculate LTV:CAC ratio for each product or service you offer' },
          { id: 't-02-3', text: 'Set your gross margin target and identify cost leaks' },
          { id: 't-02-4', text: 'Build a simplified balance sheet for your company' },
          { id: 't-02-5', text: 'Create a cash flow projection for the next 6 months' },
          { id: 't-02-6', text: 'Set monthly revenue targets and leading indicator KPIs' },
        ],
      },
    ],
  },
  {
    id: 'phase-2', number: 2, title: 'Core Business Mastery', duration: '10 months',
    months: 'Months 5–14', color: 'teal', badge: 'bg-[#2ed8c3]/10 text-[#2ed8c3] border-[#2ed8c3]/20',
    description: 'The engine room of business. Strategy, marketing, sales, and operations — the four domains that determine whether any company wins or slowly dies.',
    modules: [
      {
        id: 'mod-03', number: '03', title: 'Strategy & Competitive Advantage', tag: 'Strategy', phase: 'Phase 2',
        books: [
          {
            id: 'b-03-1', title: 'Good Strategy / Bad Strategy', author: 'Richard Rumelt', why: "Clearest explanation of real strategy — diagnosis, guiding policy, coherent actions.",
            amazonUrl: 'https://www.amazon.com/Good-Strategy-Bad-Difference-Matters/dp/0307886239',
            googleBooksUrl: 'https://books.google.com/books?id=Good+Strategy+Bad+Strategy+Rumelt',
            freeUrl: 'https://www.youtube.com/results?search_query=Richard+Rumelt+Good+Strategy+Bad+Strategy+talk', freeLabel: 'Watch Rumelt\'s talks on YouTube',
          },
          {
            id: 'b-03-2', title: 'Competitive Strategy', author: 'Michael Porter', why: "The academic foundation of business strategy. Porter's Five Forces is a universal tool.",
            amazonUrl: 'https://www.amazon.com/Competitive-Strategy-Techniques-Industries-Competitors/dp/0684841487',
            googleBooksUrl: 'https://books.google.com/books?id=Competitive+Strategy+Porter',
            freeUrl: 'https://www.youtube.com/results?search_query=Michael+Porter+five+forces+Harvard', freeLabel: 'Watch Porter\'s Harvard lectures on YouTube',
          },
          {
            id: 'b-03-3', title: 'Playing to Win', author: 'A.G. Lafley & Roger Martin', why: "How P&G built competitive moats. Answers 'where to play' and 'how to win'.",
            amazonUrl: 'https://www.amazon.com/Playing-Win-Strategy-Really-Works/dp/142218739X',
            googleBooksUrl: 'https://books.google.com/books?id=Playing+to+Win+Lafley+Martin',
            freeUrl: 'https://www.youtube.com/results?search_query=Roger+Martin+Playing+to+Win+strategy', freeLabel: 'Watch Roger Martin strategy talks on YouTube',
          },
        ],
        youtube: [
          { name: 'Harvard Business Review (YouTube)', desc: 'Case studies, strategy breakdowns, management thinking.' },
          { name: 'McKinsey & Company (YouTube)', desc: 'Real consulting frameworks — strategy, transformation, market analysis.' },
          { name: 'Stanford GSB — View from the Top', desc: 'CEO interviews revealing real strategic decisions.' },
        ],
        deliverable: "Write a Strategy Document using Rumelt's Kernel: (1) diagnosis of your current market, (2) guiding policy, (3) coherent actions.",
        tasks: [
          { id: 't-03-1', text: "Run Porter's Five Forces analysis on your market" },
          { id: 't-03-2', text: "Identify your ONE differentiating move vs competitors" },
          { id: 't-03-3', text: "Write your 3-year strategy in Rumelt's kernel format" },
          { id: 't-03-4', text: "Define the market you're choosing NOT to serve — and why" },
          { id: 't-03-5', text: "Map 3 potential strategic moats for your business over 5 years" },
        ],
      },
      {
        id: 'mod-04', number: '04', title: 'Marketing & Brand Building', tag: 'Marketing', phase: 'Phase 2',
        books: [
          {
            id: 'b-04-1', title: 'Building a StoryBrand', author: 'Donald Miller', why: 'Most practically useful marketing book — immediately apply to your own messaging.',
            amazonUrl: 'https://www.amazon.com/Building-StoryBrand-Clarify-Message-Customers/dp/0718033329',
            googleBooksUrl: 'https://books.google.com/books?id=Building+StoryBrand+Donald+Miller',
            freeUrl: 'https://www.youtube.com/results?search_query=Donald+Miller+StoryBrand+framework+explained', freeLabel: 'Watch Donald Miller explain StoryBrand on YouTube',
          },
          {
            id: 'b-04-2', title: 'Positioning: The Battle for Your Mind', author: 'Al Ries & Jack Trout', why: 'Foundational positioning theory. Changes how you see every brand decision.',
            amazonUrl: 'https://www.amazon.com/Positioning-Battle-Your-Mind-Anniversary/dp/0071373586',
            googleBooksUrl: 'https://books.google.com/books?id=Positioning+Ries+Trout',
            freeUrl: 'https://archive.org/search?query=positioning+battle+for+your+mind+ries+trout', freeLabel: 'Borrow free on Open Library',
          },
          {
            id: 'b-04-3', title: 'Contagious: Why Things Catch On', author: 'Jonah Berger', why: 'Science-backed framework for what makes content and ideas spread.',
            amazonUrl: 'https://www.amazon.com/Contagious-Things-Catch-Jonah-Berger/dp/1451686587',
            googleBooksUrl: 'https://books.google.com/books?id=Contagious+Jonah+Berger',
            freeUrl: 'https://www.youtube.com/results?search_query=Jonah+Berger+Contagious+STEPPS+talk', freeLabel: 'Watch Jonah Berger\'s STEPPS talk on YouTube',
          },
          {
            id: 'b-04-4', title: 'The One Page Marketing Plan', author: 'Allan Dib', why: 'The simplest and most actionable marketing framework for small businesses and founders.',
            amazonUrl: 'https://www.amazon.com/1-Page-Marketing-Plan-Customers-Money/dp/1989025013',
            googleBooksUrl: 'https://books.google.com/books?id=One+Page+Marketing+Plan+Allan+Dib',
            freeUrl: 'https://successwise.com/one-page-marketing-plan/', freeLabel: 'Free 1-page marketing plan template',
          },
        ],
        youtube: [
          { name: 'Seth Godin (talks + interviews)', desc: 'The clearest thinker on modern marketing — permission, tribes, remarkable work.' },
          { name: 'GaryVee (Gary Vaynerchuk)', desc: 'Practical social/content marketing. Extract the tactical gems.' },
          { name: 'HubSpot Marketing YouTube', desc: 'Inbound marketing methodology, SEO, content strategy, demand generation.' },
        ],
        deliverable: "Rebuild your brand positioning using StoryBrand. Rewrite your website hero section and pitch deck intro with this framework.",
        tasks: [
          { id: 't-04-1', text: "Write your StoryBrand one-liner (client hero, problem, guide, resolution)" },
          { id: 't-04-2', text: "Map 3 ideal client personas using job-to-be-done framework" },
          { id: 't-04-3', text: "Audit your content presence against your positioning statement" },
          { id: 't-04-4', text: "Rewrite your website hero section using StoryBrand framework" },
          { id: 't-04-5', text: "Create a 90-day content calendar for your own marketing" },
          { id: 't-04-6', text: "Define your brand voice — 3 words, with examples of what it IS and ISN'T" },
        ],
      },
      {
        id: 'mod-05', number: '05', title: 'Sales & Business Development', tag: 'Sales', phase: 'Phase 2',
        books: [
          {
            id: 'b-05-1', title: 'Never Split the Difference', author: 'Chris Voss', why: 'FBI negotiation techniques that transform how you close deals and handle objections.',
            amazonUrl: 'https://www.amazon.com/Never-Split-Difference-Negotiating-Depended/dp/0062407805',
            googleBooksUrl: 'https://books.google.com/books?id=Never+Split+Difference+Voss',
            freeUrl: 'https://www.youtube.com/results?search_query=Chris+Voss+negotiation+masterclass+full', freeLabel: 'Watch Chris Voss full talks on YouTube',
          },
          {
            id: 'b-05-2', title: 'SPIN Selling', author: 'Neil Rackham', why: 'Most rigorously researched B2B sales method. Perfect for consultative selling.',
            amazonUrl: 'https://www.amazon.com/SPIN-Selling-Neil-Rackham/dp/0070511136',
            googleBooksUrl: 'https://books.google.com/books?id=SPIN+Selling+Rackham',
            freeUrl: 'https://www.youtube.com/results?search_query=SPIN+selling+explained+Neil+Rackham', freeLabel: 'Watch SPIN Selling explained on YouTube',
          },
          {
            id: 'b-05-3', title: 'The Challenger Sale', author: 'Dixon & Adamson', why: 'Top B2B sellers teach clients something new. Reshapes how you approach enterprise.',
            amazonUrl: 'https://www.amazon.com/Challenger-Sale-Control-Customer-Conversation/dp/1591844355',
            googleBooksUrl: 'https://books.google.com/books?id=Challenger+Sale+Dixon+Adamson',
            freeUrl: 'https://www.youtube.com/results?search_query=Challenger+Sale+model+explained', freeLabel: 'Watch Challenger Sale explained on YouTube',
          },
        ],
        youtube: [
          { name: 'Alex Hormozi ($100M Offers, YouTube)', desc: 'Offer construction, value stacking, and making your service sell itself.' },
          { name: 'Jeremy Miner — NEPQ Sales', desc: 'Psychology-based consultative selling. Highly applicable to B2B sales.' },
          { name: 'Harvard PON (Program on Negotiation)', desc: 'Academic negotiation research in accessible talks and lectures.' },
        ],
        deliverable: "Build a complete sales playbook: discovery call script, proposal template, objection handling guide, and pricing structure.",
        tasks: [
          { id: 't-05-1', text: "Write a 10-question SPIN discovery script for your business" },
          { id: 't-05-2', text: "Redesign your offer using Hormozi's Grand Slam Offer framework" },
          { id: 't-05-3', text: "Build an objection handling guide for your top 5 objections" },
          { id: 't-05-4', text: "Create a 3-tier pricing structure (starter / growth / enterprise)" },
          { id: 't-05-5', text: "Record and critique 3 of your own sales calls" },
          { id: 't-05-6', text: "Write a 1-page ideal client definition and qualification criteria" },
        ],
      },
      {
        id: 'mod-06', number: '06', title: 'Operations, Systems & Execution', tag: 'Operations', phase: 'Phase 2',
        books: [
          {
            id: 'b-06-1', title: 'The E-Myth Revisited', author: 'Michael Gerber', why: 'Foundational book on building a business that runs without you — systems over heroics.',
            amazonUrl: 'https://www.amazon.com/E-Myth-Revisited-Small-Businesses-About/dp/0887307280',
            googleBooksUrl: 'https://books.google.com/books?id=E+Myth+Revisited+Gerber',
            freeUrl: 'https://archive.org/search?query=e-myth+revisited+gerber', freeLabel: 'Borrow free on Open Library',
          },
          {
            id: 'b-06-2', title: 'Traction', author: 'Gino Wickman', why: 'EOS (Entrepreneurial Operating System) — complete framework for running a business.',
            amazonUrl: 'https://www.amazon.com/Traction-Get-Grip-Your-Business/dp/1936661837',
            googleBooksUrl: 'https://books.google.com/books?id=Traction+Gino+Wickman',
            freeUrl: 'https://www.eosworldwide.com/free-tools', freeLabel: 'Free EOS tools and templates at EOSWorldwide.com',
          },
          {
            id: 'b-06-3', title: 'The Goal', author: 'Eliyahu Goldratt', why: 'Theory of Constraints in novel format. Find and break the one bottleneck limiting growth.',
            amazonUrl: 'https://www.amazon.com/Goal-Process-Ongoing-Improvement/dp/0884271951',
            googleBooksUrl: 'https://books.google.com/books?id=The+Goal+Goldratt',
            freeUrl: 'https://www.youtube.com/results?search_query=Theory+of+Constraints+Goldratt+explained', freeLabel: 'Watch Theory of Constraints explained on YouTube',
          },
        ],
        youtube: [
          { name: 'EOS Worldwide (YouTube)', desc: 'Full EOS/Traction implementation videos.' },
          { name: 'Dan Martell (SaaS/Agency Ops)', desc: 'Practical system-building — SOPs, hiring, delegation frameworks.' },
          { name: 'Lean Enterprise Institute', desc: 'Lean operations methodology for professional services.' },
        ],
        deliverable: "Implement EOS basics: V/TO document, 3 core process SOPs, Level 10 Meeting rhythm, and a weekly Scorecard with KPIs.",
        tasks: [
          { id: 't-06-1', text: "Document your 3 core processes (onboarding, delivery, reporting) as SOPs" },
          { id: 't-06-2', text: "Set up a weekly scorecard with 5–10 leading metrics" },
          { id: 't-06-3', text: "Identify your #1 operational bottleneck using Theory of Constraints" },
          { id: 't-06-4', text: "Write your V/TO (Vision/Traction Organizer)" },
          { id: 't-06-5', text: "Implement a weekly Level 10 Meeting rhythm" },
          { id: 't-06-6', text: "Build a client project management template / workflow" },
        ],
      },
    ],
  },
  {
    id: 'phase-3', number: 3, title: 'Advanced Strategy & Leadership', duration: '10 months',
    months: 'Months 15–24', color: 'purple', badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    description: 'Transition from business operator to business architect — leading people, innovating systems, and negotiating at the highest levels.',
    modules: [
      {
        id: 'mod-07', number: '07', title: 'Leadership & Organizational Behavior', tag: 'Leadership', phase: 'Phase 3',
        books: [
          {
            id: 'b-07-1', title: 'High Output Management', author: 'Andy Grove', why: 'Most practical management book ever. Every hire you make will benefit from this.',
            amazonUrl: 'https://www.amazon.com/High-Output-Management-Andrew-Grove/dp/0679762884',
            googleBooksUrl: 'https://books.google.com/books?id=High+Output+Management+Grove',
            freeUrl: 'https://www.youtube.com/results?search_query=High+Output+Management+Andy+Grove+summary', freeLabel: 'Watch High Output Management summaries on YouTube',
          },
          {
            id: 'b-07-2', title: 'Leaders Eat Last', author: 'Simon Sinek', why: 'Biology and psychology of trust, teams, and why people follow exceptional leaders.',
            amazonUrl: 'https://www.amazon.com/Leaders-Eat-Last-Together-Others/dp/1591845327',
            googleBooksUrl: 'https://books.google.com/books?id=Leaders+Eat+Last+Sinek',
            freeUrl: 'https://www.youtube.com/results?search_query=Simon+Sinek+Leaders+Eat+Last+full+talk', freeLabel: 'Watch Simon Sinek\'s full talk on YouTube',
          },
          {
            id: 'b-07-3', title: 'An Everyone Culture', author: 'Kegan & Lahey', why: 'Harvard research on organizations where everyone grows. How elite companies retain talent.',
            amazonUrl: 'https://www.amazon.com/Everyone-Culture-Deliberately-Developmental-Organization/dp/1625278624',
            googleBooksUrl: 'https://books.google.com/books?id=An+Everyone+Culture+Kegan+Lahey',
            freeUrl: 'https://www.youtube.com/results?search_query=Robert+Kegan+deliberately+developmental+organization', freeLabel: 'Watch Kegan lectures on YouTube',
          },
        ],
        youtube: [
          { name: 'Simon Sinek (YouTube)', desc: 'Leadership philosophy and how to build teams with purpose.' },
          { name: 'Stanford GSB — Human-Centered Leadership', desc: 'Leadership development from one of the world\'s top business schools.' },
          { name: "Brené Brown (Dare to Lead talks)", desc: 'Vulnerability, courage, and leadership behaviors that build extraordinary cultures.' },
        ],
        deliverable: "Write your Leadership Philosophy (1 page). Define how you will hire, manage, develop, and retain talent as your business scales.",
        tasks: [
          { id: 't-07-1', text: "Write your personal leadership philosophy (1 page)" },
          { id: 't-07-2', text: "Implement weekly structured 1-on-1s using Andy Grove's format" },
          { id: 't-07-3', text: "Define your company's core values with specific behavioral examples" },
          { id: 't-07-4', text: "Write a 'Who we hire and why' document" },
          { id: 't-07-5', text: "Build a simple performance review framework" },
          { id: 't-07-6', text: "Create a culture doc: what it's like to work at your company" },
        ],
      },
      {
        id: 'mod-08', number: '08', title: 'Innovation & Entrepreneurship', tag: 'Innovation', phase: 'Phase 3',
        books: [
          {
            id: 'b-08-1', title: 'Zero to One', author: 'Peter Thiel', why: 'How to build something genuinely new. Forces you to ask what your business can own.',
            amazonUrl: 'https://www.amazon.com/Zero-One-Notes-Startups-Future/dp/0804139296',
            googleBooksUrl: 'https://books.google.com/books?id=Zero+to+One+Thiel',
            freeUrl: 'https://www.youtube.com/results?search_query=Peter+Thiel+Zero+to+One+Stanford+lecture', freeLabel: 'Watch Thiel\'s Stanford CS183 lectures on YouTube',
          },
          {
            id: 'b-08-2', title: "The Innovator's Dilemma", author: 'Clayton Christensen', why: 'Why successful businesses get disrupted — and how to be the disruptor.',
            amazonUrl: 'https://www.amazon.com/Innovators-Dilemma-Technologies-Management-Innovation/dp/1633691780',
            googleBooksUrl: 'https://books.google.com/books?id=Innovators+Dilemma+Christensen',
            freeUrl: 'https://www.youtube.com/results?search_query=Clayton+Christensen+Innovators+Dilemma+talk', freeLabel: 'Watch Christensen\'s lectures on YouTube',
          },
          {
            id: 'b-08-3', title: 'Crossing the Chasm', author: 'Geoffrey Moore', why: 'How products move from early adopters to mainstream markets.',
            amazonUrl: 'https://www.amazon.com/Crossing-Chasm-3rd-Disruptive-Mainstream/dp/0062292986',
            googleBooksUrl: 'https://books.google.com/books?id=Crossing+the+Chasm+Moore',
            freeUrl: 'https://www.youtube.com/results?search_query=Crossing+the+Chasm+Geoffrey+Moore+explained', freeLabel: 'Watch Crossing the Chasm explained on YouTube',
          },
        ],
        youtube: [
          { name: 'Harvard Innovation Labs (YouTube)', desc: 'Innovation methodology and entrepreneurial thinking from Harvard i-lab.' },
          { name: 'Y Combinator — Startup School', desc: "Full curriculum from the world's top startup accelerator. Free and exceptional." },
          { name: 'a16z (Andreessen Horowitz)', desc: 'Deep dives on technology trends, business models, and the future of industries.' },
        ],
        deliverable: "Conduct a 'Zero to One' audit of your business and design one genuinely innovative service offering your competitors cannot easily copy.",
        tasks: [
          { id: 't-08-1', text: "Map where your business sits on the innovation curve across 5 key services" },
          { id: 't-08-2', text: "Identify AI/tech disruption risks to 3 of your core services in 3 years" },
          { id: 't-08-3', text: "Design one new differentiated offering — 1-page concept doc" },
          { id: 't-08-4', text: "Write your 10x vision: what does the business look like 10x bigger?" },
          { id: 't-08-5', text: "Map 3 adjacent businesses you could build or acquire" },
        ],
      },
      {
        id: 'mod-09', number: '09', title: 'Negotiation & Executive Communication', tag: 'Negotiation', phase: 'Phase 3',
        books: [
          {
            id: 'b-09-1', title: 'Influence: The Psychology of Persuasion', author: 'Robert Cialdini', why: "Scientific basis of persuasion — these principles appear in every high-level business interaction.",
            amazonUrl: 'https://www.amazon.com/Influence-New-Expanded-Psychology-Persuasion/dp/0062937650',
            googleBooksUrl: 'https://books.google.com/books?id=Influence+Cialdini',
            freeUrl: 'https://www.youtube.com/results?search_query=Robert+Cialdini+Influence+six+principles+talk', freeLabel: 'Watch Cialdini\'s talks on YouTube',
          },
          {
            id: 'b-09-2', title: 'The Trusted Advisor', author: 'Maister, Green & Galford', why: 'How to move from vendor to trusted partner — the relationship model every business needs.',
            amazonUrl: 'https://www.amazon.com/Trusted-Advisor-David-H-Maister/dp/0743212347',
            googleBooksUrl: 'https://books.google.com/books?id=The+Trusted+Advisor+Maister',
            freeUrl: 'https://trustedadvisor.com/resources', freeLabel: 'Free resources at trustedadvisor.com',
          },
          {
            id: 'b-09-3', title: 'Pitch Anything', author: 'Oren Klaff', why: 'Neuroscience-based pitching framework. How to frame and present at the highest levels.',
            amazonUrl: 'https://www.amazon.com/Pitch-Anything-Innovative-Presenting-Persuading/dp/0071752854',
            googleBooksUrl: 'https://books.google.com/books?id=Pitch+Anything+Klaff',
            freeUrl: 'https://www.youtube.com/results?search_query=Oren+Klaff+Pitch+Anything+STRONG+framework', freeLabel: 'Watch Oren Klaff pitch framework on YouTube',
          },
        ],
        youtube: [
          { name: 'Harvard PON — Negotiation Insights', desc: 'Harvard Program on Negotiation: research-backed tactics and case studies.' },
          { name: 'Wharton School (Executive Education YouTube)', desc: 'Advanced business communication, influence, and executive presence.' },
          { name: 'Chris Voss — Never Split the Difference talks', desc: 'FBI negotiation applied to business.' },
        ],
        deliverable: "Prepare an Executive Pitch using Klaff's STRONG framework and map client relationships using the Trust Equation.",
        tasks: [
          { id: 't-09-1', text: "Rewrite your pitch deck using Klaff's frame control principles" },
          { id: 't-09-2', text: "Map the Trust Equation for 3 key client relationships" },
          { id: 't-09-3', text: "Practice the Voss 'late night FM DJ voice' in 3 high-stakes negotiations" },
          { id: 't-09-4', text: "Prepare 3 enterprise client outreach scripts using Cialdini's 7 principles" },
          { id: 't-09-5', text: "Build a strategic partnership proposal template" },
        ],
      },
    ],
  },
  {
    id: 'phase-4', number: 4, title: 'CEO-Level Mastery', duration: '12 months',
    months: 'Months 25–36', color: 'gold', badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    description: "Think like the CEO of a Fortune 500 or a serious investor — capital allocation, M&A, global macro, and building multi-business empires.",
    modules: [
      {
        id: 'mod-10', number: '10', title: 'Corporate Finance & Business Valuation', tag: 'Corporate Finance', phase: 'Phase 4',
        books: [
          {
            id: 'b-10-1', title: 'Valuation: Measuring and Managing the Value of Companies', author: 'McKinsey & Company', why: 'Gold-standard corporate finance textbook used by investment bankers and strategy teams.',
            amazonUrl: 'https://www.amazon.com/Valuation-Measuring-Managing-Companies-University/dp/1119610885',
            googleBooksUrl: 'https://books.google.com/books?id=Valuation+McKinsey',
            freeUrl: 'https://www.youtube.com/results?search_query=Aswath+Damodaran+valuation+course+full', freeLabel: 'Watch Damodaran\'s free valuation course on YouTube',
          },
          {
            id: 'b-10-2', title: 'The Outsiders', author: 'William Thorndike', why: '8 CEOs who created extraordinary shareholder value through unconventional capital allocation.',
            amazonUrl: 'https://www.amazon.com/Outsiders-Unconventional-Radically-Rational-Blueprint/dp/1422162672',
            googleBooksUrl: 'https://books.google.com/books?id=The+Outsiders+Thorndike',
            freeUrl: 'https://www.youtube.com/results?search_query=The+Outsiders+William+Thorndike+capital+allocation', freeLabel: 'Watch capital allocation talks on YouTube',
          },
          {
            id: 'b-10-3', title: 'Principles for Navigating Big Debt Crises', author: 'Ray Dalio', why: 'Macro financial thinking from the founder of Bridgewater.',
            amazonUrl: 'https://www.amazon.com/Principles-Navigating-Big-Debt-Crises/dp/1668009706',
            googleBooksUrl: 'https://books.google.com/books?id=Dalio+Debt+Crises',
            freeUrl: 'https://www.principles.com/big-debt-crises/', freeLabel: 'Download free PDF from Ray Dalio\'s website',
          },
        ],
        youtube: [
          { name: 'Aswath Damodaran — Full Valuation Course', desc: "NYU Stern's complete corporate finance course on YouTube. World-class and free." },
          { name: 'Bridgewater / Ray Dalio', desc: 'How the economic machine works, debt cycles, and long-term capital thinking.' },
          { name: 'Patrick Boyle (Finance YouTube)', desc: 'Rigorous corporate finance and macro economics.' },
        ],
        deliverable: "Value your business using 3 methods (revenue multiple, EBITDA multiple, DCF) and set a 5-year enterprise value target.",
        tasks: [
          { id: 't-10-1', text: "Build a 3-year DCF model with base/bull/bear scenarios" },
          { id: 't-10-2', text: "Research comparable business acquisition multiples in your industry" },
          { id: 't-10-3', text: "Calculate your business's current enterprise value (3 methods)" },
          { id: 't-10-4', text: "Define your 'exit or scale' decision framework for Year 5" },
          { id: 't-10-5', text: "Set a 5-year enterprise value target with annual milestones" },
        ],
      },
      {
        id: 'mod-11', number: '11', title: 'Venture Capital, M&A & Deal-Making', tag: 'VC & Deals', phase: 'Phase 4',
        books: [
          {
            id: 'b-11-1', title: 'Venture Deals', author: 'Brad Feld & Jason Mendelson', why: 'Complete plain-language guide to term sheets, valuations, and how VC deals work.',
            amazonUrl: 'https://www.amazon.com/Venture-Deals-Smarter-Lawyer-Capitalist/dp/1119594820',
            googleBooksUrl: 'https://books.google.com/books?id=Venture+Deals+Feld+Mendelson',
            freeUrl: 'https://www.venturedeals.com/', freeLabel: 'Free resources and term sheet explanations at venturedeals.com',
          },
          {
            id: 'b-11-2', title: 'Secrets of Sand Hill Road', author: 'Scott Kupor', why: 'A16Z partner breaks down how venture capital actually works.',
            amazonUrl: 'https://www.amazon.com/Secrets-Sand-Hill-Road-Venture/dp/059308358X',
            googleBooksUrl: 'https://books.google.com/books?id=Secrets+Sand+Hill+Road+Kupor',
            freeUrl: 'https://www.youtube.com/results?search_query=Scott+Kupor+Secrets+Sand+Hill+Road+venture+capital', freeLabel: 'Watch Scott Kupor VC talks on YouTube',
          },
          {
            id: 'b-11-3', title: 'The Art of M&A', author: 'Stanley Reed', why: 'Comprehensive guide to mergers and acquisitions from structuring to closing.',
            amazonUrl: 'https://www.amazon.com/Art-Mergers-Acquisitions-Comprehensive-Acquisition/dp/1260121089',
            googleBooksUrl: 'https://books.google.com/books?id=Art+of+MA+Reed',
            freeUrl: 'https://www.youtube.com/results?search_query=mergers+acquisitions+explained+investment+banking', freeLabel: 'Watch M&A explained on YouTube',
          },
        ],
        youtube: [
          { name: 'a16z (Andreessen Horowitz) Full YouTube', desc: 'Best content on venture, tech trends, company building, and the future of industries.' },
          { name: 'Y Combinator — How to Raise Money', desc: "Practical fundraising mechanics from the world's best seed accelerator." },
          { name: '20VC — Harry Stebbings', desc: '500+ conversations with top investors and founders on deal-making.' },
        ],
        deliverable: "Write a business investment memo and model a 'Portfolio Vision' — 3 complementary businesses you could build or acquire in 10 years.",
        tasks: [
          { id: 't-11-1', text: "Write a 1-page investment memo for your business as if pitching to a VC" },
          { id: 't-11-2', text: "Map 3 potential acquisitions or adjacent business builds" },
          { id: 't-11-3', text: "Model a scenario where you acquire a competitor — deal structure" },
          { id: 't-11-4', text: "Write a 1-page investment thesis for 2 future businesses" },
          { id: 't-11-5', text: "Build a basic term sheet template for any future partnership" },
        ],
      },
      {
        id: 'mod-12', number: '12', title: 'Economics, Macro & Global Markets', tag: 'Global Economics', phase: 'Phase 4',
        books: [
          {
            id: 'b-12-1', title: 'Basic Economics', author: 'Thomas Sowell', why: 'Clearest introduction to economic thinking — no math, pure logic applied to the real world.',
            amazonUrl: 'https://www.amazon.com/Basic-Economics-Thomas-Sowell/dp/0465060730',
            googleBooksUrl: 'https://books.google.com/books?id=Basic+Economics+Sowell',
            freeUrl: 'https://www.youtube.com/results?search_query=Thomas+Sowell+Basic+Economics+explained', freeLabel: 'Watch Thomas Sowell interviews on YouTube',
          },
          {
            id: 'b-12-2', title: 'The Wealth of Nations (Abridged)', author: 'Adam Smith', why: 'Foundational text of market economics. Essential intellectual heritage.',
            amazonUrl: 'https://www.amazon.com/Wealth-Nations-Adam-Smith/dp/1505577128',
            googleBooksUrl: 'https://books.google.com/books?id=Wealth+of+Nations+Adam+Smith',
            freeUrl: 'https://www.gutenberg.org/ebooks/3300', freeLabel: 'Read completely free on Project Gutenberg',
          },
          {
            id: 'b-12-3', title: 'Principles', author: 'Ray Dalio', why: "Life and work principles from one of the world's most successful investors.",
            amazonUrl: 'https://www.amazon.com/Principles-Life-Work-Ray-Dalio/dp/1501124021',
            googleBooksUrl: 'https://books.google.com/books?id=Principles+Ray+Dalio',
            freeUrl: 'https://www.principles.com/', freeLabel: 'Free principles summary and tools at principles.com',
          },
        ],
        youtube: [
          { name: 'Ray Dalio — Economic Principles Series', desc: "'How the Economic Machine Works' is the single best 30-minute economics education available." },
          { name: 'Bloomberg Originals', desc: 'Long-form documentary journalism on global markets, industries, and economic shifts.' },
          { name: 'Marginal Revolution University (MRU)', desc: "Free economics education from George Mason's Tyler Cowen." },
        ],
        deliverable: "Write a 5-year Environmental Scan — PESTEL analysis of your industry with 3 major threats and 3 major opportunities.",
        tasks: [
          { id: 't-12-1', text: "Write your 5-year macro environmental scan (PESTEL)" },
          { id: 't-12-2', text: "Identify 2 global macro trends reshaping your industry by 2030" },
          { id: 't-12-3', text: "Map how currency risk and inflation affect your pricing and client mix" },
          { id: 't-12-4', text: "Identify 3 new geographic markets you could expand to" },
          { id: 't-12-5', text: "Build a simple Risk Register with mitigation strategies" },
        ],
      },
    ],
  },
]

export const ALL_MODULES  = CURRICULUM.flatMap(p => p.modules)
export const ALL_BOOKS    = ALL_MODULES.flatMap(m => m.books)
export const ALL_TASKS    = ALL_MODULES.flatMap(m => m.tasks)
export const TOTAL_TASKS  = ALL_TASKS.length
export const TOTAL_BOOKS  = ALL_BOOKS.length

export function getModuleById(id: string) { return ALL_MODULES.find(m => m.id === id) }
export function getPhaseColor(color: string) {
  const map: Record<string, string> = {
    teal: 'text-[#2ed8c3]', blue: 'text-[#7b7fe8]', purple: 'text-purple-400', gold: 'text-amber-400',
  }
  return map[color] || 'text-[#2ed8c3]'
}
