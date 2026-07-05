import React, { useEffect, useState } from 'react'
import api from '../../config/api'
import { Briefcase, MapPin, IndianRupee, CheckCircle, Sparkles, Send, Target, Heart, ArrowRight, Copy, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import DashboardLayout from '../../components/DashboardLayout'

export default function Recommendations() {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [applying, setApplying] = useState(null)
    const [appliedJobs, setAppliedJobs] = useState([])
    const userName = localStorage.getItem('userName') || "User"
    const userId = localStorage.getItem('userId')

    const [wishlist, setWishlist] = useState(() => {
        try { return JSON.parse(localStorage.getItem('wishlist') || '[]') } catch { return [] }
    })

    const toggleWishlist = (jobId) => {
        setWishlist(prev => {
            const updated = prev.includes(jobId)
                ? prev.filter(id => id !== jobId)
                : [...prev, jobId]
            localStorage.setItem('wishlist', JSON.stringify(updated))
            return updated
        })
    }

    useEffect(() => {
        const fetchRecsAndApps = async () => {
            try {
                if (!userId) return

                const [recsRes, appsRes] = await Promise.all([
                    api.get(`/api/candidate/recommendations/${userId}`),
                    api.get(`/api/candidate/applications/${userId}`)
                ])

                setJobs(recsRes.data)
                setAppliedJobs(appsRes.data.map(app => app.job_id))
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchRecsAndApps()
    }, [])

    const [copiedId, setCopiedId] = useState(null)

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
        setCopiedId(text)
        setTimeout(() => setCopiedId(null), 2000)
    }

    const applyJob = async (jobId, aiScore) => {
        setApplying(jobId)
        try {
            await api.post('/api/candidate/apply', {
                job_id: jobId,
                candidate_id: userId,
                match_score: aiScore
            })
            setAppliedJobs(prev => [...prev, jobId])
        } catch (err) {
            alert("Error applying to job")
        } finally {
            setApplying(null)
        }
    }

    return (
        <DashboardLayout role="candidate" userName={userName}>
            <div className="flex flex-col gap-8">
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
                            <Target className="w-4 h-4 animate-pulse" />
                            AI Recommendation Feed
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-white font-display">
                            Best Jobs <span className="text-[#F97316]">for Me</span>
                        </h2>
                        <p className="text-gray-405 text-xs sm:text-sm font-semibold max-w-xl">
                            AI matched these career goals based on your skills profile and qualification matrix.
                        </p>
                    </div>
                </motion.div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-6 bg-white rounded-[32px] border border-gray-100 shadow-sm">
                        <div className="w-14 h-14 border-4 border-orange-50 border-t-[#F97316] rounded-full animate-spin"></div>
                        <p className="text-xs font-black uppercase tracking-widest text-gray-400">Finding matches...</p>
                    </div>
                ) : jobs.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-[32px] p-20 text-center border border-gray-100 shadow-sm"
                    >
                        <div className="bg-orange-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner text-[#F97316]">
                            <Sparkles size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">No jobs matched yet.</h3>
                        <p className="text-gray-400 mb-10 text-sm font-semibold max-w-md mx-auto leading-relaxed">Please make sure you have added your resume so our AI can read your skills first.</p>
                        <Link to="/candidate/resume-upload" className="inline-flex items-center gap-2 px-8 py-4 bg-[#F97316] text-white rounded-full font-bold text-sm hover:bg-[#EA580C] transition-all shadow-md shadow-orange-500/10">
                            Add My Resume
                            <ArrowRight size={16} />
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {jobs.map((job, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                whileHover={{ y: -6 }}
                                className="bg-white rounded-[32px] border border-gray-100 p-8 pt-12 relative group shadow-sm hover:shadow-xl hover:border-orange-200/50 transition-all flex flex-col h-full text-left"
                            >
                                <div className="absolute top-0 right-0 py-2 px-5 bg-gradient-to-r from-[#F97316] to-[#FDBA74] text-white text-[9px] font-black uppercase tracking-widest rounded-bl-2xl rounded-tr-[32px] shadow-sm flex items-center gap-1.5">
                                    <Sparkles size={11} />
                                    {job.match_percentage}% Match
                                </div>

                                <div className="bg-orange-50/50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#F97316]/10 text-[#F97316] transition-colors shadow-sm shrink-0">
                                    <Briefcase size={24} />
                                </div>

                                <div className="flex-grow flex flex-col">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1 tracking-tight truncate group-hover:text-[#F97316] transition-colors leading-snug">
                                        {job.title ? job.title.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Position'}
                                    </h3>
                                    <p className="text-[#F97316] mb-4 font-black uppercase tracking-widest text-[9px]">
                                        {job.company_name ? job.company_name.toUpperCase() : 'ORGANIZATION'}
                                    </p>

                                    <div className="flex items-center gap-2 mb-5">
                                        <div className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100/50 text-[9px] font-bold text-gray-400">
                                            <span className="text-gray-300 uppercase tracking-tighter">Job ID:</span>
                                            <code className="text-gray-600 font-mono font-medium">{job.job_id}</code>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                copyToClipboard(job.job_id);
                                            }}
                                            className="text-gray-300 hover:text-[#F97316] transition-colors p-1 cursor-pointer"
                                            title="Copy Job ID"
                                        >
                                            {copiedId === job.job_id ? <Check size={11} className="text-[#F97316]" /> : <Copy size={11} />}
                                        </button>
                                    </div>

                                    {/* Clean metadata icons & details (Not looking like text input fields) */}
                                    <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6 text-xs font-semibold text-gray-500">
                                        <span className="flex items-center gap-1.5">
                                            <MapPin size={14} className="text-gray-400" />
                                            {job.location ? job.location.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Remote'}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <IndianRupee size={14} className="text-gray-400" />
                                            {job.salary || 'Not Disclosed'}
                                        </span>
                                    </div>

                                    <div className="mb-6 flex flex-wrap gap-1.5">
                                        {job.required_skills?.slice(0, 3).map((s, i) => (
                                            <span key={i} className="bg-orange-50/50 text-[#F97316] text-[9px] px-3.5 py-1.5 rounded-xl font-bold border border-orange-100/30 uppercase tracking-wider">{s}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Refined Actions: wishlist, details and apply in single row */}
                                <div className="flex items-center gap-3.5 w-full mt-auto">
                                    <button 
                                        onClick={() => toggleWishlist(job.job_id)}
                                        className={`p-3.5 rounded-2xl transition-all border shadow-sm cursor-pointer shrink-0 ${
                                            wishlist.includes(job.job_id) 
                                                ? 'bg-[#F97316] border-[#F97316] text-white shadow-sm' 
                                                : 'bg-white border-gray-150 text-gray-400 hover:border-[#F97316] hover:text-[#F97316]'
                                        }`}
                                    >
                                        <Heart size={15} fill={wishlist.includes(job.job_id) ? "currentColor" : "none"} />
                                    </button>

                                    <Link 
                                        to={`/jobs/${job.job_id}`} 
                                        className="flex-grow bg-white text-[#F97316] border border-orange-100 hover:border-[#F97316] py-3 rounded-2xl font-bold text-center text-xs hover:bg-[#F97316]/5 transition-all shadow-sm cursor-pointer"
                                    >
                                        Details
                                    </Link>

                                    <button
                                        onClick={() => applyJob(job.job_id, job.match_percentage)}
                                        disabled={applying === job.job_id || appliedJobs.includes(job.job_id)}
                                        className={`flex-grow font-bold py-3.5 rounded-2xl transition-all flex justify-center items-center gap-2 text-xs active:scale-95 cursor-pointer shrink-0 ${
                                            appliedJobs.includes(job.job_id)
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                                                : 'bg-[#F97316] text-white hover:bg-[#EA580C] shadow-md shadow-orange-500/10 disabled:opacity-70'
                                        }`}
                                    >
                                        {applying === job.job_id ? (
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        ) : appliedJobs.includes(job.job_id) ? (
                                            <>Applied <CheckCircle size={14} /></>
                                        ) : (
                                            <>Apply <Send size={12} /></>
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}
