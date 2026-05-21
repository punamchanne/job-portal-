import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react'

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
    const [submitted, setSubmitted] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitting(true)
        // Simulate form submission
        setTimeout(() => {
            setSubmitted(true)
            setSubmitting(false)
            setFormData({ name: '', email: '', subject: '', message: '' })
        }, 1000)
    }

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
                                { icon: <MapPin />, title: "Head Office", desc: "123 Jobify Street, Tech City, Mumbai - 400001, Maharashtra, India" },
                                { icon: <Mail />, title: "Email Support", desc: "support@jobify.com" },
                                { icon: <Phone />, title: "Call Center", desc: "+91 98765 43210" }
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
                    {submitted ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white p-20 rounded-3xl border border-gray-100 shadow-xl text-center flex flex-col items-center gap-6"
                        >
                            <div className="bg-emerald-50 p-6 rounded-full text-[#00B074] shadow-inner">
                                <CheckCircle size={64} />
                            </div>
                            <h3 className="text-3xl font-black text-gray-900">Message Sent!</h3>
                            <p className="text-gray-500 text-lg font-bold">
                                Thank you for reaching out. We'll get back to you within 24 hours.
                            </p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="bg-[#00B074] text-white py-4 px-12 rounded-xl font-black text-lg hover:bg-[#009663] transition-all shadow-xl shadow-emerald-100"
                            >
                                Send Another Message
                            </button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="bg-white p-12 rounded-3xl border border-gray-100 shadow-xl flex flex-col gap-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-gray-50 border-0 p-4 rounded-xl focus:ring-2 focus:ring-[#00B074] focus:bg-white transition-all font-medium text-gray-800"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="yourname@email.com"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-gray-50 border-0 p-4 rounded-xl focus:ring-2 focus:ring-[#00B074] focus:bg-white transition-all font-medium text-gray-800"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Subject</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="How can we help?"
                                    value={formData.subject}
                                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full bg-gray-50 border-0 p-4 rounded-xl focus:ring-2 focus:ring-[#00B074] focus:bg-white transition-all font-medium text-gray-800"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Message</label>
                                <textarea
                                    rows="5"
                                    required
                                    placeholder="Write your message here..."
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-gray-50 border-0 p-4 rounded-xl focus:ring-2 focus:ring-[#00B074] focus:bg-white transition-all font-medium text-gray-800"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="bg-[#00B074] text-white py-5 px-12 rounded-xl font-black text-lg hover:bg-[#009663] transition-all flex items-center justify-center gap-3 self-start shadow-xl shadow-emerald-100 disabled:opacity-70"
                            >
                                {submitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send size={20} />
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
