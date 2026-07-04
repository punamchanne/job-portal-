import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Save, User, BookOpen, Briefcase, Award, Zap, Code, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import DashboardLayout from '../../components/DashboardLayout'

export default function CandidateProfile() {
    const userName = localStorage.getItem('userName') || "User"
    const userId = localStorage.getItem('userId')
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [isDirty, setIsDirty] = useState(false)

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        alternate_email: "",
        contact_number: "",
        bio: "",
        resume_path: "",
        skills: [],
        education: [],
        experience: [],
        certifications: []
    })

    const [inputs, setInputs] = useState({
        skill: "",
        education: "",
        experience: "",
        certification: ""
    })

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/candidate/profile/${userId}`)
                if (res.data) {
                    setProfile({
                        name: res.data.name || "",
                        email: res.data.email || "",
                        alternate_email: res.data.alternate_email || "",
                        contact_number: res.data.contact_number || "",
                        bio: res.data.bio || "",
                        resume_path: res.data.resume_path || "",
                        skills: res.data.skills || [],
                        education: res.data.education || [],
                        experience: res.data.experience || [],
                        certifications: res.data.certifications || []
                    })
                }
            } catch (err) {
                console.error("Error fetching profile", err)
            } finally {
                setLoading(false)
            }
        }
        fetchProfile()
    }, [userId])

    const handleSave = async () => {
        setSaving(true)
        try {
            await axios.put(`http://localhost:8000/api/candidate/profile/${userId}`, profile)
            alert("Profile successfully updated!")
            setIsDirty(false)
        } catch (err) {
            alert("Failed to save profile.")
        } finally {
            setSaving(false)
        }
    }

    const markDirty = () => setIsDirty(true)

    const handleAddItem = (field, key) => {
        if (!inputs[key].trim()) return
        setProfile(prev => ({ ...prev, [field]: [...prev[field], inputs[key]] }))
        setInputs(prev => ({ ...prev, [key]: "" }))
        markDirty()
    }

    const handleRemoveItem = (field, idx) => {
        setProfile(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== idx)
        }))
        markDirty()
    }

    if (loading) {
        return (
            <DashboardLayout role="candidate" userName={userName}>
                <div className="flex justify-center items-center py-32">
                    <div className="w-14 h-14 border-4 border-orange-50 border-t-[#F97316] rounded-full animate-spin"></div>
                </div>
            </DashboardLayout>
        )
    }

    const profilePercent = (profile.skills.length > 0 ? 25 : 0) + 
                         (profile.experience.length > 0 ? 25 : 0) + 
                         (profile.education.length > 0 ? 25 : 0) + 
                         (profile.bio ? 25 : 0);

    return (
        <DashboardLayout role="candidate" userName={userName}>
            <div className="flex flex-col gap-8 max-w-5xl mx-auto">
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
                                <User className="w-4 h-4 animate-pulse" />
                                Talent Portfolio
                            </span>
                            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-white font-display">
                                My Professional <span className="text-[#F97316]">Profile</span>
                            </h2>
                            <p className="text-gray-455 text-xs sm:text-sm font-semibold max-w-xl">
                                Keep your profile updated to get the best AI job recommendations and candidate fits.
                            </p>
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={saving || !isDirty}
                            className="bg-[#F97316] text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-orange-500/10 hover:bg-[#EA580C] hover:shadow-xl transition-all flex items-center gap-2 justify-center shrink-0 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed cursor-pointer text-sm"
                        >
                            {saving ? "Saving..." : !isDirty ? <><Check size={18} /> Profile Saved</> : <><Save size={18} /> Save Settings</>}
                        </button>
                    </div>
                </motion.div>

                {/* Personal Info & Bio */}
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 md:p-12 rounded-[32px] border border-gray-100 shadow-sm flex flex-col md:flex-row gap-10 items-start">
                    <div className="w-28 h-28 bg-orange-50 rounded-[24px] flex items-center justify-center text-[#F97316] shrink-0 border-4 border-white shadow-md">
                        <User size={48} strokeWidth={1.5} />
                    </div>
                    <div className="flex-grow flex flex-col gap-6 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Full Name (Registered)</label>
                                <div className="bg-gray-100/50 px-6 py-3.5 rounded-2xl font-bold text-gray-400 border border-transparent cursor-not-allowed text-sm">
                                    {profile.name}
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Primary Email (Registered)</label>
                                <div className="bg-gray-100/50 px-6 py-3.5 rounded-2xl font-bold text-gray-400 border border-transparent cursor-not-allowed text-sm">
                                    {profile.email}
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Alternate Email</label>
                                <input
                                    type="email"
                                    className="w-full bg-gray-50 px-6 py-3.5 rounded-2xl font-semibold text-gray-800 border-2 border-transparent focus:border-[#F97316] focus:bg-white transition-all outline-none text-sm"
                                    value={profile.alternate_email}
                                    onChange={e => {
                                        setProfile(prev => ({ ...prev, alternate_email: e.target.value }));
                                        markDirty();
                                    }}
                                    placeholder="e.g. secondary-email@example.com"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Contact Number</label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-50 px-6 py-3.5 rounded-2xl font-semibold text-gray-800 border-2 border-transparent focus:border-[#F97316] focus:bg-white transition-all outline-none text-sm"
                                    value={profile.contact_number}
                                    onChange={e => {
                                        setProfile(prev => ({ ...prev, contact_number: e.target.value }));
                                        markDirty();
                                    }}
                                    placeholder="e.g. +91 9876543210"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Profile Completeness</label>
                                <div className="flex items-center gap-4 bg-orange-50/50 px-6 py-4 rounded-2xl border border-orange-100/30">
                                    <div className="flex-grow bg-orange-100/30 h-2.5 rounded-full overflow-hidden">
                                        <div
                                            className="bg-[#F97316] h-full transition-all duration-1000"
                                            style={{ width: `${profilePercent}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-xs font-bold text-[#F97316]">
                                        {profilePercent}%
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Professional Bio / Summary</label>
                            <textarea
                                className="w-full bg-gray-50 border border-gray-100 focus:border-[#F97316] px-6 py-4 rounded-2xl focus:outline-none transition-all font-semibold text-gray-700 h-28 resize-none text-sm"
                                placeholder="Describe your professional background and career goals..."
                                value={profile.bio}
                                onChange={e => {
                                    setProfile(prev => ({ ...prev, bio: e.target.value }));
                                    markDirty();
                                }}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Profile Sections Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Skills */}
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-8 rounded-[28px] border border-gray-100 shadow-sm flex flex-col gap-5">
                        <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900 tracking-tight"><Code className="text-[#F97316]" size={22} /> Professional Skills</h3>
                        <div className="flex flex-wrap gap-1.5">
                            {profile.skills.map((s, i) => (
                                <span key={i} className="bg-orange-50 text-[#F97316] px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border border-orange-100/30 uppercase tracking-wider">
                                    {s}
                                    <button onClick={() => handleRemoveItem('skills', i)} className="text-orange-300 hover:text-orange-700 font-bold transition-colors cursor-pointer">&times;</button>
                                </span>
                            ))}
                        </div>
                        <div className="flex mt-2">
                            <input
                                type="text" placeholder="Add a skill (e.g. React, Docker)" className="flex-grow bg-gray-50 border border-gray-100 border-r-0 px-5 py-3 rounded-l-2xl font-semibold text-sm focus:outline-none focus:border-[#F97316]"
                                value={inputs.skill} onChange={e => setInputs(prev => ({ ...prev, skill: e.target.value }))}
                                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddItem('skills', 'skill'); } }}
                            />
                            <button onClick={() => handleAddItem('skills', 'skill')} className="bg-[#111827] text-white px-6 rounded-r-2xl font-bold hover:bg-black transition-colors cursor-pointer">Add</button>
                        </div>
                    </motion.div>

                    {/* Education */}
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white p-8 rounded-[28px] border border-gray-100 shadow-sm flex flex-col gap-5">
                        <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900 tracking-tight"><BookOpen className="text-[#F97316]" size={22} /> Education</h3>
                        <div className="flex flex-col gap-3">
                            {profile.education.map((edu, i) => (
                                <div key={i} className="bg-gray-50 p-4 rounded-xl flex justify-between items-start border border-gray-100 hover:border-orange-100 transition-all">
                                    <span className="font-semibold text-gray-700 text-xs whitespace-pre-wrap leading-relaxed">{edu}</span>
                                    <button onClick={() => handleRemoveItem('education', i)} className="text-gray-300 hover:text-red-500 font-bold text-lg leading-none cursor-pointer">&times;</button>
                                </div>
                            ))}
                        </div>
                        <div className="flex mt-2">
                            <input
                                type="text" placeholder="Add school, degree, or course details" className="flex-grow bg-gray-50 border border-gray-100 border-r-0 px-5 py-3 rounded-l-2xl font-semibold text-sm focus:outline-none focus:border-[#F97316]"
                                value={inputs.education} onChange={e => setInputs(prev => ({ ...prev, education: e.target.value }))}
                                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddItem('education', 'education'); } }}
                            />
                            <button onClick={() => handleAddItem('education', 'education')} className="bg-[#111827] text-white px-6 rounded-r-2xl font-bold hover:bg-black transition-colors cursor-pointer">Add</button>
                        </div>
                    </motion.div>

                    {/* Certifications */}
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-8 rounded-[28px] border border-gray-100 shadow-sm flex flex-col gap-5">
                        <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900 tracking-tight"><Award className="text-[#F97316]" size={22} /> Certifications</h3>
                        <div className="flex flex-col gap-3">
                            {profile.certifications.map((cert, i) => (
                                <div key={i} className="bg-gray-50 p-4 rounded-xl flex justify-between items-start border border-gray-100 hover:border-orange-100 transition-all">
                                    <span className="font-semibold text-gray-700 text-xs whitespace-pre-wrap leading-relaxed">{cert}</span>
                                    <button onClick={() => handleRemoveItem('certifications', i)} className="text-gray-300 hover:text-red-500 font-bold text-lg leading-none cursor-pointer">&times;</button>
                                </div>
                            ))}
                        </div>
                        <div className="flex mt-2">
                            <input
                                type="text" placeholder="Add certification name or board" className="flex-grow bg-gray-50 border border-gray-100 border-r-0 px-5 py-3 rounded-l-2xl font-semibold text-sm focus:outline-none focus:border-[#F97316]"
                                value={inputs.certification} onChange={e => setInputs(prev => ({ ...prev, certification: e.target.value }))}
                                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddItem('certifications', 'certification'); } }}
                            />
                            <button onClick={() => handleAddItem('certifications', 'certification')} className="bg-[#111827] text-white px-6 rounded-r-2xl font-bold hover:bg-black transition-colors cursor-pointer">Add</button>
                        </div>
                    </motion.div>

                    {/* Experience */}
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white p-8 rounded-[28px] border border-gray-100 shadow-sm flex flex-col gap-5">
                        <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900 tracking-tight"><Briefcase className="text-[#F97316]" size={22} /> Work Experience</h3>
                        <div className="flex flex-col gap-3">
                            {profile.experience.map((exp, i) => (
                                <div key={i} className="bg-gray-50 p-4 rounded-xl flex justify-between items-start border border-gray-100 hover:border-orange-100 transition-all">
                                    <span className="font-semibold text-gray-700 text-xs whitespace-pre-wrap leading-relaxed">{exp}</span>
                                    <button onClick={() => handleRemoveItem('experience', i)} className="text-gray-300 hover:text-red-500 font-bold text-lg leading-none cursor-pointer">&times;</button>
                                </div>
                            ))}
                        </div>
                        <div className="flex mt-2">
                            <input
                                type="text" placeholder="Add job title, company, and tenure" className="flex-grow bg-gray-50 border border-gray-100 border-r-0 px-5 py-3 rounded-l-2xl font-semibold text-sm focus:outline-none focus:border-[#F97316]"
                                value={inputs.experience} onChange={e => setInputs(prev => ({ ...prev, experience: e.target.value }))}
                                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddItem('experience', 'experience'); } }}
                            />
                            <button onClick={() => handleAddItem('experience', 'experience')} className="bg-[#111827] text-white px-6 rounded-r-2xl font-bold hover:bg-black transition-colors cursor-pointer">Add</button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </DashboardLayout>
    )
}
