'use client'

import { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Terminal, User, Briefcase, Code, Book } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProfileData {
    name: string;
    hobby: string;
    books: {
        title: string;
        image: string;
        link?: string;
    }[];
    born: string;
    age: number;
    currentStatus: string;
    role: string;
    skills: string[];
    experience: string;
}

const profileData: ProfileData = {
    name: "Rizky Fauzi Ilmi",
    hobby: "Coding and Reading",
    books: [
        { title: "Hyouka Series", image: "https://www.penerbitharu.com/upload/product/thumb-2024-05-03-11-21-00-hyouka-2024.jpg", link: "https://hyouka.fandom.com/wiki/Hyouka_(novel)" },
    ],
    born: "Bandung, 2004 8th June",
    role: "Full Stack Developer",
    currentStatus: "Studying at Widyatama University",
    age: new Date().getFullYear() - 2004,
    skills: ["TypeScript", "Go", "Git", "Docker", "Backend Development", "Frontend Development", "Cross-Platform Development"],
    // experince years = last year of high school (born in 2004) - now year
    experience: `${new Date().getFullYear() - 2019} years of experience in web development`,
}

const infoButtons = [
    { key: 'currentStatus', icon: Terminal, label: 'Status' },
    { key: 'born', icon: User, label: 'Born' },
    { key: 'experience', icon: Briefcase, label: 'Experience' },
    { key: 'skills', icon: Code, label: 'Skills' },
    { key: 'hobby', icon: Book, label: 'Hobby' },
]

export function ProfileComponent() {
    const [text, setText] = useState('')
    const [isTyping, setIsTyping] = useState(true)
    const [selectedInfo, setSelectedInfo] = useState<keyof ProfileData | null>(null)
    const [showBooks, setShowBooks] = useState(false)

    const getFullText = useCallback((info: keyof ProfileData | null) => {
        switch (info) {
            case 'currentStatus':
                return `Current Status: ${profileData.currentStatus}`
            case 'born':
                return `Born: ${profileData.born}\nAge: ${profileData.age} years old`
            case 'experience':
                return `Experience: ${profileData.experience}`
            case 'skills':
                return `Skills: ${profileData.skills.join(', ')}`
            case 'hobby':
                return `Hobbies: ${profileData.hobby}`
            default:
                return `Welcome to my portfolio!
I'm ${profileData.name}, a ${profileData.role} from Bandung, Indonesia.
I was born in ${profileData.born} and I'm currently ${profileData.age} years old.
I'm ${profileData.currentStatus}.
I have ${profileData.experience} and my skills include ${profileData.skills.join(', ')} and many frameworks and libraries.
In my free time, I enjoy ${profileData.hobby}.`
        }
    }, [])

    useEffect(() => {
        const fullText = getFullText(selectedInfo)
        let currentIndex = 0
        let timeoutId: number | undefined = undefined
        setIsTyping(true)
        setShowBooks(false)

        const typeText = () => {
            if (currentIndex < fullText.length) {
                setText(fullText.slice(0, currentIndex + 1))
                currentIndex++
                timeoutId = window.setTimeout(typeText, 30)
            } else {
                setIsTyping(false)
                if (selectedInfo === 'hobby') {
                    setShowBooks(true)
                }
            }
        }

        typeText()

        return () => {
            clearTimeout(timeoutId)
        }
    }, [selectedInfo, getFullText])

    const handleInfoClick = (info: keyof ProfileData) => {
        setSelectedInfo(info === selectedInfo ? null : info)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col text-green-600 w-full max-w-2xl gap-6 p-4 rounded-lg"
        >
            <div className="flex items-center gap-4">
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Avatar className="w-24 h-24 border-2 border-green-500 cursor-pointer" onClick={() => window.open("https://github.com/rizkyfauziilmi", "_blank")}>
                        <AvatarImage src="https://avatars.githubusercontent.com/u/104153142?v=4" alt="Profile" />
                        <AvatarFallback className="bg-green-900 text-green-500">
                            {profileData.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                    </Avatar>
                </motion.div>
                <div>
                    <h1 className="text-2xl font-bold">{profileData.name}</h1>
                    <p className="text-green-400">{profileData.role}</p>
                </div>
            </div>
            <pre className="whitespace-pre-wrap bg-green-900 bg-opacity-20 p-4 rounded min-h-[200px]">
                {text}
                {isTyping && <span className="animate-pulse">▋</span>}
            </pre>
            {showBooks && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                    {profileData.books.map((book, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: book.link ? 1.05 : undefined }}
                            className={cn(book.link && "cursor-pointer", "bg-green-900 bg-opacity-20 p-4 rounded flex gap-2 items-center")}
                            onClick={() => {
                                if (book.link) {
                                    window.open(book.link, '_blank')
                                }
                            }}
                        >
                            <img src={book.image} alt={book.title} className="h-20 rounded-sm w-14 object-cover" />
                            <h2 className="text-lg font-semibold">{book.title}</h2>
                        </motion.div>
                    ))}
                </motion.div>
            )}
            <div className="flex flex-wrap gap-2">
                {infoButtons.map(({ key, icon: Icon, label }) => (
                    <Button
                        key={key}
                        variant="outline"
                        size="sm"
                        disabled={isTyping}
                        onClick={() => handleInfoClick(key as keyof ProfileData)}
                        className={cn({ 'bg-green-700 text-black': selectedInfo === key })}
                    >
                        <Icon className="size-4 mr-2" />
                        {label}
                    </Button>
                ))}
            </div>
        </motion.div>
    )
}