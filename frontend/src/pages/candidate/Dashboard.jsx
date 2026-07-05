import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText, Target, Activity, Send, Sparkles, Layout, ArrowRight, UserCheck, Zap, Bell, CheckCircle, X, Play } from 'lucide-react'
import api from '../../config/api'
import { motion, AnimatePresence } from 'framer-motion'
import DashboardLayout from '../../components/DashboardLayout'

export default function CandidateDashboard() {
    const [appsCount, setAppsCount] = useState(0)
    const [applications, setApplications] = useState([])
    const [showProfileModal, setShowProfileModal] = useState(false)
    const userName = localStorage.getItem('userName') || "User"
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch Apps
                const appsRes = await api.get(`/api/candidate/applications/${userId}`)
                setAppsCount(appsRes.data.length)
                setApplications(appsRes.data.reverse().slice(0, 5))

                // Check Profile
                const profileRes = await api.get(`/api/candidate/profile/${userId}`)
                if (!profileRes.data.resume_path || !profileRes.data.skills || profileRes.data.skills.length === 0) {
                    setShowProfileModal(true)
                }
            } catch (err) {
                console.error(err)
            }
        }
        fetchDashboardData()
    }, [userId])

    return (
        <DashboardLayout role="candidate" userName={userName}>
            {/* Complete Profile Modal */}
            <AnimatePresence>
                {showProfileModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#111827]/80 backdrop-blur-sm">
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-white rounded-[32px] p-10 max-w-lg w-full relative shadow-2xl border border-gray-100 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full translate-x-1/2 -translate-y-1/2"></div>

                            <button onClick={() => setShowProfileModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition-colors z-10 cursor-pointer">
                                <X size={18} />
                            </button>

                            <div className="flex flex-col items-center text-center gap-6 relative z-10">
                                <div className="bg-orange-50/80 p-6 rounded-full text-[#F97316]">
                                    <FileText size={40} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">Complete Your Profile</h3>
                                    <p className="text-gray-500 font-semibold text-sm mt-3 leading-relaxed">You haven't uploaded your resume yet. To get personalized AI job matching and starts applying, please upload your resume file.</p>
                                </div>
                                <div className="flex flex-col w-full gap-3 mt-4">
                                    <Link to="/candidate/resume-upload" className="w-full bg-[#F97316] text-white py-4 rounded-full font-bold shadow-lg shadow-orange-500/10 hover:bg-[#EA580C] transition-all text-center">
                                        Upload Resume Now
                                    </Link>
                                    <button onClick={() => setShowProfileModal(false)} className="w-full text-gray-400 font-bold py-3.5 hover:bg-gray-50 rounded-full transition-all cursor-pointer">
                                        Skip for now
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-col gap-10 text-left">
                {/* Hero Greeting Section (With Concentric Circle visual wireframes) */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative p-10 bg-[#111827] rounded-[32px] text-white overflow-hidden shadow-xl"
                >
                    {/* Concentric rotating circles in greeting banner */}
                    <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-[240px] h-[240px] border border-orange-500/10 rounded-full pointer-events-none animate-spin-slow -z-5"></div>
                    <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-[300px] h-[300px] border border-dashed border-gray-800 rounded-full pointer-events-none -z-5"></div>
                    <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-[360px] h-[360px] border border-gray-800/30 rounded-full pointer-events-none border-dashed -z-5"></div>
                    <div className="absolute top-10 right-1/4 w-40 h-40 bg-[#F97316]/5 rounded-full blur-2xl pointer-events-none -z-5"></div>

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div>
                            <span className="flex items-center gap-2 text-[#F97316] font-bold text-xs uppercase tracking-widest mb-4">
                                <UserCheck className="w-4 h-4" />
                                Candidate Dashboard
                            </span>
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 font-display text-white">
                                Welcome, <span className="text-[#F97316]">{userName ? userName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ') : 'User'}</span>!
                            </h1>
                            <p className="text-gray-455 text-sm font-semibold">Track your applications, AI matches, and skill evaluations.</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-8 rounded-[24px] flex flex-col items-center justify-center text-center shadow-lg hover:bg-white/10 transition-colors shrink-0">
                            <h3 className="text-5xl font-black text-[#F97316] mb-1 tracking-tight">{appsCount}</h3>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Applications</p>
                        </div>
                    </div>
                </motion.div>

                {/* Quick Actions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { title: "Resume", desc: "Update your profile details.", path: "/candidate/resume-upload", icon: <FileText /> },
                        { title: "Recommendations", desc: "Matches for your skills.", path: "/candidate/recommendations", icon: <Target /> },
                        { title: "Skill Gap", desc: "See what you need to learn.", path: "/candidate/skill-gap", icon: <Activity /> },
                        { title: "All Jobs", desc: "Browse all active job posts.", path: "/jobs", icon: <Zap /> }
                    ].map((card, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -6 }}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <Link to={card.path} className="bg-white p-8 rounded-[28px] flex flex-col items-center justify-center text-center h-full hover:shadow-md hover:border-orange-200/50 transition-all border border-gray-100 group relative overflow-hidden shadow-sm">
                                <div className="bg-orange-50 p-6 rounded-[22px] mb-6 group-hover:bg-[#F97316] transition-all transform group-hover:scale-105 shadow-sm text-[#F97316] group-hover:text-white">
                                    {card.icon}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1 tracking-tight">{card.title}</h3>
                                <p className="text-gray-400 font-semibold text-xs leading-relaxed">{card.desc}</p>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Activity Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2 bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm overflow-hidden relative"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2.5">
                                    <Bell className="w-5 h-5 text-[#F97316]" />
                                    Recent Applications
                                </h2>
                                <p className="text-[10px] font-black text-gray-400 mt-1 uppercase tracking-widest">Progress status on your submissions</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {applications.length > 0 ? applications.map((item, i) => (
                                <Link 
                                    key={i} 
                                    to={`/jobs/${item.job_id}`}
                                    className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl group border border-transparent hover:border-orange-200/50 hover:bg-white transition-all shadow-sm cursor-pointer"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="bg-white p-3 rounded-xl text-[#F97316] shadow-sm group-hover:bg-[#F97316] group-hover:text-white transition-colors duration-300">
                                            <CheckCircle size={18} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 group-hover:text-[#F97316] transition-colors duration-300 text-sm">{item.job_title}</h4>
                                            <p className="text-[10px] font-bold text-gray-400 mt-0.5">{item.company_name} &bull; Fit Rating: {item.match_score}%</p>
                                        </div>
                                    </div>
                                    <span className="bg-orange-50 text-[#F97316] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-orange-100">{item.status}</span>
                                </Link>
                            )) : (
                                <p className="text-sm font-semibold text-gray-400 text-center py-6">No applications submitted yet.</p>
                            )}
                        </div>
                    </motion.div>

                    {/* AI Coach Sidebar (Mock) */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gradient-to-tr from-[#F97316] to-[#EA580C] p-10 rounded-[32px] text-white overflow-hidden relative shadow-xl shadow-orange-500/10 text-left flex flex-col justify-between"
                    >
                        <Zap className="absolute -top-10 -right-10 w-40 h-40 text-black opacity-10 rotate-12" />
                        <div>
                            <h3 className="text-xl font-bold mb-5 relative z-10 flex items-center gap-2">
                                AI Career Guide
                            </h3>
                            <p className="text-white/85 font-semibold text-sm mb-8 relative z-10 leading-relaxed">
                                "Integrating cloud infrastructure and Docker containers could boost matching score by 25% for open senior positions."
                            </p>
                            <Link to="/candidate/skill-gap" className="flex items-center justify-center p-4.5 bg-white text-[#F97316] rounded-full hover:bg-orange-50 transition-all font-bold text-sm gap-2 relative z-10 shadow-lg cursor-pointer">
                                Improve Fit Score <ArrowRight size={16} />
                            </Link>
                        </div>

                        <div className="mt-12 bg-white/10 p-6 rounded-2xl border border-white/20 relative z-10">
                            <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 text-white/80">Skill Leveling</h4>
                            <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden mb-3">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '70%' }}
                                    transition={{ duration: 1, delay: 0.8 }}
                                    className="bg-white h-full"
                                ></motion.div>
                            </div>
                            <div className="flex justify-between text-[10px] font-semibold">
                                <span>3 of 5 skills matched</span>
                                <span>70%</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </DashboardLayout>
    )
}
