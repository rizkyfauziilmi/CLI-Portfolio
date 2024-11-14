import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronDown, ExternalLink } from 'lucide-react'
import { Button } from "@/components/ui/button.tsx"
import { Badge } from "@/components/ui/badge.tsx"
import {IconGithub} from "@/assets/github-icon.tsx";

interface Project {
  id: number
  name: string
  description: string
  technologies: string[]
  github?: string
  liveDemo?: string
  image: string
  status: 'Completed' | 'In Progress' | 'Planned' | "Discontinued"
}

const projectsComponent: Project[] = [
  {
    id: 1,
    name: "CLI Portfolio",
    description: "A terminal-style portfolio website that showcases my projects, skills, and experiences.",
    technologies: ["React Vite", "TypeScript", "Shadcn UI", "Tailwind CSS", "Zustand"],
    github: "https://github.com/rizkyfauziilmi/CLI-portfolio",
    liveDemo: "https://rizkyfauziilmi.vercel.app/",
    image: "https://utfs.io/f/c7AkC16OhNlBryyGy59d4GU518uSDTfWiRBHzb0chNMAXxw6",
    status: 'In Progress',
  },
  {
    id: 2,
    name: "Portfolio Website",
    description: "A personal portfolio website that showcases my projects, skills, and experiences.",
    technologies: ["React Vite", "TypeScript", "Tailwind CSS", "Shadcn UI"],
    github: "https://github.com/rizkyfauziilmi/portfolio-old",
    liveDemo: "https://rizkyfauziilmi-v1.vercel.app/",
    image: "https://utfs.io/f/c7AkC16OhNlBTbKHa3rJO2m1SsblhaWNHyVe87MU0cYKzIBn",
    status: "Completed",
  },
  {
    id: 3,
    name: "Buycott",
    description: "A web application that helps users to boycott products from companies that support israel.",
    technologies: ["Next.js", "tRPC", "Prisma", "NextAuth.js", "Tailwind CSS"],
    github: "https://github.com/rizkyfauziilmi/buycott",
    liveDemo: "https://buycott.vercel.app/",
    image: "https://utfs.io/f/c7AkC16OhNlBByinNHXdjRoGaCULlOQc92f60HSEXeNkBhqD",
    status: "In Progress",
  },
  {
    id: 4,
    name: "Simulasi Gerak HTML5 Canvas",
    description: "A simple web application that simulates parabolic motion and free fall motion using HTML5 Canvas.",
    technologies: ["HTML", "CSS", "JavaScript", "Canvas API"],
    github: "https://github.com/rizkyfauziilmi/project-simulasi-gerak",
    image: "https://utfs.io/f/c7AkC16OhNlByvUeR0AQZ1O2HutWPzgnkETcC4ibAx3SV8L9",
    status: "Completed",
  },
  {
    id: 5,
    name: "Anywall",
    description: "Cross-platform desktop application for setting wallpapers.",
    technologies: ["Tauri", "React", "TypeScript", "Rust"],
    github: "https://github.com/rizkyfauziilmi/anywall",
    image: "https://utfs.io/f/c7AkC16OhNlBVE2G4QUqkQl4WzmLsefoXj2axYTE5JZGHgDv",
    status: "Discontinued"
  },
  {
    id: 6,
    name: "React Native Manga App",
    description: "A mobile application for reading manga.",
    technologies: ["React Native", "Expo", "Firebase"],
    github: "https://github.com/rizkyfauziilmi/React-Native-Manga-App",
    image: "https://utfs.io/f/c7AkC16OhNlBykYXD4QZ1O2HutWPzgnkETcC4ibAx3SV8L9f",
    status: "Discontinued"
  }
]

export function ProjectsComponent() {
  const [expandedProject, setExpandedProject] = useState<number | null>(null)

  const toggleProject = (id: number) => {
    setExpandedProject(expandedProject === id ? null : id)
  }

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500'
      case 'In Progress':
        return 'bg-yellow-500'
      case 'Planned':
        return 'bg-blue-500'
      case "Discontinued":
        return "bg-red-500"
    }
  }

    const getProgressStatus = (status: Project['status']) => {
        switch (status) {
        case 'Completed':
            return '100%'
        case 'In Progress':
            return '50%'
        case 'Planned':
            return '20%'
        case "Discontinued":
            return "100%"
        }
    }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="shadow-lg max-w-3xl"
    >
      <h2 className="text-2xl font-bold mb-4">My Projects:</h2>
      <ul className="space-y-4">
        {projectsComponent.map((project) => (
          <motion.li
            key={project.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-green-900 bg-opacity-20 rounded-md overflow-hidden"
          >
            <motion.div
              className="flex items-center p-3 cursor-pointer"
              onClick={() => toggleProject(project.id)}
              whileHover={{ backgroundColor: 'rgba(34, 197, 94, 0.2)' }}
            >
              {expandedProject === project.id ? (
                <ChevronDown className="w-5 h-5 mr-2" />
              ) : (
                <ChevronRight className="w-5 h-5 mr-2" />
              )}
              <span className="font-bold">{project.name}</span>
              <Badge className={`ml-auto ${getStatusColor(project.status)}`}>
                {project.status}
              </Badge>
            </motion.div>
            <AnimatePresence>
              {expandedProject === project.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-5 pb-3"
                >
                  <motion.img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover rounded-md mb-3"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <p className="mb-2">{project.description}</p>
                  <div className="mb-2">
                    <strong>Technologies:</strong> {project.technologies.join(', ')}
                  </div>
                  <div className="flex space-x-2 mb-3">
                    {project.github && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center"
                        onClick={() => window.open(project.github, '_blank')}
                      >
                        <IconGithub className="w-4 h-4 mr-2" />
                        GitHub
                      </Button>
                    )}
                    {project.liveDemo && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center"
                        onClick={() => window.open(project.liveDemo, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                    )}
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: getProgressStatus(project.status) }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    className={`h-1 ${getStatusColor(project.status)}`}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}