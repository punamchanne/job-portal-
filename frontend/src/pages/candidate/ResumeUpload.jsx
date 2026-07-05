import React, { useState, useEffect } from 'react'
import api from '../../config/api'
import { UploadCloud, CheckCircle, Sparkles, FileText, X, ArrowRight, Zap, RefreshCw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import DashboardLayout from '../../components/DashboardLayout'
import { Link } from 'react-router-dom'

export default function ResumeUpload() {
    const [file, setFile] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [result, setResult] = useState(null)
    const [hasExistingResume, setHasExistingResume] = useState(false)
    const userName = localStorage.getItem('userName') || "User"
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        if (userId) {
            api.get(`/api/candidate/profile/${userId}`)
                .then(res => {
                    if (res.data.resume_path) setHasExistingResume(true)
                })
                .catch(() => {})
        }
    }, [userId])

    const handleUpload = async (e) => {
        e.preventDefault()
        if (!file) return
        const formData = new FormData()
        formData.append('file', file)

        setUploading(true)
        try {
            const res = await api.post(`/api/candidate/upload-resume/${userId}`, formData)
            setResult(res.data.data)
            setHasExistingResume(true)
        } catch (err) {
            alert("Oops! Could not read the file. Please try a PDF or Word file.")
        } finally {
            setUploading(false)
        }
    }

    return (
        <DashboardLayout role="candidate" userName={userName}>
            <div className="max-w-4xl mx-auto flex flex-col gap-8">
                {/* Header Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative p-10 bg-[#111827] rounded-[32px] text-white overflow-hidden shadow-xl mb-2 text-left"
                >
                    {/* Concentric rotating circles in banner */}
                    <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-[200px] h-[200px] border border-orange-500/10 rounded-full pointer-events-none animate-spin-slow -z-5"></div>
                    <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-[260px] h-[260px] border border-dashed border-gray-800 rounded-full pointer-events-none -z-5"></div>
                    <div className="absolute top-10 right-1/4 w-40 h-40 bg-[#F97316]/5 rounded-full blur-2xl pointer-events-none -z-5"></div>

                    <div className="relative z-10">
                        <span className="flex items-center gap-2 text-[#F97316] font-bold text-xs uppercase tracking-widest mb-4">
                            <Sparkles className="w-4 h-4 animate-pulse" />
                            AI Parsing Engine
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-white font-display">
                            {hasExistingResume ? (
                                <>Update My <span className="text-[#F97316]">Resume</span></>
                            ) : (
                                <>Upload My <span className="text-[#F97316]">Resume</span></>
                            )}
                        </h2>
                        <p className="text-gray-405 text-xs sm:text-sm font-semibold max-w-xl">
                            {hasExistingResume
                                ? "Upload a new resume to update your profile qualifications and AI match calculations."
                                : "Upload your resume so our AI scanner can map your skills to open roles."
                            }
                        </p>
                    </div>
                </motion.div>

                {/* Main Upload Card */}
                <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-orange-50/30 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-500"></div>

                    <form onSubmit={handleUpload} className="flex flex-col gap-8 relative z-10">
                        <label className={`relative border-4 border-dashed rounded-[24px] p-16 flex flex-col items-center justify-center cursor-pointer transition-all ${file ? 'border-orange-200 bg-orange-50/20' : 'border-gray-150 bg-gray-50/50 hover:bg-gray-50 hover:border-orange-200'}`}>
                            {file ? (
                                <div className="flex flex-col items-center gap-4 text-center">
                                    <div className="bg-[#F97316] p-6 rounded-2xl shadow-lg shadow-orange-500/10">
                                        <FileText size={40} className="text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900 truncate max-w-xs">{file.name}</h4>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Ready to Upload</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={(e) => { e.preventDefault(); setFile(null); setResult(null); }}
                                        className="text-red-500 font-bold flex items-center gap-1 hover:underline text-xs cursor-pointer"
                                    >
                                        <X size={12} /> Remove file
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-6">
                                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                                        {hasExistingResume ? <RefreshCw size={36} className="text-[#F97316]" /> : <UploadCloud size={36} className="text-[#F97316]" />}
                                    </div>
                                    <div className="text-center">
                                        <h4 className="text-xl font-bold text-gray-900 mb-1 tracking-tight">
                                            {hasExistingResume ? "Select New PDF or Word Document" : "Select PDF or Word Document"}
                                        </h4>
                                        <p className="text-gray-400 font-semibold text-xs">Maximum size limit: 5MB</p>
                                    </div>
                                </div>
                            )}
                            <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files[0])} />
                        </label>

                        {!result && (
                            <button
                                type="submit"
                                disabled={!file || uploading}
                                className="w-full py-4.5 bg-[#F97316] text-white rounded-full font-bold text-base hover:bg-[#EA580C] shadow-md shadow-orange-500/10 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                            >
                                {uploading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Analyzing resume...
                                    </>
                                ) : (
                                    <>
                                        <Zap size={18} />
                                        {hasExistingResume ? "Update & Scan Profile" : "Upload & Scan Profile"}
                                    </>
                                )}
                            </button>
                        )}
                    </form>

                    {/* Result Display */}
                    <AnimatePresence>
                        {result && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-10 bg-orange-50/30 p-8 rounded-[24px] border border-orange-100/50 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <CheckCircle size={80} className="text-[#F97316]" />
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 relative z-10">
                                    <Sparkles className="text-[#F97316]" size={20} />
                                    Scan Results
                                </h3>

                                <div className="flex flex-col gap-8 relative z-10">
                                    <div>
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 block">Skills Extracted</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {result.skills?.map((s, i) => (
                                                <span key={i} className="bg-white text-[#F97316] border border-orange-100/50 px-4 py-2 rounded-xl font-bold text-xs shadow-sm uppercase tracking-wider">
                                                    {s}
                                                </span>
                                            ))}
                                            {(!result.skills || result.skills.length === 0) && (
                                                <p className="text-xs font-semibold text-gray-400 italic">No explicit skills found. Try updating details manually.</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-gray-200/50 flex flex-col md:flex-row items-center gap-6">
                                        <div className="flex-grow">
                                            <h4 className="text-base font-bold text-gray-900 mb-1">Upload Completed!</h4>
                                            <p className="text-gray-500 font-semibold text-xs">AI has successfully read your file. Please verify extracted competencies in your profile settings.</p>
                                        </div>
                                        <Link to="/candidate/profile" className="bg-[#111827] text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-black transition-colors flex items-center gap-2 shrink-0">
                                            Verify Profile <ArrowRight size={16} />
                                        </Link>
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
