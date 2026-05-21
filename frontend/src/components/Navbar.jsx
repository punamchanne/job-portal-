import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'

export default function Navbar() {
    const navigate = useNavigate()
    const location = useLocation()
    const [role, setRole] = useState(localStorage.getItem('role') || null)
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    // Re-read role from storage when route changes (handles login/logout)
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
        { name: 'HOME', path: '/' },
        { name: 'JOBS', path: '/jobs' },
        { name: 'FEATURES', path: '/features' },
        { name: 'ABOUT', path: '/about' },
        { name: 'CONTACT', path: '/contact' }
    ]

    return (
        <nav className={`fixed w-full z-[1000] transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-white/90 py-5'}`}>
            <div className="max-w-[1320px] mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
                    <h1 className="text-4xl font-black tracking-tight text-[#00B074]">Jobify</h1>
                </div>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <div key={link.name} className="relative group">
                            <Link
                                to={link.path}
                                className={`flex items-center gap-1 text-sm font-bold tracking-wide transition-colors ${location.pathname === link.path ? 'text-[#00B074]' : 'text-[#2B3940] hover:text-[#00B074]'}`}
                            >
                                {link.name}
                            </Link>
                        </div>
                    ))}

                    <div className="flex items-center gap-4 ml-4">
                        {!role ? (
                            <>
                                <Link to="/login" className="text-sm font-bold text-[#2B3940] hover:text-[#00B074] transition-colors">LOGIN</Link>
                                <Link
                                    to="/signup"
                                    className="bg-[#00B074] text-white px-8 py-3.5 rounded-md font-bold text-sm tracking-wide hover:bg-[#009663] transition-all"
                                >
                                    JOIN NOW
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to={`/${role}/dashboard`} className="text-sm font-bold text-[#00B074] bg-emerald-50 px-4 py-2 rounded-md">DASHBOARD</Link>
                                <button onClick={handleLogout} className="text-sm font-bold text-red-500 hover:bg-red-50 px-4 py-2 rounded-md transition-all">SIGN OUT</button>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button className="lg:hidden text-[#2B3940]" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen py-6 bg-white border-t' : 'max-h-0'}`}>
                <div className="px-6 flex flex-col gap-6">
                    {navLinks.map((link) => (
                        <Link key={link.name} to={link.path} className="text-lg font-bold text-[#2B3940] hover:text-[#00B074]" onClick={() => setIsOpen(false)}>
                            {link.name}
                        </Link>
                    ))}
                    <hr />
                    {!role ? (
                        <>
                            <Link to="/login" className="text-lg font-bold text-[#2B3940]" onClick={() => setIsOpen(false)}>Login</Link>
                            <Link to="/signup" className="bg-[#00B074] text-white py-4 text-center rounded-md font-bold" onClick={() => setIsOpen(false)}>
                                Join Now
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to={`/${role}/dashboard`} className="text-lg font-bold text-[#00B074]" onClick={() => setIsOpen(false)}>Dashboard</Link>
                            <button onClick={handleLogout} className="text-lg font-bold text-red-500 text-left">Sign Out</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}
