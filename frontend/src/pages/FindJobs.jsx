import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, TrendingUp, Heart, Briefcase, Filter, CheckCircle, Copy, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function FindJobs() {
    const [searchTerm, setSearchTerm] = useState('')
    const [jobs, setJobs] = useState([])
    const [appliedJobs, setAppliedJobs] = useState([])
    const [copiedId, setCopiedId] = useState(null)
    const [filterTypes, setFilterTypes] = useState([])
    const userId = localStorage.getItem('userId')

    const toggleFilter = (type) => {
        setFilterTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        )
    }

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company_name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterTypes.length === 0 || filterTypes.includes(job.job_type);
        return matchesSearch && matchesType;
    })

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
        setCopiedId(text)
        setTimeout(() => setCopiedId(null), 2000)
    }

    useEffect(() => {
        const fetchJobsAndApps = async () => {
            try {
                const jobsRes = await axios.get('http://localhost:8000/api/admin/jobs')
                setJobs(jobsRes.data)

                if (userId) {
                    const appsRes = await axios.get(`http://localhost:8000/api/candidate/applications/${userId}`)
                    setAppliedJobs(appsRes.data.map(app => app.job_id))
                }
            } catch (err) {
                console.error(err)
            }
        }
        fetchJobsAndApps()
    }, [userId])

    return (
        <div className="flex flex-col min-h-screen bg-[#F1F8F5]">
            {/* Page Header with Search */}
            <div className="bg-[#2B3940] pt-40 pb-32 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[#00B074]/10 mix-blend-overlay opacity-50"></div>
                <div className="max-w-[1320px] mx-auto px-6 relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-black text-white mb-10"
                    >
                        Find Your <span className="text-[#00B074]">Career</span>
                    </motion.h1>

                    {/* Integrated Search Bar */}
                    <div className="max-w-4xl mx-auto bg-white p-3 rounded-2xl shadow-2xl flex flex-wrap md:flex-nowrap gap-3">
                        <div className="flex-grow flex items-center bg-gray-50 rounded-xl px-5 border border-gray-100 group focus-within:ring-2 focus-within:ring-[#00B074]">
                            <Search className="text-gray-400 group-focus-within:text-[#00B074] transition-colors" />
                            <input
                                type="text"
                                placeholder="Job title, keywords..."
                                className="w-full py-5 bg-transparent border-0 focus:ring-0 text-gray-800 font-medium"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="hidden md:flex flex-grow items-center bg-gray-50 rounded-xl px-5 border border-gray-100 group focus-within:ring-2 focus-within:ring-[#00B074]">
                            <MapPin className="text-gray-400 group-focus-within:text-[#00B074] transition-colors" />
                            <select className="w-full py-5 bg-transparent border-0 focus:ring-0 text-gray-500 font-medium cursor-pointer">
                                <option>Location</option>
                                <option>Remote</option>
                                <option>New York</option>
                                <option>London</option>
                            </select>
                        </div>
                        <button className="bg-[#00B074] text-white px-10 py-5 rounded-xl font-black uppercase tracking-wider hover:bg-[#009663] transition-all shadow-xl shadow-emerald-400/20">
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <section className="py-24 max-w-[1320px] mx-auto px-6 w-full grid lg:grid-cols-4 gap-12">
                {/* Filters Sidebar */}
                <div className="hidden lg:flex flex-col gap-10">
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-black text-[#2B3940]">Filters</h3>
                            <Filter size={18} className="text-[#00B074]" />
                        </div>

                        {/* Filter Group: Job Type */}
                        <div className="flex flex-col gap-4">
                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Job Type</h4>
                            <div className="flex flex-wrap gap-2">
                                {["Full Time", "Part Time", "Internship", "Contract"].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => toggleFilter(type)}
                                        className={`px-5 py-2.5 rounded-full text-xs font-black transition-all border uppercase tracking-wider ${filterTypes.includes(type)
                                                ? 'bg-[#00B074] text-white border-[#00B074] shadow-lg shadow-emerald-100'
                                                : 'bg-white text-gray-400 border-gray-100 hover:border-[#00B074] hover:text-[#00B074]'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Filter Group: Salary Range */}
                        <div className="flex flex-col gap-4">
                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Salary Range</h4>
                            <input type="range" className="w-full accent-[#00B074]" />
                            <div className="flex justify-between text-xs font-bold text-gray-400">
                                <span>₹0</span>
                                <span>₹50L+</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Job Listings Area */}
                <div className="lg:col-span-3 flex flex-col gap-6">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-gray-500 font-bold">Showing <span className="text-[#00B074]">{filteredJobs.length}</span> jobs</p>
                        <select className="bg-transparent border-0 font-bold text-[#2B3940] focus:ring-0 cursor-pointer">
                            <option>Latest Updates</option>
                            <option>Salary: High to Low</option>
                        </select>
                    </div>

                    {filteredJobs.length === 0 ? (
                        <div className="bg-white p-20 rounded-[3rem] text-center border border-dashed border-gray-200">
                            <p className="text-xl font-black text-gray-400">No jobs found matching your filters.</p>
                        </div>
                    ) : filteredJobs.map((job, i) => (
                        <motion.div
                            key={i}
                            className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-6 hover:shadow-xl hover:border-[#00B074]/20 transition-all group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className="w-24 h-24 bg-gray-50 border border-gray-100 rounded-3xl flex items-center justify-center p-5 shrink-0 group-hover:bg-emerald-50 transition-all font-black text-3xl text-[#00B074]">
                                {job.company_name ? job.company_name.charAt(0).toUpperCase() : 'B'}
                            </div>
                            <div className="flex-grow text-center md:text-left">
                                <h3 className="text-2xl font-black text-[#2B3940] transition-colors group-hover:text-[#00B074]">{job.title}</h3>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3 text-sm font-bold text-gray-400">
                                    <span className="flex items-center gap-1.5"><MapPin size={16} className="text-[#00B074]" /> {job.location || 'Remote'}</span>
                                    <span className="flex items-center gap-1.5"><Briefcase size={16} className="text-[#00B074]" /> {job.job_type || 'Full Time'}</span>
                                    <span className="flex items-center gap-1.5"><TrendingUp size={16} className="text-[#00B074]" /> {job.salary_range || 'Not Disclosed'}</span>
                                </div>
                                <div className="flex items-center gap-2 mt-4 group/id">
                                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 transition-all group-hover:bg-white text-[10px] font-bold text-gray-500">
                                        <span className="text-gray-300 uppercase tracking-tighter mr-1">Job ID:</span>
                                        <code className="text-gray-700 font-mono">{job.job_id}</code>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            copyToClipboard(job.job_id);
                                        }}
                                        className="text-gray-300 hover:text-[#00B074] transition-colors p-1"
                                        title="Copy Job ID"
                                    >
                                        {copiedId === job.job_id ? <Check size={14} className="text-[#00B074]" /> : <Copy size={14} />}
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col md:items-end gap-3 text-right">
                                <div className="flex gap-4">
                                    <button className="bg-gray-50 p-4 rounded-2xl text-[#00B074] hover:bg-[#00B074] hover:text-white transition-all shadow-sm"><Heart size={22} /></button>
                                    {appliedJobs.includes(job.job_id) ? (
                                        <button disabled className="bg-gray-100 text-gray-400 py-4 px-10 rounded-2xl font-black text-lg border border-gray-200 cursor-not-allowed flex items-center gap-2">
                                            Already Applied <CheckCircle size={20} />
                                        </button>
                                    ) : (
                                        <Link to={userId ? '/candidate/dashboard' : '/login'} className="bg-[#00B074] text-white py-4 px-10 rounded-2xl font-black text-lg hover:bg-[#009663] transition-all shadow-xl shadow-emerald-400/20">
                                            Apply Now
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    )
}
