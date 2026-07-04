import React from 'react'
import { motion } from 'framer-motion'
import { Check, Users, Award, Zap, Compass, Heart, ShieldAlert } from 'lucide-react'

export default function About() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Page Header (Matches Landing Page Dark Header + concentric wireframe animations) */}
            <div className="bg-[#111827] pt-40 pb-28 text-center relative overflow-hidden">
                {/* Concentric rotating circles in header */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] border border-orange-500/10 rounded-full -z-5 animate-spin-slow"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] border border-dashed border-gray-800 rounded-full -z-5"></div>
                <div className="absolute inset-0 bg-[#F97316]/5 mix-blend-overlay opacity-40"></div>
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#F97316]/10 rounded-full blur-3xl -z-5"></div>

                <div className="max-w-[1320px] mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 text-[#F97316] font-bold text-xs uppercase tracking-widest rounded-full mb-6 border border-orange-500/20"
                    >
                        Our Company
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight font-display"
                    >
                        About <span className="text-[#F97316]">Road2Job</span>
                    </motion.h1>
                    <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-semibold leading-relaxed">
                        Learn how Road2Job is streamlining recruitment cycles with AI-driven matching and smart talent evaluations.
                    </p>
                </div>
            </div>

            {/* Our Mission */}
            <section className="py-28 max-w-[1320px] mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative flex justify-center items-center"
                >
                    {/* Abstract circular backdrop */}
                    <div className="absolute w-[360px] h-[360px] border border-orange-100 rounded-full -z-10 animate-pulse"></div>
                    <div className="absolute w-[440px] h-[440px] border border-dashed border-gray-150 rounded-full -z-10"></div>
                    <div className="absolute -z-10 w-72 h-72 bg-[#F97316]/5 rounded-full -bottom-8 -left-8 blur-3xl"></div>
                    <img
                        src="/team_collaboration.png"
                        alt="Our Team"
                        className="rounded-[36px] shadow-xl border border-white max-w-full h-auto object-cover max-h-[420px]"
                    />
                </motion.div>

                <div className="flex flex-col gap-6 text-left">
                    <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest">Our Mission</span>
                    <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                        Eliminating friction in corporate recruitment
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed font-semibold">
                        Road2Job is powered by Road2Tech. Road2Tech offers high-quality development projects in AI, web, and app development, helping creators buy, customize, or sell tech projects.
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed font-semibold">
                        By integrating Road2Tech's technical matching analytics, Road2Job matches candidate profiles directly with active enterprise postings to help developers find high-tier positions instantly.
                    </p>

                    <div className="grid grid-cols-2 gap-6 mt-6">
                        <div className="bg-orange-50/40 p-6 rounded-2xl border border-orange-100/10 shadow-sm flex flex-col gap-1">
                            <h4 className="text-3xl font-extrabold text-[#F97316]">18,000+</h4>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Candidates</p>
                        </div>
                        <div className="bg-orange-50/40 p-6 rounded-2xl border border-orange-100/10 shadow-sm flex flex-col gap-1">
                            <h4 className="text-3xl font-extrabold text-[#F97316]">1,200+</h4>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Verified Employers</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-28 bg-gray-50/50 border-t border-gray-100">
                <div className="max-w-[1320px] mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest">Our Value</span>
                        <h2 className="text-4xl font-extrabold tracking-tight mt-3 mb-4">Why Road2Job?</h2>
                        <p className="text-gray-500 font-semibold text-sm">We deliver enterprise-level infrastructure that benefits both hiring teams and candidates.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: <Zap size={24} />, title: "Real-time Verification", desc: "Our parser processes resumes, indexes skills, and extracts gaps in milliseconds." },
                            { icon: <Award size={24} />, title: "Verified Credentials", desc: "We operate in pre-screened environments ensuring verified applications." },
                            { icon: <Users size={24} />, title: "Automated Workflows", desc: "Direct recruiter-candidate connections to make hiring conversational and transparent." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white p-10 rounded-[28px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                            >
                                <div className="w-14 h-14 bg-orange-50 text-[#F97316] rounded-2xl flex items-center justify-center mb-6">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{item.title}</h3>
                                <p className="text-gray-500 text-xs leading-relaxed font-semibold">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-28 bg-white border-t border-gray-100">
                <div className="max-w-[1320px] mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest">Our Ethos</span>
                        <h2 className="text-4xl font-extrabold tracking-tight mt-3 mb-4">Values that Guide Us</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: <Compass size={24} />, title: "Absolute Transparency", desc: "No shadow-screening, hidden metrics, or black box algorithmic decisions. Keep users informed." },
                            { icon: <Heart size={24} />, title: "Candidate Empowerment", desc: "We provide seekers with interactive skill gaps analysis and free study courses to uplift profiles." },
                            { icon: <ShieldAlert size={24} />, title: "Uncompromising Integrity", desc: "Mandatory OTP registrations and manual corporate verifications prevent phishing/spam postings." }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="p-8 bg-gray-50/50 rounded-[24px] border border-gray-100/50 text-left hover:border-orange-200 transition-colors"
                            >
                                <div className="text-[#F97316] mb-5">{item.icon}</div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2 tracking-tight">{item.title}</h3>
                                <p className="text-gray-400 text-xs font-semibold leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
