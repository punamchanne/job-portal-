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
                    <div className="w-16 h-16 border-8 border-emerald-50 border-t-[#00B074] rounded-full animate-spin"></div>
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout role="candidate" userName={userName}>
            <div className="flex flex-col gap-8 max-w-5xl mx-auto">
                {/* Header */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">My Professional <span className="text-[#00B074]">Profile</span></h2>
                        <p className="text-gray-500 font-bold mt-1">Keep your profile updated to get the best job recommendations.</p>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={saving || !isDirty}
                        className="bg-[#00B074] text-white px-8 py-3 rounded-2xl font-black shadow-xl shadow-emerald-200 hover:bg-[#009663] transition-all flex items-center gap-2 justify-center w-full md:w-auto disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
                    >
                        {saving ? "Saving..." : !isDirty ? <><Check size={20} /> Saved</> : <><Save size={20} /> Save Profile</>}
                    </button>
                </motion.div>

                {/* Personal Info & Bio */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row gap-10 items-start">
                    <div className="w-32 h-32 bg-[#00B074]/10 rounded-[2.5rem] flex items-center justify-center text-[#00B074] shrink-0 border-4 border-white shadow-lg">
                        <User size={60} strokeWidth={1.5} />
                    </div>
                    <div className="flex-grow flex flex-col gap-6 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Full Name (Registered)</label>
                                <div className="bg-gray-100/50 px-6 py-4 rounded-2xl font-bold text-gray-400 border border-transparent cursor-not-allowed">
                                    {profile.name}
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Primary Email (Registered)</label>
                                <div className="bg-gray-100/50 px-6 py-4 rounded-2xl font-bold text-gray-400 border border-transparent cursor-not-allowed">
                                    {profile.email}
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Alternate Email</label>
                                <input
                                    type="email"
                                    className="w-full bg-gray-50 px-6 py-4 rounded-2xl font-bold text-gray-800 border-2 border-transparent focus:border-[#00B074] focus:bg-white transition-all outline-none"
                                    value={profile.alternate_email}
                                    onChange={e => {
                                        setProfile(prev => ({ ...prev, alternate_email: e.target.value }));
                                        markDirty();
                                    }}
                                    placeholder="e.g. secondary-email@example.com"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Contact Number</label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-50 px-6 py-4 rounded-2xl font-bold text-gray-800 border-2 border-transparent focus:border-[#00B074] focus:bg-white transition-all outline-none"
                                    value={profile.contact_number}
                                    onChange={e => {
                                        setProfile(prev => ({ ...prev, contact_number: e.target.value }));
                                        markDirty();
                                    }}
                                    placeholder="e.g. +91 9876543210"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Profile Completeness</label>
                                <div className="flex items-center gap-4 bg-emerald-50 px-6 py-4 rounded-2xl border border-emerald-100">
                                    <div className="flex-grow bg-emerald-100 h-2 rounded-full overflow-hidden">
                                        <div
                                            className="bg-[#00B074] h-full transition-all duration-1000"
                                            style={{ width: `${(profile.skills.length > 0 ? 25 : 0) + (profile.experience.length > 0 ? 25 : 0) + (profile.education.length > 0 ? 25 : 0) + (profile.bio ? 25 : 0)}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-xs font-black text-[#00B074]">
                                        {(profile.skills.length > 0 ? 25 : 0) + (profile.experience.length > 0 ? 25 : 0) + (profile.education.length > 0 ? 25 : 0) + (profile.bio ? 25 : 0)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Professional Bio / Summary</label>
                            <textarea
                                className="w-full bg-gray-50 border-0 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-[#00B074] transition-all font-medium text-gray-700 h-32 resize-none"
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
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col gap-5">
                        <h3 className="text-xl font-black flex items-center gap-2 text-gray-800"><Code className="text-[#00B074]" size={24} /> Professional Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {profile.skills.map((s, i) => (
                                <span key={i} className="bg-emerald-50 text-[#00B074] px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 border border-emerald-100">
                                    {s}
                                    <button onClick={() => handleRemoveItem('skills', i)} className="text-emerald-300 hover:text-emerald-700 font-bold hover:text-red-500 transition-colors">&times;</button>
                                </span>
                            ))}
                        </div>
                        <div className="flex mt-2">
                            <input
                                type="text" placeholder="Add a skill" className="flex-grow bg-gray-50 border border-gray-100 px-4 py-3 rounded-l-2xl font-medium focus:ring-0 focus:border-[#00B074]"
                                value={inputs.skill} onChange={e => setInputs(prev => ({ ...prev, skill: e.target.value }))}
                                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddItem('skills', 'skill'); } }}
                            />
                            <button onClick={() => handleAddItem('skills', 'skill')} className="bg-[#2B3940] text-white px-6 rounded-r-2xl font-black hover:bg-[#1a2327]">Add</button>
                        </div>
                    </motion.div>

                    {/* Education */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col gap-5">
                        <h3 className="text-xl font-black flex items-center gap-2 text-gray-800"><BookOpen className="text-[#00B074]" size={24} /> Education</h3>
                        <div className="flex flex-col gap-3">
                            {profile.education.map((edu, i) => (
                                <div key={i} className="bg-gray-50 p-4 rounded-2xl flex justify-between items-start border border-gray-100 hover:border-emerald-200 transition-all">
                                    <span className="font-medium text-gray-700 text-sm whitespace-pre-wrap">{edu}</span>
                                    <button onClick={() => handleRemoveItem('education', i)} className="text-gray-300 hover:text-red-500 font-bold text-lg leading-none">&times;</button>
                                </div>
                            ))}
                        </div>
                        <div className="flex mt-2">
                            <input
                                type="text" placeholder="Add school, degree, or course" className="flex-grow bg-gray-50 border border-gray-100 px-4 py-3 rounded-l-2xl font-medium focus:ring-0 focus:border-[#00B074]"
                                value={inputs.education} onChange={e => setInputs(prev => ({ ...prev, education: e.target.value }))}
                                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddItem('education', 'education'); } }}
                            />
                            <button onClick={() => handleAddItem('education', 'education')} className="bg-[#2B3940] text-white px-6 rounded-r-2xl font-black hover:bg-[#1a2327]">Add</button>
                        </div>
                    </motion.div>

                    {/* Certifications (New Section) */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col gap-5">
                        <h3 className="text-xl font-black flex items-center gap-2 text-gray-800"><Award className="text-[#00B074]" size={24} /> Certifications</h3>
                        <div className="flex flex-col gap-3">
                            {profile.certifications.map((cert, i) => (
                                <div key={i} className="bg-gray-50 p-4 rounded-2xl flex justify-between items-start border border-gray-100 hover:border-emerald-200 transition-all">
                                    <span className="font-medium text-gray-700 text-sm whitespace-pre-wrap">{cert}</span>
                                    <button onClick={() => handleRemoveItem('certifications', i)} className="text-gray-300 hover:text-red-500 font-bold text-lg leading-none">&times;</button>
                                </div>
                            ))}
                        </div>
                        <div className="flex mt-2">
                            <input
                                type="text" placeholder="Add certification name" className="flex-grow bg-gray-50 border border-gray-100 px-4 py-3 rounded-l-2xl font-medium focus:ring-0 focus:border-[#00B074]"
                                value={inputs.certification} onChange={e => setInputs(prev => ({ ...prev, certification: e.target.value }))}
                                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddItem('certifications', 'certification'); } }}
                            />
                            <button onClick={() => handleAddItem('certifications', 'certification')} className="bg-[#2B3940] text-white px-6 rounded-r-2xl font-black hover:bg-[#1a2327]">Add</button>
                        </div>
                    </motion.div>

                    {/* Experience */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col gap-5">
                        <h3 className="text-xl font-black flex items-center gap-2 text-gray-800"><Briefcase className="text-[#00B074]" size={24} /> Work Experience</h3>
                        <div className="flex flex-col gap-3">
                            {profile.experience.map((exp, i) => (
                                <div key={i} className="bg-gray-50 p-4 rounded-2xl flex justify-between items-start border border-gray-100 hover:border-emerald-200 transition-all">
                                    <span className="font-medium text-gray-700 text-sm whitespace-pre-wrap">{exp}</span>
                                    <button onClick={() => handleRemoveItem('experience', i)} className="text-gray-300 hover:text-red-500 font-bold text-lg leading-none">&times;</button>
                                </div>
                            ))}
                        </div>
                        <div className="flex mt-2">
                            <input
                                type="text" placeholder="Add job title and company" className="flex-grow bg-gray-50 border border-gray-100 px-4 py-3 rounded-l-2xl font-medium focus:ring-0 focus:border-[#00B074]"
                                value={inputs.experience} onChange={e => setInputs(prev => ({ ...prev, experience: e.target.value }))}
                                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddItem('experience', 'experience'); } }}
                            />
                            <button onClick={() => handleAddItem('experience', 'experience')} className="bg-[#2B3940] text-white px-6 rounded-r-2xl font-black hover:bg-[#1a2327]">Add</button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </DashboardLayout>
    )
}
