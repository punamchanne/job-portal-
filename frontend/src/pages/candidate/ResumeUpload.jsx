import React, { useState } from 'react'
import axios from 'axios'
import { UploadCloud, CheckCircle, Sparkles, FileText, X, ArrowRight, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import DashboardLayout from '../../components/DashboardLayout'
import { Link } from 'react-router-dom'

export default function ResumeUpload() {
    const [file, setFile] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [result, setResult] = useState(null)
    const userName = localStorage.getItem('userName') || "User"

    const handleUpload = async (e) => {
        e.preventDefault()
        if (!file) return
        const userId = localStorage.getItem('userId')
        const formData = new FormData()
        formData.append('file', file)

        setUploading(true)
        try {
            const res = await axios.post(`http://localhost:8000/api/candidate/upload-resume/${userId}`, formData)
            setResult(res.data.data)
        } catch (err) {
            alert("Oops! Could not read the file. Please try a PDF or Word file.")
        } finally {
            setUploading(false)
        }
    }

    return (
        <DashboardLayout role="candidate" userName={userName}>
            <div className="max-w-4xl mx-auto flex flex-col gap-8">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Update My <span className="text-[#00B074]">Resume</span></h2>
                    <p className="text-gray-500 font-bold mt-1">Upload your latest file so our AI can find the right job for you.</p>
                </motion.div>

                {/* Main Upload Card */}
                <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-xl shadow-green-50 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-[#00B074]/5 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>

                    <form onSubmit={handleUpload} className="flex flex-col gap-10">
                        <label className={`relative border-4 border-dashed rounded-[2.5rem] p-16 flex flex-col items-center justify-center cursor-pointer transition-all ${file ? 'border-emerald-200 bg-emerald-50/20' : 'border-gray-100 bg-gray-50/30 hover:bg-gray-50 hover:border-[#00B074]/30'}`}>
                            {file ? (
                                <div className="flex flex-col items-center gap-4 text-center">
                                    <div className="bg-[#00B074] p-6 rounded-3xl shadow-xl shadow-emerald-200">
                                        <FileText size={48} className="text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black text-gray-900 truncate max-w-xs">{file.name}</h4>
                                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mt-1">Ready to Scan</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={(e) => { e.preventDefault(); setFile(null); setResult(null); }}
                                        className="text-red-500 font-black flex items-center gap-1 hover:underline text-xs"
                                    >
                                        <X size={14} /> Remove File
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-6">
                                    <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 group-hover:scale-110 transition-transform">
                                        <UploadCloud size={48} className="text-[#00B074]" />
                                    </div>
                                    <div className="text-center">
                                        <h4 className="text-2xl font-black text-gray-900 mb-1">Upload PDF or Word</h4>
                                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Maximum size: 5MB</p>
                                    </div>
                                </div>
                            )}
                            <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files[0])} />
                        </label>

                        {!result && (
                            <button
                                type="submit"
                                disabled={!file || uploading}
                                className="w-full py-6 bg-[#00B074] text-white rounded-[2rem] font-black text-xl hover:bg-[#009663] transition-all shadow-2xl shadow-emerald-200 disabled:opacity-50 flex items-center justify-center gap-4 active:scale-95"
                            >
                                {uploading ? (
                                    <>
                                        <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                        AI is Reading...
                                    </>
                                ) : (
                                    <>
                                        <Zap size={24} />
                                        Scan My Resume
                                    </>
                                )}
                            </button>
                        )}
                    </form>

                    {/* Result Display */}
                    <AnimatePresence>
                        {result && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-12 bg-white p-10 rounded-[2.5rem] border border-emerald-100 shadow-inner overflow-hidden relative"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <CheckCircle size={100} className="text-[#00B074]" />
                                </div>

                                <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3 relative z-10">
                                    <Sparkles className="text-[#00B074]" />
                                    Scan Results
                                </h3>

                                <div className="flex flex-col gap-10 relative z-10">
                                    <div>
                                        <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 px-1">Skills Found</h4>
                                        <div className="flex flex-wrap gap-3">
                                            {result.skills?.map((s, i) => (
                                                <span key={i} className="bg-emerald-50 text-[#00B074] border border-emerald-100 px-5 py-3 rounded-2xl font-black text-sm shadow-sm">
                                                    {s}
                                                </span>
                                            ))}
                                            {(!result.skills || result.skills.length === 0) && (
                                                <p className="text-gray-400 font-bold italic p-4">Could not find specific skills. Please try another file!</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row items-center gap-6">
                                        <div className="flex-grow">
                                            <h4 className="text-lg font-black text-gray-900 mb-1">Excellent!</h4>
                                            <p className="text-gray-500 font-bold">Your profile is auto-filled. Please review your details before applying.</p>
                                        </div>
                                        <Link to="/candidate/profile" className="bg-[#2B3940] text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-[#1a2327] transition-all flex items-center gap-3 shadow-xl">
                                            Review My Profile <ArrowRight size={20} />
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
