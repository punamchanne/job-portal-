import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { UserCircle, CheckCircle, ChevronDown, Filter, Search, Mail, Target, ArrowRight, Shield } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminApplicants() {
    const [jobs, setJobs] = useState([])
    const [selectedJob, setSelectedJob] = useState('')
    const [applicants, setApplicants] = useState([])
    const [loading, setLoading] = useState(false)
    const userName = localStorage.getItem('userName') || "Admin"

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/admin/jobs`)
                setJobs(typeof res.data === 'string' ? JSON.parse(res.data.replace(/'/g, '"')) : res.data)
            } catch (err) { }
        }
        fetchJobs()
    }, [])

    useEffect(() => {
        if (selectedJob) {
            const fetchApplicants = async () => {
                setLoading(true)
                try {
                    const role = localStorage.getItem('role') || 'admin'
                    const res = await axios.get(`http://localhost:8000/api/employer/applicants/${selectedJob}?role=${role}`)
                    const sortedApplicants = res.data.sort((a, b) => b.match_score - a.match_score)
                    setApplicants(sortedApplicants)
                } catch (err) { }
                setLoading(false)
            }
            fetchApplicants()
        } else {
            setApplicants([])
        }
    }, [selectedJob])

    const filteredApplicants = applicants

    return (
        <DashboardLayout role="admin" userName={userName}>
            <div className="flex flex-col gap-8">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">System <span className="text-[#F97316]">Applicants Review</span></h2>
                    <p className="text-gray-500 font-semibold text-sm mt-1">Select any job on the platform to view its submitted applicant list.</p>
                </motion.div>

                {/* Selection Bar */}
                <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-grow w-full relative group">
                        <select
                            className="w-full bg-gray-50 border-0 px-6 py-4.5 rounded-2xl focus:ring-1 focus:ring-[#F97316] transition-all font-semibold text-gray-800 appearance-none cursor-pointer pr-12 text-sm"
                            onChange={e => setSelectedJob(e.target.value)}
                            value={selectedJob}
                        >
                            <option value="">-- Choose a Job Posting --</option>
                            {jobs.map((j, i) => (
                                <option key={i} value={j.job_id}>{j.title} ({j.company_name})</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    </div>
                </div>

                {/* Applicants List Area */}
                <div className="flex flex-col gap-6">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <div className="w-12 h-12 border-4 border-orange-50 border-t-[#F97316] rounded-full animate-spin"></div>
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Loading talent...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredApplicants.sort((a, b) => b.match_score - a.match_score).map((app, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="bg-white p-8 rounded-[28px] border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200/50 transition-all group flex flex-col gap-6"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-5">
                                            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-[#F97316]/10 group-hover:text-[#F97316] transition-all shadow-sm">
                                                <UserCircle size={28} />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#F97316] transition-colors">{app.user?.name || "Candidate Name"}</h3>
                                                <p className="text-gray-400 font-semibold text-xs lowercase flex items-center gap-1.5 mt-0.5"><Mail size={12} /> {app.user?.email || "No email"}</p>
                                            </div>
                                        </div>
                                        <div className="bg-orange-50/50 px-4 py-2 rounded-xl border border-orange-100/30 flex items-center gap-1.5 shrink-0 text-[#F97316]">
                                            <Target size={14} />
                                            <span className="text-xs font-bold">{app.match_score}% Fit</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-6 border-t border-gray-150">
                                        <span className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border transition-colors ${app.status === 'Shortlisted'
                                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                            : 'bg-yellow-50 text-yellow-600 border-yellow-100'
                                            }`}>
                                            {app.status || 'Pending Review'}
                                        </span>

                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                                            <Shield size={12} className="text-gray-300" /> Admin View Only
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {selectedJob && filteredApplicants.length === 0 && !loading && (
                        <div className="p-20 text-center flex flex-col items-center gap-6 bg-white rounded-[32px] border border-dashed border-gray-200">
                            <div className="bg-gray-50 p-6 rounded-full text-gray-300">
                                <Search size={40} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-400 italic">No applicants found for this job yet.</h3>
                                <p className="text-gray-400 font-semibold text-xs mt-1 uppercase tracking-widest">Waiting for candidates...</p>
                            </div>
                        </div>
                    )}

                    {!selectedJob && (
                        <div className="p-20 text-center flex flex-col items-center gap-6 bg-orange-50/20 rounded-[32px] border border-dashed border-[#F97316]/30 animate-pulse">
                            <div className="bg-[#F97316]/10 p-6 rounded-full text-[#F97316]">
                                <ArrowRight size={40} />
                            </div>
                            <h3 className="text-lg font-bold text-[#F97316]/80">Select a job above to view talent list.</h3>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}
