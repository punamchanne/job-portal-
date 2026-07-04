import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, ChevronRight, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
    const navigate = useNavigate()
    const location = useLocation()
    const [role, setRole] = useState(localStorage.getItem('role') || null)
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        setRole(localStorage.getItem('role') || null)
    }, [location.pathname])

    const handleLogout = () => {
        localStorage.clear()
        navigate('/')
    }

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Jobs', path: '/jobs' },
        { name: 'Features', path: '/features' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' }
    ]

    return (
        <nav className={`fixed w-full z-[1000] transition-all duration-500 ${scrolled ? 'backdrop-blur-xl bg-white/80 border-b border-gray-100/80 py-3.5 shadow-sm' : 'bg-transparent py-6'}`}>
            <div className="max-w-[1320px] mx-auto px-6 flex items-center justify-between">
                {/* Brand Logo */}
                <div className="flex items-center cursor-pointer gap-2.5 group" onClick={() => navigate('/')}>
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#F97316] to-[#FDBA74] flex items-center justify-center shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform duration-300">
                        <span className="text-white font-black text-xl italic">R</span>
                    </div>
                    <h1 className="text-2xl font-black tracking-tight text-[#111827] flex items-center gap-1">
                        Road<span className="text-[#F97316]">2Job</span>
                    </h1>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-10">
                    <div className="flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`relative text-[15px] font-semibold tracking-wide py-1.5 transition-colors duration-300 ${isActive ? 'text-[#F97316]' : 'text-[#6B7280] hover:text-[#111827]'}`}
                                >
                                    {link.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNavUnderline"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F97316] rounded-full"
                                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            )
                        })}
                    </div>

                    <div className="flex items-center gap-4">
                        {!role ? (
                            <>
                                <Link to="/signup" className="text-[15px] font-bold text-[#6B7280] hover:text-[#111827] transition-colors py-2 px-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
                                    Sign Up
                                </Link>
                                <Link
                                    to="/login"
                                    className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#F97316] to-[#FDBA74] text-white pl-1.5 pr-6 py-1.5 rounded-full font-bold text-[14px] hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 group cursor-pointer"
                                >
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#F97316] shadow-sm">
                                        <User size={15} className="text-[#F97316]" />
                                    </div>
                                    <span className="font-bold text-white tracking-wide">Log In</span>
                                </Link>
                            </>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    to={`/${role}/dashboard`}
                                    className="text-[14px] font-bold text-[#F97316] bg-orange-50 hover:bg-orange-100/70 px-5 py-2.5 rounded-full transition-all duration-300"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-[14px] font-bold text-red-500 hover:bg-red-50 px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Action */}
                <button
                    className="lg:hidden text-[#111827] p-2 hover:bg-gray-50 rounded-xl transition-all duration-300 cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Slide */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl absolute top-full left-0 w-full overflow-hidden shadow-xl"
                    >
                        <div className="px-6 py-8 flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="text-lg font-semibold text-[#111827] hover:text-[#F97316] flex items-center justify-between group"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                    <ChevronRight size={18} className="text-gray-300 group-hover:text-[#F97316] transition-colors" />
                                </Link>
                            ))}
                            <hr className="border-gray-100" />
                             {!role ? (
                                <div className="flex flex-col gap-4">
                                    <Link
                                        to="/signup"
                                        className="text-center font-bold py-3.5 text-[#111827] border border-gray-200 rounded-full hover:bg-gray-50 transition-all text-sm"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Sign Up
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="bg-gradient-to-r from-[#F97316] to-[#FDBA74] text-white py-3.5 text-center rounded-full font-bold shadow-lg shadow-orange-500/10 flex items-center justify-center gap-2 text-sm"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <User size={14} /> Log In
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <Link
                                        to={`/${role}/dashboard`}
                                        className="bg-orange-50 text-[#F97316] py-4 text-center rounded-full font-bold"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout()
                                            setIsOpen(false)
                                        }}
                                        className="border border-red-100 text-red-500 py-4 text-center rounded-full font-bold hover:bg-red-50 transition-all cursor-pointer"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
