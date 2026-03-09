import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'
import axios from 'axios'

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
            const res = await axios.post('http://localhost:8000/api/chatbot/ask', { message: input })
            setMessages((prev) => [...prev, { text: res.data.reply, sender: "bot" }])
        } catch (err) {
            setMessages((prev) => [...prev, { text: "Sorry, I'm having trouble connecting to the server.", sender: "bot" }])
        } finally {
            setIsTyping(false)
        }
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 bg-[#10B981] text-white p-4 rounded-full shadow-lg shadow-green-200 hover:bg-[#059669] transition-all z-50 flex items-center justify-center animate-bounce"
            >
                <MessageCircle className="w-6 h-6" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-gray-200 z-50 overflow-hidden flex flex-col"
                        style={{ height: '500px' }}
                    >
                        <div className="bg-[#10B981] p-4 flex justify-between items-center text-white font-bold">
                            <div className="flex items-center">
                                <MessageCircle className="w-5 h-5 mr-2" /> AI Interview Coach
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-md transition">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-grow p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
                            {messages.map((m, idx) => (
                                <div key={idx} className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.sender === 'bot' ? 'bg-white border border-gray-200 text-gray-800 self-start rounded-tl-sm' : 'bg-[#10B981] text-white self-end rounded-tr-sm'}`}>
                                    {m.text}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="bg-white border border-gray-200 text-gray-800 self-start p-3 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                </div>
                            )}
                        </div>

                        <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder="Ask me anything..."
                                className="flex-grow px-4 py-2 bg-gray-100 text-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                            />
                            <button type="submit" className="bg-[#10B981] text-white p-2 rounded-full hover:bg-[#059669] transition">
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
