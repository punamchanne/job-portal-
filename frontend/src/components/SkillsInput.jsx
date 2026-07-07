import React, { useState, useRef, useEffect } from 'react';
import { X, Plus } from 'lucide-react';

const COMMON_SKILLS = [
    "React", "React Native", "Angular", "Vue.js", "Next.js", "Nuxt.js",
    "Node.js", "Express.js", "NestJS", "FastAPI", "Django", "Flask",
    "Python", "JavaScript", "TypeScript", "HTML5", "CSS3", "Sass", "Tailwind CSS",
    "Java", "Spring Boot", "Go (Golang)", "Rust", "C++", "C#", ".NET",
    "SQL", "MySQL", "PostgreSQL", "MongoDB", "Redis", "Firebase",
    "Docker", "Kubernetes", "AWS", "Google Cloud", "Microsoft Azure",
    "Git", "GitHub", "CI/CD", "GraphQL", "REST API", "Microservices",
    "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "NLP",
    "Data Science", "Pandas", "NumPy", "Scikit-Learn",
    "UI/UX Design", "Figma", "Adobe XD", "Product Management", "Agile", "Scrum"
];

export default function SkillsInput({ value, onChange, placeholder = "Type a skill (e.g. React)" }) {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef(null);

    // Click outside to close dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        const val = e.target.value;
        setInputValue(val);
        if (val.trim() === '') {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        const filtered = COMMON_SKILLS.filter(skill =>
            skill.toLowerCase().includes(val.toLowerCase()) && 
            !value.some(existing => existing.toLowerCase() === skill.toLowerCase())
        );
        setSuggestions(filtered);
        setShowSuggestions(true);
    };

    const addSkill = (skill) => {
        const trimmed = skill.trim();
        if (trimmed && !value.some(existing => existing.toLowerCase() === trimmed.toLowerCase())) {
            onChange([...value, trimmed]);
        }
        setInputValue('');
        setSuggestions([]);
        setShowSuggestions(false);
    };

    const removeSkill = (indexToRemove) => {
        onChange(value.filter((_, index) => index !== indexToRemove));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (inputValue.trim()) {
                addSkill(inputValue);
            }
        }
    };

    return (
        <div ref={wrapperRef} className="w-full flex flex-col gap-3">
            {/* Selected Skills Chips */}
            {value.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                    {value.map((skill, index) => (
                        <span 
                            key={index} 
                            className="bg-orange-50 text-[#F97316] px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-orange-100/30 uppercase tracking-wider transition-all"
                        >
                            {skill}
                            <button 
                                type="button"
                                onClick={() => removeSkill(index)} 
                                className="text-orange-300 hover:text-orange-700 font-bold transition-colors cursor-pointer text-sm leading-none"
                            >
                                &times;
                            </button>
                        </span>
                    ))}
                </div>
            )}

            {/* Input & Autocomplete dropdown */}
            <div className="relative w-full">
                <div className="flex bg-gray-50 border border-gray-100 rounded-2xl focus-within:border-[#F97316] focus-within:bg-white transition-all duration-300 overflow-hidden pr-3">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        className="flex-grow bg-transparent border-0 focus:outline-none focus:ring-0 px-6 py-4 font-semibold text-gray-800 placeholder:text-gray-300 text-sm"
                    />
                    {inputValue.trim() && (
                        <button
                            type="button"
                            onClick={() => addSkill(inputValue)}
                            className="p-2 my-2 bg-[#F97316] text-white rounded-xl hover:bg-[#EA580C] transition-colors flex items-center justify-center cursor-pointer shrink-0"
                            title="Add skill"
                        >
                            <Plus size={16} />
                        </button>
                    )}
                </div>

                {/* Suggestions List */}
                {showSuggestions && suggestions.length > 0 && (
                    <ul className="absolute z-[100] w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl max-h-48 overflow-y-auto p-2 scrollbar-thin">
                        {suggestions.map((skill, idx) => (
                            <li key={idx}>
                                <button
                                    type="button"
                                    onClick={() => addSkill(skill)}
                                    className="w-full text-left px-4 py-2.5 hover:bg-orange-50 hover:text-[#F97316] rounded-xl text-xs font-bold uppercase tracking-wider text-gray-700 transition-colors cursor-pointer"
                                >
                                    {skill}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
