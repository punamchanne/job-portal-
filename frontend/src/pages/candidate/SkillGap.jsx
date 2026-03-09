import React, { useState } from 'react'
import axios from 'axios'
import { Search, AlertTriangle, BookOpen, CheckCircle2, Zap, ArrowRight, Target } from 'lucide-react'
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
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Skill <span className="text-[#00B074]">Check</span></h2>
                    <p className="text-gray-500 font-bold mt-1">Compare your skills with a job to see what you need to learn.</p>
                </motion.div>

                {/* Analysis Tool Card */}
                <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-xl shadow-green-50 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-[#00B074]/5 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>

                    <div className="relative z-10 flex flex-col items-center text-center gap-8">
                        <div className="bg-emerald-50 w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-[#00B074] shadow-inner mb-2">
                            <Target size={36} />
                        </div>

                        <div className="max-w-md">
                            <h3 className="text-2xl font-black text-gray-900 mb-2">Enter Job ID</h3>
                            <p className="text-gray-400 font-bold text-sm">Paste the Job ID from any job posting to start the deep scan.</p>
                        </div>

                        <form onSubmit={handleAnalyze} className="w-full max-w-lg flex flex-col sm:flex-row gap-4">
                            <div className="flex-grow flex items-center bg-gray-50 px-6 py-4 rounded-2xl border border-gray-100 group-focus-within:ring-2 group-focus-within:ring-[#00B074] transition-all">
                                <Search className="text-gray-400 group-focus-within:text-[#00B074]" size={20} />
                                <input
                                    type="text"
                                    placeholder="e.g. 64abc123..."
                                    className="w-full bg-transparent border-0 focus:ring-0 font-black ml-3 text-gray-800 placeholder:text-gray-300 placeholder:font-bold"
                                    value={jobId}
                                    onChange={(e) => setJobId(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading || !jobId}
                                className="bg-[#2B3940] text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-[#1a2327] transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-2 active:scale-95"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>Check <Zap size={18} /></>
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
                                className="mt-16 bg-white overflow-hidden"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                    <div className="bg-emerald-50/50 p-8 rounded-[2.5rem] border border-emerald-100 flex flex-col gap-6">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-[#00B074] flex items-center gap-2">
                                            <CheckCircle2 size={16} /> Skills You Have
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {analysis.matched_skills.map((s, i) => (
                                                <span key={i} className="bg-white text-emerald-600 px-4 py-2 rounded-xl text-xs font-black border border-emerald-100 shadow-sm uppercase tracking-wider">{s}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-red-50/50 p-8 rounded-[2.5rem] border border-red-100 flex flex-col gap-6">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-red-500 flex items-center gap-2">
                                            <AlertTriangle size={16} /> Missing Skills
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {analysis.missing_skills.map((s, i) => (
                                                <span key={i} className="bg-white text-red-500 px-4 py-2 rounded-xl text-xs font-black border border-red-100 shadow-sm uppercase tracking-wider">{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50/50 p-10 rounded-[3rem] border border-gray-100 flex flex-col gap-8">
                                    <div>
                                        <h3 className="text-xl font-black text-gray-900 flex items-center gap-3">
                                            <BookOpen className="text-[#00B074]" /> Learning Paths
                                        </h3>
                                        <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest px-1">Best courses to fix your gap</p>
                                    </div>

                                    <div className="grid gap-6">
                                        {Object.entries(analysis.suggestions).map(([skill, videos], i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col gap-4"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="font-black text-gray-800 capitalize text-xl">{skill}</span>
                                                    <span className="bg-emerald-50 text-[#00B074] px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">YouTube Resources</span>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                                                    {videos.map((video, idx) => (
                                                        <a
                                                            key={idx}
                                                            href={video.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center justify-between bg-gray-50 hover:bg-emerald-50 p-4 rounded-2xl border border-transparent hover:border-emerald-100 transition-all group"
                                                        >
                                                            <div className="flex flex-col gap-1 overflow-hidden">
                                                                <span className="font-bold text-gray-700 text-sm truncate pr-4 group-hover:text-emerald-700">{video.title}</span>
                                                                <span className="text-[10px] text-gray-400 font-medium">Watch Tutorial</span>
                                                            </div>
                                                            <ArrowRight size={16} className="text-gray-300 group-hover:text-[#00B074] shrink-0" />
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
