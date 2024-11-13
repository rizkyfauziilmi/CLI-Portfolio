import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Terminal, Trash2, User, ArrowUp, ArrowDown, XCircle } from 'lucide-react'

interface Command {
  name: string
  description: string
  icon: React.ReactNode
}

const commands: Command[] = [
  { name: 'help', description: 'Show all available commands', icon: <Terminal className="w-5 h-5" /> },
  { name: 'clear', description: 'Clear the terminal screen', icon: <Trash2 className="w-5 h-5" /> },
  { name: 'profile', description: 'Display personal information', icon: <User className="w-5 h-5" /> },
  { name: '↑↓', description: 'Navigate through the command history', icon: <><ArrowUp className="w-5 h-5" /><ArrowDown className="w-5 h-5" /></> },
  { name: 'ctrl + c', description: 'Terminate the current command', icon: <XCircle className="w-5 h-5" /> },
]

export function HelpComponent() {
  const [hoveredCommand, setHoveredCommand] = useState<string | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-lg shadow-lg max-w-2xl"
    >
      <h2 className="text-2xl font-bold mb-4">Available Commands:</h2>
      <ul className="space-y-4">
        {commands.map((command) => (
          <motion.li
            key={command.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-start space-x-4 bg-green-900 bg-opacity-20 p-3 rounded-md cursor-pointer"
            onMouseEnter={() => setHoveredCommand(command.name)}
            onMouseLeave={() => setHoveredCommand(null)}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex-shrink-0 mt-1">{command.icon}</div>
            <div className="flex-grow">
              <div className="font-bold">{command.name}</div>
              <motion.div
                  initial={{height: 0, opacity: 0}}
                  animate={{
                    height: hoveredCommand === command.name ? 'auto' : 0,
                    opacity: hoveredCommand === command.name ? 1 : 0
                  }}
                  transition={{duration: 0.3}}
                  className="text-sm text-green-300 overflow-hidden hidden md:block"
              >
                {command.description}
              </motion.div>
              {/*
                This mobile version of the description. It will hide on desktop.
              */}
              <motion.div
                  initial={{height: 0, opacity: 0}}
                  animate={{
                    height: "auto",
                    opacity: 1
                  }}
                  transition={{duration: 0.3}}
                  className="text-sm text-green-300 overflow-hidden block md:hidden"
              >
                {command.description}
              </motion.div>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}