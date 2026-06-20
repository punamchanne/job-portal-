import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import {
    Search, MapPin, List, Mail, Check,
    ArrowRight, Heart, Briefcase, Users,
    TrendingUp, Headset, UserCheck, Settings,
    PieChart, PenTool, BookOpen, Facebook,
    Twitter, Linkedin, Instagram, PlayCircle,
    Quote, CheckCircle
} from 'lucide-react'

// Use the copied image from public folder
const HERO_IMG = "/hero-bg.png";

export default function LandingPage() {
    const [activeTab, setActiveTab] = useState('Featured')
    const [searchKeyword, setSearchKeyword] = useState('')
    const [wishlist, setWishlist] = useState(() => {
        try { return JSON.parse(localStorage.getItem('wishlist') || '[]') } catch { return [] }
    })
    const [newsletterEmail, setNewsletterEmail] = useState('')
    const [newsletterSuccess, setNewsletterSuccess] = useState(false)
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
        { icon: <TrendingUp />, name: "Marketing", vacancies: "123 Vacancy" },
        { icon: <Headset />, name: "Customer Service", vacancies: "123 Vacancy" },
        { icon: <UserCheck />, name: "Human Resource", vacancies: "123 Vacancy" },
        { icon: <PieChart />, name: "Project Management", vacancies: "123 Vacancy" },
        { icon: <TrendingUp />, name: "Business Development", vacancies: "123 Vacancy" },
        { icon: <TrendingUp />, name: "Sales & Communication", vacancies: "123 Vacancy" },
        { icon: <BookOpen />, name: "Teaching & Education", vacancies: "123 Vacancy" },
        { icon: <PenTool />, name: "Design & Creative", vacancies: "123 Vacancy" },
    ]

    const allJobs = [
        { title: "Software Engineer", company: "TechCorp India", location: "Pune, India", type: "Full Time", salary: "₹8L - ₹15L" },
        { title: "Marketing Manager", company: "BrandX Agency", location: "Mumbai, India", type: "Full Time", salary: "₹6L - ₹12L" },
        { title: "Product Designer", company: "DesignHub", location: "Bangalore, India", type: "Full Time", salary: "₹10L - ₹18L" },
        { title: "Creative Director", company: "Pixel Works", location: "Delhi, India", type: "Full Time", salary: "₹12L - ₹24L" },
        { title: "Wordpress Developer", company: "WebSolutions", location: "Remote, India", type: "Part Time", salary: "₹4L - ₹8L" },
        { title: "HR Specialist", company: "PeopleFirst", location: "Hyderabad, India", type: "Part Time", salary: "₹3L - ₹6L" },
    ]

    const filteredJobs = activeTab === 'Featured'
        ? allJobs
        : allJobs.filter(j => j.type === activeTab)

    return (
        <div className="flex flex-col min-h-screen">
            {/* 1. HERO SECTION */}
            <section className="relative h-[800px] flex items-center overflow-hidden pt-20">
                {/* Background Image with stronger overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center z-0 scale-105"
                    style={{ backgroundImage: `url(${HERO_IMG})` }}
                >
                    {/* Darker overlay for better contrast */}
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>

                <div className="max-w-[1320px] mx-auto px-6 w-full relative z-10 grid lg:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col gap-6"
                    >
                        <h1 className="text-6xl md:text-7xl font-black text-white leading-[1.1] tracking-tight-custom drop-shadow-2xl">
                            Find The <span className="text-[#00B074]">Perfect Job</span> <br />
                            With Jobify AI
                        </h1>
                        <p className="text-white text-xl max-w-lg font-medium drop-shadow-md leading-relaxed">
                            Jobify uses advanced AI to analyze your resume and match you with the best career opportunities. Join 10,000+ users finding their dream jobs today.
                        </p>
                        <div className="flex flex-wrap gap-4 mt-6">
                            {role ? (
                                <>
                                    <Link to={`/${role}/dashboard`} className="btn-primary-job px-10 py-5 shadow-2xl shadow-[#00B074]/30 hover:shadow-[#00B074]/50">Go to Dashboard</Link>
                                    <Link to="/jobs" className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold py-5 px-10 rounded-md hover:bg-white/20 transition-all">Browse Jobs</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/signup" className="btn-primary-job px-10 py-5 shadow-2xl shadow-[#00B074]/30 hover:shadow-[#00B074]/50">Get Started</Link>
                                    <Link to="/login" className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold py-5 px-10 rounded-md hover:bg-white/20 transition-all">Find A Talent</Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. SEARCH BAR OVERLAY */}
            <div className="max-w-[1320px] mx-auto px-6 w-full -mt-24 relative z-20">
                <form onSubmit={handleSearch} className="bg-[#00B074] p-8 rounded-lg shadow-2xl flex flex-wrap lg:flex-nowrap items-center gap-4">
                    <input
                        type="text"
                        placeholder="Keyword (e.g. Developer, Marketing...)"
                        className="flex-grow min-w-0 bg-white border-0 py-4 px-6 rounded-md focus:ring-0 text-gray-800 font-medium"
                        value={searchKeyword}
                        onChange={e => setSearchKeyword(e.target.value)}
                    />
                    <select className="flex-grow min-w-0 bg-white border-0 py-4 px-6 rounded-md focus:ring-0 text-gray-500 font-medium cursor-pointer">
                        <option>Category</option>
                        <option>Marketing</option>
                        <option>Design</option>
                        <option>Engineering</option>
                        <option>Human Resource</option>
                    </select>
                    <select className="flex-grow min-w-0 bg-white border-0 py-4 px-6 rounded-md focus:ring-0 text-gray-500 font-medium cursor-pointer">
                        <option>Location</option>
                        <option>Remote</option>
                        <option>Mumbai</option>
                        <option>Pune</option>
                        <option>Bangalore</option>
                        <option>Delhi</option>
                    </select>
                    <button type="submit" className="bg-[#2B3940] text-white px-10 py-4 rounded-md font-bold uppercase tracking-wider hover:bg-black transition-all">
                        Search
                    </button>
                </form>
            </div>

            {/* 3. CATEGORY SECTION */}
            <section className="py-24 bg-white">
                <div className="max-w-[1320px] mx-auto px-6">
                    <h2 className="section-title">Explore By Category</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                        {categories.map((cat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Link
                                    to={`/jobs?search=${encodeURIComponent(cat.name)}`}
                                    className="category-card block group"
                                >
                                    <div className="category-icon text-3xl group-hover:bg-[#00B074] group-hover:text-white transition-all duration-300">
                                        {cat.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-[#2B3940] mb-2">{cat.name}</h3>
                                    <p className="text-[#00B074] font-bold">{cat.vacancies}</p>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. ABOUT SECTION */}
            <section id="about" className="py-24 bg-white overflow-hidden">
                <div className="max-w-[1320px] mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
                    <div className="relative">
                        {/* Decorative blob */}
                        <div className="absolute -z-10 w-72 h-72 bg-[#00B074]/10 rounded-full -bottom-10 -left-10 blur-2xl"></div>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Col 1 - two images stacked, second shifted down */}
                            <div className="flex flex-col gap-4">
                                <img
                                    src="/office_team.png"
                                    className="rounded-2xl shadow-xl w-full object-cover h-52"
                                    alt="Team collaboration"
                                />
                                <img
                                    src="/modern_workspace.png"
                                    className="rounded-2xl shadow-xl w-full object-cover h-52 mt-6"
                                    alt="Modern workspace"
                                />
                            </div>
                            {/* Col 2 - two images stacked, first shifted down */}
                            <div className="flex flex-col gap-4 mt-10">
                                <img
                                    src="/office_meeting.png"
                                    className="rounded-2xl shadow-xl w-full object-cover h-52"
                                    alt="Office meeting"
                                />
                                <img
                                    src="/job_interview.png"
                                    className="rounded-2xl shadow-xl w-full object-cover h-52 mt-6"
                                    alt="Job interview"
                                />
                            </div>
                        </div>
                        {/* Floating badge */}
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl px-6 py-3 flex items-center gap-3 border border-gray-100">
                            <div className="w-10 h-10 bg-[#00B074]/10 rounded-xl flex items-center justify-center">
                                <CheckCircle size={20} className="text-[#00B074]" />
                            </div>
                            <div>
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Success Rate</p>
                                <p className="text-lg font-black text-[#2B3940]">10,000+ Hired</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <h2 className="text-4xl font-black text-[#2B3940] leading-tight">
                            We Help To Get The Best <br />
                            Job And Find A Talent
                        </h2>
                        <p className="text-[#666565] leading-relaxed">
                            Jobify isn't just another job board. We use machine learning to understand your skills and aspirations, providing personalized career guidance and top-tier job recommendations.
                        </p>
                        <ul className="grid gap-4 mt-2">
                            {[
                                "AI-Powered Resume Analysis",
                                "Smart Matching Algorithms",
                                "Interview Preparation Coach"
                            ].map((text, i) => (
                                <li key={i} className="flex items-center gap-3 font-medium text-[#666565]">
                                    <Check className="text-[#00B074]" size={20} />
                                    {text}
                                </li>
                            ))}
                        </ul>
                        <Link to="/features" className="btn-primary-job self-start mt-4 px-12 py-4 shadow-lg shadow-emerald-100 inline-block text-center">
                            Learn More About AI
                        </Link>
                    </div>
                </div>
            </section>

            {/* 5. JOB LISTINGS SECTION */}
            <section id="jobs" className="py-24 bg-[#F1F8F5]">
                <div className="max-w-[1320px] mx-auto px-6">
                    <h2 className="section-title">Job Listing</h2>

                    {/* Tabs */}
                    <div className="flex justify-center gap-4 mt-12 mb-16">
                        {['Featured', 'Full Time', 'Part Time'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-2 px-8 font-bold border rounded-md transition-all ${activeTab === tab ? 'bg-[#00B074] text-white border-[#00B074]' : 'bg-white text-[#2B3940] border-gray-200 hover:border-[#00B074]'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Job List */}
                    <div className="flex flex-col gap-6">
                        {filteredJobs.length === 0 ? (
                            <div className="text-center py-12 text-gray-400 font-bold">
                                No jobs found for this category.
                            </div>
                        ) : filteredJobs.map((job, i) => (
                            <motion.div
                                key={i}
                                className="job-item bg-white"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                            >
                                {/* Company Logo / Initial */}
                                <div className="w-20 h-20 border rounded-lg flex items-center justify-center p-3 shrink-0 bg-emerald-50 font-black text-2xl text-[#00B074]">
                                    {job.company.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-2xl font-black text-[#2B3940] tracking-tight">{job.title}</h3>
                                    <p className="text-sm font-bold text-[#00B074] mt-1">{job.company}</p>
                                    <div className="flex flex-wrap gap-4 mt-2 text-sm font-medium text-[#666565]">
                                        <span className="flex items-center gap-1"><MapPin size={16} className="text-[#00B074]" /> {job.location}</span>
                                        <span className="flex items-center gap-1"><TrendingUp size={16} className="text-[#00B074]" /> {job.type}</span>
                                        <span className="flex items-center gap-1"><TrendingUp size={16} className="text-[#00B074]" /> {job.salary}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-3 text-right shrink-0">
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => toggleWishlist(job.title)}
                                            className={`p-3 rounded-lg transition-all ${wishlist.includes(job.title) ? 'bg-[#00B074] text-white' : 'bg-[#F1F8F5] text-[#00B074] hover:bg-[#00B074] hover:text-white'}`}
                                            title={wishlist.includes(job.title) ? "Remove from Wishlist" : "Add to Wishlist"}
                                        >
                                            <Heart size={20} fill={wishlist.includes(job.title) ? "currentColor" : "none"} />
                                        </button>
                                        <Link to={role ? `/${role}/dashboard` : '/login'} className="btn-primary-job py-3 px-6">Apply Now</Link>
                                    </div>
                                    <p className="text-xs font-bold text-gray-400">Apply before: 30 Mar, 2026</p>
                                </div>
                            </motion.div>
                        ))}
                        <Link to="/jobs" className="btn-primary-job self-center mt-8 px-12 py-5 text-sm uppercase">Browse More Jobs</Link>
                    </div>
                </div>
            </section>

            {/* 6. TESTIMONIALS */}
            <section className="py-24 bg-white">
                <div className="max-w-[1320px] mx-auto px-6">
                    <h2 className="section-title">Our Clients Say!!!</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-[#F1F8F5] p-10 rounded-lg relative">
                                <Quote className="absolute top-6 right-6 text-[#00B074]/20 w-16 h-16" />
                                <p className="text-[#666565] italic leading-relaxed mb-6 font-medium relative z-10">
                                    "Jobify helped me find a Software Engineering role in just 2 weeks. The AI matching is surprisingly accurate!"
                                </p>
                                <div className="flex items-center gap-4">
                                    <img src={`https://i.pravatar.cc/100?u=${i + 100}`} className="w-14 h-14 rounded-full border-4 border-white shadow-sm" alt="client" />
                                    <div>
                                        <h4 className="font-black text-[#2B3940]">Happy User</h4>
                                        <p className="text-sm text-gray-500 font-bold">Software Engineer</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. FOOTER */}
            <footer className="bg-[#2B3940] pt-24 pb-10 text-white/70">
                <div className="max-w-[1320px] mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10 pb-16">
                    <div className="flex flex-col gap-6">
                        <h3 className="text-2xl font-black text-white">Company</h3>
                        <div className="flex flex-col gap-3 font-medium">
                            <Link to="/about" className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight size={14} /> About Us</Link>
                            <Link to="/contact" className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight size={14} /> Contact Us</Link>
                            <Link to="/features" className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight size={14} /> Our Services</Link>
                            <Link to="/" className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight size={14} /> Privacy Policy</Link>
                            <Link to="/" className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight size={14} /> Terms & Condition</Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <h3 className="text-2xl font-black text-white">Quick Links</h3>
                        <div className="flex flex-col gap-3 font-medium">
                            <Link to="/" className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight size={14} /> Home</Link>
                            <Link to="/jobs" className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight size={14} /> Find Jobs</Link>
                            <Link to="/features" className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight size={14} /> AI Features</Link>
                            <Link to="/about" className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight size={14} /> About Us</Link>
                            <Link to="/contact" className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight size={14} /> Contact</Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6 text-white/80">
                        <h3 className="text-2xl font-black text-white">Contact</h3>
                        <div className="flex flex-col gap-4 font-medium">
                            <p className="flex items-center gap-3"><MapPin size={18} className="text-white shrink-0" /> 123 Jobify Street, Tech City, Mumbai - 400001</p>
                            <p className="flex items-center gap-3"><Mail size={18} className="text-white shrink-0" /> support@jobify.com</p>
                            <div className="flex gap-4 mt-2">
                                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#00B074] hover:border-[#00B074] transition-all"><Twitter size={18} /></a>
                                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#00B074] hover:border-[#00B074] transition-all"><Facebook size={18} /></a>
                                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#00B074] hover:border-[#00B074] transition-all"><Instagram size={18} /></a>
                                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#00B074] hover:border-[#00B074] transition-all"><Linkedin size={18} /></a>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <h3 className="text-2xl font-black text-white">Newsletter</h3>
                        <p className="font-medium text-white/70">Subscribe to get the latest job alerts and career tips delivered to your inbox.</p>
                        <form onSubmit={handleNewsletterSignup} className="relative mt-2">
                            <input
                                type="email"
                                placeholder="Your email address"
                                value={newsletterEmail}
                                onChange={e => setNewsletterEmail(e.target.value)}
                                className="w-full bg-white border-0 py-4 pl-6 pr-24 rounded-md focus:ring-0 text-gray-800"
                                required
                            />
                            <button type="submit" className="absolute right-2 top-2 bottom-2 bg-[#00B074] text-white px-5 rounded font-bold text-sm tracking-widest hover:bg-[#009663] transition-all">
                                SignUp
                            </button>
                        </form>
                        {newsletterSuccess && (
                            <div className="flex items-center gap-2 bg-emerald-900/40 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-lg text-sm font-bold">
                                <CheckCircle size={16} /> Subscribed successfully!
                            </div>
                        )}
                    </div>
                </div>
                <div className="max-w-[1320px] mx-auto px-6 mt-10 flex flex-wrap justify-between items-center gap-4 text-sm font-medium">
                    <p>© <Link to="/" className="text-white border-b border-white hover:text-[#00B074] hover:border-[#00B074] transition-all">Jobify</Link>, All Right Reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/" className="hover:text-white">Home</Link>
                        <Link to="/about" className="hover:text-white">About</Link>
                        <Link to="/contact" className="hover:text-white">Contact</Link>
                        <Link to="/jobs" className="hover:text-white">Jobs</Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
