import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, TrendingUp, Heart, Briefcase, Filter, CheckCircle, Copy, Check } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'

export default function FindJobs() {
    const [searchTerm, setSearchTerm] = useState('')
    const [jobs, setJobs] = useState([])
    const [appliedJobs, setAppliedJobs] = useState([])
    const [copiedId, setCopiedId] = useState(null)
    const [filterTypes, setFilterTypes] = useState([])
    const [salaryMax, setSalaryMax] = useState(50)
    const [selectedLocation, setSelectedLocation] = useState('')
    const [wishlist, setWishlist] = useState(() => {
        try { return JSON.parse(localStorage.getItem('wishlist') || '[]') } catch { return [] }
    })
    const userId = localStorage.getItem('userId')
    const location = useLocation()

    // Read ?search= query param on load
    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const q = params.get('search')
        if (q) setSearchTerm(q)
    }, [location.search])

    const toggleFilter = (type) => {
        setFilterTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        )
    }

    const toggleWishlist = (jobId) => {
        setWishlist(prev => {
            const updated = prev.includes(jobId)
                ? prev.filter(id => id !== jobId)
                : [...prev, jobId]
            localStorage.setItem('wishlist', JSON.stringify(updated))
            return updated
        })
    }

    // Parse salary string like "₹8L - ₹15L" to get max value in Lakhs
    const parseSalaryMax = (salaryStr) => {
        if (!salaryStr) return 0
        const matches = salaryStr.match(/[\d.]+/g)
        if (matches && matches.length >= 2) return parseFloat(matches[1])
        if (matches && matches.length === 1) return parseFloat(matches[0])
        return 0
    }

    const filteredJobs = jobs.filter(job => {
        const matchesSearch =
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location?.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesType = filterTypes.length === 0 || filterTypes.includes(job.job_type)
        const salaryVal = job.salary || job.salary_range || ''
        const jobSalaryMax = parseSalaryMax(salaryVal)
        const matchesSalary = jobSalaryMax === 0 || jobSalaryMax <= salaryMax
        const matchesLocation = !selectedLocation ||
            job.location?.toLowerCase().includes(selectedLocation.toLowerCase())
        return matchesSearch && matchesType && matchesSalary && matchesLocation
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
        <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
            {/* Page Header with Search */}
            <div className="bg-[#111827] pt-36 pb-24 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[#F97316]/5 mix-blend-overlay opacity-40"></div>
                <div className="max-w-[1320px] mx-auto px-6 relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-extrabold text-white mb-10 tracking-tight"
                    >
                        Find Your <span className="text-[#F97316]">Career</span>
                    </motion.h1>

                    {/* Integrated Search Bar */}
                    <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xl p-3 rounded-[24px] shadow-2xl border border-gray-100/50 flex flex-col md:flex-row gap-3">
                        <div className="flex-grow flex items-center bg-gray-50 rounded-[18px] px-5 border border-gray-100 group focus-within:border-[#F97316] transition-colors">
                            <Search className="text-gray-400 group-focus-within:text-[#F97316] transition-colors shrink-0" size={20} />
                            <input
                                type="text"
                                placeholder="Job title, technology, or company..."
                                className="w-full py-4 bg-transparent border-0 focus:outline-none focus:ring-0 text-gray-800 font-semibold text-sm placeholder:text-gray-400 pl-3"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="hidden md:flex flex-grow items-center bg-gray-50 rounded-[18px] px-5 border border-gray-100 group focus-within:border-[#F97316] transition-colors">
                            <MapPin className="text-gray-400 group-focus-within:text-[#F97316] transition-colors shrink-0" size={18} />
                            <select
                                className="w-full py-4 bg-transparent border-0 focus:outline-none focus:ring-0 text-gray-500 font-semibold text-sm cursor-pointer pl-2"
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                            >
                                <option value="">Select Location</option>
                                <option value="Remote">Remote</option>
                                <option value="Mumbai">Mumbai</option>
                                <option value="Pune">Pune</option>
                                <option value="Bangalore">Bangalore</option>
                                <option value="Delhi">Delhi</option>
                            </select>
                        </div>
                        <button
                            className="bg-[#F97316] text-white px-10 py-4 rounded-[18px] font-bold hover:bg-[#EA580C] hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 cursor-pointer"
                        >
                            Find Jobs
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <section className="py-24 max-w-[1320px] mx-auto px-6 w-full grid lg:grid-cols-4 gap-12">
                {/* Filters Sidebar */}
                <div className="hidden lg:flex flex-col gap-10">
                    <div className="bg-white p-8 rounded-[28px] border border-gray-100 shadow-sm flex flex-col gap-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900 tracking-tight">Filters</h3>
                            <Filter size={18} className="text-[#F97316]" />
                        </div>

                        {/* Filter Group: Job Type */}
                        <div className="flex flex-col gap-4">
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Job Type</h4>
                            <div className="flex flex-wrap gap-2">
                                {["Full Time", "Part Time", "Internship", "Contract"].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => toggleFilter(type)}
                                        className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all border tracking-wide cursor-pointer ${filterTypes.includes(type)
                                                ? 'bg-[#F97316] text-white border-[#F97316] shadow-md shadow-orange-500/10'
                                                : 'bg-white text-gray-400 border-gray-200 hover:border-[#F97316] hover:text-[#F97316]'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Filter Group: Salary Range */}
                        <div className="flex flex-col gap-4">
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Salary Max: (₹{salaryMax}L)</h4>
                            <input
                                type="range"
                                min={1}
                                max={50}
                                value={salaryMax}
                                onChange={e => setSalaryMax(Number(e.target.value))}
                                className="w-full accent-[#F97316]"
                            />
                            <div className="flex justify-between text-xs font-bold text-gray-400">
                                <span>₹1L</span>
                                <span>₹{salaryMax}L</span>
                                <span>₹50L+</span>
                            </div>
                            {salaryMax < 50 && (
                                <button
                                    onClick={() => setSalaryMax(50)}
                                    className="text-xs font-bold text-[#F97316] hover:underline text-left cursor-pointer"
                                >
                                    Clear salary limit
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Job Listings Area */}
                <div className="lg:col-span-3 flex flex-col gap-6">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-gray-500 font-semibold text-sm">Showing <span className="text-[#F97316]">{filteredJobs.length}</span> of <span className="text-gray-700">{jobs.length}</span> positions</p>
                        <select className="bg-transparent border-0 font-bold text-gray-800 focus:ring-0 cursor-pointer">
                            <option>Latest Updates</option>
                            <option>Salary: High to Low</option>
                        </select>
                    </div>

                    {filteredJobs.length === 0 ? (
                        <div className="bg-white p-20 rounded-[32px] text-center border border-dashed border-gray-200">
                            <p className="text-lg font-bold text-gray-400">No postings match your filtering.</p>
                            <button
                                onClick={() => { setSearchTerm(''); setFilterTypes([]); setSalaryMax(50); setSelectedLocation('') }}
                                className="mt-4 text-[#F97316] font-bold hover:underline cursor-pointer"
                            >
                                Clear all active filters
                            </button>
                        </div>
                    ) : filteredJobs.map((job, i) => (
                        <motion.div
                            key={i}
                            className="p-6 bg-white border border-gray-100 rounded-3xl flex flex-col md:flex-row items-center gap-6 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-gray-100/50 hover:border-orange-200"
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            viewport={{ once: true }}
                        >
                            {/* Company Logo / Initial */}
                            <div className="w-20 h-20 bg-orange-50 border border-gray-100 rounded-2xl flex items-center justify-center p-3 shrink-0 font-black text-2xl text-[#F97316]">
                                {job.company_name ? job.company_name.charAt(0).toUpperCase() : 'R'}
                            </div>

                            <div className="flex-grow">
                                <h3 className="text-xl font-bold text-gray-900 tracking-tight">{job.title}</h3>
                                <p className="text-sm font-semibold text-[#F97316] mt-0.5">{job.company_name || 'Organization'}</p>
                                <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3 text-xs font-semibold text-gray-500">
                                    <span className="flex items-center gap-1.5"><MapPin size={14} className="text-gray-400" /> {job.location || 'Remote'}</span>
                                    <span className="flex items-center gap-1.5"><Briefcase size={14} className="text-gray-400" /> {job.job_type || 'Full Time'}</span>
                                    <span className="flex items-center gap-1.5"><TrendingUp size={14} className="text-gray-400" /> {job.salary || job.salary_range || 'Not Disclosed'}</span>
                                </div>
                                
                                <div className="flex items-center gap-2 mt-4 group/id">
                                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100 transition-all text-[10px] font-bold text-gray-400">
                                        <span className="text-gray-300 uppercase tracking-tighter">Job ID:</span>
                                        <code className="text-gray-600 font-mono">{job.job_id}</code>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            copyToClipboard(job.job_id);
                                        }}
                                        className="text-gray-300 hover:text-[#F97316] transition-colors p-1 cursor-pointer"
                                        title="Copy Job ID"
                                    >
                                        {copiedId === job.job_id ? <Check size={12} className="text-[#F97316]" /> : <Copy size={12} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col md:items-end gap-3 text-right shrink-0 w-full md:w-auto">
                                <div className="flex gap-2.5 flex-wrap justify-center md:justify-end w-full">
                                    <Link 
                                        to={`/jobs/${job.job_id}`} 
                                        className="btn-secondary-job py-3.5 px-6 text-sm text-center flex-grow md:flex-grow-0"
                                    >
                                        View Details
                                    </Link>
                                    
                                    {appliedJobs.includes(job.job_id) ? (
                                        <button disabled className="bg-gray-100 text-gray-400 py-3.5 px-6 rounded-full font-bold text-sm border border-gray-200 cursor-not-allowed flex items-center justify-center gap-2 flex-grow md:flex-grow-0">
                                            Applied <CheckCircle size={16} />
                                        </button>
                                    ) : (
                                        <Link 
                                            to={userId ? `/jobs/${job.job_id}` : '/login'} 
                                            className="btn-primary-job py-3.5 px-6 text-sm text-center shadow-none flex-grow md:flex-grow-0"
                                        >
                                            Apply Now
                                        </Link>
                                    )}
                                    
                                    <button
                                        onClick={() => toggleWishlist(job.job_id)}
                                        className={`p-3.5 rounded-full transition-all border shadow-sm cursor-pointer ${wishlist.includes(job.job_id) ? 'bg-[#F97316] border-[#F97316] text-white' : 'bg-white border-gray-200 text-gray-400 hover:border-[#F97316] hover:text-[#F97316]'}`}
                                    >
                                        <Heart size={16} fill={wishlist.includes(job.job_id) ? "currentColor" : "none"} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    )
}
