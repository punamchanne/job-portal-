import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Mail, Lock, ArrowLeft } from 'lucide-react'

export default function Login() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await axios.post('http://localhost:8000/api/auth/login', formData)
            localStorage.setItem('token', res.data.access_token)
            localStorage.setItem('role', res.data.role)
            localStorage.setItem('userId', res.data.id)
            localStorage.setItem('userName', res.data.name)
            navigate(`/${res.data.role}/dashboard`)
        } catch (err) {
            alert("Oops! " + (err.response?.data?.detail || "Something went wrong. Please check your credentials."))
        } finally {
            setLoading(false)
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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-12 h-1.5 bg-[#F97316] mb-8 rounded-full"></div>
                        <h1 className="text-6xl font-black leading-[1.1] mb-6 tracking-tighter font-display text-white">
                            Ready to <br /> Work?
                        </h1>
                        <p className="text-gray-400 text-sm font-semibold leading-relaxed">
                            Sign in to access your AI-powered job matches, customized recommendations, and recruiter feeds.
                        </p>

                        <div className="mt-16 flex items-center gap-4">
                            <div className="flex -space-x-3.5">
                                {[1, 2, 3].map(i => (
                                    <img key={i} src={`https://i.pravatar.cc/100?u=${i + 200}`} className="w-10 h-10 rounded-full border-2 border-[#111827] shadow-sm" alt="user" />
                                ))}
                            </div>
                            <p className="text-xs font-bold text-gray-400">Join 18,000+ professionals</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full md:w-7/12 flex items-center justify-center p-8 md:p-20 bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.02)] relative z-20">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-md"
                >
                    <div className="mb-12 flex flex-col items-center md:items-start text-center md:text-left">
                        <Link to="/" className="bg-orange-50 p-3 rounded-2xl mb-6 inline-block hover:scale-105 transition-transform border border-orange-100/50">
                            <h2 className="text-3xl font-black text-[#F97316]">Road2Job</h2>
                        </Link>
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Login</h2>
                        <p className="text-gray-500 font-bold text-lg">Just enter your credentials to get started.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-7">
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Your Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#F97316] transition-colors" />
                                <input
                                    type="email"
                                    required
                                    placeholder="name@email.com"
                                    className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F97316]/20 focus:border-[#F97316] focus:bg-white transition-all font-semibold text-lg shadow-sm"
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                            <div className="flex justify-between items-center mb-2 px-1">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Password</label>
                                <a href="#" className="text-xs font-bold text-[#F97316] hover:underline">Forgot?</a>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#F97316] transition-colors" />
                                <input
                                    type="password"
                                    required
                                    placeholder="Enter password"
                                    className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F97316]/20 focus:border-[#F97316] focus:bg-white transition-all font-semibold text-lg shadow-sm"
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </motion.div>

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-[#F97316] text-white rounded-2xl font-black text-lg hover:bg-[#EA580C] transition-all shadow-xl shadow-orange-100 disabled:opacity-70 mt-4 relative overflow-hidden group cursor-pointer"
                        >
                            <span className="relative z-10">{loading ? "Logging in..." : "Log In"}</span>
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-[-30deg]"></div>
                        </motion.button>
                    </form>

                    <p className="mt-12 text-center text-gray-400 font-bold">
                        Don't have an account? <Link to="/signup" className="text-[#F97316] ml-1 hover:underline underline-offset-4">Create one</Link>
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
