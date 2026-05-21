import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Briefcase, Plus, Search, MapPin, Clock,
    Users, ChevronRight, Frown, Filter, TrendingUp
} from 'lucide-react'
import axios from 'axios'
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
                const res = await axios.get(`http://localhost:8000/api/employer/jobs/${userId}`)
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
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative p-10 bg-[#2B3940] rounded-[3rem] text-white overflow-hidden shadow-2xl"
                >
                    <Briefcase className="absolute -top-10 -right-10 w-40 h-40 text-white opacity-5 rotate-12" />
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div>
                            <span className="flex items-center gap-2 text-[#00B074] font-black text-sm uppercase tracking-widest mb-4">
                                <TrendingUp size={16} /> My Job Listings
                            </span>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">
                                Total Jobs Posted
                            </h1>
                            {/* Big count badge */}
                            <div className="flex items-center gap-4">
                                <span className="text-7xl font-black text-[#00B074] tracking-tighter">
                                    {loading ? (
                                        <span className="text-4xl animate-pulse text-[#00B074]/50">...</span>
                                    ) : jobs.length}
                                </span>
                                <span className="text-gray-400 text-lg font-bold leading-tight">
                                    Active<br />Listings
                                </span>
                            </div>
                        </div>
                        <Link
                            to="/employer/post-job"
                            className="bg-[#00B074] text-white px-10 py-5 rounded-3xl font-black text-lg hover:bg-[#009663] transition-all flex items-center gap-3 shadow-xl shadow-emerald-900/40 active:scale-95"
                        >
                            <Plus size={24} />
                            Post New Job
                        </Link>
                    </div>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl px-6 py-4 shadow-sm"
                >
                    <Search size={20} className="text-gray-400 shrink-0" />
                    <input
                        type="text"
                        placeholder="Search by title, location or job type..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="flex-grow outline-none text-gray-700 font-semibold text-base placeholder-gray-300"
                    />
                    {search && (
                        <button
                            onClick={() => setSearch('')}
                            className="text-gray-400 hover:text-gray-600 text-sm font-bold"
                        >
                            Clear
                        </button>
                    )}
                    <div className="flex items-center gap-2 text-gray-400 border-l border-gray-100 pl-4">
                        <Filter size={16} />
                        <span className="text-sm font-bold">{filtered.length} results</span>
                    </div>
                </motion.div>

                {/* Jobs List */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white rounded-[2rem] p-8 border border-gray-100 animate-pulse">
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
                            <Frown size={48} className="text-gray-300" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900">
                            {search ? 'No jobs match your search' : 'No Jobs Posted Yet'}
                        </h2>
                        <p className="text-gray-400 font-bold max-w-sm">
                            {search
                                ? 'Try a different keyword or clear the search.'
                                : 'Click "Post New Job" to add your first listing and start receiving applications.'}
                        </p>
                        {!search && (
                            <Link
                                to="/employer/post-job"
                                className="bg-[#00B074] text-white px-8 py-4 rounded-2xl font-black hover:bg-[#009663] transition-all flex items-center gap-2"
                            >
                                <Plus size={20} /> Post First Job
                            </Link>
                        )}
                    </motion.div>
                ) : (
                    <AnimatePresence>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filtered.map((job, idx) => (
                                <motion.div
                                    key={job.job_id || idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:border-[#00B074]/30 transition-all group"
                                >
                                    {/* Job Header */}
                                    <div className="flex items-start justify-between gap-4 mb-6">
                                        <div className="bg-[#00B074]/10 p-4 rounded-2xl group-hover:bg-[#00B074]/20 transition-colors">
                                            <Briefcase size={24} className="text-[#00B074]" />
                                        </div>
                                        <span className="bg-emerald-50 text-[#00B074] text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest">
                                            {job.job_type || 'Full-Time'}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-xl font-black text-gray-900 mb-2 tracking-tight group-hover:text-[#00B074] transition-colors">
                                        {job.title || 'Untitled Job'}
                                    </h2>
                                    <p className="text-gray-500 font-bold text-sm mb-5 line-clamp-2">
                                        {job.description || 'No description provided.'}
                                    </p>

                                    {/* Meta Info */}
                                    <div className="flex flex-wrap gap-4 mb-6">
                                        {job.location && (
                                            <span className="flex items-center gap-2 text-gray-400 text-sm font-bold">
                                                <MapPin size={14} className="text-[#00B074]" />
                                                {job.location}
                                            </span>
                                        )}
                                        {job.created_at && (
                                            <span className="flex items-center gap-2 text-gray-400 text-sm font-bold">
                                                <Clock size={14} className="text-blue-400" />
                                                {formatDate(job.created_at)}
                                            </span>
                                        )}
                                        {job.salary && (
                                            <span className="flex items-center gap-2 text-gray-400 text-sm font-bold">
                                                💰 {job.salary}
                                            </span>
                                        )}
                                    </div>

                                    {/* Skills */}
                                    {job.skills_required && job.skills_required.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {job.skills_required.slice(0, 4).map((skill, i) => (
                                                <span
                                                    key={i}
                                                    className="bg-gray-50 border border-gray-100 text-gray-500 text-xs font-black px-3 py-1 rounded-full"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                            {job.skills_required.length > 4 && (
                                                <span className="bg-gray-50 border border-gray-100 text-gray-400 text-xs font-black px-3 py-1 rounded-full">
                                                    +{job.skills_required.length - 4} more
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                        <span className="flex items-center gap-2 text-gray-400 text-sm font-bold">
                                            <Users size={14} /> View Applicants
                                        </span>
                                        <Link
                                            to="/employer/applicants"
                                            className="flex items-center gap-2 bg-[#2B3940] text-white text-sm font-black px-5 py-3 rounded-2xl hover:bg-[#00B074] transition-all active:scale-95"
                                        >
                                            Manage <ChevronRight size={16} />
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
