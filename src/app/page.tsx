import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BookOpen, Users, Trophy, Zap, BarChart3, Globe, CheckCircle, Star, Code2, Rocket, Brain, Clock, Play } from 'lucide-react'

const stats = [
  { label: 'Modules',       value: '12',    sub: 'across 4 phases'      },
  { label: 'Curated Books', value: '30',    sub: 'with free access'     },
  { label: 'Per Day',       value: '30min', sub: 'all you need to start' },
  { label: 'Cost',          value: '$0',    sub: 'free forever'         },
]

const phases = [
  { num: '01', color: 'teal',   title: 'Business Foundations',           time: 'Weeks 1–16',  desc: 'Mental models, financial intelligence, and systems thinking. Understand how any business actually works.' },
  { num: '02', color: 'blue',   title: 'Core Business Mastery',          time: 'Weeks 17–56', desc: 'Strategy, marketing, sales, and operations — the four engines every winning company runs on.' },
  { num: '03', color: 'purple', title: 'Advanced Strategy & Leadership', time: 'Weeks 57–96', desc: 'Leadership, innovation, and negotiation. Transition from operator to architect.' },
  { num: '04', color: 'amber',  title: 'CEO-Level Mastery',              time: 'Weeks 97–144',desc: 'Corporate finance, VC & M&A, and global economics. Think like a capital allocator.' },
]

const audience = [
  { icon: Code2,  title: 'Developers & Engineers', desc: 'You can build anything. Now learn to build a business around it.' },
  { icon: Rocket, title: 'Solo Founders',           desc: 'Stop making business decisions on gut feel. Build a real operating system.' },
  { icon: Brain,  title: 'Technical Co-Founders',  desc: 'Your co-founder handles the code. You need to own the business side.' },
]

const features = [
  { icon: Clock,     title: '30 Min a Day',           desc: 'One reading block, one video, one task. Designed to fit around your real life — not replace it.' },
  { icon: BookOpen,  title: '30 Curated Books',        desc: 'Every book links to a free option. Open Library, YouTube summaries, or the author\'s own resources.' },
  { icon: Globe,     title: 'World-Class Videos',      desc: 'Y Combinator, Harvard, Stanford GSB, a16z — every video linked directly. One click to watch.' },
  { icon: Trophy,    title: 'Real Deliverables',       desc: 'Not quizzes. You build strategy docs, financial models, and sales playbooks for YOUR business.' },
  { icon: Zap,       title: 'Apply to Your Business',  desc: 'Every concept maps to your real company. This is learning by building.' },
  { icon: Users,     title: 'Founder Community',       desc: 'Learn alongside developers, founders, and engineers building real companies worldwide.' },
]

const testimonials = [
  { name: 'Alex M.',  role: 'SaaS Founder',            text: 'The strategy module completely changed how I position my product. Built my entire GTM from the Rumelt framework.' },
  { name: 'Priya K.', role: 'Developer turned Founder', text: "I've shipped 5 side projects. None made money. This curriculum taught me why — and exactly how to fix it." },
  { name: 'James O.', role: 'Technical Co-Founder',     text: 'The financial intelligence module alone was worth it. I finally understand our unit economics and LTV:CAC ratio.' },
]

const steps = [
  { num: '01', title: 'Sign up free',         desc: 'No credit card. No commitment. Your Day 1 plan is waiting the moment you enroll.' },
  { num: '02', title: 'Open today\'s plan',   desc: 'Every day shows exactly what to read (with chapter), what to watch (direct YouTube link), and one task.' },
  { num: '03', title: 'Apply to your business', desc: 'Every lesson ends with something you build for your real company. Not theory — execution.' },
]

const phaseColorMap: Record<string, { border: string; bg: string; text: string }> = {
  teal:   { border: 'border-[#2ed8c3]/30', bg: 'bg-[#2ed8c3]/8',  text: 'text-[#2ed8c3]'  },
  blue:   { border: 'border-[#585de1]/30', bg: 'bg-[#585de1]/8',  text: 'text-[#7b7fe8]'  },
  purple: { border: 'border-purple-500/30', bg: 'bg-purple-500/8', text: 'text-purple-400' },
  amber:  { border: 'border-amber-500/30',  bg: 'bg-amber-500/8',  text: 'text-amber-400'  },
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#241e20] overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.06] bg-[#241e20]/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-white border border-white/10 flex-shrink-0">
              <Image src="/logo.png" alt="Gmax MBA" width={32} height={32} className="w-full h-full object-cover" />
            </div>
            <span className="font-display font-bold text-white text-lg tracking-tight">Gmax MBA</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-[#a0a0b0]">
            <a href="#how"        className="hover:text-white transition-colors">How it Works</a>
            <a href="#curriculum" className="hover:text-white transition-colors">Curriculum</a>
            <a href="#features"   className="hover:text-white transition-colors">Features</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/signin" className="text-sm text-[#a0a0b0] hover:text-white transition-colors px-3 md:px-4 py-2">
              Sign In
            </Link>
            <Link href="/auth/signup" className="text-sm bg-[#2ed8c3] hover:bg-[#5ee3d2] text-[#241e20] font-bold px-3 md:px-4 py-2 rounded-lg transition-colors">
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-24 px-4 md:px-6 relative">
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#2ed8c3]/6 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[300px] bg-[#585de1]/6 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-[#2ed8c3]/10 border border-[#2ed8c3]/20 text-[#2ed8c3] text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2ed8c3] animate-pulse" />
            FREE FOREVER — START IN 60 SECONDS
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-[1.08] mb-6 tracking-tight">
            MBA-Level Business Skills.
            <br />
            <span className="gradient-text">30 Minutes a Day.</span>
          </h1>

          <p className="text-lg md:text-xl text-[#a0a0b0] max-w-2xl mx-auto mb-4 leading-relaxed">
            A self-guided business curriculum for developers, engineers, and solo founders. Every day: one chapter, one video, one task — applied to your real business.
          </p>

          {/* The key objection-killer line */}
          <p className="text-sm text-[#706870] max-w-xl mx-auto mb-10">
            Everything here is freely available online. What isn't free is the 200 hours of research figuring out what to read, in what order, and how to apply it. <span className="text-[#a0a0b0]">We did that part.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/auth/signup"
              className="group flex items-center gap-2 bg-[#2ed8c3] hover:bg-[#5ee3d2] text-[#241e20] font-bold px-8 py-4 rounded-xl text-base transition-all hover:scale-[1.02] shadow-lg shadow-[#2ed8c3]/15 w-full sm:w-auto justify-center">
              <Play className="w-4 h-4" />
              Start Day 1 — It's Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="#how"
              className="flex items-center gap-2 text-[#a0a0b0] hover:text-white border border-white/10 hover:border-white/20 px-8 py-4 rounded-xl text-base transition-all w-full sm:w-auto justify-center">
              <BookOpen className="w-4 h-4" />
              See How It Works
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 md:p-5">
                <div className="font-display text-2xl md:text-3xl font-bold text-white mb-1">{s.value}</div>
                <div className="text-xs text-[#a0a0b0]">{s.label}<br /><span className="text-[#706870]">{s.sub}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-14 md:py-20 px-4 md:px-6 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold text-[#2ed8c3] tracking-widest mb-3">HOW IT WORKS</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">Simple enough to actually do</h2>
            <p className="text-[#a0a0b0] text-sm max-w-lg mx-auto">No 2-hour lectures. No homework deadlines. No cohort schedule. Just show up for 30 minutes and your dashboard tells you exactly what to do.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {steps.map((s) => (
              <div key={s.num} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 font-display text-7xl font-bold text-white/[0.03] leading-none pr-4 pt-2">{s.num}</div>
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-[#2ed8c3]/10 border border-[#2ed8c3]/20 flex items-center justify-center mb-5 font-mono text-sm font-bold text-[#2ed8c3]">
                    {s.num}
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{s.title}</h3>
                  <p className="text-[#a0a0b0] text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Daily schedule preview */}
          <div className="mt-8 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 md:p-6">
            <p className="text-xs text-[#706870] uppercase tracking-wider font-semibold mb-4">What a typical day looks like</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { time: '6:00 AM', icon: '📖', label: 'Read', desc: 'Specific chapter, specific pages. 30 min max.' },
                { time: '12:00 PM', icon: '▶️', label: 'Watch', desc: 'Direct YouTube link. Watch during lunch.' },
                { time: '5:00 PM', icon: '✍️', label: 'Task', desc: 'Apply the concept to your business. 20–40 min.' },
                { time: 'Evening',  icon: '💡', label: 'Journal', desc: 'One reflection prompt. 10 minutes.' },
              ].map(item => (
                <div key={item.label} className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-3.5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{item.icon}</span>
                    <div>
                      <div className="text-xs font-semibold text-white">{item.label}</div>
                      <div className="text-[10px] text-[#706870] font-mono">{item.time}</div>
                    </div>
                  </div>
                  <p className="text-xs text-[#808090] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section id="audience" className="py-14 md:py-20 px-4 md:px-6 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold text-[#2ed8c3] tracking-widest mb-3">WHO THIS IS FOR</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">You build products. Now build the business.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {audience.map((a) => (
              <div key={a.title} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 md:p-8 hover:border-white/10 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#585de1]/10 border border-[#585de1]/20 flex items-center justify-center mb-5">
                  <a.icon className="w-5 h-5 text-[#7b7fe8]" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{a.title}</h3>
                <p className="text-[#a0a0b0] text-sm leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section id="curriculum" className="py-14 md:py-20 px-4 md:px-6 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold text-[#2ed8c3] tracking-widest mb-3">4 PHASES · 12 MODULES · 30 BOOKS</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">From first principles to Fortune 500 thinking</h2>
            <p className="text-[#a0a0b0] max-w-xl mx-auto text-sm leading-relaxed">
              Each phase builds on the last. Go at your own pace — the program tracks where you are and what's next.
            </p>
          </div>
          <div className="space-y-4">
            {phases.map((p) => {
              const c = phaseColorMap[p.color]
              return (
                <div key={p.num} className={`group flex gap-4 md:gap-6 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-white/10 rounded-2xl p-4 md:p-6 transition-all`}>
                  <div className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl border ${c.border} ${c.bg} flex items-center justify-center font-mono text-base md:text-lg font-bold ${c.text}`}>
                    {p.num}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 md:gap-3 mb-1 flex-wrap">
                      <h3 className="text-white font-semibold text-base md:text-lg">{p.title}</h3>
                      <span className={`text-xs font-mono ${c.text} hidden sm:inline`}>{p.time}</span>
                    </div>
                    <p className="text-[#a0a0b0] text-sm leading-relaxed">{p.desc}</p>
                    <span className={`text-xs font-mono ${c.text} sm:hidden mt-1 block`}>{p.time}</span>
                  </div>
                  <div className="flex-shrink-0 flex items-center">
                    <ArrowRight className="w-4 h-4 text-[#504850] group-hover:text-[#a0a0b0] group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-14 md:py-20 px-4 md:px-6 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold text-[#2ed8c3] tracking-widest mb-3">WHAT YOU GET</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Everything built-in. Nothing held back.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 md:p-6 hover:border-white/10 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mb-4">
                  <f.icon className="w-4 h-4 text-[#a0a0b0]" />
                </div>
                <h3 className="text-white font-semibold mb-2">{f.title}</h3>
                <p className="text-[#706070] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-14 md:py-20 px-4 md:px-6 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-white">From the community</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 md:p-6">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-[#a0a0b0] text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div>
                  <div className="text-white text-sm font-semibold">{t.name}</div>
                  <div className="text-[#706070] text-xs">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-4 md:px-6 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.08] rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#2ed8c3]/4 pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#585de1]/8 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Start today.<br />
                <span className="gradient-brand">30 minutes is all it takes.</span>
              </h2>
              <p className="text-[#a0a0b0] mb-8 leading-relaxed text-sm md:text-base">
                Your Day 1 plan is ready the moment you sign up. One chapter. One video. One task. That's it.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/auth/signup"
                  className="group flex items-center justify-center gap-2 bg-[#2ed8c3] hover:bg-[#5ee3d2] text-[#241e20] font-bold px-8 py-4 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-[#2ed8c3]/15">
                  <Play className="w-4 h-4" />
                  Start Day 1 Free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link href="/auth/signin"
                  className="flex items-center justify-center text-[#a0a0b0] hover:text-white border border-white/10 hover:border-white/20 px-8 py-4 rounded-xl transition-all">
                  Already have an account
                </Link>
              </div>
              <div className="mt-8 flex items-center justify-center gap-4 md:gap-6 text-xs text-[#706070] flex-wrap">
                {['No credit card', 'No paywalls', 'Go at your pace', 'Free forever'].map(item => (
                  <div key={item} className="flex items-center gap-1.5">
                    <CheckCircle className="w-3 h-3 text-[#2ed8c3]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06] py-8 md:py-10 px-4 md:px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg overflow-hidden bg-white border border-white/10 flex-shrink-0">
              <Image src="/logo.png" alt="Gmax MBA" width={28} height={28} className="w-full h-full object-cover" />
            </div>
            <span className="font-display font-bold text-white">Gmax MBA</span>
          </div>
          <p className="text-[#706070] text-xs text-center">
            A free education initiative by{' '}
            <a href="https://gmaxdigitalsolutions.com" className="text-[#2ed8c3] hover:text-[#5ee3d2] transition-colors" target="_blank" rel="noopener noreferrer">
              Gmax Digital Solutions
            </a>
          </p>
          <div className="flex gap-6 text-xs text-[#706070]">
            <Link href="/auth/signup"  className="hover:text-white transition-colors">Enroll Free</Link>
            <Link href="#curriculum"   className="hover:text-white transition-colors">Curriculum</Link>
            <Link href="#how"          className="hover:text-white transition-colors">How It Works</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
