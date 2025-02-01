"use client"
import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
 
export function RotateWords({
  text = "Rotate",
  words = ["Word 1", "Word 2", "Word 3"],
}: {
  text: string
  words: string[]
}) {
  const [index, setIndex] = React.useState(0)
 
React.useEffect(() => {
const interval = setInterval(() => {
setIndex((prevIndex) => (prevIndex + 1) % words.length)
}, 2000)
// Clean up interval on unmount
return () => clearInterval(interval)
}, [])
return (
  <div className="inline-block relative h-[1em] w-[2.2em] ">
    {text}{' '}
    <AnimatePresence mode="wait">
      <motion.p
        key={words[index]}
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.5 }}
        className=" right-0 top-0 bg-gradient-to-r from-white to-[#6FA0D2] text-transparent bg-clip-text"
      >
        {words[index]}
      </motion.p>
    </AnimatePresence>
  </div>
) }