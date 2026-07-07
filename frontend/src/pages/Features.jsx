import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Zap, Shield, Globe, PieChart, Headset, UserCheck, CheckCircle2, ArrowRight } from 'lucide-react'

export default function Features() {
    const features = [
        {
            icon: <Zap size={24} />,
            title: "AI Resume Parsing",
            desc: "Upload a PDF resume and let our parser pull structured skills, education, and career history metrics instantly."
        },
        {
            icon: <PieChart size={24} />,
            title: "Smart Profile Matching",
            desc: "Our machine learning engine tests your profile qualifications against active vacancies to score perfect matches."
        },
        {
            icon: <UserCheck size={24} />,
            title: "Skill-Gap Assessments",
            desc: "Analyze your candidate profile and identify exactly what core qualifications you are missing for specific positions."
        },
        {
            icon: <Shield size={24} />,
            title: "Verified Enterprise Orgs",
            desc: "We screen and verify employer listings manually to secure legitimate, safe corporate recruitment channels."
        },
        {
            icon: <Globe size={24} />,
            title: "Global Sourcing Pipelines",
            desc: "Locate international remote vacancies or major tech-hub openings in India and globally."
        },
        {
            icon: <Headset size={24} />,
            title: "Dedicated Partner Support",
            desc: "Access 24/7 technical support or resume strategy assistance directly inside your dashboard."
        }
    ]

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Page Header (Matches Landing Page Dark Header + concentric wireframe animations) */}
            <div className="bg-[#111827] pt-40 pb-28 text-center relative overflow-hidden">
                {/* Concentric rotating circles in header */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] border border-orange-500/10 rounded-full -z-5 animate-spin-slow"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] border border-dashed border-gray-800 rounded-full -z-5"></div>
                <div className="absolute inset-0 bg-[#F97316]/5 mix-blend-overlay opacity-40"></div>
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#F97316]/10 rounded-full blur-3xl -z-5"></div>

                <div className="max-w-[1320px] mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 text-[#F97316] font-bold text-xs uppercase tracking-widest rounded-full mb-6 border border-orange-500/20"
                    >
                        Capabilities
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight font-display"
                    >
                        Our <span className="text-[#F97316]">Features</span>
                    </motion.h1>
                    <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-semibold leading-relaxed">
                        Powerful machine learning utilities built to simplify talent sourcing and job matching.
                    </p>
                </div>
            </div>

            {/* Features Grid */}
            <section className="py-28 max-w-[1320px] mx-auto px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            viewport={{ once: true }}
                            className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:border-orange-200/20 transition-all duration-300 flex flex-col items-start text-left group"
                        >
                            <div className="p-4 bg-orange-50 text-[#F97316] rounded-2xl group-hover:bg-[#F97316] group-hover:text-white transition-all duration-300 mb-8 shrink-0">
                                {f.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{f.title}</h3>
                            <p className="text-gray-500 font-semibold text-xs leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    )
}
