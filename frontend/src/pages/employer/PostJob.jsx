import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, Briefcase, MapPin, IndianRupee, PenTool, Send, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import DashboardLayout from '../../components/DashboardLayout'

export default function PostJob() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: '', description: '', location: '', salary: '', required_skills: '', job_type: 'Full Time'
    })
    const [success, setSuccess] = useState(false)
    const userName = localStorage.getItem('userName') || "Partner"

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const userId = localStorage.getItem('userId')
            const payload = { ...formData, required_skills: formData.required_skills.split(',').map(s => s.trim()) }
            await axios.post(`http://localhost:8000/api/employer/jobs?current_user_id=${userId}`, payload)
            setSuccess(true)
            setTimeout(() => navigate('/employer/dashboard'), 2000)
        } catch (err) {
            alert("Error posting job")
        }
    }

    return (
        <DashboardLayout role="employer" userName={userName}>
            <div className="max-w-4xl mx-auto flex flex-col gap-8">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Post <span className="text-[#00B074]">New Job</span></h2>
                    <p className="text-gray-500 font-bold mt-1">Hire the best talent by creating a detailed job post.</p>
                </motion.div>

                {success ? (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-20 rounded-[3.5rem] border border-gray-100 shadow-xl shadow-green-50 text-center flex flex-col items-center gap-6">
                        <div className="bg-emerald-50 p-6 rounded-full text-[#00B074] shadow-inner mb-2">
                            <CheckCircle size={64} />
                        </div>
                        <h2 className="text-3xl font-black text-gray-900">Job Posted Successfully!</h2>
                        <p className="text-gray-500 text-lg font-bold">Redirecting you to the dashboard...</p>
                    </motion.div>
                ) : (
                    <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-xl shadow-green-50 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-[#00B074]/5 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-8 relative z-10">
                            {/* Row 1: Title & Location */}
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Job Title</label>
                                    <div className="flex items-center bg-gray-50/50 px-8 py-5 rounded-full border border-gray-100 focus-within:border-[#00B074] focus-within:bg-white focus-within:shadow-lg focus-within:shadow-emerald-50 transition-all duration-300">
                                        <Briefcase className="text-gray-400 mr-4" size={20} />
                                        <input type="text" required placeholder="e.g. Frontend Developer" className="w-full bg-transparent border-0 focus:ring-0 font-bold text-gray-800 placeholder:text-gray-300"
                                            onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Location</label>
                                    <div className="flex items-center bg-gray-50/50 px-8 py-5 rounded-full border border-gray-100 focus-within:border-[#00B074] focus-within:bg-white focus-within:shadow-lg focus-within:shadow-emerald-50 transition-all duration-300">
                                        <MapPin className="text-gray-400 mr-4" size={20} />
                                        <input type="text" required placeholder="e.g. Remote / New York" className="w-full bg-transparent border-0 focus:ring-0 font-bold text-gray-800 placeholder:text-gray-300"
                                            onChange={e => setFormData({ ...formData, location: e.target.value })} />
                                    </div>
                                </div>
                            </div>

                            {/* Row 2: Salary & Job Type */}
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Salary Range</label>
                                    <div className="flex items-center bg-gray-50/50 px-8 py-5 rounded-full border border-gray-100 focus-within:border-[#00B074] focus-within:bg-white focus-within:shadow-lg focus-within:shadow-emerald-50 transition-all duration-300">
                                        <IndianRupee className="text-gray-400 mr-4" size={20} />
                                        <input type="text" required placeholder="e.g. ₹8L - ₹15L" className="w-full bg-transparent border-0 focus:ring-0 font-bold text-gray-800 placeholder:text-gray-300"
                                            value={formData.salary} onChange={e => setFormData({ ...formData, salary: e.target.value })} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Job Type</label>
                                    <div className="flex items-center bg-gray-50/50 px-8 py-5 rounded-full border border-gray-100 focus-within:border-[#00B074] focus-within:bg-white focus-within:shadow-lg focus-within:shadow-emerald-50 transition-all duration-300 relative">
                                        <Zap className="text-gray-400 mr-4" size={20} />
                                        <select required className="w-full bg-transparent border-0 focus:ring-0 font-bold text-gray-800 appearance-none cursor-pointer"
                                            value={formData.job_type} onChange={e => setFormData({ ...formData, job_type: e.target.value })}>
                                            <option value="Full Time">Full Time</option>
                                            <option value="Part Time">Part Time</option>
                                            <option value="Internship">Internship</option>
                                            <option value="Contract">Contract</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Row 3: Skills (Full Width) */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Skills (comma separated)</label>
                                <div className="flex items-center bg-gray-50/50 px-8 py-5 rounded-full border border-gray-100 focus-within:border-[#00B074] focus-within:bg-white focus-within:shadow-lg focus-within:shadow-emerald-50 transition-all duration-300">
                                    <PenTool className="text-gray-400 mr-4" size={20} />
                                    <input type="text" required placeholder="e.g. React, Node.js, TailWind" className="w-full bg-transparent border-0 focus:ring-0 font-bold text-gray-800 placeholder:text-gray-300"
                                        value={formData.required_skills} onChange={e => setFormData({ ...formData, required_skills: e.target.value })} />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Job Details</label>
                                <textarea required rows="5" placeholder="Describe the role and your company..." className="w-full bg-gray-50/50 px-10 py-8 rounded-[3rem] border border-gray-100 focus:ring-2 focus:ring-[#00B074] focus:bg-white focus:shadow-lg focus:shadow-emerald-50 transition-all font-bold text-gray-800 placeholder:text-gray-300 outline-none"
                                    onChange={e => setFormData({ ...formData, description: e.target.value })} />
                            </div>

                            <button type="submit" className="w-full py-6 mt-4 bg-[#00B074] text-white rounded-full font-black text-xl hover:bg-[#009663] transition-all shadow-2xl shadow-emerald-200 flex items-center justify-center gap-4 active:scale-95 group/btn">
                                <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                Post it Now
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}
