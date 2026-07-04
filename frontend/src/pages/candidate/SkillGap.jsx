import React, { useState } from 'react'
import axios from 'axios'
import { Search, AlertTriangle, BookOpen, CheckCircle2, Zap, ArrowRight, Target, Activity } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import { motion, AnimatePresence } from 'framer-motion'

export default function SkillGap() {
    const [jobId, setJobId] = useState('')
    const [analysis, setAnalysis] = useState(null)
    const [loading, setLoading] = useState(false)
    const userName = localStorage.getItem('userName') || "User"

    const handleAnalyze = async (e) => {
        e.preventDefault()
        if (!jobId) return

        setLoading(true)
        try {
            const userId = localStorage.getItem('userId')
            const res = await axios.get(`http://localhost:8000/api/candidate/skill-gap/${userId}/${jobId}`)
            setAnalysis(res.data)
        } catch (err) {
            alert("Oops! Could not find this Job ID. Please check and try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <DashboardLayout role="candidate" userName={userName}>
            <div className="max-w-4xl mx-auto flex flex-col gap-10">
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
                            <Activity className="w-4 h-4 animate-pulse" />
                            AI Competency Index
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-white font-display">
                            Skill <span className="text-[#F97316]">Check</span>
                        </h2>
                        <p className="text-gray-405 text-xs sm:text-sm font-semibold max-w-xl">
                            Compare your profile skills with any job posting reference ID to see what you need to learn.
                        </p>
                    </div>
                </motion.div>

                {/* Analysis Tool Card */}
                <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-orange-50/30 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-500"></div>

                    <div className="relative z-10 flex flex-col items-center text-center gap-8">
                        <div className="bg-orange-50 w-20 h-20 rounded-2xl flex items-center justify-center text-[#F97316] shadow-sm">
                            <Target size={36} />
                        </div>

                        <div className="max-w-md">
                            <h3 className="text-xl font-bold text-gray-900 mb-1 tracking-tight">Compare Job Reference</h3>
                            <p className="text-gray-400 font-semibold text-xs leading-normal">Paste the unique Job ID from any listing to perform the competency comparison.</p>
                        </div>

                        <form onSubmit={handleAnalyze} className="w-full max-w-lg flex flex-col sm:flex-row gap-4">
                            <div className="flex-grow flex items-center bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100 focus-within:border-[#F97316] transition-colors">
                                <Search className="text-gray-400 shrink-0" size={18} />
                                <input
                                    type="text"
                                    placeholder="e.g. 64abc123..."
                                    className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 font-semibold ml-3 text-gray-800 placeholder:text-gray-300 text-sm"
                                    value={jobId}
                                    onChange={(e) => setJobId(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading || !jobId}
                                className="bg-[#111827] text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-black transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                            >
                                {loading ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>Verify <Zap size={14} /></>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Results Section */}
                    <AnimatePresence>
                        {analysis && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-14 bg-white overflow-hidden"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                    {/* Matched skills */}
                                    <div className="bg-orange-50/20 p-8 rounded-[24px] border border-orange-100/30 flex flex-col gap-6">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-[#F97316] flex items-center gap-2">
                                            <CheckCircle2 size={16} /> Skills You Match
                                        </h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {analysis.matched_skills.map((s, i) => (
                                                <span key={i} className="bg-white text-[#F97316] px-4 py-2 rounded-xl text-xs font-bold border border-orange-100/30 uppercase tracking-wider">{s}</span>
                                            ))}
                                            {analysis.matched_skills.length === 0 && (
                                                <span className="text-xs font-semibold text-gray-400 italic">None matched yet.</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Missing skills */}
                                    <div className="bg-gray-50/50 p-8 rounded-[24px] border border-gray-100 flex flex-col gap-6">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                            <AlertTriangle size={16} className="text-gray-400" /> Missing Competencies
                                        </h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {analysis.missing_skills.map((s, i) => (
                                                <span key={i} className="bg-white text-gray-500 px-4 py-2 rounded-xl text-xs font-bold border border-gray-200 uppercase tracking-wider">{s}</span>
                                            ))}
                                            {analysis.missing_skills.length === 0 && (
                                                <span className="text-xs font-semibold text-gray-400 italic">All skills matched! Ready to apply.</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Learning recommendations */}
                                <div className="bg-gray-50/30 p-8 rounded-[28px] border border-gray-100 flex flex-col gap-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                            <BookOpen className="text-[#F97316]" size={20} /> AI Learning Recommendations
                                        </h3>
                                        <p className="text-[10px] font-black text-gray-400 mt-1 uppercase tracking-widest">Targeted Video Playlists for missing skills</p>
                                    </div>

                                    <div className="grid gap-4">
                                        {Object.entries(analysis.suggestions).map(([skill, videos], i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col gap-4 shadow-sm"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="font-bold text-gray-900 capitalize text-base">{skill}</span>
                                                    <span className="bg-orange-50 text-[#F97316] px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider border border-orange-100">YouTube Support</span>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-1">
                                                    {videos.map((video, idx) => (
                                                        <a
                                                            key={idx}
                                                            href={video.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center justify-between bg-gray-50 hover:bg-orange-50/20 p-4 rounded-xl border border-transparent hover:border-orange-100/50 transition-all group"
                                                        >
                                                            <div className="flex flex-col gap-1 overflow-hidden pr-2">
                                                                <span className="font-bold text-gray-700 text-xs truncate group-hover:text-[#F97316]">{video.title}</span>
                                                                <span className="text-[9px] text-gray-400 font-semibold">Start Course</span>
                                                            </div>
                                                            <ArrowRight size={14} className="text-gray-300 group-hover:text-[#F97316] shrink-0" />
                                                        </a>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </DashboardLayout>
    )
}
