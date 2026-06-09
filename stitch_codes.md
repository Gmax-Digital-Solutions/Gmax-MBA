<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&amp;family=Outfit:wght@100..900&amp;family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "on-tertiary": "#490080",
                    "text-primary": "#f0f0f0",
                    "surface-container": "#241e20",
                    "outline-variant": "#3b4a46",
                    "secondary-fixed-dim": "#c0c1ff",
                    "surface-dim": "#171214",
                    "text-tertiary": "#606070",
                    "status-red": "#ef4444",
                    "surface-card": "rgba(255, 255, 255, 0.02)",
                    "surface-bright": "#3e3739",
                    "on-background": "#ece0e2",
                    "tertiary-fixed": "#f0dbff",
                    "error": "#ffb4ab",
                    "surface-container-lowest": "#120d0f",
                    "inverse-primary": "#006b5f",
                    "surface-variant": "#3a3335",
                    "inverse-surface": "#ece0e2",
                    "secondary-container": "#2e31b9",
                    "background-pure": "#000000",
                    "on-primary-fixed-variant": "#005047",
                    "on-tertiary-container": "#730dc2",
                    "surface": "#171214",
                    "background": "#171214",
                    "outline": "#859490",
                    "border-hover": "rgba(255, 255, 255, 0.14)",
                    "on-surface-variant": "#bacac5",
                    "on-surface": "#ece0e2",
                    "status-amber": "#f59e0b",
                    "secondary": "#c0c1ff",
                    "on-primary": "#003731",
                    "on-tertiary-fixed": "#2c0051",
                    "on-secondary-fixed": "#04006d",
                    "primary-fixed": "#5ffae4",
                    "text-secondary": "#a0a0b0",
                    "on-secondary-container": "#abaeff",
                    "surface-container-high": "#2f282a",
                    "tertiary": "#edd4ff",
                    "on-secondary": "#0f09a4",
                    "on-tertiary-fixed-variant": "#6900b3",
                    "on-error-container": "#ffdad6",
                    "primary": "#58f5df",
                    "on-error": "#690005",
                    "secondary-fixed": "#e1e0ff",
                    "inverse-on-surface": "#352f31",
                    "surface-tint": "#37ddc8",
                    "on-primary-fixed": "#00201c",
                    "error-container": "#93000a",
                    "border-subtle": "rgba(255, 255, 255, 0.07)",
                    "on-primary-container": "#005a50",
                    "tertiary-fixed-dim": "#ddb7ff",
                    "primary-fixed-dim": "#37ddc8",
                    "tertiary-container": "#dab1ff",
                    "primary-container": "#2ed8c3",
                    "on-secondary-fixed-variant": "#2e31b9",
                    "surface-container-highest": "#3a3335",
                    "surface-container-low": "#201a1c"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px"
            },
            "spacing": {
                    "margin-mobile": "16px",
                    "margin-desktop": "40px",
                    "container-max": "1280px",
                    "gutter": "24px",
                    "unit": "4px"
            },
            "fontFamily": {
                    "label-mono": ["JetBrains Mono"],
                    "label-caps": ["Outfit"],
                    "display-lg-mobile": ["Playfair Display"],
                    "display-lg": ["Playfair Display"],
                    "body-md": ["Outfit"],
                    "body-sm": ["Outfit"],
                    "body-lg": ["Outfit"],
                    "headline-md": ["Playfair Display"],
                    "headline-sm": ["Playfair Display"]
            },
            "fontSize": {
                    "label-mono": ["12px", {"lineHeight": "1.0", "letterSpacing": "0.05em", "fontWeight": "500"}],
                    "label-caps": ["11px", {"lineHeight": "1.0", "letterSpacing": "0.1em", "fontWeight": "600"}],
                    "display-lg-mobile": ["32px", {"lineHeight": "1.2", "fontWeight": "700"}],
                    "display-lg": ["48px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                    "body-md": ["16px", {"lineHeight": "1.5", "fontWeight": "400"}],
                    "body-sm": ["14px", {"lineHeight": "1.5", "fontWeight": "400"}],
                    "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
                    "headline-md": ["32px", {"lineHeight": "1.2", "fontWeight": "600"}],
                    "headline-sm": ["24px", {"lineHeight": "1.3", "fontWeight": "600"}]
            }
          },
        },
      }
    </script>
<style>
        .dot-grid {
            background-image: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px);
            background-size: 24px 24px;
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.02);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.07);
        }
        .teal-glow-hover:hover {
            box-shadow: 0 0 15px rgba(46, 216, 195, 0.15);
            border-color: rgba(46, 216, 195, 0.3);
        }
        .primary-gradient-text {
            background: linear-gradient(to right, #2ed8c3, #585de1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .progress-bar-fill {
            background: linear-gradient(to right, #2ed8c3, #585de1);
        }
    </style>
</head>
<body class="bg-background text-text-primary font-body-md selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden">
<!-- Top Navigation Shell -->
<nav class="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-border-subtle">
<div class="flex justify-between items-center px-margin-desktop h-20 w-full max-w-container-max mx-auto">
<div class="flex items-center gap-8">
<span class="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight italic">Gmax MBA</span>
<div class="hidden md:flex items-center gap-6">
<a class="text-text-secondary font-medium hover:text-primary transition-colors duration-200 font-label-caps text-label-caps" href="#">Curriculum</a>
<a class="text-text-secondary font-medium hover:text-primary transition-colors duration-200 font-label-caps text-label-caps" href="#">Community</a>
<a class="text-text-secondary font-medium hover:text-primary transition-colors duration-200 font-label-caps text-label-caps" href="#">Journal</a>
</div>
</div>
<div class="flex items-center gap-4">
<button class="hidden md:block text-text-secondary font-label-caps text-label-caps hover:text-on-surface transition-colors">Sign In</button>
<button class="bg-primary text-on-primary px-6 py-2 rounded-full font-label-caps text-label-caps font-bold hover:shadow-[0_0_15px_rgba(46,216,195,0.4)] transition-all active:scale-95">Start Free</button>
</div>
</div>
</nav>
<!-- Hero Section -->
<header class="relative pt-32 pb-24 dot-grid min-h-[921px] flex flex-col justify-center overflow-hidden">
<div class="absolute inset-0 z-0 pointer-events-none">
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]"></div>
</div>
<div class="max-w-container-max mx-auto px-margin-desktop relative z-10 grid lg:grid-cols-2 gap-16 items-center">
<div class="space-y-8">
<div class="space-y-4">
<span class="inline-block px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full font-label-mono text-label-mono uppercase tracking-widest">Enrollment Open • Cohort 2024</span>
<h1 class="font-display-lg text-display-lg leading-tight">
                        MBA-Level Business Skills. <br/>
<span class="primary-gradient-text italic">30 Minutes a Day.</span>
</h1>
<p class="text-text-secondary text-body-lg max-w-xl">
                        Institutional-grade business education for the builders of tomorrow. Self-guided, free, and designed specifically for high-performance engineers.
                    </p>
</div>
<div class="flex flex-wrap gap-4 pt-4">
<button class="bg-primary-container text-on-primary-container px-8 py-4 rounded-lg font-label-caps text-label-caps font-bold flex items-center gap-3 hover:shadow-[0_0_20px_rgba(46,216,195,0.3)] transition-all active:scale-95">
<span class="material-symbols-outlined" data-icon="play_arrow" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
                        Start Day 1 — It's Free
                    </button>
<button class="border border-border-subtle hover:bg-surface-container text-text-primary px-8 py-4 rounded-lg font-label-caps text-label-caps font-bold transition-all">
                        See How It Works
                    </button>
</div>
<div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12">
<div class="glass-card p-4 rounded-xl">
<p class="font-label-mono text-label-mono text-primary uppercase">12 Modules</p>
<p class="text-text-secondary text-body-sm mt-1">Full Curriculum</p>
</div>
<div class="glass-card p-4 rounded-xl">
<p class="font-label-mono text-label-mono text-primary uppercase">30 Books</p>
<p class="text-text-secondary text-body-sm mt-1">Curated Library</p>
</div>
<div class="glass-card p-4 rounded-xl">
<p class="font-label-mono text-label-mono text-primary uppercase">30 Min/Day</p>
<p class="text-text-secondary text-body-sm mt-1">Focused Learning</p>
</div>
<div class="glass-card p-4 rounded-xl">
<p class="font-label-mono text-label-mono text-primary uppercase">$0 Cost</p>
<p class="text-text-secondary text-body-sm mt-1">Open Access</p>
</div>
</div>
</div>
<div class="hidden lg:block relative">
<div class="aspect-[4/5] rounded-2xl overflow-hidden glass-card border-border-hover relative">
<img alt="Tech founders working" class="w-full h-full object-cover grayscale-[0.3]" data-alt="A cinematic, high-contrast photograph of two focused technology founders, a man and a woman, working intensely in a modern, dark-themed office space at night. The lighting is low-key with a soft teal bioluminescent glow reflecting off their faces and glass desks. The aesthetic is clean, professional, and sophisticated, matching an elite business school environment with high-end tech engineering precision." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnZm8VA31vsY89rFemczk5hIQLt8LFya30wNTNiMy1b_ma3AHotXrUch86vS93LbjIIm6A7njuXFF7HOQXJjIQ42ZV1cYAQqKqe3Mb_MK3BR2BZVaqVRevvreU0VKCMDLICdwM3wWwm43gQDLQLDpiSXdP4_mecpgYHLK_-OziFr_eikfVp9LVzcYRz9COj8blmgM0FkH0rVRDL8bfEjCU0pJ5xnn8kyRkgLxwjaj0xReRZJuO8RfUK_0-LG_a5b1vTLXZptW8XTYP"/>
<div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
</div>
<!-- Decorative elements -->
<div class="absolute -bottom-6 -left-6 glass-card p-6 rounded-xl animate-pulse">
<div class="flex items-center gap-4 mb-4">
<div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
<span class="material-symbols-outlined" data-icon="trending_up">trending_up</span>
</div>
<div>
<p class="text-body-sm font-bold">Performance Delta</p>
<p class="text-label-mono text-primary">+42% Efficiency</p>
</div>
</div>
</div>
</div>
</div>
</header>
<!-- How it Works Section -->
<section class="py-24 bg-surface-dim">
<div class="max-w-container-max mx-auto px-margin-desktop">
<div class="text-center mb-16">
<h2 class="font-headline-md text-headline-md mb-4">Engineering-Grade Method</h2>
<p class="text-text-secondary max-w-2xl mx-auto">The path from engineer to executive is systematic. We've optimized the delivery to match your mental models.</p>
</div>
<div class="grid md:grid-cols-3 gap-8">
<div class="glass-card p-8 rounded-2xl teal-glow-hover transition-all">
<span class="text-primary font-display-lg text-4xl mb-6 block">01</span>
<h3 class="font-headline-sm text-headline-sm mb-4">Sign Up</h3>
<p class="text-text-secondary">Create your permanent record. Access the full cohort curriculum and track your mastery milestones instantly.</p>
</div>
<div class="glass-card p-8 rounded-2xl teal-glow-hover transition-all">
<span class="text-primary font-display-lg text-4xl mb-6 block">02</span>
<h3 class="font-headline-sm text-headline-sm mb-4">Open Plan</h3>
<p class="text-text-secondary">Receive your daily 30-minute block. Each lesson is condensed for high-density information retrieval.</p>
</div>
<div class="glass-card p-8 rounded-2xl teal-glow-hover transition-all">
<span class="text-primary font-display-lg text-4xl mb-6 block">03</span>
<h3 class="font-headline-sm text-headline-sm mb-4">Apply</h3>
<p class="text-text-secondary">Immediate execution tasks. Bridge the gap between theory and board-room ready results every single day.</p>
</div>
</div>
</div>
</section>
<!-- A Typical Day Section -->
<section class="py-24 dot-grid">
<div class="max-w-container-max mx-auto px-margin-desktop">
<h2 class="font-headline-md text-headline-md mb-12 border-l-4 border-primary pl-6">The Daily Protocol</h2>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
<div class="p-8 glass-card rounded-xl border-l-2 border-primary/40">
<span class="material-symbols-outlined text-primary mb-4" data-icon="menu_book">menu_book</span>
<p class="font-label-caps text-label-caps text-primary mb-2">08:00 AM</p>
<h4 class="font-headline-sm text-xl mb-2">Read</h4>
<p class="text-text-secondary text-body-sm">Deep dive into foundational texts curated from M7 business schools.</p>
</div>
<div class="p-8 glass-card rounded-xl border-l-2 border-secondary/40">
<span class="material-symbols-outlined text-secondary mb-4" data-icon="play_circle">play_circle</span>
<p class="font-label-caps text-label-caps text-secondary mb-2">08:10 AM</p>
<h4 class="font-headline-sm text-xl mb-2">Watch</h4>
<p class="text-text-secondary text-body-sm">Case studies and expert analysis videos break down complex strategies.</p>
</div>
<div class="p-8 glass-card rounded-xl border-l-2 border-tertiary/40">
<span class="material-symbols-outlined text-tertiary mb-4" data-icon="edit_square">edit_square</span>
<p class="font-label-caps text-label-caps text-tertiary mb-2">08:20 AM</p>
<h4 class="font-headline-sm text-xl mb-2">Task</h4>
<p class="text-text-secondary text-body-sm">Direct application exercises. Solve real-world management puzzles.</p>
</div>
<div class="p-8 glass-card rounded-xl border-l-2 border-status-amber/40">
<span class="material-symbols-outlined text-status-amber mb-4" data-icon="psychology">psychology</span>
<p class="font-label-caps text-label-caps text-status-amber mb-2">08:30 AM</p>
<h4 class="font-headline-sm text-xl mb-2">Journal</h4>
<p class="text-text-secondary text-body-sm">Synthesize insights into your permanent executive knowledge base.</p>
</div>
</div>
</div>
</section>
<!-- Who it's For Section -->
<section class="py-24 bg-surface-container-low">
<div class="max-w-container-max mx-auto px-margin-desktop">
<h2 class="font-headline-md text-headline-md text-center mb-16">Designed for the Builder Mindset</h2>
<div class="grid md:grid-cols-3 gap-8">
<!-- Developer -->
<div class="group p-10 glass-card rounded-2xl border-t-4 border-secondary hover:translate-y-[-8px] transition-all duration-300">
<div class="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-8">
<span class="material-symbols-outlined" data-icon="terminal">terminal</span>
</div>
<h3 class="font-headline-sm text-headline-sm mb-4">Developers</h3>
<p class="text-text-secondary mb-8">Stop being 'just a resource'. Understand the unit economics and market forces that drive product decisions.</p>
<ul class="space-y-3 font-label-mono text-label-mono text-secondary">
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-xs" data-icon="check">check</span> CAREER VERTICALITY</li>
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-xs" data-icon="check">check</span> TECH-BUSINESS ALIGNMENT</li>
</ul>
</div>
<!-- Solo Founder -->
<div class="group p-10 glass-card rounded-2xl border-t-4 border-primary hover:translate-y-[-8px] transition-all duration-300">
<div class="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-8">
<span class="material-symbols-outlined" data-icon="rocket_launch" style="font-variation-settings: 'FILL' 1;">rocket_launch</span>
</div>
<h3 class="font-headline-sm text-headline-sm mb-4">Solo Founders</h3>
<p class="text-text-secondary mb-8">Bootstrap with precision. Learn capital allocation and distribution strategies used by world-class giants.</p>
<ul class="space-y-3 font-label-mono text-label-mono text-primary">
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-xs" data-icon="check">check</span> CAPITAL ALLOCATION</li>
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-xs" data-icon="check">check</span> SCALING OPERATIONS</li>
</ul>
</div>
<!-- Co-Founder -->
<div class="group p-10 glass-card rounded-2xl border-t-4 border-tertiary hover:translate-y-[-8px] transition-all duration-300">
<div class="w-14 h-14 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary mb-8">
<span class="material-symbols-outlined" data-icon="groups">groups</span>
</div>
<h3 class="font-headline-sm text-headline-sm mb-4">Co-Founders</h3>
<p class="text-text-secondary mb-8">Master the 'Soft Skills' with hard data. Effective communication, hiring, and team orchestration.</p>
<ul class="space-y-3 font-label-mono text-label-mono text-tertiary">
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-xs" data-icon="check">check</span> ORGANIZATIONAL DESIGN</li>
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-xs" data-icon="check">check</span> STRATEGIC NEGOTIATION</li>
</ul>
</div>
</div>
</div>
</section>
<!-- Curriculum Section -->
<section class="py-24">
<div class="max-w-container-max mx-auto px-margin-desktop">
<div class="flex justify-between items-end mb-16">
<div>
<h2 class="font-headline-md text-headline-md mb-2">The Curriculum</h2>
<p class="text-text-secondary">4 Phases. 12 Modules. Absolute Mastery.</p>
</div>
<div class="hidden md:block">
<span class="text-label-mono text-text-tertiary">PROGRAM DURATION: 12 MONTHS (ADAPTIVE)</span>
</div>
</div>
<div class="space-y-4">
<!-- Phase 1 -->
<div class="glass-card p-6 rounded-xl flex flex-col md:flex-row items-center gap-8 border-l-4 border-primary">
<div class="w-full md:w-1/4">
<span class="font-label-mono text-primary">PHASE 01</span>
<h4 class="font-headline-sm text-xl text-primary">Business Foundations</h4>
</div>
<div class="flex-1 grid md:grid-cols-3 gap-4">
<div class="text-body-sm text-text-secondary">Economics of SaaS</div>
<div class="text-body-sm text-text-secondary">Financial Statements</div>
<div class="text-body-sm text-text-secondary">Value Creation</div>
</div>
<div class="w-full md:w-32 bg-surface-container h-2 rounded-full overflow-hidden">
<div class="progress-bar-fill h-full w-[100%]"></div>
</div>
</div>
<!-- Phase 2 -->
<div class="glass-card p-6 rounded-xl flex flex-col md:flex-row items-center gap-8 border-l-4 border-secondary">
<div class="w-full md:w-1/4">
<span class="font-label-mono text-secondary">PHASE 02</span>
<h4 class="font-headline-sm text-xl text-secondary">Core Mastery</h4>
</div>
<div class="flex-1 grid md:grid-cols-3 gap-4">
<div class="text-body-sm text-text-secondary">Marketing Distribution</div>
<div class="text-body-sm text-text-secondary">Operational Design</div>
<div class="text-body-sm text-text-secondary">Sales Engineering</div>
</div>
<div class="w-full md:w-32 bg-surface-container h-2 rounded-full overflow-hidden">
<div class="bg-secondary/20 h-full w-[40%]"></div>
</div>
</div>
<!-- Phase 3 -->
<div class="glass-card p-6 rounded-xl flex flex-col md:flex-row items-center gap-8 border-l-4 border-tertiary">
<div class="w-full md:w-1/4">
<span class="font-label-mono text-tertiary">PHASE 03</span>
<h4 class="font-headline-sm text-xl text-tertiary">Strategy</h4>
</div>
<div class="flex-1 grid md:grid-cols-3 gap-4">
<div class="text-body-sm text-text-secondary">Competitive Moats</div>
<div class="text-body-sm text-text-secondary">Corporate Strategy</div>
<div class="text-body-sm text-text-secondary">Game Theory</div>
</div>
<div class="w-full md:w-32 bg-surface-container h-2 rounded-full overflow-hidden">
<div class="bg-tertiary/20 h-full w-[0%]"></div>
</div>
</div>
<!-- Phase 4 -->
<div class="glass-card p-6 rounded-xl flex flex-col md:flex-row items-center gap-8 border-l-4 border-status-amber">
<div class="w-full md:w-1/4">
<span class="font-label-mono text-status-amber">PHASE 04</span>
<h4 class="font-headline-sm text-xl text-status-amber">CEO Mastery</h4>
</div>
<div class="flex-1 grid md:grid-cols-3 gap-4">
<div class="text-body-sm text-text-secondary">Board Governance</div>
<div class="text-body-sm text-text-secondary">M&amp;A Fundamentals</div>
<div class="text-body-sm text-text-secondary">Executive Leadership</div>
</div>
<div class="w-full md:w-32 bg-surface-container h-2 rounded-full overflow-hidden">
<div class="bg-status-amber/20 h-full w-[0%]"></div>
</div>
</div>
</div>
</div>
</section>
<!-- Features Bento Grid -->
<section class="py-24 bg-surface-dim overflow-hidden">
<div class="max-w-container-max mx-auto px-margin-desktop">
<h2 class="font-headline-md text-headline-md mb-12 text-center">Institutional Infrastructure</h2>
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
<!-- Large Card -->
<div class="md:col-span-2 glass-card p-10 rounded-2xl relative overflow-hidden group">
<div class="relative z-10">
<h3 class="font-headline-sm text-headline-sm mb-4">Adaptive Knowledge Graph</h3>
<p class="text-text-secondary max-w-md">Our system maps your learning in real-time, connecting business concepts to technical paradigms you already understand.</p>
</div>
<div class="absolute bottom-[-50px] right-[-50px] opacity-10 group-hover:opacity-20 transition-opacity">
<span class="material-symbols-outlined text-[200px]" data-icon="hub">hub</span>
</div>
</div>
<!-- Small Card -->
<div class="glass-card p-10 rounded-2xl teal-glow-hover transition-all">
<span class="material-symbols-outlined text-primary mb-4" data-icon="library_books">library_books</span>
<h3 class="font-headline-sm text-xl mb-2">Exclusive Library</h3>
<p class="text-text-secondary text-body-sm">Access summaries of 30+ core MBA texts.</p>
</div>
<!-- Small Card -->
<div class="glass-card p-10 rounded-2xl teal-glow-hover transition-all">
<span class="material-symbols-outlined text-secondary mb-4" data-icon="diversity_3">diversity_3</span>
<h3 class="font-headline-sm text-xl mb-2">Peer Network</h3>
<p class="text-text-secondary text-body-sm">Connect with high-performance builders.</p>
</div>
<!-- Wide Card -->
<div class="md:col-span-2 glass-card p-10 rounded-2xl flex items-center gap-8 group">
<div class="hidden sm:block w-32 h-32 rounded-full bg-tertiary/10 flex-shrink-0 flex items-center justify-center">
<span class="material-symbols-outlined text-tertiary text-4xl" data-icon="history_edu">history_edu</span>
</div>
<div>
<h3 class="font-headline-sm text-headline-sm mb-2">Digital Executive Journal</h3>
<p class="text-text-secondary">A persistent, searchable record of your strategic growth and decision-making logic.</p>
</div>
</div>
</div>
</div>
</section>
<!-- Testimonials Section -->
<section class="py-24">
<div class="max-w-container-max mx-auto px-margin-desktop">
<h2 class="font-headline-md text-headline-md text-center mb-16 italic">What our scholars say</h2>
<div class="grid md:grid-cols-3 gap-8">
<!-- Testimonial 1 -->
<div class="glass-card p-8 rounded-2xl border-b-2 border-primary/20">
<div class="flex gap-1 text-primary mb-4">
<span class="material-symbols-outlined text-sm" data-icon="star" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-sm" data-icon="star" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-sm" data-icon="star" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-sm" data-icon="star" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-sm" data-icon="star" style="font-variation-settings: 'FILL' 1;">star</span>
</div>
<p class="text-body-md text-text-primary mb-6 italic">"The curriculum bridging engineering and business is something I haven't found even in top-tier executive programs."</p>
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-surface-container"></div>
<div>
<p class="font-label-caps text-label-caps font-bold">Alex Chen</p>
<p class="text-label-mono text-text-tertiary text-[10px]">L7 PRINCIPAL ENGINEER</p>
</div>
</div>
</div>
<!-- Testimonial 2 -->
<div class="glass-card p-8 rounded-2xl border-b-2 border-secondary/20">
<div class="flex gap-1 text-secondary mb-4">
<span class="material-symbols-outlined text-sm" data-icon="star" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-sm" data-icon="star" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-sm" data-icon="star" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-sm" data-icon="star" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-sm" data-icon="star" style="font-variation-settings: 'FILL' 1;">star</span>
</div>
<p class="text-body-md text-text-primary mb-6 italic">"Gmax MBA gave me the vocabulary and framework to raise our Series A with complete confidence."</p>
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-surface-container"></div>
<div>
<p class="font-label-caps text-label-caps font-bold">Sarah Jenkins</p>
<p class="text-label-mono text-text-tertiary text-[10px]">SOLO FOUNDER, FINTECH</p>
</div>
</div>
</div>
<!-- Testimonial 3 -->
<div class="glass-card p-8 rounded-2xl border-b-2 border-tertiary/20">
<div class="flex gap-1 text-tertiary mb-4">
<span class="material-symbols-outlined text-sm" data-icon="star" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-sm" data-icon="star" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-sm" data-icon="star" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-sm" data-icon="star" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-sm" data-icon="star" style="font-variation-settings: 'FILL' 1;">star</span>
</div>
<p class="text-body-md text-text-primary mb-6 italic">"Finally, a business education that doesn't feel like a series of generic buzzwords. Pure signal."</p>
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-surface-container"></div>
<div>
<p class="font-label-caps text-label-caps font-bold">Marcus Thorne</p>
<p class="text-label-mono text-text-tertiary text-[10px]">CTO &amp; CO-FOUNDER</p>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- Final CTA -->
<section class="py-32 relative overflow-hidden">
<div class="absolute inset-0 bg-primary/5 pointer-events-none"></div>
<div class="max-w-container-max mx-auto px-margin-desktop text-center relative z-10">
<h2 class="font-display-lg text-display-lg mb-6">Start today. 30 minutes is <br/><span class="italic text-primary">all it takes.</span></h2>
<p class="text-text-secondary text-body-lg mb-12 max-w-xl mx-auto">Join 15,000+ builders mastering the art of business engineering. Zero cost. Institutional excellence.</p>
<div class="flex flex-col items-center gap-6">
<button class="bg-primary text-on-primary px-12 py-5 rounded-lg font-label-caps text-label-caps font-extrabold text-lg hover:shadow-[0_0_30px_rgba(46,216,195,0.5)] transition-all active:scale-95">
                    ENROLL NOW — FREE
                </button>
<p class="text-label-mono text-text-tertiary uppercase">NEXT COHORT STARTS IN 14:02:45</p>
</div>
</div>
</section>
<!-- Footer -->
<footer class="bg-surface-dim border-t border-border-subtle py-12">
<div class="max-w-container-max mx-auto px-margin-desktop">
<div class="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
<div class="space-y-4">
<span class="font-headline-sm text-headline-sm text-on-surface opacity-50 italic">Gmax MBA</span>
<p class="text-body-sm text-text-tertiary max-w-xs">Institutional Excellence for the Digital Age. Democratizing executive-level business education for the engineering elite.</p>
</div>
<div class="grid grid-cols-2 md:grid-cols-4 gap-12">
<div class="space-y-4">
<p class="font-label-caps text-label-caps text-on-surface">Curriculum</p>
<ul class="space-y-2 text-body-sm text-text-tertiary">
<li><a class="hover:text-primary transition-colors" href="#">Phase 1</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Phase 2</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Phase 3</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Phase 4</a></li>
</ul>
</div>
<div class="space-y-4">
<p class="font-label-caps text-label-caps text-on-surface">Resources</p>
<ul class="space-y-2 text-body-sm text-text-tertiary">
<li><a class="hover:text-primary transition-colors" href="#">Research</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Case Studies</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Library</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Journal</a></li>
</ul>
</div>
<div class="space-y-4">
<p class="font-label-caps text-label-caps text-on-surface">Institute</p>
<ul class="space-y-2 text-body-sm text-text-tertiary">
<li><a class="hover:text-primary transition-colors" href="#">About Us</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Faculty</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Admissions</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Ethics</a></li>
</ul>
</div>
<div class="space-y-4">
<p class="font-label-caps text-label-caps text-on-surface">Legal</p>
<ul class="space-y-2 text-body-sm text-text-tertiary">
<li><a class="hover:text-primary transition-colors" href="#">Terms</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Privacy</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Cookies</a></li>
</ul>
</div>
</div>
</div>
<div class="pt-12 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-6">
<p class="font-label-mono text-label-mono text-text-tertiary text-[10px]">© 2024 GMAX MBA. ALL RIGHTS RESERVED. NON-DISCLOSURE MAY APPLY TO CERTAIN MODULES.</p>
<div class="flex gap-6">
<a class="text-text-tertiary hover:text-on-surface transition-colors" href="#"><span class="material-symbols-outlined" data-icon="public">public</span></a>
<a class="text-text-tertiary hover:text-on-surface transition-colors" href="#"><span class="material-symbols-outlined" data-icon="mail">mail</span></a>
</div>
</div>
</div>
</footer>
<script>
        // Simple micro-interaction for glass cards
        document.querySelectorAll('.glass-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    </script>
</body></html>