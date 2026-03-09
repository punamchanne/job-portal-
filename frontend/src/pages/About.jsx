import React from 'react'
import { motion } from 'framer-motion'
import { Check, Users, Award, Zap } from 'lucide-react'

export default function About() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Page Header */}
            <div className="bg-[#2B3940] pt-32 pb-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[#00B074]/10 mix-blend-overlay opacity-50"></div>
                <div className="max-w-[1320px] mx-auto px-6 relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-black text-white mb-6"
                    >
                        About <span className="text-[#00B074]">Us</span>
                    </motion.h1>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto font-medium">
                        Learn how Jobify is revolutionizing the recruitment industry with AI-driven matching and smart career tools.
                    </p>
                </div>
            </div>

            {/* Our Mission */}
            <section className="py-24 max-w-[1320px] mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1522071823991-b9671f9d7f1f?auto=format&fit=crop&q=80&w=800&h=600"
                        alt="Our Team"
                        className="rounded-2xl shadow-2xl"
                    />
                </motion.div>
                <div className="flex flex-col gap-6">
                    <h2 className="text-4xl font-black text-[#2B3940]">Our Mission</h2>
                    <p className="text-[#666565] text-lg leading-relaxed">
                        At Jobify, our mission is to eliminate the friction in the job market. We believe that everyone deserves a career they love, and every company deserves the best talent.
                    </p>
                    <p className="text-[#666565] leading-relaxed">
                        By leveraging cutting-edge Artificial Intelligence and Machine Learning, we analyze more than just keywords. We look at potential, culture fit, and growth trajectory to bridge the gap between dreams and reality.
                    </p>
                    <div className="grid grid-cols-2 gap-6 mt-4">
                        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                            <h4 className="text-3xl font-black text-[#00B074] mb-1">10k+</h4>
                            <p className="text-sm font-bold text-gray-500 uppercase">Users Joined</p>
                        </div>
                        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                            <h4 className="text-3xl font-black text-[#00B074] mb-1">500+</h4>
                            <p className="text-sm font-bold text-gray-500 uppercase">Companies</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 bg-[#F1F8F5]">
                <div className="max-w-[1320px] mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-[#2B3940] mb-4">Why Choose Jobify?</h2>
                        <p className="text-gray-500 font-medium">We provide a platform that works for both employers and job seekers.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: <Zap />, title: "Lightning Fast", desc: "Our AI processes resumes and job descriptions in milliseconds." },
                            { icon: <Award />, title: "Premium Quality", desc: "We only host verified jobs and pre-screened candidates." },
                            { icon: <Users />, title: "Direct Contact", desc: "Chat directly with hiring managers or potential employees." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all"
                            >
                                <div className="w-16 h-16 bg-emerald-50 text-[#00B074] rounded-xl flex items-center justify-center mb-6 text-3xl">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-black text-[#2B3940] mb-4">{item.title}</h3>
                                <p className="text-gray-500 leading-relaxed font-medium">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
