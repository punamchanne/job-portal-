import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import {
    Search, MapPin, Check, ArrowRight, Heart, Briefcase, Users,
    TrendingUp, Headset, UserCheck, BookOpen, PenTool, PieChart,
    Twitter, Facebook, Instagram, Linkedin, Quote, CheckCircle,
    Cpu, Zap, Award, Sparkles, Building, ChevronDown, CheckCircle2,
    Shield, BarChart2, X, Play, Code
} from 'lucide-react'

export default function LandingPage() {
    const [activeTab, setActiveTab] = useState('Featured')
    const [searchKeyword, setSearchKeyword] = useState('')
    const [wishlist, setWishlist] = useState(() => {
        try { return JSON.parse(localStorage.getItem('wishlist') || '[]') } catch { return [] }
    })
    const [newsletterEmail, setNewsletterEmail] = useState('')
    const [newsletterSuccess, setNewsletterSuccess] = useState(false)
    const [faqOpen, setFaqOpen] = useState(null)
    const [isYearly, setIsYearly] = useState(false)
    
    // Interactive demo state
    const [demoTab, setDemoTab] = useState('match')
    
    // Industry Showcase state (matching reference tab design)
    const [industryTab, setIndustryTab] = useState('tech')

    const navigate = useNavigate()
    const role = localStorage.getItem('role')

    const toggleWishlist = (jobTitle) => {
        setWishlist(prev => {
            const updated = prev.includes(jobTitle)
                ? prev.filter(t => t !== jobTitle)
                : [...prev, jobTitle]
            localStorage.setItem('wishlist', JSON.stringify(updated))
            return updated
        })
    }

    const handleNewsletterSignup = (e) => {
        e.preventDefault()
        if (!newsletterEmail.trim()) return
        setNewsletterSuccess(true)
        setNewsletterEmail('')
        setTimeout(() => setNewsletterSuccess(false), 4000)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        navigate(`/jobs${searchKeyword ? `?search=${encodeURIComponent(searchKeyword)}` : ''}`)
    }

    const categories = [
        { icon: <Cpu size={24} />, name: "AI & Engineering", vacancies: "142 Vacancies" },
        { icon: <TrendingUp size={24} />, name: "Marketing & Growth", vacancies: "98 Vacancies" },
        { icon: <PieChart size={24} />, name: "Product Management", vacancies: "64 Vacancies" },
        { icon: <PenTool size={24} />, name: "Design & UX/UI", vacancies: "82 Vacancies" },
        { icon: <UserCheck size={24} />, name: "Human Resources", vacancies: "45 Vacancies" },
        { icon: <BookOpen size={24} />, name: "Education & Coaching", vacancies: "29 Vacancies" },
        { icon: <Headset size={24} />, name: "Customer Relations", vacancies: "73 Vacancies" },
        { icon: <Briefcase size={24} />, name: "Sales & Management", vacancies: "110 Vacancies" },
    ]

    const allJobs = [
        { title: "Senior AI Engineer", company: "AeroTech Solutions", location: "Bangalore (Remote)", type: "Full Time", salary: "₹18L - ₹32L" },
        { title: "Lead Product Designer", company: "Vercel India Partner", location: "Pune, India", type: "Full Time", salary: "₹15L - ₹24L" },
        { title: "Growth Marketing Manager", company: "Stripe India Support", location: "Mumbai, India", type: "Full Time", salary: "₹10L - ₹18L" },
        { title: "Technical Product Manager", company: "Deel Solutions", location: "Remote", type: "Full Time", salary: "₹16L - ₹28L" },
        { title: "Frontend Developer (React)", company: "Arc.dev Corp", location: "Delhi, India", type: "Part Time", salary: "₹6L - ₹10L" },
        { title: "Talent Acquisition Partner", company: "Wellfound Agency", location: "Hyderabad, India", type: "Part Time", salary: "₹5L - ₹8L" },
    ]

    const filteredJobs = activeTab === 'Featured'
        ? allJobs
        : allJobs.filter(j => j.type === activeTab)

    const marqueeCompanies = [
        "Google", "Microsoft", "Stripe", "Vercel", "Linear", "Deel", "Turing", "Wellfound", "Amazon", "Meta"
    ]

    const industryData = {
        tech: {
            title: "Tech & Software Engineering",
            desc: "Screen developers, devops leads, and systems engineers with code-parsed compatibility index. Evaluate algorithmic mastery and project histories automatically.",
            image: "/modern_workspace.png",
            features: ["Algorithm verification", "Clean code score", "System design matching"],
            ctaLink: "/jobs?search=Engineering"
        },
        product: {
            title: "Product Management & Operations",
            desc: "Connect analytical product strategists with active company boards. Find managers with certified credentials in roadmapping, metrics analysis, and Agile frameworks.",
            image: "/office_meeting.png",
            features: ["Roadmapping skill index", "Agile methodologies score", "Metrics evaluation"],
            ctaLink: "/jobs?search=Product"
        },
        design: {
            title: "Design & UX/UI Architecture",
            desc: "Source creative user experience specialists who build high-converting interfaces. Filter portfolios using matched visual credentials and design patterns.",
            image: "/team_collaboration.png",
            features: ["Portfolio alignment", "Visual design parsing", "Figma competency verification"],
            ctaLink: "/jobs?search=Design"
        },
        marketing: {
            title: "Marketing & Growth Operations",
            desc: "Recruit growth hackers and digital marketers with verified search optimization and campaign credentials. Maximize returns on brand acquisition pipelines.",
            image: "/office_team.png",
            features: ["Campaign history matching", "Analytics mastery review", "SEO/SEM credentials"],
            ctaLink: "/jobs?search=Marketing"
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-white">
            
            {/* 1. HERO SECTION (SPLIT GRID DESIGN - MATCHES REFERENCE STYLING) */}
            <section className="relative min-h-[820px] flex items-center overflow-hidden pt-36 pb-16 bg-gradient-to-b from-[#FFF7ED] via-white to-white">
                {/* Visual mesh background grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#E5E7EB_1px,transparent_1px),linear-gradient(to_bottom,#E5E7EB_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>
                
                {/* Ambient background glows */}
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#FDBA74]/15 rounded-full blur-3xl -z-10 animate-pulse"></div>
                <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#F97316]/5 rounded-full blur-3xl -z-10"></div>

                <div className="max-w-[1320px] mx-auto px-6 w-full relative z-10 grid lg:grid-cols-12 gap-12 items-center">
                    {/* Left content block */}
                    <div className="lg:col-span-7 flex flex-col items-start text-left">
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-orange-50 text-[#F97316] font-bold text-xs uppercase tracking-widest rounded-full mb-6 border border-orange-100/30"
                        >
                            <Sparkles size={12} /> AI-Powered Hiring Ecosystem
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.05 }}
                            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#111827] leading-[1.1] tracking-tight font-display"
                        >
                            We Connect <br />
                            <span className="text-[#F97316]">Elite Talent</span> with <br />
                            <span className="text-gray-900">Modern Enterprises</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-gray-500 text-sm sm:text-base md:text-lg max-w-xl mt-6 font-semibold leading-relaxed"
                        >
                            Road2Job streamlines standard recruitment cycles with AI Resume Score, smart matching, and instant skill gap tutorials recommendation.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            className="flex flex-wrap gap-4 mt-8 w-full sm:w-auto"
                        >
                            {role ? (
                                <Link to={`/${role}/dashboard`} className="btn-primary-job px-8 py-3.5 text-center flex items-center gap-2 shadow-md">
                                    Go to Dashboard <ArrowRight size={16} />
                                </Link>
                            ) : (
                                <>
                                    <Link to="/signup" className="btn-primary-job px-8 py-3.5 text-center shadow-md">
                                        Get Started
                                    </Link>
                                    <Link to="/login" className="btn-secondary-job px-8 py-3.5 text-center">
                                        Sign In
                                    </Link>
                                </>
                            )}
                        </motion.div>
                    </div>

                    {/* Right graphics block (Pure abstract moving circles - Vercel/Linear minimal design) */}
                    <div className="lg:col-span-5 relative flex justify-center items-center min-h-[480px]">
                        {/* Rotating Concentric Circles background */}
                        <div className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] border border-orange-100/50 rounded-full -z-10"></div>
                        <div className="absolute w-[360px] h-[360px] sm:w-[460px] sm:h-[460px] border border-gray-100/70 rounded-full -z-10"></div>
                        <div className="absolute w-[440px] h-[440px] sm:w-[540px] sm:h-[540px] border border-gray-50 rounded-full -z-10 border-dashed"></div>

                        {/* Floating Small Dots */}
                        <div className="absolute top-10 right-10 flex flex-wrap gap-1.5 w-12 opacity-30">
                            {[...Array(16)].map((_, i) => (
                                <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#F97316]"></div>
                            ))}
                        </div>

                        {/* Soft Ambient glowing core */}
                        <div className="absolute w-72 h-72 bg-[#F97316]/5 rounded-full blur-3xl -z-10 animate-pulse"></div>

                        {/* Concentric Circle 1 (Innermost - Breathing) */}
                        <motion.div
                            animate={{ scale: [1, 1.06, 1] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute w-[180px] h-[180px] rounded-full border border-[#F97316]/20 flex items-center justify-center bg-orange-50/10"
                        >
                            {/* Central Glowing Core */}
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F97316] to-[#FDBA74] shadow-lg shadow-orange-500/20 flex items-center justify-center">
                                <Sparkles className="text-white animate-pulse" size={16} />
                            </div>
                        </motion.div>

                        {/* Concentric Circle 2 (Rotating Dashed) */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="absolute w-[280px] h-[280px] rounded-full border border-dashed border-[#F97316]/30 flex items-center justify-center"
                        >
                            {/* Orbiting Particle 1 */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#F97316] shadow-md shadow-orange-500/40"></div>
                        </motion.div>

                        {/* Concentric Circle 3 (Counter-Rotating Solid) */}
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                            className="absolute w-[360px] h-[360px] rounded-full border border-gray-200/50 flex items-center justify-center"
                        >
                            {/* Orbiting Particle 2 */}
                            <div className="absolute bottom-0 right-1/4 w-2 h-2 rounded-full bg-gray-400"></div>
                            <div className="absolute top-1/4 left-0 w-1.5 h-1.5 rounded-full bg-[#FDBA74]"></div>
                        </motion.div>

                        {/* Concentric Circle 4 (Outer Dashed) */}
                        <motion.div
                            animate={{ rotate: 180 }}
                            transition={{ duration: 45, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute w-[440px] h-[440px] rounded-full border border-dashed border-gray-200/30 flex items-center justify-center"
                        >
                            {/* Orbiting Particle 3 */}
                            <div className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-orange-300"></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. LOGO MARQUEE */}
            <section className="py-10 border-t border-b border-gray-100 bg-gray-50/50 overflow-hidden relative">
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
                
                <div className="max-w-[1320px] mx-auto px-6 mb-4 text-center">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Trusted by industry leaders and elite scale-ups
                    </p>
                </div>

                <div className="flex overflow-hidden relative">
                    <div className="animate-marquee gap-16 py-3 flex items-center justify-around">
                        {marqueeCompanies.concat(marqueeCompanies).map((comp, idx) => (
                            <div key={idx} className="flex items-center gap-2 grayscale opacity-45 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
                                <Building size={16} className="text-gray-500" />
                                <span className="text-lg font-bold tracking-tight text-gray-800">{comp}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. SEARCH OVERLAY BAR */}
            <div className="max-w-[1140px] mx-auto px-6 w-full -mt-10 relative z-20">
                <form onSubmit={handleSearch} className="bg-white/80 backdrop-blur-xl p-4.5 rounded-[28px] shadow-xl border border-gray-100/50 flex flex-col md:flex-row items-center gap-4">
                    <div className="flex items-center w-full md:w-7/12 bg-gray-50 border border-gray-100 py-3.5 px-5 rounded-[20px] focus-within:border-[#F97316] transition-colors gap-3">
                        <Search className="text-gray-400 shrink-0" size={18} />
                        <input
                            type="text"
                            placeholder="Search by role title, technology, or company..."
                            className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 text-gray-800 font-semibold text-sm placeholder:text-gray-400"
                            value={searchKeyword}
                            onChange={e => setSearchKeyword(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex items-center w-full md:w-5/12 bg-gray-50 border border-gray-100 py-3.5 px-5 rounded-[20px] gap-2">
                        <MapPin className="text-gray-400 shrink-0" size={16} />
                        <select className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 text-gray-500 font-semibold text-sm cursor-pointer pl-1">
                            <option>Workplace Preference</option>
                            <option>Remote</option>
                            <option>Mumbai</option>
                            <option>Pune</option>
                            <option>Bangalore</option>
                            <option>Delhi</option>
                        </select>
                    </div>

                    <button type="submit" className="w-full md:w-auto px-8 py-3.5 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-full font-bold text-sm transition-all shadow-md shadow-orange-500/10 cursor-pointer shrink-0">
                        Find Jobs
                    </button>
                </form>
            </div>

            {/* 4. DOMAIN-SPECIFIC TABBED SHOWCASE (MATCHES REFERENCE TAB LAYOUT) */}
            <section className="py-28 bg-[#F8F9FA] border-b border-gray-100">
                <div className="max-w-[1320px] mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest">Industry Solutions</span>
                        <h2 className="text-4xl font-extrabold tracking-tight mt-3 text-gray-900">
                            Building Mission-Critical Teams Across Multiple Domains
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        {/* Left Tabs (Conforms to reference list layout) */}
                        <div className="lg:col-span-4 flex flex-col gap-4">
                            {[
                                { id: 'tech', label: 'AI & Engineering', icon: <Cpu size={18} /> },
                                { id: 'product', label: 'Product Operations', icon: <PieChart size={18} /> },
                                { id: 'design', label: 'UI & Visual Design', icon: <PenTool size={18} /> },
                                { id: 'marketing', label: 'Growth & Marketing', icon: <TrendingUp size={18} /> }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setIndustryTab(tab.id)}
                                    className={`w-full text-left p-5 rounded-2xl transition-all cursor-pointer flex items-center justify-between border ${
                                        industryTab === tab.id
                                            ? 'bg-white border-orange-200 text-gray-900 shadow-md translate-x-2'
                                            : 'bg-transparent border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'
                                    }`}
                                >
                                    <div className="flex items-center gap-3.5">
                                        <div className={`p-2.5 rounded-xl ${industryTab === tab.id ? 'bg-orange-50 text-[#F97316]' : 'bg-gray-100 text-gray-400'}`}>
                                            {tab.icon}
                                        </div>
                                        <span className="font-bold text-sm">{tab.label}</span>
                                    </div>
                                    <ChevronDown size={16} className={`transform -rotate-90 text-gray-400 transition-colors ${industryTab === tab.id ? 'text-[#F97316]' : ''}`} />
                                </button>
                            ))}
                        </div>

                        {/* Right Content Showcase Card (Conforms to reference presentation mockup) */}
                        <div className="lg:col-span-8 bg-white border border-gray-100 rounded-[32px] p-8 shadow-xl min-h-[460px] flex flex-col justify-between">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={industryTab}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ duration: 0.35 }}
                                    className="grid md:grid-cols-2 gap-8 items-center h-full"
                                >
                                    {/* Tab Card Text & Details */}
                                    <div className="flex flex-col justify-between h-full py-4">
                                        <div>
                                            <span className="text-[10px] font-black text-[#F97316] uppercase tracking-widest bg-orange-50 px-3.5 py-1.5 rounded-full">
                                                Active Domain
                                            </span>
                                            <h3 className="text-2xl font-black text-gray-900 tracking-tight mt-6 leading-snug">
                                                {industryData[industryTab].title}
                                            </h3>
                                            <p className="text-gray-500 text-xs font-semibold mt-4 leading-relaxed">
                                                {industryData[industryTab].desc}
                                            </p>
                                            
                                            {/* Key features checklist */}
                                            <ul className="grid gap-3.5 mt-6">
                                                {industryData[industryTab].features.map((feat, idx) => (
                                                    <li key={idx} className="flex items-center gap-2.5 text-xs font-bold text-gray-700">
                                                        <CheckCircle2 size={16} className="text-[#F97316]" /> {feat}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <Link
                                            to={industryData[industryTab].ctaLink}
                                            className="btn-primary-job self-start mt-8 px-8 py-3.5 text-xs tracking-wider uppercase font-extrabold flex items-center gap-2 hover:-translate-y-0.5"
                                        >
                                            Explore Domain Jobs <ArrowRight size={14} />
                                        </Link>
                                    </div>

                                    {/* Tab Card Visual Frame */}
                                    <div className="relative rounded-[24px] overflow-hidden shadow-md h-64 md:h-80 border border-gray-100 flex items-center justify-center bg-gray-50">
                                        <img
                                            src={industryData[industryTab].image}
                                            className="w-full h-full object-cover"
                                            alt={industryData[industryTab].title}
                                        />
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. STATISTICS COUNTER SECTION */}
            <section className="py-24 bg-white">
                <div className="max-w-[1320px] mx-auto px-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { value: "18,000+", label: "Elite Candidates", desc: "Registered professional seeker base" },
                            { value: "1,200+", label: "Verified Employers", desc: "Corporate recruitment pipelines" },
                            { value: "95%", label: "Match Index Acc", desc: "Proven machine matching score fit" },
                            { value: "₹45L+", label: "Highest Package", desc: "Offered on active listings" }
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: idx * 0.05 }}
                                viewport={{ once: true }}
                                className="text-center p-6 bg-orange-50/30 rounded-[24px] border border-orange-100/10 shadow-sm"
                            >
                                <p className="text-4xl font-extrabold text-[#F97316] tracking-tight">{stat.value}</p>
                                <p className="text-sm font-bold text-gray-900 mt-2">{stat.label}</p>
                                <p className="text-xs text-gray-400 mt-1 font-semibold leading-relaxed">{stat.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. INTERACTIVE AI DEMO SHOWCASE (WOW FACTOR) */}
            <section className="py-28 bg-[#111827] text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[#F97316]/5 mix-blend-overlay opacity-30"></div>
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#F97316]/10 rounded-full blur-3xl"></div>

                <div className="max-w-[1320px] mx-auto px-6 relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest">Interactive Showcase</span>
                        <h2 className="text-4xl font-bold tracking-tight mt-3 text-white">How Road2Job AI Works</h2>
                        <p className="text-gray-400 text-sm font-semibold mt-3">Click tabs to simulate our core recruitment analytics modules in real-time.</p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        {/* Selector Controls */}
                        <div className="lg:col-span-4 flex flex-col gap-4">
                            {[
                                { id: 'match', title: 'AI Compatibility Score', desc: 'Calculates skill alignment index between seekers profile and job requirements.', icon: <Sparkles size={20} /> },
                                { id: 'gap', title: 'Smart Skill-Gap Checker', desc: 'Identifies missing competencies and links recommended YouTube playlists.', icon: <BookOpen size={20} /> },
                                { id: 'recruiter', title: 'Ranked Shortlist Feed', desc: 'Ranks candidates for recruiters, placing high match scores at the top.', icon: <BarChart2 size={20} /> }
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setDemoTab(item.id)}
                                    className={`text-left p-6 rounded-[20px] border transition-all cursor-pointer flex gap-4 ${demoTab === item.id ? 'bg-[#F97316]/15 border-[#F97316] shadow-lg' : 'bg-[#1F2937]/50 border-gray-800/80 hover:bg-[#1F2937] hover:border-gray-700'}`}
                                >
                                    <div className={`p-3 rounded-xl shrink-0 ${demoTab === item.id ? 'bg-[#F97316] text-white shadow-md' : 'bg-gray-800 text-gray-400'}`}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm tracking-tight text-white">{item.title}</h4>
                                        <p className="text-xs text-gray-400 mt-1 font-semibold leading-relaxed">{item.desc}</p>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Showcase Display Panel */}
                        <div className="lg:col-span-8 bg-[#1F2937] border border-gray-800 rounded-[28px] p-8 shadow-2xl relative min-h-[400px] flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                {demoTab === 'match' && (
                                    <motion.div
                                        key="match"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="w-full flex flex-col md:flex-row items-center gap-8"
                                    >
                                        <div className="relative flex items-center justify-center shrink-0 w-32 h-32">
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle cx="64" cy="64" r="54" stroke="#374151" strokeWidth="10" fill="transparent" />
                                                <circle cx="64" cy="64" r="54" stroke="#F97316" strokeWidth="10" fill="transparent" strokeDasharray={339} strokeDashoffset={339 - (339 * 85) / 100} />
                                            </svg>
                                            <span className="absolute text-2xl font-black text-white">85%</span>
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold text-[#F97316] bg-orange-500/10 px-3 py-1 rounded-full uppercase tracking-wider">AI Insight</span>
                                            <h3 className="text-2xl font-bold text-white tracking-tight mt-3">High Match Rating</h3>
                                            <p className="text-gray-400 text-xs font-semibold mt-2 leading-relaxed">
                                                Based on parsed keywords: React, TailwindCSS, and Node.js. High alignment indicates candidate possesses 85% of critical qualifications requested.
                                            </p>
                                            <div className="flex gap-2.5 mt-5">
                                                <span className="bg-orange-500/10 text-[#F97316] border border-orange-500/20 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase">React</span>
                                                <span className="bg-orange-500/10 text-[#F97316] border border-orange-500/20 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase">TailwindCSS</span>
                                                <span className="bg-orange-500/10 text-[#F97316] border border-orange-500/20 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase">Node.js</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {demoTab === 'gap' && (
                                    <motion.div
                                        key="gap"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="w-full flex flex-col gap-6"
                                    >
                                        <div>
                                            <span className="text-xs font-bold text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full uppercase tracking-wider">Skill Checker</span>
                                            <h3 className="text-2xl font-bold text-white tracking-tight mt-3">Competency Discrepancy Found</h3>
                                            <p className="text-gray-400 text-xs font-semibold mt-2 leading-relaxed">
                                                Candidate lacks <strong>Docker</strong> knowledge required for the "Senior Developer" posting.
                                            </p>
                                        </div>
                                        <div className="bg-[#111827] border border-gray-800/80 p-5 rounded-2xl flex items-center justify-between gap-4">
                                            <div>
                                                <p className="text-[10px] font-black text-[#F97316] uppercase tracking-widest">Recommended Course</p>
                                                <p className="text-sm font-bold text-white mt-1">Docker & Containers for Beginners</p>
                                                <p className="text-xs text-gray-500 mt-0.5">YouTube Playlist • 2 hours</p>
                                            </div>
                                            <button className="bg-[#F97316] text-white p-3 rounded-full hover:bg-[#EA580C] shadow-md shadow-orange-500/10 flex items-center justify-center shrink-0 cursor-pointer">
                                                <ArrowRight size={16} />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {demoTab === 'recruiter' && (
                                    <motion.div
                                        key="recruiter"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="w-full flex flex-col gap-4"
                                    >
                                        <div className="flex justify-between items-center pb-2 border-b border-gray-800/50">
                                            <h3 className="text-lg font-bold text-white tracking-tight">Applicant Rankings</h3>
                                            <span className="text-xs text-gray-500">Sorted by Match Score</span>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            {[
                                                { rank: 1, name: "Pranita Deshmukh", score: 94, role: "React Architect" },
                                                { rank: 2, name: "Vijay Kulkarni", score: 85, role: "Frontend Developer" },
                                                { rank: 3, name: "Amit Patil", score: 62, role: "UI Designer" }
                                            ].map((candidate) => (
                                                <div key={candidate.rank} className="bg-[#111827]/80 border border-gray-800/60 p-4 rounded-xl flex items-center justify-between gap-4">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xs font-bold text-gray-500 w-5">#{candidate.rank}</span>
                                                        <div>
                                                            <p className="text-xs font-bold text-white">{candidate.name}</p>
                                                            <p className="text-[10px] text-gray-500">{candidate.role}</p>
                                                        </div>
                                                    </div>
                                                    <span className="bg-orange-500/10 text-[#F97316] text-[10px] font-bold px-3 py-1 rounded-md border border-orange-500/20">{candidate.score}% Fit</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. PLATFORM CATEGORIES */}
            <section className="py-28 bg-white">
                <div className="max-w-[1320px] mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest">Platform Core</span>
                        <h2 className="text-4xl font-extrabold tracking-tight mt-3 mb-4">Explore AI Competency Categories</h2>
                        <p className="text-gray-500 font-semibold text-sm">Built to remove manual search friction from corporate recruitment pipelines.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {categories.map((cat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                viewport={{ once: true }}
                            >
                                <Link
                                    to={`/jobs?search=${encodeURIComponent(cat.name)}`}
                                    className="category-card block group"
                                >
                                    <div className="category-icon text-3xl group-hover:bg-[#F97316] group-hover:text-white transition-all duration-300 text-[#F97316]">
                                        {cat.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1 tracking-tight">{cat.name}</h3>
                                    <p className="text-[#F97316] font-bold text-xs mt-1">{cat.vacancies}</p>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. JOBS SECTION */}
            <section className="py-28 bg-gray-50/50 border-t border-b border-gray-100">
                <div className="max-w-[1320px] mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div>
                            <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest">Current Listings</span>
                            <h2 className="text-4xl font-extrabold tracking-tight mt-3">Trending Opportunities</h2>
                        </div>

                        {/* Tabs */}
                        <div className="flex bg-gray-200/70 p-1.5 rounded-full self-start">
                            {['Featured', 'Full Time', 'Part Time'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-2 px-5 font-bold text-xs rounded-full transition-all duration-300 cursor-pointer ${activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Jobs grid */}
                    <div className="flex flex-col gap-6">
                        {filteredJobs.length === 0 ? (
                            <div className="text-center py-16 text-gray-400 font-bold border border-dashed rounded-[24px]">
                                No matches found in this category.
                            </div>
                        ) : filteredJobs.map((job, i) => (
                            <motion.div
                                key={i}
                                className="p-6 bg-white border border-gray-100 rounded-3xl flex flex-col md:flex-row items-center gap-6 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-gray-100/50 hover:border-orange-200"
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                viewport={{ once: true }}
                            >
                                <div className="w-16 h-16 border border-gray-100 rounded-2xl flex items-center justify-center shrink-0 bg-orange-50 font-black text-xl text-[#F97316]">
                                    {job.company.charAt(0).toUpperCase()}
                                </div>

                                <div className="flex-grow">
                                    <h3 className="text-xl font-bold text-gray-900 tracking-tight">{job.title}</h3>
                                    <p className="text-sm font-semibold text-[#F97316] mt-0.5">{job.company}</p>
                                    <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-xs font-semibold text-gray-500">
                                        <span className="flex items-center gap-1.5"><MapPin size={14} className="text-gray-400" /> {job.location}</span>
                                        <span className="flex items-center gap-1.5"><Briefcase size={14} className="text-gray-400" /> {job.type}</span>
                                        <span className="flex items-center gap-1.5"><TrendingUp size={14} className="text-gray-400" /> {job.salary}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center gap-3.5 shrink-0 w-full sm:w-auto">
                                    <button
                                        onClick={() => toggleWishlist(job.title)}
                                        className={`p-3.5 rounded-full border transition-all duration-300 cursor-pointer ${wishlist.includes(job.title) ? 'bg-[#F97316] border-[#F97316] text-white' : 'bg-white border-gray-200 text-gray-400 hover:border-[#F97316] hover:text-[#F97316]'}`}
                                    >
                                        <Heart size={16} fill={wishlist.includes(job.title) ? "currentColor" : "none"} />
                                    </button>
                                    <Link to={role ? `/${role}/dashboard` : '/login'} className="btn-primary-job py-3.5 px-6 text-center w-full sm:w-auto shadow-none">
                                        Apply Now
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-14">
                        <Link to="/jobs" className="btn-secondary-job inline-block px-10">
                            Browse All Active Openings
                        </Link>
                    </div>
                </div>
            </section>

            {/* 9. PRICING SECTION (REALISTIC PRODUCTION DEPLOYMENT MODULE) */}
            <section className="py-28 bg-white">
                <div className="max-w-[1320px] mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest">Pricing Plans</span>
                        <h2 className="text-4xl font-extrabold tracking-tight mt-3">Simple, Transparent Pricing</h2>
                        <p className="text-gray-500 font-semibold text-sm mt-3">Find the package suited for Seekers and scaleup Employers.</p>
                        
                        {/* Period Toggle */}
                        <div className="flex bg-gray-200/70 p-1 rounded-full w-fit mx-auto mt-8 items-center">
                            <button onClick={() => setIsYearly(false)} className={`py-1.5 px-5 font-bold text-xs rounded-full transition-all cursor-pointer ${!isYearly ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>Monthly</button>
                            <button onClick={() => setIsYearly(true)} className={`py-1.5 px-5 font-bold text-xs rounded-full transition-all cursor-pointer ${isYearly ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>Yearly (Save 20%)</button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 items-stretch">
                        {/* Seekers Plan */}
                        <div className="bg-white p-8 rounded-[28px] border border-gray-100 flex flex-col justify-between shadow-sm relative overflow-hidden group">
                            <div>
                                <span className="text-[#F97316] text-[10px] font-black uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full">Seeker Basic</span>
                                <p className="text-4xl font-extrabold text-gray-900 mt-6 tracking-tight">Free</p>
                                <p className="text-gray-400 text-xs mt-2 font-semibold">Perfect for entry level job hunts</p>
                                <ul className="grid gap-3.5 mt-8 text-xs font-semibold text-gray-600 border-t border-gray-50 pt-8">
                                    <li className="flex items-center gap-2.5"><CheckCircle2 size={16} className="text-[#F97316]" /> Unlimited job search submissions</li>
                                    <li className="flex items-center gap-2.5"><CheckCircle2 size={16} className="text-[#F97316]" /> 3 AI compatibility scores / month</li>
                                    <li className="flex items-center gap-2.5 text-gray-350"><X size={16} className="text-gray-300" /> Basic skill gap tutorials</li>
                                </ul>
                            </div>
                            <Link to="/signup" className="w-full py-3.5 mt-8 border border-gray-200 text-gray-700 rounded-full font-bold text-xs hover:border-[#F97316] hover:text-[#F97316] transition-all text-center">Get Started</Link>
                        </div>

                        {/* Seeker Premium */}
                        <div className="bg-white p-8 rounded-[28px] border-2 border-[#F97316] flex flex-col justify-between shadow-md relative overflow-hidden group">
                            <div className="absolute top-0 right-0 bg-[#F97316] text-white text-[9px] font-black uppercase tracking-widest py-1 px-4 rounded-bl-xl shadow-sm">Popular</div>
                            <div>
                                <span className="text-[#F97316] text-[10px] font-black uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full">Seeker Premium</span>
                                <p className="text-4xl font-extrabold text-gray-900 mt-6 tracking-tight">₹{isYearly ? "199" : "249"}<span className="text-xs text-gray-400 font-semibold font-normal"> / month</span></p>
                                <p className="text-gray-400 text-xs mt-2 font-semibold">Unlock full AI capacity & video links</p>
                                <ul className="grid gap-3.5 mt-8 text-xs font-semibold text-gray-600 border-t border-gray-50 pt-8">
                                    <li className="flex items-center gap-2.5"><CheckCircle2 size={16} className="text-[#F97316]" /> Unlimited AI compatibility indexes</li>
                                    <li className="flex items-center gap-2.5"><CheckCircle2 size={16} className="text-[#F97316]" /> Instant skill gap tutorials recommend</li>
                                    <li className="flex items-center gap-2.5"><CheckCircle2 size={16} className="text-[#F97316]" /> Priority profile placement feed</li>
                                </ul>
                            </div>
                            <Link to="/signup" className="w-full py-3.5 mt-8 bg-[#F97316] text-white rounded-full font-bold text-xs hover:bg-[#EA580C] shadow-md shadow-orange-500/10 transition-all text-center">Subscribe Now</Link>
                        </div>

                        {/* Recruiter Premium */}
                        <div className="bg-white p-8 rounded-[28px] border border-gray-100 flex flex-col justify-between shadow-sm relative overflow-hidden group">
                            <div>
                                <span className="text-[#F97316] text-[10px] font-black uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full">Employer Scale</span>
                                <p className="text-4xl font-extrabold text-gray-900 mt-6 tracking-tight">₹{isYearly ? "1,999" : "2,499"}<span className="text-xs text-gray-400 font-semibold font-normal"> / month</span></p>
                                <p className="text-gray-400 text-xs mt-2 font-semibold">Post job listings & screen matching talent</p>
                                <ul className="grid gap-3.5 mt-8 text-xs font-semibold text-gray-600 border-t border-gray-50 pt-8">
                                    <li className="flex items-center gap-2.5"><CheckCircle2 size={16} className="text-[#F97316]" /> Unlimited job postings publishing</li>
                                    <li className="flex items-center gap-2.5"><CheckCircle2 size={16} className="text-[#F97316]" /> Ranked matching score applicant feed</li>
                                    <li className="flex items-center gap-2.5"><CheckCircle2 size={16} className="text-[#F97316]" /> Dedicated accounts manager support</li>
                                </ul>
                            </div>
                            <Link to="/signup" className="w-full py-3.5 mt-8 border border-gray-200 text-gray-700 rounded-full font-bold text-xs hover:border-[#F97316] hover:text-[#F97316] transition-all text-center">Unlock Employer Hub</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 10. CLIENT TESTIMONIALS */}
            <section className="py-28 bg-gray-50/50 border-t border-b border-gray-100">
                <div className="max-w-[1320px] mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest">Testimonials</span>
                        <h2 className="text-4xl font-extrabold tracking-tight mt-3">What our members say</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { name: "Ananya Sharma", role: "AI Software Engineer", text: "Road2Job helped me land an AI engineering role within 10 days. The AI match rating was surprisingly spot-on!" },
                            { name: "Rajesh K.", role: "Lead Product Designer", text: "Finding top talent in India was a challenge until we started using the screening match rankings on Road2Job." },
                            { name: "Suresh Patil", role: "HR Director at Pixelworks", text: "The candidate matching flow has saved our recruiting teams over 20 hours each week in manual screening." }
                        ].map((item, i) => (
                            <div key={i} className="bg-white border border-gray-100 p-8 rounded-3xl relative shadow-sm hover:shadow-md transition-shadow">
                                <Quote className="absolute top-6 right-6 text-orange-500/10 w-16 h-16 pointer-events-none" />
                                <p className="text-gray-500 italic leading-relaxed mb-8 font-medium relative z-10 text-[15px]">
                                    "{item.text}"
                                </p>
                                <div className="flex items-center gap-4">
                                    <img src={`https://i.pravatar.cc/100?u=${i + 150}`} className="w-12 h-12 rounded-full border-2 border-orange-100 shadow-sm" alt={item.name} />
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                                        <p className="text-xs text-gray-400 font-semibold">{item.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 11. FAQ ACCORDION SECTION (PRODUCTION LEVEL SATISFACTION MODULE) */}
            <section className="py-28 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest">Frequently Asked Questions</span>
                        <h2 className="text-4xl font-extrabold tracking-tight mt-3">Have Questions? We Have Answers.</h2>
                    </div>

                    <div className="flex flex-col gap-4">
                        {[
                            { q: "How is the AI compatibility score calculated?", a: "Our system parses the skills list from your uploaded resume and compares them with the job post scope metrics to calculate a percentage fit." },
                            { q: "Is the SMS verification mandatory for seekers?", a: "Yes, to maintain corporate screening standards, we require seeker accounts to perform double OTP validation on phone and email." },
                            { q: "Can recruiters view un-shortlisted candidates?", a: "Yes, recruiters have full transparency over all submissions and can review applicant profiles and shortlists directly." }
                        ].map((faq, index) => (
                            <div key={index} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                                <button
                                    onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                                    className="w-full flex justify-between items-center p-6 text-left font-bold text-gray-900 text-sm md:text-base cursor-pointer hover:bg-gray-50 transition-colors"
                                >
                                    <span>{faq.q}</span>
                                    <ChevronDown size={18} className={`text-gray-400 transform transition-transform duration-300 ${faqOpen === index ? 'rotate-180 text-[#F97316]' : ''}`} />
                                </button>
                                <AnimatePresence initial={false}>
                                    {faqOpen === index && (
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: 'auto' }}
                                            exit={{ height: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-6 pt-0 text-gray-500 font-semibold text-xs md:text-sm border-t border-gray-50 leading-relaxed">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 12. FOOTER */}
            <footer className="bg-[#111827] pt-24 pb-12 text-gray-400">
                <div className="max-w-[1320px] mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-gray-800 pb-16">
                    <div className="flex flex-col gap-6">
                        <Link to="/" className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#F97316] to-[#FDBA74] flex items-center justify-center">
                                <span className="text-white font-black text-sm italic">R</span>
                            </div>
                            <span className="text-xl font-black text-white">Road<span className="text-[#F97316]">2Job</span></span>
                        </Link>
                        <p className="text-sm font-medium leading-relaxed text-gray-400/90">
                            AI-Powered Hiring. Smarter Careers. Streamlining recruitment pipelines with smart matching scoring models.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="w-9 h-9 rounded-full border border-gray-850 flex items-center justify-center hover:bg-[#F97316] hover:border-[#F97316] hover:text-white transition-all"><Twitter size={16} /></a>
                            <a href="#" className="w-9 h-9 rounded-full border border-gray-850 flex items-center justify-center hover:bg-[#F97316] hover:border-[#F97316] hover:text-white transition-all"><Facebook size={16} /></a>
                            <a href="#" className="w-9 h-9 rounded-full border border-gray-850 flex items-center justify-center hover:bg-[#F97316] hover:border-[#F97316] hover:text-white transition-all"><Instagram size={16} /></a>
                            <a href="#" className="w-9 h-9 rounded-full border border-gray-850 flex items-center justify-center hover:bg-[#F97316] hover:border-[#F97316] hover:text-white transition-all"><Linkedin size={16} /></a>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-5">
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider">Company</h3>
                        <div className="flex flex-col gap-3.5 text-xs font-semibold text-gray-400">
                            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
                            <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
                            <Link to="/features" className="hover:text-white transition-colors">Our Features</Link>
                            <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <Link to="/" className="hover:text-white transition-colors">Terms of Service</Link>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider">Platform Links</h3>
                        <div className="flex flex-col gap-3.5 text-xs font-semibold text-gray-400">
                            <Link to="/" className="hover:text-white transition-colors">Home Portal</Link>
                            <Link to="/jobs" className="hover:text-white transition-colors">Find Jobs</Link>
                            <Link to="/features" className="hover:text-white transition-colors">AI Analysis</Link>
                            <Link to="/about" className="hover:text-white transition-colors">Platform Vision</Link>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider">Subscribe</h3>
                        <p className="text-xs font-semibold leading-relaxed text-gray-400/90">Stay updated with fresh openings and matching releases.</p>
                        <form onSubmit={handleNewsletterSignup} className="relative mt-2">
                            <input
                                type="email"
                                placeholder="Your work email"
                                value={newsletterEmail}
                                onChange={e => setNewsletterEmail(e.target.value)}
                                className="w-full bg-gray-900 border border-gray-800 py-3.5 pl-5 pr-20 rounded-full focus:outline-none focus:border-[#F97316] text-white text-xs font-medium"
                                required
                            />
                            <button type="submit" className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#F97316] text-white px-4 rounded-full font-bold text-xs hover:bg-[#EA580C] transition-all cursor-pointer">
                                Sign Up
                            </button>
                        </form>
                        {newsletterSuccess && (
                            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mt-2">
                                <CheckCircle size={14} /> Thank you for subscribing!
                            </div>
                        )}
                    </div>
                </div>
                <div className="max-w-[1320px] mx-auto px-6 mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold border-t border-gray-800 pt-8">
                    <p>© 2026 Road2Job Enterprise. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <Link to="/about" className="hover:text-white transition-colors">About</Link>
                        <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
                        <Link to="/jobs" className="hover:text-white transition-colors">Jobs</Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
