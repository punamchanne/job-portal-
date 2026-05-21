import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, Users, Plus, Building, ArrowRight, UserCheck, TrendingUp, Eye } from 'lucide-react'
import axios from 'axios'
import { motion } from 'framer-motion'
import DashboardLayout from '../../components/DashboardLayout'

export default function EmployerDashboard() {
    const [stats, setStats] = useState({ jobs_posted: 0, applicants_count: 0, shortlisted_count: 0 })
    const [loading, setLoading] = useState(true)
    const userName = localStorage.getItem('userName') || "Partner"

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const userId = localStorage.getItem('userId')
                const res = await axios.get(`http://localhost:8000/api/employer/dashboard/${userId}`)
                setStats(res.data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
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
                    {/* Total Jobs Posted Card - Special highlighted card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0 }}
                        className="bg-gradient-to-br from-[#00B074] to-[#009663] p-10 rounded-[2.5rem] shadow-xl shadow-emerald-200 flex flex-col gap-6 group relative overflow-hidden"
                    >
                        <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/10 rounded-full"></div>
                        <div className="absolute bottom-4 right-4 w-16 h-16 bg-white/5 rounded-full"></div>
                        <div className="bg-white/20 p-6 rounded-3xl w-fit">
                            <Briefcase className="text-white" />
                        </div>
                        <div>
                            <h3 className="text-white/70 font-black uppercase tracking-widest text-[10px] mb-1">Total Jobs Posted</h3>
                            <p className="text-6xl font-black text-white tracking-tighter">
                                {loading ? <span className="text-3xl animate-pulse">...</span> : stats.jobs_posted}
                            </p>
                            <p className="text-white/60 text-sm font-bold mt-2">Active Job Listings</p>
                        </div>
                        <Link
                            to="/employer/applicants"
                            className="flex items-center gap-2 text-white/80 hover:text-white text-sm font-black transition-colors mt-auto"
                        >
                            <Eye size={16} /> View All Jobs <ArrowRight size={14} />
                        </Link>
                    </motion.div>

                    {/* Applicants Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col gap-6 group hover:shadow-xl hover:border-blue-200 transition-all"
                    >
                        <div className="bg-blue-50 p-6 rounded-3xl w-fit group-hover:bg-blue-100 transition-colors shadow-sm">
                            <Users className="text-blue-500" />
                        </div>
                        <div>
                            <h3 className="text-gray-400 font-black uppercase tracking-widest text-[10px] mb-1">Total Applicants</h3>
                            <p className="text-5xl font-black text-gray-900 tracking-tighter">
                                {loading ? <span className="text-3xl text-gray-300 animate-pulse">...</span> : stats.applicants_count}
                            </p>
                            <p className="text-gray-400 text-sm font-bold mt-2">People Interested</p>
                        </div>
                    </motion.div>

                    {/* Shortlisted Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col gap-6 group hover:shadow-xl hover:border-orange-200 transition-all"
                    >
                        <div className="bg-orange-50 p-6 rounded-3xl w-fit group-hover:bg-orange-100 transition-colors shadow-sm">
                            <UserCheck className="text-orange-500" />
                        </div>
                        <div>
                            <h3 className="text-gray-400 font-black uppercase tracking-widest text-[10px] mb-1">Shortlisted</h3>
                            <p className="text-5xl font-black text-gray-900 tracking-tighter">
                                {loading ? <span className="text-3xl text-gray-300 animate-pulse">...</span> : stats.shortlisted_count}
                            </p>
                            <p className="text-gray-400 text-sm font-bold mt-2">Best Matches Found</p>
                        </div>
                    </motion.div>
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
