import React, { useEffect, useState } from 'react'
import api from '../../config/api'
import { Trash2, UserCircle, Search, Filter, Shield, UserCheck, Mail, Users, CheckCircle } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import { motion } from 'framer-motion'

export default function ManageUsers() {
    const [users, setUsers] = useState([])
    const userName = localStorage.getItem('userName') || "Admin"

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const res = await api.get('/api/admin/users')
            setUsers(res.data)
        } catch (err) { }
    }

    const deleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user? This cannot be undone.")) return
        try {
            await api.delete(`/api/admin/users/${userId}`)
            fetchUsers()
        } catch (err) {
            alert("Oops! Could not delete user.")
        }
    }

    const verifyUser = async (userId) => {
        try {
            await api.put(`/api/admin/users/${userId}/verify`)
            alert("Company verified successfully!")
            fetchUsers()
        } catch (err) {
            alert("Oops! Could not verify company.")
        }
    }

    return (
        <DashboardLayout role="admin" userName={userName}>
            <div className="flex flex-col gap-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Manage <span className="text-[#F97316]">People</span></h2>
                        <p className="text-gray-500 font-semibold text-sm mt-1">Total {users.length} users registered on the platform.</p>
                    </div>
                </div>

                {/* Search & Filter Bar */}
                <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-wrap gap-4 shadow-sm items-center">
                    <div className="flex-grow flex items-center bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100 focus-within:border-[#F97316] transition-colors">
                        <Search className="text-gray-400 shrink-0" size={18} />
                        <input type="text" placeholder="Search by name or email address..." className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 font-semibold text-sm ml-3" />
                    </div>
                    <button className="flex items-center gap-1.5 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100 font-bold text-xs text-gray-500 hover:text-[#F97316] transition-all cursor-pointer">
                        <Filter size={14} /> Filters
                    </button>
                </div>

                {/* Users List */}
                <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#111827] text-white">
                                <tr>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">User Information</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">Account Type</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {users.map((user, idx) => (
                                    <motion.tr
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="group hover:bg-orange-50/20 transition-colors"
                                    >
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-white transition-colors shadow-sm">
                                                    <UserCircle className="w-7 h-7" />
                                                </div>
                                                <div>
                                                    <h3 className="text-base font-bold text-gray-900 group-hover:text-[#F97316] transition-colors">{user.name}</h3>
                                                    <p className="text-gray-400 font-semibold text-xs lowercase flex items-center gap-1.5 mt-0.5">
                                                        <Mail size={12} /> {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest inline-flex items-center gap-2 border ${user.role === 'admin'
                                                ? 'bg-blue-50 text-blue-600 border-blue-100'
                                                : 'bg-orange-50 text-[#F97316] border-orange-100'
                                                }`}>
                                                {user.role === 'admin' ? <Shield size={10} /> : <UserCheck size={10} />}
                                                {user.role}
                                            </span>
                                            {user.role === 'employer' && user.is_verified === false && (
                                                <span className="block mt-2 text-[8px] font-black uppercase tracking-widest text-yellow-600 bg-yellow-50 px-2.5 py-1 rounded-full border border-yellow-100 inline-block">
                                                    Pending Verify
                                                </span>
                                            )}
                                            {user.role === 'employer' && user.is_verified !== false && (
                                                <span className="block mt-2 text-[8px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 inline-block">
                                                    Verified
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-8 py-5 flex items-center gap-3">
                                            {user.role === 'employer' && user.is_verified === false && (
                                                <button
                                                    onClick={() => verifyUser(user.id)}
                                                    className="bg-emerald-50 hover:bg-emerald-500 hover:text-white text-emerald-600 px-4 py-2 rounded-full transition-all shadow-sm flex items-center gap-1.5 cursor-pointer font-bold text-xs uppercase tracking-wider"
                                                >
                                                    <CheckCircle className="w-3.5 h-3.5" /> Verify
                                                </button>
                                            )}
                                            <button
                                                onClick={() => deleteUser(user.id)}
                                                className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white p-2.5 rounded-full transition-all shadow-sm cursor-pointer"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                        {users.length === 0 && (
                            <div className="p-20 text-center flex flex-col items-center gap-4">
                                <div className="p-6 bg-gray-50 rounded-full text-gray-300">
                                    <Users size={40} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-400">No users found in the system.</h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
