import React, { useEffect, useState } from 'react'
import api from '../../config/api'
import { Trash2, Briefcase, Search, MapPin, Building, Calendar, Filter } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import { motion } from 'framer-motion'

export default function ManageJobs() {
    const [jobs, setJobs] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const userName = localStorage.getItem('userName') || "Admin"

    useEffect(() => {
        fetchJobs()
    }, [])

    const fetchJobs = async () => {
        try {
            const res = await api.get('/api/admin/jobs')
            setJobs(res.data)
        } catch (err) { }
    }

    const deleteJob = async (jobId) => {
        if (!window.confirm("Are you sure you want to remove this job posting?")) return
        try {
            await api.delete(`/api/admin/jobs/${jobId}`)
            fetchJobs()
        } catch (err) {
            alert("Error deleting job")
        }
    }

    const filteredJobs = jobs.filter(job => {
        const query = searchTerm.toLowerCase()
        return (
            job.title?.toLowerCase().includes(query) ||
            job.company_name?.toLowerCase().includes(query) ||
            job.location?.toLowerCase().includes(query) ||
            `#jp-${job.job_id?.substring(0, 4)}`.toLowerCase().includes(query)
        )
    })

    return (
        <DashboardLayout role="admin" userName={userName}>
            <div className="flex flex-col gap-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Active <span className="text-[#F97316]">Jobs</span></h2>
                        <p className="text-gray-500 font-semibold text-sm mt-1">Review and manage {jobs.length} listed career opportunities.</p>
                    </div>
                </div>

                {/* Search & Filter Bar */}
                <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-wrap gap-4 shadow-sm items-center">
                    <div className="flex-grow flex items-center bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100 focus-within:border-[#F97316] transition-colors">
                        <Search className="text-gray-400 shrink-0" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search by job title, company, location, or ID..." 
                            className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 font-semibold text-sm ml-3" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="flex items-center gap-1.5 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100 font-bold text-xs text-gray-500 hover:text-[#F97316] transition-all cursor-pointer">
                        <Filter size={14} /> Category
                    </button>
                    <button className="flex items-center gap-1.5 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100 font-bold text-xs text-gray-500 hover:text-[#F97316] transition-all cursor-pointer">
                        <MapPin size={14} /> Location
                    </button>
                </div>

                {/* Jobs List Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredJobs.map((job, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-white p-8 rounded-[28px] border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200/50 transition-all flex flex-col justify-between group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50/20 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform"></div>

                            <div className="flex items-start justify-between relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-[#F97316] group-hover:bg-[#F97316]/10 transition-colors shadow-sm">
                                        <Briefcase size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#F97316] transition-colors">{job.title}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="bg-orange-50 text-[#F97316] px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-orange-100/30">
                                                Active Job
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-xs font-bold text-gray-500 relative z-10 mt-6 mb-6">
                                <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-2xl border border-gray-100/50">
                                    <Building size={14} className="text-[#F97316] shrink-0" />
                                    <span className="truncate">{job.company_name}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-2xl border border-gray-100/50">
                                    <MapPin size={14} className="text-[#F97316] shrink-0" />
                                    <span className="truncate">{job.location}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 relative z-10">
                                <p className="text-[10px] font-black text-gray-400">Apply ID: <span className="text-gray-950">#JP-{job.job_id?.substring(0, 4)}</span></p>
                                <button
                                    onClick={() => deleteJob(job.job_id)}
                                    className="flex items-center gap-1.5 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white px-5 py-2 rounded-full font-bold text-xs transition-all cursor-pointer shadow-sm active:scale-95"
                                >
                                    <Trash2 className="w-3.5 h-3.5" /> Remove Job
                                </button>
                            </div>
                        </motion.div>
                    ))}
                    {filteredJobs.length === 0 && (
                        <div className="col-span-full p-20 text-center flex flex-col items-center gap-4 bg-white rounded-[32px] border border-dashed border-gray-200">
                            <div className="p-6 bg-gray-50 rounded-full text-gray-300">
                                <Briefcase size={40} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-400 italic">
                                {jobs.length === 0 ? "No job posts available to manage." : `No results found for "${searchTerm}"`}
                            </h3>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}
