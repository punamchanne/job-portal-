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
            alert("Oops! " + (err.response?.data?.detail || "Something went wrong. Please check your email and password."))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#F8F9FA] overflow-hidden relative">
            {/* Floating Back Button */}
            <Link
                to="/"
                className="absolute top-8 left-8 md:left-auto md:right-8 z-30 flex items-center gap-2 text-gray-500 hover:text-[#00B074] font-bold transition-all bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-gray-100 group"
            >
                <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: -4 }}
                >
                    <ArrowLeft size={20} />
                </motion.span>
                Back to Home
            </Link>

            {/* Left Side: Premium Brand Experience */}
            <div className="hidden md:flex md:w-5/12 bg-[#00B074] relative items-center justify-center p-16 text-white">
                {/* Dynamic Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 scale-110"
                    style={{ backgroundImage: `url(/hero-bg.png)` }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#00B074]/80 to-black/40"></div>

                <div className="relative z-10 max-w-sm">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="w-16 h-1 bg-white mb-8 rounded-full"></div>
                        <h1 className="text-7xl font-black leading-[1.1] mb-8 tracking-tighter">
                            Ready to <br /> Work?
                        </h1>
                        <p className="text-xl font-medium opacity-80 leading-relaxed">
                            Sign in to access your AI-powered job matches and exclusive career coaching.
                        </p>

                        <div className="mt-16 flex items-center gap-4">
                            <div className="flex -space-x-4">
                                {[1, 2, 3].map(i => (
                                    <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-12 h-12 rounded-full border-4 border-[#00B074]" alt="user" />
                                ))}
                            </div>
                            <p className="text-sm font-bold">Join 10k+ professionals</p>
                        </div>
                    </motion.div>
                </div>

                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute top-1/4 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-black/10 rounded-full blur-3xl"></div>
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
                        <Link to="/" className="bg-emerald-50 p-3 rounded-xl mb-6 inline-block hover:scale-105 transition-transform">
                            <h2 className="text-3xl font-black text-[#00B074]">Jobify</h2>
                        </Link>
                        <h2 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">Login</h2>
                        <p className="text-gray-500 font-bold text-lg">Just enter your details to get started.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-7">
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Your Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#00B074] transition-colors" />
                                <input
                                    type="email"
                                    required
                                    placeholder="yourname@email.com"
                                    className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00B074]/20 focus:border-[#00B074] focus:bg-white transition-all font-medium text-lg shadow-sm"
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                            <div className="flex justify-between items-center mb-2 px-1">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Password</label>
                                <a href="#" className="text-xs font-bold text-[#00B074] hover:underline">Forgot?</a>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#00B074] transition-colors" />
                                <input
                                    type="password"
                                    required
                                    placeholder="Enter password"
                                    className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00B074]/20 focus:border-[#00B074] focus:bg-white transition-all font-medium text-lg shadow-sm"
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </motion.div>

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-[#00B074] text-white rounded-2xl font-black text-lg hover:bg-[#009663] transition-all shadow-xl shadow-emerald-200 disabled:opacity-70 mt-4 relative overflow-hidden group"
                        >
                            <span className="relative z-10">{loading ? "Logging in..." : "Log In"}</span>
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-[-30deg]"></div>
                        </motion.button>
                    </form>

                    <p className="mt-12 text-center text-gray-400 font-bold">
                        Don't have an account? <Link to="/signup" className="text-[#00B074] ml-1 hover:underline underline-offset-4">Create one</Link>
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
