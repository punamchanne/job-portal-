import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Zap, Shield, Globe, PieChart, PenTool, BookOpen, TrendingUp, Headset, UserCheck } from 'lucide-react'

export default function Features() {
    const features = [
        {
            icon: <Zap />,
            title: "AI Resume Parsing",
            desc: "Upload a PDF and let our AI extract skills, education, and experience accurately in seconds.",
            color: "emerald"
        },
        {
            icon: <PieChart />,
            title: "Smart Matching",
            desc: "Our algorithm compares your unique profile against thousands of jobs to find the perfect fit.",
            color: "blue"
        },
        {
            icon: <UserCheck />,
            title: "Candidate Insights",
            desc: "Understand your market value and identify missing skills required for your dream roles.",
            color: "orange"
        },
        {
            icon: <Shield />,
            title: "Verified Employers",
            desc: "We manually verify every company profile to ensure you apply to safe and legitimate jobs.",
            color: "red"
        },
        {
            icon: <Globe />,
            title: "Global Reach",
            desc: "Find remote opportunities or local jobs across 50+ countries around the world.",
            color: "purple"
        },
        {
            icon: <Headset />,
            title: "24/7 Support",
            desc: "Our team is always available to help you with technical issues or career advice.",
            color: "teal"
        }
    ]

    return (
        <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
            {/* Page Header */}
            <div className="bg-[#2B3940] pt-32 pb-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[#00B074]/10 mix-blend-overlay opacity-50"></div>
                <div className="max-w-[1320px] mx-auto px-6 relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-black text-white mb-6"
                    >
                        Our <span className="text-[#00B074]">Features</span>
                    </motion.h1>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto font-medium">
                        Powerful technology designed to simplify your job search and hiring process.
                    </p>
                </div>
            </div>

            {/* Features Grid */}
            <section className="py-24 max-w-[1320px] mx-auto px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white p-12 rounded-[2rem] border border-gray-100 shadow-sm transition-all hover:shadow-2xl flex flex-col items-center text-center group"
                        >
                            <div className="text-4xl mb-8 p-6 bg-emerald-50 text-[#00B074] rounded-2xl group-hover:bg-[#00B074] group-hover:text-white transition-all">
                                {f.icon}
                            </div>
                            <h3 className="text-2xl font-black text-[#2B3940] mb-5 tracking-tight">{f.title}</h3>
                            <p className="text-gray-500 font-bold leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-24 bg-[#00B074]">
                <div className="max-w-[1320px] mx-auto px-6 text-center text-white flex flex-col items-center gap-8">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                        Experience the AI Revolution <br /> in Career Growth.
                    </h2>
                    <p className="text-xl font-medium opacity-80 max-w-2xl">
                        Join Jobify today and let our technology work for you. Thousands are already finding their paths.
                    </p>
                    <div className="flex gap-4 mt-4">
                        <Link to="/signup" className="bg-white text-[#00B074] px-12 py-5 rounded-xl font-black text-lg hover:shadow-2xl transition-all">Get Started Now</Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
