import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
    LayoutDashboard, Users, Briefcase,
    ShieldCheck, LogOut, Menu, X,
    FileText, Target, Activity, Send,
    Settings, Bell, ChevronRight, Plus, FileCheck, User, CheckCircle
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../config/api'

export default function DashboardLayout({ children, role, userName }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [hasResume, setHasResume] = useState(false)
    const location = useLocation()
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        if (role === 'candidate' && userId) {
            api.get(`/api/candidate/profile/${userId}`)
                .then(res => {
                    if (res.data.resume_path) setHasResume(true)
                })
                .catch(() => {})
        }
    }, [role, userId])

    const adminLinks = [
        { name: 'Overview', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Review Applicants', path: '/admin/applicants', icon: <FileText size={20} /> },
        { name: 'Manage People', path: '/admin/manage-users', icon: <Users size={20} /> },
        { name: 'Manage Jobs', path: '/admin/manage-jobs', icon: <Briefcase size={20} /> },
    ]

    const candidateLinks = [
        { name: 'Dashboard', path: '/candidate/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Applications', path: '/candidate/applications', icon: <FileCheck size={20} /> },
        { name: 'Resume', path: '/candidate/resume-upload', icon: <FileText size={20} /> },
        { name: 'Recommendations', path: '/candidate/recommendations', icon: <Target size={20} /> },
        { name: 'Skill Gap', path: '/candidate/skill-gap', icon: <Activity size={20} /> },
        { name: 'Profile', path: '/candidate/profile', icon: <User size={20} /> },
    ]

    const employerLinks = [
        { name: 'Dashboard', path: '/employer/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'My Posted Jobs', path: '/employer/my-jobs', icon: <Briefcase size={20} /> },
        { name: 'Add New Job', path: '/employer/post-job', icon: <Plus size={20} /> },
        { name: 'Applicants', path: '/employer/applicants', icon: <Users size={20} /> },
    ]

    const links = role === 'admin' ? adminLinks : role === 'employer' ? employerLinks : candidateLinks

    const handleLogout = () => {
        localStorage.clear()
        window.location.href = '/'
    }

    return (
        <div className="flex min-h-screen bg-[#F8F9FA]">
            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 h-full bg-white border-r border-gray-100 z-50 transition-all duration-300 ${isSidebarOpen ? 'w-72' : 'w-20'}`}
            >
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="p-6 flex items-center justify-between">
                        {isSidebarOpen && (
                            <Link to="/" className="flex items-center gap-2 group">
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#F97316] to-[#FDBA74] flex items-center justify-center shadow-md">
                                    <span className="text-white font-black text-sm italic">R</span>
                                </div>
                                <span className="text-xl font-black text-gray-900">Road<span className="text-[#F97316]">2Job</span></span>
                            </Link>
                        )}
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 hover:bg-orange-50 text-[#F97316] rounded-xl transition-colors cursor-pointer"
                        >
                            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-grow px-4 py-6 flex flex-col gap-2">
                        {links.map((link) => {
                            const isActive = location.pathname === link.path
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group ${isActive ? 'bg-[#F97316] text-white shadow-lg shadow-orange-500/10' : 'text-gray-500 hover:bg-orange-50/50 hover:text-[#F97316]'}`}
                                >
                                    <div className={`${isActive ? 'text-white' : 'text-gray-400 group-hover:text-[#F97316]'} transition-colors duration-300`}>
                                        {link.icon}
                                    </div>
                                    {isSidebarOpen && (
                                        <span className="font-bold tracking-tight text-[15px]">{link.name}</span>
                                    )}
                                    {isActive && isSidebarOpen && (
                                        <motion.div layoutId="activeDot" className="ml-auto w-2 h-2 bg-white rounded-full"></motion.div>
                                    )}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="p-4 mt-auto">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all group cursor-pointer"
                        >
                            <LogOut size={20} />
                            {isSidebarOpen && <span className="font-bold tracking-tight text-[15px]">Sign Out</span>}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-grow transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-20'}`}>
                {/* Page Content */}
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
