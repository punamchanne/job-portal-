import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Briefcase, Plus, Search, MapPin, Clock,
    Users, ChevronRight, Frown, Filter, TrendingUp, IndianRupee
} from 'lucide-react'
import api from '../../config/api'
import { motion, AnimatePresence } from 'framer-motion'
import DashboardLayout from '../../components/DashboardLayout'

export default function MyJobs() {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const userName = localStorage.getItem('userName') || 'Partner'

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const userId = localStorage.getItem('userId')
                const res = await api.get(`/api/employer/jobs/${userId}`)
                setJobs(res.data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchJobs()
    }, [])

    const filtered = jobs.filter(job =>
        job.title?.toLowerCase().includes(search.toLowerCase()) ||
        job.location?.toLowerCase().includes(search.toLowerCase()) ||
        job.job_type?.toLowerCase().includes(search.toLowerCase())
    )

    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A'
        const d = new Date(dateStr)
        return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    }

    return (
        <DashboardLayout role="employer" userName={userName}>
            <div className="flex flex-col gap-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative p-10 bg-[#111827] rounded-[32px] text-white overflow-hidden shadow-xl text-left"
                >
                    {/* Concentric rotating circles in greeting banner */}
                    <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-[240px] h-[240px] border border-orange-500/10 rounded-full pointer-events-none animate-spin-slow -z-5"></div>
                    <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-[300px] h-[300px] border border-dashed border-gray-800 rounded-full pointer-events-none -z-5"></div>
                    <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-[360px] h-[360px] border border-gray-800/30 rounded-full pointer-events-none border-dashed -z-5"></div>
                    <div className="absolute top-10 right-1/4 w-40 h-40 bg-[#F97316]/5 rounded-full blur-2xl pointer-events-none -z-5"></div>

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div>
                            <span className="flex items-center gap-2 text-[#F97316] font-bold text-xs uppercase tracking-widest mb-4">
                                <TrendingUp size={14} /> ACTIVE LISTINGS
                            </span>
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 text-white font-display">
                                Total Jobs Posted
                            </h1>
                            {/* Big count badge */}
                            <div className="flex items-center gap-4">
                                <span className="text-7xl font-black text-[#F97316] tracking-tight">
                                    {loading ? (
                                        <span className="text-4xl animate-pulse text-[#F97316]/50">...</span>
                                    ) : jobs.length}
                                </span>
                                <span className="text-gray-400 text-sm font-semibold leading-tight">
                                    Published<br />Positions
                                </span>
                            </div>
                        </div>
                        <Link
                            to="/employer/post-job"
                            className="bg-[#F97316] text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-[#EA580C] hover:shadow-lg transition-all flex items-center gap-2 shadow-md shadow-orange-500/10 active:scale-98 shrink-0"
                        >
                            <Plus size={18} />
                            Post New Job
                        </Link>
                    </div>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl px-6 py-4.5 shadow-sm"
                >
                    <Search size={18} className="text-gray-400 shrink-0" />
                    <input
                        type="text"
                        placeholder="Search jobs by role name, location, or code..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="flex-grow outline-none text-gray-700 font-semibold text-sm placeholder-gray-300 border-0 focus:ring-0 focus:outline-none"
                    />
                    {search && (
                        <button
                            onClick={() => setSearch('')}
                            className="text-gray-400 hover:text-gray-600 text-xs font-bold cursor-pointer"
                        >
                            Clear
                        </button>
                    )}
                    <div className="flex items-center gap-2 text-gray-400 border-l border-gray-100 pl-4 shrink-0">
                        <Filter size={14} />
                        <span className="text-xs font-bold">{filtered.length} matching</span>
                    </div>
                </motion.div>

                {/* Jobs List */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white rounded-[24px] p-8 border border-gray-100 animate-pulse">
                                <div className="h-5 bg-gray-100 rounded-full w-2/3 mb-4"></div>
                                <div className="h-4 bg-gray-100 rounded-full w-1/2 mb-3"></div>
                                <div className="h-4 bg-gray-100 rounded-full w-1/3"></div>
                            </div>
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-24 gap-6 text-center"
                    >
                        <div className="bg-gray-100 p-8 rounded-full">
                            <Frown size={40} className="text-gray-300" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                            {search ? 'No jobs match your search' : 'No Jobs Posted Yet'}
                        </h2>
                        <p className="text-gray-400 font-semibold text-xs max-w-xs">
                            {search
                                ? 'Try a different keyword or clear the search.'
                                : 'Click "Post New Job" to add your first listing and start receiving applications.'}
                        </p>
                        {!search && (
                            <Link
                                to="/employer/post-job"
                                className="bg-[#F97316] text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-[#EA580C] shadow-md shadow-orange-500/10 flex items-center gap-2"
                            >
                                <Plus size={16} /> Post First Job
                            </Link>
                        )}
                    </motion.div>
                ) : (
                    <AnimatePresence>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filtered.map((job, idx) => (
                                <motion.div
                                    key={job.job_id || idx}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm hover:shadow-xl hover:border-orange-200/50 transition-all group flex flex-col justify-between text-left"
                                >
                                    <div>
                                        {/* Job Header */}
                                        <div className="flex items-start justify-between gap-4 mb-6">
                                            <div className="bg-orange-50 p-4 rounded-xl text-[#F97316]">
                                                <Briefcase size={22} />
                                            </div>
                                            <span className="bg-orange-50/50 text-[#F97316] text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest border border-orange-100/20">
                                                {job.job_type || 'Full Time'}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h2 className="text-lg font-bold text-gray-900 mb-2 tracking-tight group-hover:text-[#F97316] transition-colors duration-300">
                                            {job.title ? job.title.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ') : 'Untitled Job'}
                                        </h2>
                                        <p className="text-gray-405 font-semibold text-xs mb-5 line-clamp-2 leading-relaxed">
                                            {job.description ? job.description.charAt(0).toUpperCase() + job.description.slice(1) : 'No description provided.'}
                                        </p>

                                        {/* Meta Info */}
                                        <div className="flex flex-wrap gap-x-5 gap-y-1.5 mb-6 text-xs font-semibold text-gray-500">
                                            {job.location && (
                                                <span className="flex items-center gap-1.5">
                                                    <MapPin size={12} className="text-gray-400" />
                                                    {job.location.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')}
                                                </span>
                                            )}
                                            {job.created_at && (
                                                <span className="flex items-center gap-1.5">
                                                    <Clock size={12} className="text-gray-400" />
                                                    {formatDate(job.created_at)}
                                                </span>
                                            )}
                                            {job.salary && (
                                                <span className="flex items-center gap-1.5">
                                                    <IndianRupee size={12} className="text-gray-400" />
                                                    {job.salary}
                                                </span>
                                            )}
                                        </div>

                                        {/* Skills */}
                                        {job.skills_required && job.skills_required.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mb-6">
                                                {job.skills_required.slice(0, 4).map((skill, i) => (
                                                    <span
                                                        key={i}
                                                        className="bg-orange-50/50 border border-orange-100/20 text-[#F97316] text-[10px] font-bold px-3.5 py-1.5 rounded-xl uppercase tracking-wider"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                                {job.skills_required.length > 4 && (
                                                    <span className="bg-orange-50/50 border border-orange-100/20 text-orange-400 text-[10px] font-bold px-3.5 py-1.5 rounded-xl">
                                                        +{job.skills_required.length - 4} more
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
                                        <span className="flex items-center gap-1.5 text-gray-400 text-xs font-semibold">
                                            <Users size={14} /> View Screenings
                                        </span>
                                        <Link
                                            to="/employer/applicants"
                                            className="flex items-center gap-1 bg-[#F97316] text-white text-xs font-bold px-5 py-3 rounded-2xl hover:bg-[#EA580C] hover:shadow-lg hover:shadow-orange-500/10 transition-all cursor-pointer border-0"
                                        >
                                            Review <ChevronRight size={14} />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </AnimatePresence>
                )}
            </div>
        </DashboardLayout>
    )
}
