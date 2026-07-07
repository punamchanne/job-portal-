import React, { useState } from 'react'
import api from '../../config/api'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, Briefcase, MapPin, IndianRupee, PenTool, Send, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import DashboardLayout from '../../components/DashboardLayout'
import SkillsInput from '../../components/SkillsInput'

export default function PostJob() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: '', description: '', location: '', salary: '', required_skills: [], job_type: 'Full Time'
    })
    const [success, setSuccess] = useState(false)
    const userName = localStorage.getItem('userName') || "Partner"

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formData.required_skills.length === 0) {
            alert("⚠️ Please add at least one required skill!")
            return
        }
        try {
            const userId = localStorage.getItem('userId')
            const payload = { ...formData }
            await api.post(`/api/employer/jobs?current_user_id=${userId}`, payload)
            setSuccess(true)
            setTimeout(() => navigate('/employer/dashboard'), 2000)
        } catch (err) {
            const msg = err.response?.data?.detail || "Error posting job. Please try again."
            alert("❌ " + msg)
        }
    }

    return (
        <DashboardLayout role="employer" userName={userName}>
            <div className="max-w-4xl mx-auto flex flex-col gap-8">
                {/* Header Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative p-10 bg-[#111827] rounded-[32px] text-white overflow-hidden shadow-xl text-left"
                >
                    {/* Concentric rotating circles in banner */}
                    <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-[200px] h-[200px] border border-orange-500/10 rounded-full pointer-events-none animate-spin-slow -z-5"></div>
                    <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-[260px] h-[260px] border border-dashed border-gray-800 rounded-full pointer-events-none -z-5"></div>
                    <div className="absolute top-10 right-1/4 w-40 h-40 bg-[#F97316]/5 rounded-full blur-2xl pointer-events-none -z-5"></div>

                    <div className="relative z-10">
                        <span className="flex items-center gap-2 text-[#F97316] font-bold text-xs uppercase tracking-widest mb-4">
                            <PenTool className="w-4 h-4 animate-pulse" />
                            Listing Creator
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-white font-display">
                            Post <span className="text-[#F97316]">New Job</span>
                        </h2>
                        <p className="text-gray-405 text-xs sm:text-sm font-semibold max-w-xl">
                            Hire the best talent by creating a detailed job vacancy post with parsed qualifications.
                        </p>
                    </div>
                </motion.div>

                {success ? (
                    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-20 rounded-[32px] border border-gray-100 shadow-sm text-center flex flex-col items-center gap-6">
                        <div className="bg-orange-50 p-6 rounded-full text-[#F97316] mb-2">
                            <CheckCircle size={56} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Job Posted Successfully!</h2>
                        <p className="text-gray-400 font-semibold text-sm">Redirecting you to the dashboard...</p>
                    </motion.div>
                ) : (
                    <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-orange-50/20 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-500"></div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6.5 relative z-10">
                            {/* Row 1: Title & Location */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Job Title</label>
                                    <div className="flex items-center bg-gray-50 px-6 py-4 rounded-full border border-gray-100 focus-within:border-[#F97316] focus-within:bg-white transition-all duration-300">
                                        <Briefcase className="text-gray-400 mr-3 shrink-0" size={18} />
                                        <input type="text" required placeholder="e.g. Frontend Developer" className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 font-semibold text-gray-800 placeholder:text-gray-300 text-sm"
                                            onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Location</label>
                                    <div className="flex items-center bg-gray-50 px-6 py-4 rounded-full border border-gray-100 focus-within:border-[#F97316] focus-within:bg-white transition-all duration-300">
                                        <MapPin className="text-gray-400 mr-3 shrink-0" size={18} />
                                        <input type="text" required placeholder="e.g. Remote / Pune" className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 font-semibold text-gray-800 placeholder:text-gray-300 text-sm"
                                            onChange={e => setFormData({ ...formData, location: e.target.value })} />
                                    </div>
                                </div>
                            </div>

                            {/* Row 2: Salary & Job Type */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Salary Range</label>
                                    <div className="flex items-center bg-gray-50 px-6 py-4 rounded-full border border-gray-100 focus-within:border-[#F97316] focus-within:bg-white transition-all duration-300">
                                        <IndianRupee className="text-gray-400 mr-3 shrink-0" size={16} />
                                        <input type="text" required placeholder="e.g. ₹8L - ₹15L" className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 font-semibold text-gray-800 placeholder:text-gray-300 text-sm"
                                            value={formData.salary} onChange={e => setFormData({ ...formData, salary: e.target.value })} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Job Type</label>
                                    <div className="flex items-center bg-gray-50 px-6 py-4 rounded-full border border-gray-100 focus-within:border-[#F97316] focus-within:bg-white transition-all duration-300 relative">
                                        <Zap className="text-gray-400 mr-3 shrink-0" size={18} />
                                        <select required className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 font-semibold text-gray-800 cursor-pointer text-sm"
                                            value={formData.job_type} onChange={e => setFormData({ ...formData, job_type: e.target.value })}>
                                            <option value="Full Time">Full Time</option>
                                            <option value="Part Time">Part Time</option>
                                            <option value="Internship">Internship</option>
                                            <option value="Contract">Contract</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Row 3: Skills with Auto-suggest tags */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Required Skills</label>
                                <div className="flex items-start bg-gray-50 px-6 py-4 rounded-3xl border border-gray-100 focus-within:border-[#F97316] focus-within:bg-white transition-all duration-300 gap-3">
                                    <PenTool className="text-gray-400 mt-4 shrink-0" size={18} />
                                    <SkillsInput 
                                        value={formData.required_skills} 
                                        onChange={skills => setFormData({ ...formData, required_skills: skills })}
                                        placeholder="Add required skills (e.g. React, Node.js)"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Job Description Details</label>
                                <textarea required rows="6" placeholder="Describe the role, candidate qualifications, and work environment details..." className="w-full bg-gray-50 px-8 py-5 rounded-[24px] border border-gray-100 focus:border-[#F97316] focus:bg-white focus:outline-none transition-all font-semibold text-gray-800 placeholder:text-gray-300 text-sm resize-none"
                                    onChange={e => setFormData({ ...formData, description: e.target.value })} />
                            </div>

                            <button type="submit" className="w-full py-4.5 mt-2 bg-[#F97316] text-white rounded-full font-bold text-base hover:bg-[#EA580C] shadow-md shadow-orange-500/10 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 group/btn">
                                <Send size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                Publish Vacancy
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}
