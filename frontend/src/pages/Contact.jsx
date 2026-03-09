import React from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, MessageSquare, Send } from 'lucide-react'

export default function Contact() {
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
                        Contact <span className="text-[#00B074]">Us</span>
                    </motion.h1>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto font-medium">
                        Have questions about our AI matching or need help setting up your profile? We're here for you.
                    </p>
                </div>
            </div>

            <section className="py-24 max-w-[1320px] mx-auto px-6 grid lg:grid-cols-3 gap-16">
                {/* Contact Info */}
                <div className="flex flex-col gap-12">
                    <div className="bg-emerald-50 p-10 rounded-3xl border border-emerald-100 flex flex-col gap-8 shadow-sm">
                        <h2 className="text-3xl font-black text-[#2B3940]">Get in Touch</h2>
                        <div className="flex flex-col gap-6">
                            {[
                                { icon: <MapPin />, title: "Head Office", desc: "123 Jobify Street, Tech City, NY" },
                                { icon: <Mail />, title: "Email Support", desc: "support@jobify.com" },
                                { icon: <Phone />, title: "Call Center", desc: "+1 (888) JOB-HELP" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#00B074] shrink-0 shadow-sm border border-emerald-50">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-[#2B3940] mb-1">{item.title}</h4>
                                        <p className="text-sm font-bold text-gray-400">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-2">
                    <form className="bg-white p-12 rounded-3xl border border-gray-100 shadow-xl flex flex-col gap-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full bg-gray-50 border-0 p-4 rounded-xl focus:ring-2 focus:ring-[#00B074] focus:bg-white transition-all font-medium text-gray-800"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="yourname@email.com"
                                    className="w-full bg-gray-50 border-0 p-4 rounded-xl focus:ring-2 focus:ring-[#00B074] focus:bg-white transition-all font-medium text-gray-800"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Subject</label>
                            <input
                                type="text"
                                placeholder="How can we help?"
                                className="w-full bg-gray-50 border-0 p-4 rounded-xl focus:ring-2 focus:ring-[#00B074] focus:bg-white transition-all font-medium text-gray-800"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Message</label>
                            <textarea
                                rows="5"
                                placeholder="Write your message here..."
                                className="w-full bg-gray-50 border-0 p-4 rounded-xl focus:ring-2 focus:ring-[#00B074] focus:bg-white transition-all font-medium text-gray-800"
                            ></textarea>
                        </div>
                        <button
                            type="button"
                            className="bg-[#00B074] text-white py-5 px-12 rounded-xl font-black text-lg hover:bg-[#009663] transition-all flex items-center justify-center gap-3 self-start shadow-xl shadow-emerald-100"
                        >
                            <Send size={20} />
                            Send Message
                        </button>
                    </form>
                </div>
            </section>
        </div>
    )
}
