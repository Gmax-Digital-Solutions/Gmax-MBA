import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BookOpen, Users, Trophy, Zap, BarChart3, Globe, CheckCircle, Star, Code2, Rocket, Brain } from 'lucide-react'

const stats = [
  { label: 'Modules',  value: '12', sub: 'across 4 phases' },
  { label: 'Books',    value: '30', sub: 'curated reads'   },
  { label: 'Duration', value: '36', sub: 'months structured' },
  { label: 'Cost',     value: '$0', sub: 'completely free' },
]

const phases = [
  { num: '01', color: 'teal',   title: 'Business Foundations',           time: 'Months 1–4',   desc: 'Mental models, financial intelligence, and systems thinking. Understand how any business actually works.' },
  { num: '02', color: 'blue',   title: 'Core Business Mastery',          time: 'Months 5–14',  desc: 'Strategy, marketing, sales, and operations — the four engines every winning company runs on.' },
  { num: '03', color: 'purple', title: 'Advanced Strategy & Leadership', time: 'Months 15–24', desc: 'Leadership, innovation, and negotiation. Transition from operator to architect.' },
  { num: '04', color: 'amber',  title: 'CEO-Level Mastery',              time: 'Months 25–36', desc: 'Corporate finance, VC & M&A, and global economics. Think like a capital allocator.' },
]

const audience = [
  { icon: Code2,   title: 'Developers & Engineers', desc: 'You can build anything. Now learn to build a business around it.' },
  { icon: Rocket,  title: 'Solo Founders',          desc: 'Stop making business decisions on gut feel. Build a real operating system.' },
  { icon: Brain,   title: 'Technical Co-Founders',  desc: 'Your co-founder handles the code. You need to own the business side.' },
]

const features = [
  { icon: BookOpen,  title: '29 Curated Books',         desc: 'Not Amazon bestsellers. The books CEOs, VCs, and Fortune 500 operators actually read.' },
  { icon: Globe,     title: 'YouTube Deep Dives',        desc: 'Y Combinator, Harvard Innovation Labs, Stanford GSB, a16z — world-class free education.' },
  { icon: BarChart3, title: 'Progress Tracking',         desc: 'Your personal dashboard tracks every book, every task, every milestone across 36 months.' },
  { icon: Trophy,    title: 'Real Deliverables',         desc: 'Not quizzes. A strategy doc, a sales playbook, a financial model — applied to your business.' },
  { icon: Zap,       title: 'Apply to Your Business',    desc: 'Every single concept maps to your real company. This is learning by building.' },
  { icon: Users,     title: 'Founder Community',         desc: 'Learn alongside developers, founders, and engineers building real companies worldwide.' },
]

const testimonials = [
  { name: 'Alex M.',  role: 'SaaS Founder',            text: 'The strategy module completely changed how I position my product. Built my entire GTM from the Rumelt framework.' },
  { name: 'Priya K.', role: 'Developer turned Founder', text: "I've shipped 5 side projects. None made money. This curriculum taught me why — and exactly how to fix it." },
  { name: 'James O.', role: 'Technical Co-Founder',     text: 'The financial intelligence module alone was worth it. I finally understand our unit economics.' },
]

const phaseColorMap: Record<string, { border: string; bg: string; text: string; mono: string }> = {
  teal:   { border: 'border-[#2ed8c3]/30', bg: 'bg-[#2ed8c3]/8',  text: 'text-[#2ed8c3]',  mono: 'text-[#2ed8c3]'  },
  blue:   { border: 'border-[#585de1]/30', bg: 'bg-[#585de1]/8',  text: 'text-[#7b7fe8]',  mono: 'text-[#7b7fe8]'  },
  purple: { border: 'border-purple-500/30',bg: 'bg-purple-500/8', text: 'text-purple-400', mono: 'text-purple-400' },
  amber:  { border: 'border-amber-500/30', bg: 'bg-amber-500/8',  text: 'text-amber-400',  mono: 'text-amber-400'  },
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#08080c] overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.06] bg-[#08080c]/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-white border border-white/10 flex-shrink-0">
              <Image src="/logo.png" alt="Gmax MBA" width={32} height={32} className="w-full h-full object-cover" />
            </div>
            <span className="font-display font-bold text-white text-lg tracking-tight">Gmax MBA</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-[#a0a0b0]">
            <a href="#curriculum" className="hover:text-white transition-colors">Curriculum</a>
            <a href="#features"   className="hover:text-white transition-colors">Features</a>
            <a href="#audience"   className="hover:text-white transition-colors">Who It's For</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/signin" className="text-sm text-[#a0a0b0] hover:text-white transition-colors px-4 py-2">
              Sign In
            </Link>
            <Link href="/auth/signup" className="text-sm bg-[#2ed8c3] hover:bg-[#5ee3d2] text-[#241e20] font-bold px-4 py-2 rounded-lg transition-colors">
              Enroll Free
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
            100% FREE — NO CREDIT CARD REQUIRED
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-[1.08] mb-6 tracking-tight">
            The MBA Built for
            <br />
            <span className="gradient-text">Founders & Builders</span>
          </h1>
          <p className="text-xl text-[#a0a0b0] max-w-2xl mx-auto mb-10 leading-relaxed">
            A structured 36-month business education program — curated books, world-class YouTube lectures, and real deliverables you apply to your actual company. No lectures. No tuition. No BS.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/auth/signup" className="group flex items-center gap-2 bg-[#2ed8c3] hover:bg-[#5ee3d2] text-[#241e20] font-bold px-8 py-4 rounded-xl text-base transition-all hover:scale-[1.02] shadow-lg shadow-[#2ed8c3]/15">
              Start Learning Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="#curriculum" className="flex items-center gap-2 text-[#a0a0b0] hover:text-white border border-white/10 hover:border-white/20 px-8 py-4 rounded-xl text-base transition-all">
              <BookOpen className="w-4 h-4" />
              View Curriculum
            </Link>
          </div>
          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
                <div className="font-display text-3xl font-bold text-white mb-1">{s.value}</div>
                <div className="text-xs text-[#a0a0b0]">{s.label}<br /><span className="text-[#706870]">{s.sub}</span></div>
              </div>
            ))}
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
              <div key={a.title} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-white/10 transition-colors">
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
            <div className="text-xs font-semibold text-[#2ed8c3] tracking-widest mb-3">4 PHASES · 12 MODULES · 36 MONTHS</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">From first principles to Fortune 500 thinking</h2>
            <p className="text-[#a0a0b0] max-w-xl mx-auto text-sm leading-relaxed">
              Each phase builds on the last. By the end, you can walk into any boardroom, read any financial statement, negotiate any deal, and build any team.
            </p>
          </div>
          <div className="space-y-4">
            {phases.map((p) => {
              const c = phaseColorMap[p.color]
              return (
                <div key={p.num} className={`group flex gap-6 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-white/10 rounded-2xl p-6 transition-all cursor-default`}>
                  <div className={`flex-shrink-0 w-14 h-14 rounded-xl border ${c.border} ${c.bg} flex items-center justify-center font-mono text-lg font-bold ${c.text}`}>
                    {p.num}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-white font-semibold text-lg">{p.title}</h3>
                      <span className={`text-xs font-mono ${c.mono}`}>{p.time}</span>
                    </div>
                    <p className="text-[#a0a0b0] text-sm leading-relaxed">{p.desc}</p>
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
              <div key={f.title} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:border-white/10 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mb-4">
                  <f.icon className="w-4 h-4 text-[#a0a0b0]" />
                </div>
                <h3 className="text-white font-semibold mb-2">{f.title}</h3>
                <p className="text-[#706870] text-sm leading-relaxed">{f.desc}</p>
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
              <div key={t.name} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-[#a0a0b0] text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div>
                  <div className="text-white text-sm font-semibold">{t.name}</div>
                  <div className="text-[#706870] text-xs">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-4 md:px-6 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.08] rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#2ed8c3]/4 pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#585de1]/8 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Ready to build your<br />
                <span className="gradient-brand">business brain?</span>
              </h2>
              <p className="text-[#a0a0b0] mb-8 leading-relaxed">
                Join hundreds of founders and builders going through the program. Free forever. Start today.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/auth/signup" className="group flex items-center justify-center gap-2 bg-[#2ed8c3] hover:bg-[#5ee3d2] text-[#241e20] font-bold px-8 py-4 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-[#2ed8c3]/15">
                  Enroll for Free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link href="/auth/signin" className="flex items-center justify-center text-[#a0a0b0] hover:text-white border border-white/10 hover:border-white/20 px-8 py-4 rounded-xl transition-all">
                  Already have an account
                </Link>
              </div>
              <div className="mt-8 flex items-center justify-center gap-6 text-xs text-[#706870] flex-wrap">
                {['No credit card', 'No paywalls', 'No time limits', 'Forever free'].map(item => (
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
      <footer className="border-t border-white/[0.06] py-10 px-4 md:px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg overflow-hidden bg-white border border-white/10 flex-shrink-0">
              <Image src="/logo.png" alt="Gmax MBA" width={28} height={28} className="w-full h-full object-cover" />
            </div>
            <span className="font-display font-bold text-white">Gmax MBA</span>
          </div>
          <p className="text-[#706870] text-xs text-center">
            A free business education initiative by{' '}
            <a href="https://gmaxdigitalsolutions.com" className="text-[#2ed8c3] hover:text-[#5ee3d2] transition-colors" target="_blank" rel="noopener noreferrer">
              Gmax Digital Solutions
            </a>
          </p>
          <div className="flex gap-6 text-xs text-[#706870]">
            <Link href="/auth/signup" className="hover:text-white transition-colors">Enroll</Link>
            <Link href="#curriculum"  className="hover:text-white transition-colors">Curriculum</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
