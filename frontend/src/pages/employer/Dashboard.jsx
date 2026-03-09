import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, Users, Star, Plus, Zap, Building, ArrowRight, UserCheck } from 'lucide-react'
import axios from 'axios'
import { motion } from 'framer-motion'
import DashboardLayout from '../../components/DashboardLayout'

export default function EmployerDashboard() {
    const [stats, setStats] = useState({ jobs_posted: 0, applicants_count: 0, shortlisted_count: 0 })
    const userName = localStorage.getItem('userName') || "Partner"

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const userId = localStorage.getItem('userId')
                const res = await axios.get(`http://localhost:8000/api/employer/dashboard/${userId}`)
                setStats(res.data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchStats()
    }, [])

    return (
        <DashboardLayout role="employer" userName={userName}>
            <div className="flex flex-col gap-10">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative p-10 bg-[#2B3940] rounded-[3rem] text-white overflow-hidden shadow-2xl"
                >
                    <Building className="absolute -top-10 -right-10 w-40 h-40 text-white opacity-5 rotate-12" />
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div>
                            <span className="flex items-center gap-2 text-[#00B074] font-black text-sm uppercase tracking-widest mb-4">
                                <Building size={16} /> Company Control
                            </span>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                                Welcome, <span className="text-[#00B074]">{userName}</span>!
                            </h1>
                            <p className="text-gray-400 text-lg font-bold">Manage your job posts and candidate applications.</p>
                        </div>
                        <Link to="/employer/post-job" className="bg-[#00B074] text-white px-10 py-5 rounded-3xl font-black text-lg hover:bg-[#009663] transition-all flex items-center gap-3 shadow-xl shadow-emerald-900/40">
                            <Plus size={24} />
                            Post New Job
                        </Link>
                    </div>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "Jobs Posted", value: stats.jobs_posted, icon: <Briefcase />, color: "emerald", label: "Active Listings" },
                        { title: "Applicants", value: stats.applicants_count, icon: <Users />, color: "blue", label: "People Interested" },
                        { title: "Shortlisted", value: stats.shortlisted_count, icon: <UserCheck />, color: "orange", label: "Matches Found" }
                    ].map((card, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col gap-6 group hover:shadow-xl hover:border-[#00B074]/30 transition-all"
                        >
                            <div className="bg-gray-50 p-6 rounded-3xl w-fit group-hover:bg-[#00B074]/10 transition-colors shadow-sm text-[#00B074]/40 group-hover:text-[#00B074]">
                                {card.icon}
                            </div>
                            <div>
                                <h3 className="text-gray-400 font-black uppercase tracking-widest text-[10px] mb-1">{card.label}</h3>
                                <p className="text-5xl font-black text-gray-900 tracking-tighter">{card.value}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Action Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-xl shadow-green-50 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-10 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-40 h-40 bg-[#00B074]/5 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform"></div>
                    <div className="max-w-md relative z-10">
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-tight">Pick the best talent for your company.</h2>
                        <p className="text-gray-500 mt-4 text-lg font-bold">Review the profiles of people who applied and shortlist the best fit for your team.</p>
                    </div>
                    <Link to="/employer/applicants" className="relative z-10 w-full md:w-auto px-12 py-6 bg-[#2B3940] text-white font-black rounded-3xl hover:bg-[#1a2327] transition-all text-xl shadow-2xl flex items-center justify-center gap-3 active:scale-95">
                        Manage Applicants <ArrowRight size={24} />
                    </Link>
                </motion.div>
            </div>
        </DashboardLayout>
    )
}
