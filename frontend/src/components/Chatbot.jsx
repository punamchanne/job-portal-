import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'
import api from '../config/api'

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        { text: "Hi! I'm your AI Interview Coach. Ask me any prep questions!", sender: "bot" }
    ])
    const [input, setInput] = useState("")
    const [isTyping, setIsTyping] = useState(false)

    const handleSend = async (e) => {
        e.preventDefault()
        if (!input.trim()) return

        const newMsgs = [...messages, { text: input, sender: "user" }]
        setMessages(newMsgs)
        setInput("")

        setIsTyping(true)
        try {
            const res = await api.post('/api/chatbot/ask', { message: input })
            setMessages((prev) => [...prev, { text: res.data.reply, sender: "bot" }])
        } catch (err) {
            setMessages((prev) => [...prev, { text: "Sorry, I'm having trouble connecting to the server.", sender: "bot" }])
        } finally {
            setIsTyping(false)
        }
    }

    return (
        <>
            {/* Floating Chat Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 bg-gradient-to-tr from-[#F97316] to-[#FDBA74] text-white p-4 rounded-full shadow-lg shadow-orange-500/20 hover:scale-105 transition-all duration-300 z-50 flex items-center justify-center cursor-pointer border-0"
                title="AI Coach Chat"
            >
                <MessageCircle className="w-6 h-6 text-white" />
            </button>

            {/* Chat Dialog Widget */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        className="fixed bottom-24 right-6 w-80 sm:w-[360px] bg-white rounded-[32px] shadow-2xl border border-gray-150 z-50 overflow-hidden flex flex-col"
                        style={{ height: '480px' }}
                    >
                        {/* Premium Dark Header */}
                        <div className="bg-[#111827] border-b border-gray-800 p-4.5 flex justify-between items-center text-white font-bold relative overflow-hidden shrink-0">
                            {/* Decorative background grid and glow */}
                            <div className="absolute inset-0 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:12px_12px] opacity-35"></div>
                            <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#F97316]/10 rounded-full blur-xl"></div>
                            
                            <div className="flex items-center relative z-10 text-sm">
                                <MessageCircle className="w-4 h-4 mr-2 text-[#F97316] animate-pulse" />
                                <span className="tracking-tight font-display font-extrabold">AI Interview Coach</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1.5 rounded-lg transition relative z-10 cursor-pointer text-gray-400 hover:text-white border-0">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Messages Panel */}
                        <div className="flex-grow p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
                            {messages.map((m, idx) => (
                                <div 
                                    key={idx} 
                                    className={`max-w-[80%] p-3.5 px-4 rounded-2xl text-xs font-semibold leading-relaxed ${
                                        m.sender === 'bot' 
                                        ? 'bg-white border border-gray-250 text-gray-800 self-start rounded-tl-sm shadow-sm' 
                                        : 'bg-[#F97316] text-white self-end rounded-tr-sm shadow-sm'
                                    }`}
                                >
                                    {m.text}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="bg-white border border-gray-250 text-gray-800 self-start p-3.5 px-5 rounded-2xl rounded-tl-sm flex gap-1 items-center shadow-sm">
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                </div>
                            )}
                        </div>

                        {/* Input Box Area */}
                        <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder="Ask me anything..."
                                className="flex-grow px-4 py-2.5 bg-gray-50 text-xs text-gray-800 rounded-full border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#F97316]/20 focus:border-[#F97316] focus:bg-white transition-all font-semibold"
                            />
                            <button 
                                type="submit" 
                                className="bg-[#F97316] text-white p-2.5 rounded-full hover:bg-[#EA580C] hover:shadow-md transition duration-300 cursor-pointer flex items-center justify-center shrink-0 border-0"
                            >
                                <Send className="w-4 h-4 text-white" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
