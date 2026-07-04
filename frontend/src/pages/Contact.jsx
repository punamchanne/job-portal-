import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Send, CheckCircle2, ChevronRight } from 'lucide-react'

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
    const [submitted, setSubmitted] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitting(true)
        setTimeout(() => {
            setSubmitted(true)
            setSubmitting(false)
            setFormData({ name: '', email: '', subject: '', message: '' })
        }, 1000)
    }

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
                        Connect
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight font-display"
                    >
                        Contact <span className="text-[#F97316]">Us</span>
                    </motion.h1>
                    <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-semibold leading-relaxed">
                        Have queries about our AI scoring index or profile configurations? Let us know.
                    </p>
                </div>
            </div>

            <section className="py-28 max-w-[1320px] mx-auto px-6 grid lg:grid-cols-12 gap-16">
                {/* Contact Information Details */}
                <div className="lg:col-span-4 flex flex-col gap-8">
                    <div className="bg-[#111827] text-white p-8 rounded-[28px] border border-gray-800 flex flex-col gap-8 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#F97316]/5 rounded-full blur-2xl"></div>
                        <h2 className="text-2xl font-bold tracking-tight text-white">Reach Out</h2>
                        
                        <div className="flex flex-col gap-6">
                            {[
                                { icon: <MapPin size={20} />, title: "Headquarters", desc: "Road2Tech HQ, Pune, Maharashtra, India" },
                                { icon: <Mail size={20} />, title: "Partner Support", desc: "info@road2tech.in" },
                                { icon: <Phone size={20} />, title: "Direct Helpline", desc: "+91 75594 12440" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-gray-850 rounded-xl flex items-center justify-center text-[#F97316] shrink-0 border border-gray-800">
                                        {item.icon}
                                    </div>
                                    <div className="text-left">
                                        <h4 className="font-bold text-sm text-white mb-0.5">{item.title}</h4>
                                        <p className="text-[11px] font-semibold text-gray-400 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Form Input Area */}
                <div className="lg:col-span-8">
                    {submitted ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white p-16 rounded-[32px] border border-gray-150 shadow-xl text-center flex flex-col items-center gap-6"
                        >
                            <div className="bg-orange-50 p-6 rounded-full text-[#F97316] shadow-sm">
                                <CheckCircle2 size={54} />
                            </div>
                            <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">Message Received!</h3>
                            <p className="text-gray-500 text-base font-semibold max-w-md">
                                Thank you for contacting us. Our operations team will respond inside 24 hours.
                            </p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="bg-[#F97316] text-white py-3.5 px-10 rounded-full font-bold text-sm hover:bg-[#EA580C] hover:shadow-xl transition-all duration-300 cursor-pointer"
                            >
                                Submit New Query
                            </button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="bg-white p-10 md:p-12 rounded-[32px] border border-gray-100 shadow-xl flex flex-col gap-6 text-left">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Your name"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F97316]/20 focus:border-[#F97316] focus:bg-white transition-all font-semibold text-xs md:text-sm text-gray-800"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="name@email.com"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F97316]/20 focus:border-[#F97316] focus:bg-white transition-all font-semibold text-xs md:text-sm text-gray-800"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Subject</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Brief topic summary..."
                                    value={formData.subject}
                                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F97316]/20 focus:border-[#F97316] focus:bg-white transition-all font-semibold text-xs md:text-sm text-gray-800"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Message</label>
                                <textarea
                                    rows="5"
                                    required
                                    placeholder="Type details of your inquiry..."
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F97316]/20 focus:border-[#F97316] focus:bg-white transition-all font-semibold text-xs md:text-sm text-gray-800"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="bg-[#F97316] text-white py-4 px-10 rounded-full font-bold text-sm hover:bg-[#EA580C] hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 flex items-center justify-center gap-2.5 self-start disabled:opacity-70 cursor-pointer"
                            >
                                {submitting ? (
                                    <>
                                        <div className="w-4.5 h-4.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send size={16} />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </div>
    )
}
