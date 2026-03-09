import React, { useEffect, useState } from 'react'
import axios from 'axios'
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
            const res = await axios.get('http://localhost:8000/api/admin/users')
            setUsers(res.data)
        } catch (err) { }
    }

    const deleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user? This cannot be undone.")) return
        try {
            await axios.delete(`http://localhost:8000/api/admin/users/${userId}`)
            fetchUsers()
        } catch (err) {
            alert("Oops! Could not delete user.")
        }
    }

    const verifyUser = async (userId) => {
        try {
            await axios.put(`http://localhost:8000/api/admin/users/${userId}/verify`)
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
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Manage <span className="text-[#00B074]">People</span></h2>
                        <p className="text-gray-500 font-bold mt-1">Total {users.length} users registered on the platform.</p>
                    </div>
                </div>

                {/* Search & Filter Bar (Mock) */}
                <div className="bg-white p-4 rounded-3xl border border-gray-100 flex flex-wrap gap-4 shadow-sm items-center">
                    <div className="flex-grow flex items-center bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100 group focus-within:ring-2 focus-within:ring-[#00B074]">
                        <Search className="text-gray-400 group-focus-within:text-[#00B074] transition-colors" />
                        <input type="text" placeholder="Search by name or email..." className="w-full bg-transparent border-0 focus:ring-0 font-medium ml-3" />
                    </div>
                    <button className="flex items-center gap-2 bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100 font-bold text-gray-500 hover:bg-emerald-50 hover:text-[#00B074] transition-all">
                        <Filter size={18} /> Filters
                    </button>
                </div>

                {/* Users List */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#2B3940] text-white">
                                <tr>
                                    <th className="px-8 py-6 text-xs font-black uppercase tracking-widest">User Information</th>
                                    <th className="px-8 py-6 text-xs font-black uppercase tracking-widest">Account Type</th>
                                    <th className="px-8 py-6 text-xs font-black uppercase tracking-widest">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {users.map((user, idx) => (
                                    <motion.tr
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="group hover:bg-emerald-50/30 transition-colors"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-5">
                                                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-white transition-colors shadow-sm">
                                                    <UserCircle className="w-8 h-8" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-black text-gray-900 group-hover:text-[#00B074] transition-colors">{user.name}</h3>
                                                    <p className="text-gray-400 font-bold text-sm lowercase flex items-center gap-1.5 mt-0.5">
                                                        <Mail size={12} /> {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-2 border ${user.role === 'admin'
                                                ? 'bg-blue-50 text-blue-600 border-blue-100'
                                                : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                }`}>
                                                {user.role === 'admin' ? <Shield size={12} /> : <UserCheck size={12} />}
                                                {user.role}
                                            </span>
                                            {user.role === 'employer' && user.is_verified === false && (
                                                <span className="block mt-2 text-[10px] font-black uppercase tracking-widest text-orange-500 bg-orange-50 px-2 py-1 rounded inline-block">
                                                    Pending Verification
                                                </span>
                                            )}
                                            {user.role === 'employer' && user.is_verified !== false && (
                                                <span className="block mt-2 text-[10px] font-black uppercase tracking-widest text-[#00B074] bg-emerald-50 px-2 py-1 rounded inline-block">
                                                    Verified
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-8 py-6 flex items-center gap-3">
                                            {user.role === 'employer' && user.is_verified === false && (
                                                <button
                                                    onClick={() => verifyUser(user.id)}
                                                    className="bg-emerald-50 text-[#00B074] hover:bg-[#00B074] hover:text-white px-4 py-4 rounded-2xl transition-all shadow-sm flex items-center gap-2 transform active:scale-95 font-black text-xs uppercase tracking-widest"
                                                >
                                                    <CheckCircle className="w-4 h-4" /> Verify
                                                </button>
                                            )}
                                            <button
                                                onClick={() => deleteUser(user.id)}
                                                className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white p-4 rounded-2xl transition-all shadow-sm hover:shadow-lg hover:shadow-red-100 transform active:scale-95"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                        {users.length === 0 && (
                            <div className="p-20 text-center flex flex-col items-center gap-4">
                                <div className="p-6 bg-gray-50 rounded-full text-gray-300">
                                    <Users size={48} />
                                </div>
                                <h3 className="text-xl font-black text-gray-400">No users found in the system.</h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
