import React, { useEffect, useState } from 'react'
import api from '../../config/api'
import { CheckCircle, Clock, XCircle, Search, Target, MapPin, IndianRupee, Send } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function MyApplications() {
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)
    const [showShortlistedOnly, setShowShortlistedOnly] = useState(false)
    const userName = localStorage.getItem('userName') || "User"
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        const fetchApplications = async () => {
            setLoading(true)
            try {
                const res = await api.get(`/api/candidate/applications/${userId}`)
                setApplications(res.data)
            } catch (err) {
                console.error(err)
            }
            setLoading(false)
        }
        fetchApplications()
    }, [userId])

    // Helper to get status color
    const getStatusDetails = (status) => {
        switch (status?.toLowerCase()) {
            case 'shortlisted':
                return { color: 'bg-emerald-50 text-emerald-600 border-emerald-100', icon: <CheckCircle className="w-3.5 h-3.5" /> }
            case 'rejected':
                return { color: 'bg-red-50 text-red-600 border-red-100', icon: <XCircle className="w-3.5 h-3.5" /> }
            default:
                return { color: 'bg-orange-50 text-[#F97316] border-orange-100', icon: <Clock className="w-3.5 h-3.5" /> }
        }
    }

    const filteredApps = showShortlistedOnly 
        ? applications.filter(app => app.status === 'Shortlisted')
        : applications

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

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <span className="flex items-center gap-2 text-[#F97316] font-bold text-xs uppercase tracking-widest mb-4">
                                <Send className="w-4 h-4 animate-pulse" />
                                Submission Logs
                            </span>
                            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-white font-display">
                                Applied <span className="text-[#F97316]">Jobs</span>
                            </h2>
                            <p className="text-gray-405 text-xs sm:text-sm font-semibold max-w-xl">
                                Track status progress, fit ratings, and interview requests on your active applications.
                            </p>
                        </div>
                        {applications.length > 0 && (
                            <button
                                onClick={() => setShowShortlistedOnly(!showShortlistedOnly)}
                                className={`px-5 py-2.5 rounded-full font-bold text-xs transition-all border flex items-center gap-2 shadow-sm cursor-pointer shrink-0 ${
                                    showShortlistedOnly 
                                    ? 'bg-[#F97316] text-white border-transparent shadow-lg shadow-orange-500/10' 
                                    : 'bg-white/10 text-gray-300 border-white/10 hover:bg-white/20'
                                }`}
                            >
                                <CheckCircle size={14} />
                                Shortlisted Only
                            </button>
                        )}
                    </div>
                </motion.div>

                {/* Applications List */}
                <div className="flex flex-col gap-6">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <div className="w-12 h-12 border-4 border-orange-50 border-t-[#F97316] rounded-full animate-spin"></div>
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Loading history...</p>
                        </div>
                    ) : applications.length === 0 ? (
                        <div className="p-20 text-center flex flex-col items-center gap-6 bg-white rounded-[32px] border border-dashed border-gray-200">
                            <div className="bg-gray-50 p-6 rounded-full text-gray-300">
                                <Search size={40} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-400 italic">You haven't applied to any jobs yet.</h3>
                                <p className="text-gray-400 font-semibold text-xs mt-2">Check your recommendations and start applying!</p>
                            </div>
                            <Link to="/candidate/recommendations" className="mt-4 bg-[#F97316] text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-[#EA580C] shadow-md shadow-orange-500/10 inline-block text-center">
                                View Recommended Jobs
                            </Link>
                        </div>
                    ) : filteredApps.length === 0 ? (
                        <div className="p-20 text-center flex flex-col items-center gap-6 bg-white rounded-[32px] border border-dashed border-gray-200">
                            <div className="bg-gray-50 p-6 rounded-full text-gray-300">
                                <Search size={40} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-400 italic font-semibold">No shortlisted jobs found.</h3>
                                <p className="text-gray-400 font-semibold text-xs mt-2 uppercase tracking-wider">Keep applying and level up your skills!</p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                             {filteredApps.map((app, idx) => {
                                const statusDetails = getStatusDetails(app.status)
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:border-orange-200/50 transition-all flex flex-col justify-between text-left"
                                    >
                                        <div>
                                            <div className="flex justify-between items-start mb-5">
                                                <div className="bg-orange-50/50 p-3 rounded-xl text-[#F97316] shadow-sm">
                                                    <Target size={18} />
                                                </div>
                                                <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 border ${statusDetails.color}`}>
                                                    {statusDetails.icon} {app.status || 'Applied'}
                                                </span>
                                            </div>

                                            <h3 className="text-lg font-bold text-gray-900 mb-1 tracking-tight truncate">
                                                {app.job_title ? app.job_title.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Job Position'}
                                            </h3>
                                            <p className="text-[#F97316] font-black uppercase tracking-widest text-[9px] mb-6">
                                                {app.company_name ? app.company_name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Employer'}
                                            </p>

                                            <div className="bg-orange-50/20 p-4.5 rounded-2xl border border-orange-100/30 flex items-center justify-between mb-5">
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">AI Match Rating</span>
                                                <span className="text-base font-extrabold text-[#F97316]">{app.match_score || "0"}%</span>
                                            </div>

                                            <Link 
                                                to={`/jobs/${app.job_id}`}
                                                className="w-full bg-white hover:bg-[#F97316] hover:text-white hover:border-[#F97316] text-[#F97316] border border-orange-100 py-3 rounded-2xl font-bold text-center text-xs transition-all shadow-sm block mb-4 cursor-pointer"
                                            >
                                                Details
                                            </Link>
                                        </div>

                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest pt-4 border-t border-gray-100/50 text-right">
                                            Applied {new Date(app.created_at).toLocaleDateString()}
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}
