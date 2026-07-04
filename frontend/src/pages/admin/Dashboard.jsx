import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { LayoutDashboard, Users, Briefcase, ShieldCheck, Globe, Activity, ArrowRight, UserPlus, FileCheck, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import DashboardLayout from '../../components/DashboardLayout'

export default function AdminDashboard() {
    const [stats, setStats] = useState({ total_users: 0, total_jobs: 0, total_companies: 0, total_applications: 0, recent_activity: [] })
    const userName = localStorage.getItem('userName') || "Admin"

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/admin/dashboard')
                setStats(res.data)
            } catch (err) { }
        }
        fetchStats()
    }, [])

    const data = [
        { name: 'People Joined', value: stats.total_users, color: '#F97316', icon: <Users size={20} /> },
        { name: 'Active Jobs', value: stats.total_jobs, color: '#111827', icon: <Briefcase size={20} /> },
        { name: 'Apps Received', value: stats.total_applications, color: '#EA580C', icon: <FileCheck size={20} /> }
    ]

    return (
        <DashboardLayout role="admin" userName={userName}>
            <div className="flex flex-col gap-10">
                {/* Header Section */}
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">System <span className="text-[#F97316]">Control Panel</span></h2>
                    <p className="text-gray-500 mt-1 text-sm font-semibold">Monitor and manage all activities on the Road2Job platform.</p>
                </motion.div>

                {/* Main Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white p-8 rounded-[28px] border border-gray-100 shadow-sm flex flex-col gap-4 relative overflow-hidden group hover:shadow-md hover:border-orange-100 transition-all"
                        >
                            <div className="bg-orange-50/50 p-4 rounded-2xl w-fit text-[#F97316] transition-colors">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="text-gray-400 font-bold uppercase tracking-widest text-[9px] mb-1">{item.name}</h3>
                                <p className="text-4xl font-extrabold tracking-tight" style={{ color: item.color }}>{item.value}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Activity Graph */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2 bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm relative overflow-hidden group"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2.5">
                                    <Activity className="w-5 h-5 text-[#F97316]" />
                                    Platform Usage Metric
                                </h2>
                                <p className="text-[10px] font-black text-gray-400 mt-1 uppercase tracking-widest">Statistical split of data records</p>
                            </div>
                            <span className="bg-orange-50 text-[#F97316] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider animate-pulse border border-orange-100">Active</span>
                        </div>

                        <div className="h-72 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={105}
                                        paddingAngle={8}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.06)', fontWeight: 'bold', padding: '10px' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Quick Access Sidebar Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="flex flex-col gap-6"
                    >
                        <div className="bg-[#111827] p-8 rounded-[32px] text-white overflow-hidden relative group">
                            <ShieldCheck className="absolute -top-10 -right-10 w-40 h-40 text-orange-500 opacity-5 rotate-12" />
                            <h3 className="text-lg font-bold mb-4 relative z-10">Quick Administration</h3>
                            <div className="flex flex-col gap-3 relative z-10">
                                <Link to="/admin/applicants" className="flex items-center justify-between p-3.5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-white/15 transition-all text-sm font-semibold group/item">
                                    Review Applicants <ArrowRight size={16} className="text-gray-500 group-hover/item:translate-x-0.5 transition-transform" />
                                </Link>
                                <Link to="/admin/manage-users" className="flex items-center justify-between p-3.5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-white/15 transition-all text-sm font-semibold group/item">
                                    Manage People <ArrowRight size={16} className="text-gray-500 group-hover/item:translate-x-0.5 transition-transform" />
                                </Link>
                                <Link to="/admin/manage-jobs" className="flex items-center justify-between p-3.5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-white/15 transition-all text-sm font-semibold group/item">
                                    Manage Jobs <ArrowRight size={16} className="text-gray-500 group-hover/item:translate-x-0.5 transition-transform" />
                                </Link>
                                <button className="flex items-center justify-between p-3.5 bg-[#F97316] border border-[#F97316] rounded-2xl hover:bg-[#EA580C] hover:border-[#EA580C] transition-all font-bold text-white group/item text-sm cursor-pointer shadow-md shadow-orange-500/10">
                                    Add New Admin <UserPlus size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Recent Alerts */}
                        <div className="bg-white p-8 rounded-[28px] border border-gray-100 flex flex-col gap-5 shadow-sm">
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <Activity size={14} className="text-[#F97316]" />
                                SYSTEM LOGS
                            </h3>
                            <div className="flex flex-col gap-3">
                                {stats.recent_activity && stats.recent_activity.length > 0 ? (
                                    stats.recent_activity.map((alert, i) => (
                                        <div key={i} className="flex items-center justify-between border-b border-gray-50 pb-2.5 last:border-0 last:pb-0">
                                            <p className="font-bold text-xs text-gray-700 leading-normal">{alert.title}</p>
                                            <span className="text-[10px] font-semibold text-gray-400 whitespace-nowrap ml-4 shrink-0">{alert.time}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-xs font-semibold text-gray-400 text-center py-4">No logged activity recorded.</p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </DashboardLayout>
    )
}
