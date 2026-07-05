import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Briefcase, Users, Plus, Building, ArrowRight, UserCheck, TrendingUp,
    Eye, Clock, MapPin, Target, Mail, ChevronRight, FileText, Zap,
    IndianRupee, Activity, CheckCircle
} from 'lucide-react'
import api from '../../config/api'
import { motion } from 'framer-motion'
import DashboardLayout from '../../components/DashboardLayout'

const toTitleCase = (str) => {
    if (!str) return ''
    return str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
}

const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A'
    try {
        const d = new Date(dateStr)
        return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    } catch { return 'N/A' }
}

const timeAgo = (dateStr) => {
    if (!dateStr) return ''
    try {
        const diff = Date.now() - new Date(dateStr).getTime()
        const days = Math.floor(diff / 86400000)
        if (days === 0) return 'Today'
        if (days === 1) return 'Yesterday'
        if (days < 7) return `${days}d ago`
        if (days < 30) return `${Math.floor(days / 7)}w ago`
        return `${Math.floor(days / 30)}mo ago`
    } catch { return '' }
}

export default function EmployerDashboard() {
    const [stats, setStats] = useState({
        jobs_posted: 0,
        applicants_count: 0,
        shortlisted_count: 0,
        recent_jobs: [],
        recent_applicants: []
    })
    const [loading, setLoading] = useState(true)
    const userName = localStorage.getItem('userName') || "Partner"

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const userId = localStorage.getItem('userId')
                const res = await api.get(`/api/employer/dashboard/${userId}`)
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
            <div className="flex flex-col gap-8">

                {/* Welcome Banner */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative p-10 bg-[#111827] rounded-[32px] text-white overflow-hidden shadow-xl text-left"
                >
                    <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-[240px] h-[240px] border border-orange-500/10 rounded-full pointer-events-none animate-spin-slow"></div>
                    <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-[300px] h-[300px] border border-dashed border-gray-800 rounded-full pointer-events-none"></div>
                    <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-[360px] h-[360px] border border-gray-800/30 rounded-full pointer-events-none border-dashed"></div>
                    <div className="absolute top-10 right-1/4 w-40 h-40 bg-[#F97316]/5 rounded-full blur-2xl pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div>
                            <span className="flex items-center gap-2 text-[#F97316] font-bold text-xs uppercase tracking-widest mb-4">
                                <Building size={14} /> Recruiter Panel
                            </span>
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 font-display text-white">
                                Welcome, <span className="text-[#F97316]">{toTitleCase(userName)}</span>!
                            </h1>
                            <p className="text-gray-400 text-sm font-semibold">Post openings, review applicants, and build your dream team.</p>
                        </div>
                        <Link
                            to="/employer/post-job"
                            className="bg-[#F97316] text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-[#EA580C] hover:shadow-lg transition-all flex items-center gap-2 shadow-md shadow-orange-500/10 shrink-0"
                        >
                            <Plus size={18} /> Post New Job
                        </Link>
                    </div>
                </motion.div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Jobs Posted */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gradient-to-br from-[#F97316] to-[#EA580C] p-8 rounded-[28px] shadow-lg shadow-orange-500/10 flex flex-col gap-5 relative overflow-hidden group"
                    >
                        <div className="absolute -top-5 -right-5 w-24 h-24 bg-white/10 rounded-full"></div>
                        <div className="absolute bottom-3 right-3 w-14 h-14 bg-white/5 rounded-full"></div>
                        <div className="bg-white/20 p-4 rounded-2xl w-fit">
                            <Briefcase className="text-white" size={22} />
                        </div>
                        <div>
                            <h3 className="text-white/80 font-black uppercase tracking-widest text-[9px] mb-1">Jobs Posted</h3>
                            <p className="text-5xl font-black text-white tracking-tight">
                                {loading ? <span className="text-2xl animate-pulse">...</span> : stats.jobs_posted}
                            </p>
                            <p className="text-white/60 text-xs font-semibold mt-2">Active vacancy listings</p>
                        </div>
                        <Link to="/employer/my-jobs" className="flex items-center gap-1.5 text-white/90 hover:text-white text-xs font-bold mt-auto">
                            <Eye size={13} /> View All <ArrowRight size={11} />
                        </Link>
                    </motion.div>

                    {/* Total Applicants */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.05 }}
                        className="bg-white p-8 rounded-[28px] border border-gray-100 shadow-sm flex flex-col gap-5 group hover:shadow-md hover:border-orange-100 transition-all"
                    >
                        <div className="bg-orange-50/50 p-4 rounded-2xl w-fit text-[#F97316] shadow-sm">
                            <Users size={22} />
                        </div>
                        <div>
                            <h3 className="text-gray-400 font-black uppercase tracking-widest text-[9px] mb-1">Total Applicants</h3>
                            <p className="text-5xl font-black text-gray-900 tracking-tight">
                                {loading ? <span className="text-2xl text-gray-300 animate-pulse">...</span> : stats.applicants_count}
                            </p>
                            <p className="text-gray-400 text-xs font-semibold mt-2">Submitted profiles</p>
                        </div>
                        <Link to="/employer/applicants" className="flex items-center gap-1.5 text-[#F97316] hover:text-[#EA580C] text-xs font-bold mt-auto">
                            Review All <ArrowRight size={11} />
                        </Link>
                    </motion.div>

                    {/* Shortlisted */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-8 rounded-[28px] border border-gray-100 shadow-sm flex flex-col gap-5 group hover:shadow-md hover:border-orange-100 transition-all"
                    >
                        <div className="bg-emerald-50 p-4 rounded-2xl w-fit text-emerald-600 shadow-sm">
                            <UserCheck size={22} />
                        </div>
                        <div>
                            <h3 className="text-gray-400 font-black uppercase tracking-widest text-[9px] mb-1">Shortlisted</h3>
                            <p className="text-5xl font-black text-gray-900 tracking-tight">
                                {loading ? <span className="text-2xl text-gray-300 animate-pulse">...</span> : stats.shortlisted_count}
                            </p>
                            <p className="text-gray-400 text-xs font-semibold mt-2">Approved talent profiles</p>
                        </div>
                        {stats.applicants_count > 0 && (
                            <p className="text-xs font-bold text-emerald-600 mt-auto">
                                {Math.round((stats.shortlisted_count / stats.applicants_count) * 100)}% conversion rate
                            </p>
                        )}
                    </motion.div>
                </div>

                {/* Bottom Section: Recent Jobs + Recent Applicants */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Recent Jobs */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="bg-white rounded-[28px] border border-gray-100 shadow-sm overflow-hidden"
                    >
                        <div className="flex items-center justify-between px-8 pt-8 pb-4">
                            <div>
                                <h2 className="text-base font-bold text-gray-900 tracking-tight">Recent Job Posts</h2>
                                <p className="text-[11px] text-gray-400 font-semibold mt-0.5">Your latest vacancy listings</p>
                            </div>
                            <Link
                                to="/employer/my-jobs"
                                className="flex items-center gap-1 text-[#F97316] text-xs font-bold hover:text-[#EA580C] transition-colors"
                            >
                                View All <ChevronRight size={14} />
                            </Link>
                        </div>

                        <div className="px-6 pb-6 flex flex-col gap-3">
                            {loading ? (
                                [...Array(3)].map((_, i) => (
                                    <div key={i} className="bg-gray-50 rounded-2xl p-4 animate-pulse h-16"></div>
                                ))
                            ) : stats.recent_jobs && stats.recent_jobs.length > 0 ? (
                                stats.recent_jobs.map((job, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-4 bg-gray-50/50 hover:bg-orange-50/30 border border-gray-100/50 hover:border-orange-100/50 rounded-2xl px-5 py-4 transition-all group"
                                    >
                                        <div className="bg-orange-50 p-3 rounded-xl text-[#F97316] shrink-0">
                                            <Briefcase size={16} />
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <p className="text-sm font-bold text-gray-900 group-hover:text-[#F97316] transition-colors truncate">
                                                {toTitleCase(job.title)}
                                            </p>
                                            <div className="flex items-center gap-3 mt-1">
                                                {job.location && (
                                                    <span className="flex items-center gap-1 text-[10px] text-gray-400 font-semibold">
                                                        <MapPin size={10} /> {toTitleCase(job.location)}
                                                    </span>
                                                )}
                                                {job.job_type && (
                                                    <span className="text-[10px] font-black text-[#F97316] bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-100/30">
                                                        {job.job_type}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] text-gray-400 font-semibold shrink-0">
                                            <Clock size={10} />
                                            {timeAgo(job.created_at)}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center gap-3 py-10 text-center">
                                    <div className="bg-gray-100 p-4 rounded-2xl text-gray-300">
                                        <Briefcase size={28} />
                                    </div>
                                    <p className="text-sm font-semibold text-gray-400">No jobs posted yet</p>
                                    <Link
                                        to="/employer/post-job"
                                        className="text-xs font-bold text-[#F97316] hover:text-[#EA580C] flex items-center gap-1"
                                    >
                                        <Plus size={12} /> Post First Job
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Recent Applicants */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-[28px] border border-gray-100 shadow-sm overflow-hidden"
                    >
                        <div className="flex items-center justify-between px-8 pt-8 pb-4">
                            <div>
                                <h2 className="text-base font-bold text-gray-900 tracking-tight">Recent Applicants</h2>
                                <p className="text-[11px] text-gray-400 font-semibold mt-0.5">Latest candidates who applied</p>
                            </div>
                            <Link
                                to="/employer/applicants"
                                className="flex items-center gap-1 text-[#F97316] text-xs font-bold hover:text-[#EA580C] transition-colors"
                            >
                                Review All <ChevronRight size={14} />
                            </Link>
                        </div>

                        <div className="px-6 pb-6 flex flex-col gap-3">
                            {loading ? (
                                [...Array(4)].map((_, i) => (
                                    <div key={i} className="bg-gray-50 rounded-2xl p-4 animate-pulse h-14"></div>
                                ))
                            ) : stats.recent_applicants && stats.recent_applicants.length > 0 ? (
                                stats.recent_applicants.map((app, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 bg-gray-50/50 hover:bg-orange-50/30 border border-gray-100/50 hover:border-orange-100/50 rounded-2xl px-5 py-3.5 transition-all group"
                                    >
                                        {/* Avatar */}
                                        <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center text-[#F97316] font-black text-sm shrink-0">
                                            {app.user?.name ? app.user.name.charAt(0).toUpperCase() : '?'}
                                        </div>

                                        <div className="flex-grow min-w-0">
                                            <p className="text-sm font-bold text-gray-900 truncate group-hover:text-[#F97316] transition-colors">
                                                {toTitleCase(app.user?.name || 'Anonymous')}
                                            </p>
                                            <p className="text-[10px] text-gray-400 font-semibold truncate">
                                                Applied for: <span className="text-gray-600">{toTitleCase(app.job_title)}</span>
                                            </p>
                                        </div>

                                        <div className="flex flex-col items-end gap-1 shrink-0">
                                            {app.match_score != null && (
                                                <span className="flex items-center gap-1 bg-orange-50/70 text-[#F97316] text-[9px] font-black px-2.5 py-1 rounded-full border border-orange-100/30">
                                                    <Target size={8} /> {app.match_score}%
                                                </span>
                                            )}
                                            <span className={`text-[9px] font-black px-2.5 py-0.5 rounded-full border ${
                                                app.status === 'Shortlisted'
                                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                                    : 'bg-yellow-50 text-yellow-600 border-yellow-100'
                                            }`}>
                                                {app.status || 'Pending'}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center gap-3 py-10 text-center">
                                    <div className="bg-gray-100 p-4 rounded-2xl text-gray-300">
                                        <Users size={28} />
                                    </div>
                                    <p className="text-sm font-semibold text-gray-400">No applicants yet</p>
                                    <p className="text-xs text-gray-300 font-semibold max-w-[180px]">
                                        Candidates will appear here once they apply to your jobs.
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Quick Actions Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm grid md:grid-cols-3 gap-6"
                >
                    <div className="md:col-span-1 flex flex-col justify-center">
                        <h2 className="text-xl font-bold text-gray-900 tracking-tight leading-snug">Manage Your Hiring Pipeline</h2>
                        <p className="text-gray-400 mt-2 text-xs font-semibold leading-relaxed">
                            Post new jobs, screen applicants, and shortlist top talent all from one place.
                        </p>
                    </div>

                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Link
                            to="/employer/post-job"
                            className="flex flex-col items-center gap-3 bg-[#F97316] text-white p-6 rounded-2xl hover:bg-[#EA580C] transition-all shadow-md shadow-orange-500/10 group text-center"
                        >
                            <div className="bg-white/20 p-3 rounded-xl">
                                <Plus size={20} />
                            </div>
                            <span className="text-sm font-bold">Post New Job</span>
                        </Link>
                        <Link
                            to="/employer/my-jobs"
                            className="flex flex-col items-center gap-3 bg-gray-50 hover:bg-orange-50/50 text-gray-700 hover:text-[#F97316] p-6 rounded-2xl transition-all group text-center border border-gray-100 hover:border-orange-100/50"
                        >
                            <div className="bg-white p-3 rounded-xl shadow-sm text-gray-400 group-hover:text-[#F97316] transition-colors">
                                <Briefcase size={20} />
                            </div>
                            <span className="text-sm font-bold">View My Jobs</span>
                        </Link>
                        <Link
                            to="/employer/applicants"
                            className="flex flex-col items-center gap-3 bg-gray-50 hover:bg-orange-50/50 text-gray-700 hover:text-[#F97316] p-6 rounded-2xl transition-all group text-center border border-gray-100 hover:border-orange-100/50"
                        >
                            <div className="bg-white p-3 rounded-xl shadow-sm text-gray-400 group-hover:text-[#F97316] transition-colors">
                                <Users size={20} />
                            </div>
                            <span className="text-sm font-bold">Review Applicants</span>
                        </Link>
                    </div>
                </motion.div>

            </div>
        </DashboardLayout>
    )
}
