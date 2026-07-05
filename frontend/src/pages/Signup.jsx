import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../config/api'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, User, Mail, Lock, ChevronDown, ArrowLeft, Building, MapPin, Phone } from 'lucide-react'

export default function Signup() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'candidate', contact_number: '' })
    const [loading, setLoading] = useState(false)
    const [showOTP, setShowOTP] = useState(false)
    const [otp, setOtp] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await api.post('/api/auth/signup', formData)
            setShowOTP(true)
            alert("An OTP has been sent to your email and phone number for verification.")
        } catch (err) {
            alert("Oops! " + (err.response?.data?.detail || "Something went wrong. Please try again."))
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyOTP = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await api.post('/api/auth/verify-otp', { email: formData.email, otp })
            alert("Success! Account verified. You can now log in.")
            navigate('/login')
        } catch (err) {
            alert(err.response?.data?.detail || "Invalid or expired OTP")
        } finally {
            setLoading(false)
        }
    }

    const handleResendOTP = async () => {
        try {
            await api.post('/api/auth/resend-otp', { email: formData.email })
            alert("OTP Resent successfully!")
        } catch (err) {
            alert("Error resending OTP")
        }
    }

    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#F8F9FA] overflow-hidden relative">


            {/* Left Side: Premium Brand Experience */}
            <div className="hidden md:flex md:w-5/12 bg-[#111827] relative items-center justify-center p-16 text-white overflow-hidden border-r border-gray-800">
                {/* Visual mesh background grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>

                {/* Rotating Concentric Circles */}
                <div className="absolute w-[280px] h-[280px] border border-orange-500/10 rounded-full -z-5 animate-spin-slow"></div>
                <div className="absolute w-[360px] h-[360px] border border-dashed border-gray-800 rounded-full -z-5"></div>
                <div className="absolute w-[440px] h-[440px] border border-gray-800/30 rounded-full -z-5 border-dashed"></div>

                {/* Glowing Core */}
                <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#F97316]/5 rounded-full blur-3xl -z-5 animate-pulse"></div>

                <div className="relative z-10 max-w-sm text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-12 h-1.5 bg-[#F97316] mb-8 rounded-full"></div>
                        <h1 className="text-6xl font-black leading-[1.1] mb-6 tracking-tighter font-display text-white">Start <br /> Today.</h1>
                        <p className="text-gray-400 text-sm font-semibold leading-relaxed">
                            Join thousands of users finding their dream tech jobs using our AI-driven competency analysis.
                        </p>

                        <div className="mt-16 space-y-4">
                            {[
                                "AI Resume Scanner & Score",
                                "Targeted Gap Course Referral",
                                "Employer Direct Verification"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#F97316]"></div>
                                    </div>
                                    <span className="text-xs font-bold text-gray-300">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right Side: Modern Form */}
            <div className="w-full md:w-7/12 flex items-center justify-center p-8 md:p-20 bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.02)] relative z-20">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-xl"
                >
                    <div className="mb-10 flex flex-col items-center md:items-start text-center md:text-left">
                        <Link to="/" className="bg-orange-50 p-3 rounded-2xl mb-6 inline-block hover:scale-105 transition-transform border border-orange-100/50">
                            <h2 className="text-3xl font-black text-[#F97316]">Road2Job</h2>
                        </Link>
                        <h2 className="text-3xl font-black text-gray-900 mb-2">Create Account</h2>
                        <p className="text-gray-500 font-bold text-lg">Quick and simple setup.</p>
                    </div>

                    {!showOTP ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Full Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#F97316] transition-colors" />
                                        <input
                                            type="text"
                                            required
                                            placeholder="Your name"
                                            className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F97316]/20 focus:border-[#F97316] focus:bg-white transition-all font-medium"
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                </motion.div>

                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Email Address</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#F97316] transition-colors" />
                                        <input
                                            type="email"
                                            required
                                            placeholder="name@email.com"
                                            className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F97316]/20 focus:border-[#F97316] focus:bg-white transition-all font-medium"
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </motion.div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Set Password</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#F97316] transition-colors" />
                                        <input
                                            type="password"
                                            required
                                            placeholder="Min. 6 characters"
                                            className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F97316]/20 focus:border-[#F97316] focus:bg-white transition-all font-medium"
                                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                                        />
                                    </div>
                                </motion.div>

                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Contact Number</label>
                                    <div className="relative group">
                                        <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#F97316] transition-colors" />
                                        <input
                                            type="text"
                                            required
                                            placeholder="Phone Number"
                                            className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F97316]/20 focus:border-[#F97316] focus:bg-white transition-all font-medium"
                                            onChange={e => setFormData({ ...formData, contact_number: e.target.value })}
                                        />
                                    </div>
                                </motion.div>
                            </div>

                            <AnimatePresence>
                                {formData.role === 'employer' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="space-y-6 pt-2"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Organization Name</label>
                                                <div className="relative group">
                                                    <Building className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#F97316] transition-colors" />
                                                    <input
                                                        type="text"
                                                        required
                                                        placeholder="e.g. Google, Microsoft, TCS"
                                                        className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F97316]/20 focus:border-[#F97316] focus:bg-white transition-all font-medium"
                                                        onChange={e => setFormData({ ...formData, organization_name: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Company Address</label>
                                                <div className="relative group">
                                                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#F97316] transition-colors" />
                                                    <input
                                                        type="text"
                                                        required
                                                        placeholder="Street, City, Country"
                                                        className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F97316]/20 focus:border-[#F97316] focus:bg-white transition-all font-medium"
                                                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Account Type</label>
                                <div className="relative mt-2">
                                    <select
                                        className="w-full pl-6 pr-10 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F97316]/20 focus:border-[#F97316] focus:bg-white transition-all font-bold text-gray-700 appearance-none cursor-pointer"
                                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                                    >
                                        <option value="candidate">I want a job</option>
                                        <option value="employer">I want to hire people</option>
                                    </select>
                                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                            </motion.div>

                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 bg-[#F97316] text-white rounded-2xl font-black text-lg hover:bg-[#EA580C] transition-all shadow-xl shadow-orange-100 disabled:opacity-70 mt-6 relative overflow-hidden group cursor-pointer"
                            >
                                <span className="relative z-10">{loading ? "Joining..." : "Join Now"}</span>
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-[-30deg]"></div>
                            </motion.button>
                        </form>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            <div className="text-center">
                                <div className="w-20 h-20 bg-orange-50 rounded-3xl flex items-center justify-center text-[#F97316] mx-auto mb-6 shadow-sm border border-orange-100/50">
                                    <Mail size={40} />
                                </div>
                                <h2 className="text-3xl font-black text-gray-900 mb-2">Verify Details</h2>
                                <p className="text-gray-500 font-bold">We've sent a 6-digit verification code to <br /><span className="text-[#F97316]">{formData.email}</span> and your mobile.</p>
                            </div>

                            <form onSubmit={handleVerifyOTP} className="space-y-6">
                                <div className="flex justify-center">
                                    <input
                                        type="text"
                                        maxLength="6"
                                        required
                                        placeholder="······"
                                        className="w-full max-w-[280px] text-center text-4xl tracking-[1.5rem] font-black py-6 bg-gray-50 border border-gray-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#F97316]/20 focus:border-[#F97316] focus:bg-white transition-all text-gray-800 placeholder:text-gray-200"
                                        value={otp}
                                        onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                                    />
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    type="submit"
                                    disabled={loading || otp.length < 6}
                                    className="w-full py-5 bg-[#F97316] text-white rounded-2xl font-black text-lg hover:bg-[#EA580C] transition-all shadow-xl shadow-orange-100 disabled:opacity-50 cursor-pointer"
                                >
                                    {loading ? "Verifying..." : "Verify & Continue"}
                                </motion.button>

                                <div className="text-center">
                                    <button
                                        type="button"
                                        onClick={handleResendOTP}
                                        className="text-gray-400 hover:text-[#F97316] font-bold transition-colors cursor-pointer"
                                    >
                                        Didn't receive the code? Resend
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setShowOTP(false)}
                                    className="w-full text-center text-gray-400 font-bold hover:underline cursor-pointer"
                                >
                                    Back to Registration
                                </button>
                            </form>
                        </motion.div>
                    )}

                    <p className="mt-8 text-center text-gray-400 font-bold">
                        Already have an account? <Link to="/login" className="text-[#F97316] ml-1 hover:underline underline-offset-4">Log in</Link>
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
