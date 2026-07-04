import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { UserCircle, CheckCircle, ChevronDown, Filter, Search, Mail, Target, ArrowRight, FileText, Phone } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import { motion, AnimatePresence } from 'framer-motion'

export default function Applicants() {
    const [jobs, setJobs] = useState([])
    const [selectedJob, setSelectedJob] = useState('')
    const [applicants, setApplicants] = useState([])
    const [loading, setLoading] = useState(false)
    const userName = localStorage.getItem('userName') || "Partner"

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const userId = localStorage.getItem('userId')
                const res = await axios.get(`http://localhost:8000/api/employer/jobs/${userId}`)
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
                    const res = await axios.get(`http://localhost:8000/api/employer/applicants/${selectedJob}`)
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

    const handleShortlist = async (appId) => {
        try {
            await axios.put(`http://localhost:8000/api/employer/applications/${appId}/status`, { status: 'Shortlisted' })
            alert("Candidate Shortlisted!")
            const res = await axios.get(`http://localhost:8000/api/employer/applicants/${selectedJob}`)
            const sortedApplicants = res.data.sort((a, b) => b.match_score - a.match_score)
            setApplicants(sortedApplicants)
        } catch (err) {
            alert("Error updating status")
        }
    }

    return (
        <DashboardLayout role="employer" userName={userName}>
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
                            Talent Pipeline
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-white font-display">
                            Review <span className="text-[#F97316]">Applicants</span>
                        </h2>
                        <p className="text-gray-455 text-xs sm:text-sm font-semibold max-w-xl">
                            Select an active job vacancy listing from the dropdown below to examine candidates matching metrics.
                        </p>
                    </div>
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
                                <option key={i} value={j.job_id}>
                                    {j.title ? j.title.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ') : 'Job Listing'} (ID: {j.job_id})
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    </div>
                    {selectedJob && (
                        <div className="flex items-center gap-2 bg-orange-50/50 px-4.5 py-2.5 rounded-full border border-orange-100 text-[10px] font-black uppercase tracking-widest text-[#F97316] shrink-0">
                            ID: <code className="font-mono text-gray-700 ml-1">{selectedJob.substring(0, 8)}...</code>
                        </div>
                    )}
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
                            {applicants.map((app, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:border-orange-200/50 transition-all group flex flex-col justify-between gap-6 text-left"
                                >
                                    <div>
                                        {/* Candidate Header */}
                                        <div className="flex items-start justify-between mb-5">
                                            <div className="flex items-center gap-5">
                                                <div className="w-14 h-14 bg-orange-50/30 rounded-2xl flex items-center justify-center text-[#F97316] group-hover:bg-[#F97316]/10 transition-all shadow-sm shrink-0">
                                                    <UserCircle size={28} />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#F97316] transition-colors leading-snug">
                                                        {app.user?.name ? app.user.name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ') : "Candidate Name"}
                                                    </h3>
                                                    <div className="flex flex-col gap-0.5 mt-1.5 text-gray-400 text-xs font-semibold">
                                                        <span className="flex items-center gap-1.5 lowercase">
                                                            <Mail size={12} className="text-gray-400" />
                                                            {app.user?.email || "No email"}
                                                        </span>
                                                        {(app.user?.contact_number || app.candidate?.contact_number) && (
                                                            <span className="flex items-center gap-1.5 text-[11px] font-bold">
                                                                <Phone size={12} className="text-gray-400" />
                                                                {app.user?.contact_number || app.candidate?.contact_number}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-orange-50/50 px-4 py-2 rounded-xl border border-orange-100/30 flex items-center gap-1.5 shrink-0 text-[#F97316]">
                                                <Target size={14} />
                                                <span className="text-xs font-bold">{app.match_score}% Fit</span>
                                            </div>
                                        </div>

                                        {/* Bio / Bio Section */}
                                        {app.candidate?.bio && (
                                            <div className="mb-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50">
                                                <p className="text-gray-500 font-semibold text-xs leading-relaxed">
                                                    {app.candidate.bio.charAt(0).toUpperCase() + app.candidate.bio.slice(1)}
                                                </p>
                                            </div>
                                        )}

                                        {/* Skills Section */}
                                        {app.candidate?.skills && app.candidate.skills.length > 0 && (
                                            <div className="mb-4">
                                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Parsed Skills</h4>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {app.candidate.skills.slice(0, 5).map((skill, i) => (
                                                        <span key={i} className="bg-orange-50/30 border border-orange-100/20 text-[#F97316] text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-wider">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                    {app.candidate.skills.length > 5 && (
                                                        <span className="bg-gray-50 text-gray-450 text-[10px] font-bold px-3 py-1.5 rounded-xl border border-gray-100">
                                                            +{app.candidate.skills.length - 5} more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Footer */}
                                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border transition-colors ${app.status === 'Shortlisted'
                                                ? 'bg-emerald-50 text-emerald-800 border-emerald-100'
                                                : 'bg-yellow-50 text-yellow-600 border-yellow-100'
                                                }`}>
                                                {app.status || 'Pending Review'}
                                            </span>

                                            {app.candidate?.resume_path && (
                                                <a 
                                                    href={`http://localhost:8000/${app.candidate.resume_path.replace(/\\/g, '/').split('/').map(encodeURIComponent).join('/')}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#F97316] hover:text-[#EA580C] transition-colors cursor-pointer bg-orange-50/50 hover:bg-orange-50 px-3.5 py-2.5 rounded-xl border border-orange-100/30"
                                                >
                                                    <FileText size={12} /> Resume
                                                </a>
                                            )}
                                        </div>

                                        {app.status !== 'Shortlisted' && (
                                            <button
                                                onClick={() => handleShortlist(app.application_id)}
                                                className="bg-[#F97316] text-white px-6 py-2.5 rounded-full font-bold text-xs hover:bg-[#EA580C] shadow-md shadow-orange-500/10 flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all border-0"
                                            >
                                                Shortlist Candidate <ArrowRight size={14} />
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {selectedJob && applicants.length === 0 && !loading && (
                        <div className="p-20 text-center flex flex-col items-center gap-6 bg-white rounded-[32px] border border-dashed border-gray-200">
                            <div className="bg-gray-50 p-6 rounded-full text-gray-300">
                                <Search size={40} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-400 italic">No applicants found for this job yet.</h3>
                                <p className="text-gray-400 font-semibold text-xs mt-1 uppercase tracking-widest">Profiles will display once candidates apply.</p>
                            </div>
                        </div>
                    )}

                    {!selectedJob && (
                        <div className="p-20 text-center flex flex-col items-center gap-6 bg-orange-50/20 rounded-[32px] border border-dashed border-[#F97316]/30 animate-pulse">
                            <div className="bg-[#F97316]/10 p-6 rounded-full text-[#F97316]">
                                <ArrowRight size={40} />
                            </div>
                            <h3 className="text-lg font-bold text-[#F97316]/80">Select a job from dropdown list to review candidates.</h3>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}
