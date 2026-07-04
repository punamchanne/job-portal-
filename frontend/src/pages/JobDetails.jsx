import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    ArrowLeft, MapPin, Briefcase, Calendar, IndianRupee, 
    CheckCircle, AlertCircle, Sparkles, ExternalLink, 
    Youtube, ArrowRight, Lock, BookOpen, Clock, Heart
} from 'lucide-react'
import axios from 'axios'

export default function JobDetails() {
    const { jobId } = useParams()
    const navigate = useNavigate()
    const userId = localStorage.getItem('userId')
    
    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1)
        } else {
            navigate(userId ? '/candidate/dashboard' : '/jobs')
        }
    }

    const [wishlist, setWishlist] = useState(() => {
        try { return JSON.parse(localStorage.getItem('wishlist') || '[]') } catch { return [] }
    })

    const toggleWishlist = () => {
        setWishlist(prev => {
            const updated = prev.includes(jobId)
                ? prev.filter(id => id !== jobId)
                : [...prev, jobId]
            localStorage.setItem('wishlist', JSON.stringify(updated))
            return updated
        })
    }
    
    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    // User status
    const [applied, setApplied] = useState(false)
    const [applying, setApplying] = useState(false)
    const [profile, setProfile] = useState(null)
    
    // AI Skill gap analysis
    const [hasResume, setHasResume] = useState(false)
    const [skillGap, setSkillGap] = useState(null)
    const [matchPercentage, setMatchPercentage] = useState(null)
    const [loadingAI, setLoadingAI] = useState(false)

    useEffect(() => {
        const fetchJobData = async () => {
            try {
                setLoading(true)
                const jobRes = await axios.get(`http://localhost:8000/api/admin/jobs/${jobId}`)
                setJob(jobRes.data)
                
                if (userId) {
                    const appsRes = await axios.get(`http://localhost:8000/api/candidate/applications/${userId}`)
                    const alreadyApplied = appsRes.data.some(app => app.job_id === jobId)
                    setApplied(alreadyApplied)
                    
                    const profileRes = await axios.get(`http://localhost:8000/api/candidate/profile/${userId}`)
                    setProfile(profileRes.data)
                    
                    if (profileRes.data.resume_path && profileRes.data.skills && profileRes.data.skills.length > 0) {
                        setHasResume(true)
                        setLoadingAI(true)
                        try {
                            const gapRes = await axios.get(`http://localhost:8000/api/candidate/skill-gap/${userId}/${jobId}`)
                            setSkillGap(gapRes.data)
                            
                            const req = gapRes.data.required_skills || []
                            const matched = gapRes.data.matched_skills || []
                            if (req.length > 0) {
                                const percentage = Math.round((matched.length / req.length) * 100)
                                setMatchPercentage(percentage)
                            } else {
                                setMatchPercentage(100)
                            }
                        } catch (aiErr) {
                            console.error("Failed to analyze skill gap:", aiErr)
                        } finally {
                            setLoadingAI(false)
                        }
                    }
                }
            } catch (err) {
                console.error(err)
                setError("Failed to load job details. The job may not exist or the server is down.")
            } finally {
                setLoading(false)
            }
        }
        
        if (jobId) {
            fetchJobData()
        }
    }, [jobId, userId])

    const handleApply = async () => {
        if (!userId) {
            navigate('/login')
            return
        }
        
        setApplying(true)
        try {
            await axios.post('http://localhost:8000/api/candidate/apply', {
                job_id: jobId,
                candidate_id: userId,
                match_score: matchPercentage !== null ? matchPercentage : 0
            })
            setApplied(true)
        } catch (err) {
            console.error(err)
            alert("An error occurred while submitting your application.")
        } finally {
            setApplying(false)
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F9FA] pt-20 gap-6">
                <div className="w-14 h-14 border-4 border-orange-50 border-t-[#F97316] rounded-full animate-spin"></div>
                <p className="text-sm font-black uppercase tracking-widest text-gray-400">Fetching Job Details...</p>
            </div>
        )
    }

    if (error || !job) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F9FA] px-6 text-center">
                <AlertCircle size={64} className="text-red-500 mb-6" />
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">Job Not Found</h2>
                <p className="text-gray-500 font-semibold max-w-md mb-8">{error || "The specified vacancy has been removed or closed."}</p>
                <Link to="/jobs" className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white px-8 py-4 rounded-full font-bold shadow-md shadow-orange-500/10">
                    <ArrowLeft size={18} /> Back to Open Positions
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#F8F9FA] pt-32 pb-24 px-4 md:px-6">
            <div className="max-w-[1320px] mx-auto flex flex-col gap-8">
                
                {/* Back Link & Breadcrumbs */}
                <div className="flex items-center justify-between">
                    <button 
                        onClick={handleBack} 
                        className="inline-flex items-center gap-2 text-[#111827] hover:text-[#F97316] font-bold transition-colors group cursor-pointer bg-transparent border-0"
                    >
                        <ArrowLeft size={18} className="transform group-hover:-translate-x-1 transition-transform" /> 
                        {userId ? 'Dashboard' : 'All Listings'}
                    </button>
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest hidden sm:block">
                        Road2Job &bull; {job.company_name} &bull; {job.title}
                    </div>
                </div>

                {/* Grid Layout split columns */}
                <div className="grid lg:grid-cols-3 gap-10 items-start">
                    
                    {/* Left details panel */}
                    <div className="lg:col-span-2 flex flex-col gap-8">
                        
                        {/* Header details card */}
                        <motion.div 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-8 md:p-10 rounded-[32px] border border-gray-100 shadow-sm relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-50/30 rounded-full translate-x-1/3 -translate-y-1/3"></div>
                            
                            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left relative z-10">
                                {/* Initial Icon */}
                                <div className="w-20 h-20 bg-orange-50 border border-orange-100/50 rounded-2xl flex items-center justify-center font-black text-3xl text-[#F97316] shrink-0 shadow-sm">
                                    {job.company_name ? job.company_name.charAt(0).toUpperCase() : 'R'}
                                </div>
                                <div className="flex-grow">
                                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">{job.title}</h1>
                                    <p className="text-base font-bold text-[#F97316] mt-1">{job.company_name || 'Enterprise Client'}</p>
                                    
                                    {/* Badges */}
                                    <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start text-xs font-semibold text-gray-500">
                                        <span className="flex items-center gap-1.5 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                                            <MapPin size={14} className="text-gray-400" /> {job.location || 'Remote'}
                                        </span>
                                        <span className="flex items-center gap-1.5 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                                            <Briefcase size={14} className="text-gray-400" /> {job.job_type || 'Full Time'}
                                        </span>
                                        <span className="flex items-center gap-1.5 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                                            <IndianRupee size={14} className="text-gray-400" /> {job.salary || 'Not Disclosed'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Job description section */}
                        <motion.div 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-8 md:p-12 rounded-[32px] border border-gray-100 shadow-sm flex flex-col gap-8"
                        >
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Scope & Requirements</h2>
                                <div className="w-10 h-1 bg-[#F97316] rounded-full mt-2"></div>
                            </div>

                            <div className="text-gray-600 font-medium leading-relaxed text-sm space-y-4 whitespace-pre-wrap break-words">
                                {job.description}
                            </div>

                            {/* Skills badges */}
                            <div className="border-t border-gray-100 pt-8 mt-4">
                                <h3 className="text-sm font-bold text-gray-900 mb-4 tracking-tight">Core Competencies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {(job.required_skills || job.skills_required || []).map((skill, index) => (
                                        <span 
                                            key={index} 
                                            className="bg-orange-50 text-[#F97316] text-[10px] font-black px-4.5 py-2.5 rounded-full border border-orange-100/50 uppercase tracking-widest hover:bg-[#F97316] hover:text-white transition-all duration-300"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right side widgets column */}
                    <div className="lg:col-span-1 flex flex-col gap-8 sticky top-28">
                        
                        {/* Application Box */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col gap-6"
                        >
                            <h3 className="text-lg font-bold text-gray-900 tracking-tight">Apply for Position</h3>
                            
                            <div className="flex flex-col gap-2.5 text-xs font-semibold text-gray-400">
                                <div className="flex justify-between">
                                    <span>Job Reference ID:</span>
                                    <span className="font-mono text-gray-700 font-bold">{job.job_id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Listing Release:</span>
                                    <span className="text-gray-700">
                                        {job.created_at ? new Date(job.created_at).toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: 'numeric'}) : 'Recently'}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="flex gap-4 w-full">
                                <button
                                    onClick={toggleWishlist}
                                    className={`p-4 rounded-full transition-all border cursor-pointer ${
                                        wishlist.includes(jobId) 
                                            ? 'bg-[#F97316] border-[#F97316] text-white shadow-sm' 
                                            : 'bg-white border-gray-200 text-gray-400 hover:border-[#F97316] hover:text-[#F97316]'
                                    }`}
                                >
                                    <Heart size={20} fill={wishlist.includes(jobId) ? "currentColor" : "none"} />
                                </button>

                                {applied ? (
                                    <button 
                                        disabled 
                                        className="flex-grow bg-gray-100 text-gray-400 py-4 rounded-full font-bold text-sm border border-gray-200 cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        Application Submitted <CheckCircle size={18} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleApply}
                                        disabled={applying}
                                        className="flex-grow bg-[#F97316] text-white py-4 rounded-full font-bold text-sm hover:bg-[#EA580C] hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        {applying ? (
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                Submit Application <ArrowRight size={16} />
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                            
                            {!userId && (
                                <p className="text-center text-[10px] font-semibold text-gray-400 leading-normal">
                                    * Signing in is required to file applications.
                                </p>
                            )}
                        </motion.div>

                        {/* AI Match Widget */}
                        <AnimatePresence mode="wait">
                            {!userId ? (
                                <motion.div
                                    key="no-user"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-gradient-to-tr from-[#111827] to-[#1F2937] p-8 rounded-[32px] text-white flex flex-col gap-6 shadow-xl relative overflow-hidden"
                                >
                                    <div className="absolute -top-10 -left-10 w-28 h-28 bg-[#F97316]/10 rounded-full blur-xl"></div>
                                    <div className="flex items-center gap-2 text-[#F97316] font-bold text-xs uppercase tracking-widest">
                                        <Lock size={14} /> AI MATCH INSIGHTS
                                    </div>
                                    <h3 className="text-xl font-bold tracking-tight leading-snug">Unlock Match Analysis</h3>
                                    <p className="text-gray-400 text-xs font-semibold leading-relaxed">
                                        Log in to upload your resume, see fit match parameters, and list recommended tutorials.
                                    </p>
                                    <Link to="/login" className="flex items-center justify-center p-4 bg-[#F97316] text-white rounded-full hover:bg-[#EA580C] transition-all font-bold text-sm gap-2 shadow-md">
                                        Login to Analyze <ArrowRight size={16} />
                                    </Link>
                                </motion.div>
                            ) : loadingAI ? (
                                <motion.div
                                    key="loading-ai"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col items-center justify-center py-20 gap-4"
                                >
                                    <div className="w-10 h-10 border-4 border-orange-50 border-t-[#F97316] rounded-full animate-spin"></div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Comparing Skills...</p>
                                </motion.div>
                            ) : !hasResume ? (
                                <motion.div
                                    key="no-resume"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col gap-6 text-center"
                                >
                                    <div className="bg-orange-50 p-5 rounded-full text-[#F97316] w-14 h-14 flex items-center justify-center mx-auto">
                                        <Sparkles size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900 tracking-tight">AI Matching Score</h4>
                                        <p className="text-gray-400 font-semibold text-xs mt-2 leading-relaxed">
                                            Upload your PDF resume to let AI calculate missing competencies.
                                        </p>
                                    </div>
                                    <Link to="/candidate/resume-upload" className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white py-3.5 rounded-full font-bold text-sm shadow-md shadow-orange-500/10">
                                        Upload Resume Now
                                    </Link>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="ai-matched"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl flex flex-col gap-6 relative overflow-hidden"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-2 text-[#F97316] font-bold text-[10px] uppercase tracking-widest">
                                            <Sparkles size={14} className="animate-pulse" /> AI FIT SCORE
                                        </span>
                                        {matchPercentage !== null && (
                                            <span className="bg-orange-50 text-[#F97316] text-[10px] font-bold px-3 py-1 rounded-full border border-orange-100">
                                                Active
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-5 bg-gray-50 p-4.5 rounded-2xl border border-gray-100">
                                        <div className="relative flex items-center justify-center shrink-0">
                                            <svg className="w-16 h-16 transform -rotate-90">
                                                <circle cx="32" cy="32" r="26" stroke="#fff7ed" strokeWidth="6" fill="transparent" />
                                                <motion.circle 
                                                    cx="32" 
                                                    cy="32" 
                                                    r="26" 
                                                    stroke="#F97316" 
                                                    strokeWidth="6" 
                                                    fill="transparent" 
                                                    strokeDasharray={163}
                                                    initial={{ strokeDashoffset: 163 }}
                                                    animate={{ strokeDashoffset: 163 - (163 * (matchPercentage || 0)) / 100 }}
                                                    transition={{ duration: 1, ease: "easeOut" }}
                                                />
                                            </svg>
                                            <span className="absolute text-sm font-bold text-gray-900">{matchPercentage || 0}%</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-xs">Profile Synergy</h4>
                                            <p className="text-gray-400 text-[10px] font-semibold mt-1 leading-normal">
                                                {matchPercentage >= 80 ? 'Excellent match index!' : 
                                                 matchPercentage >= 50 ? 'Strong potential. Upgrade missing skills.' : 
                                                 'A few skills gap. Review recommendations below!'}
                                            </p>
                                        </div>
                                    </div>

                                    {skillGap && (
                                        <div className="flex flex-col gap-5">
                                            {/* Matched */}
                                            <div>
                                                <h4 className="text-[10px] font-bold text-gray-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                                    <CheckCircle size={14} className="text-[#F97316]" /> Matched Skills ({skillGap.matched_skills?.length || 0})
                                                </h4>
                                                <div className="flex flex-wrap gap-1">
                                                    {skillGap.matched_skills?.length > 0 ? (
                                                        skillGap.matched_skills.map((skill, index) => (
                                                            <span key={index} className="bg-orange-50/50 text-[#F97316] text-[9px] font-bold px-3 py-1 rounded-full border border-orange-100/30 uppercase tracking-wider">
                                                                {skill}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-xs font-medium text-gray-400 italic">None matched yet.</span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Missing */}
                                            <div>
                                                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                                    <AlertCircle size={14} className="text-yellow-500" /> Missing Core Skills ({skillGap.missing_skills?.length || 0})
                                                </h4>
                                                <div className="flex flex-wrap gap-1">
                                                    {skillGap.missing_skills?.length > 0 ? (
                                                        skillGap.missing_skills.map((skill, index) => (
                                                            <span key={index} className="bg-gray-100 text-gray-500 text-[9px] font-bold px-3 py-1 rounded-full border border-gray-200 uppercase tracking-wider">
                                                                {skill}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-xs font-medium text-gray-400 italic font-semibold">Ready to Apply! No skill mismatch.</span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* YouTube Tutorials Suggestions */}
                                            {skillGap.missing_skills?.length > 0 && Object.keys(skillGap.suggestions || {}).length > 0 && (
                                                <div className="border-t border-gray-100 pt-5 mt-2">
                                                    <h4 className="text-[10px] font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                                        <BookOpen size={14} className="text-red-500" /> AI Video Playlists
                                                    </h4>
                                                    <div className="flex flex-col gap-3.5 max-h-[220px] overflow-y-auto pr-1">
                                                        {Object.entries(skillGap.suggestions).map(([skill, videos]) => (
                                                            <div key={skill} className="bg-gray-50 p-3 rounded-2xl border border-gray-100 flex flex-col gap-1.5">
                                                                <span className="text-[9px] font-black uppercase tracking-widest text-[#F97316]">{skill}</span>
                                                                {videos.slice(0, 2).map((vid, vIdx) => (
                                                                    <a 
                                                                        key={vIdx}
                                                                        href={vid.url}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="flex items-start gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#F97316] transition-colors group/link"
                                                                    >
                                                                        <Youtube size={14} className="text-red-500 shrink-0 mt-0.5" />
                                                                        <span className="flex-grow line-clamp-2 leading-tight">{vid.title}</span>
                                                                        <ExternalLink size={10} className="text-gray-400 opacity-0 group-hover/link:opacity-100 shrink-0 mt-0.5 transition-opacity" />
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    )
}
