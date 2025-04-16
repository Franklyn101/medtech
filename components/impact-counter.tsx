"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useInView } from "framer-motion"

interface ImpactCounterProps {
  icon: React.ReactNode
  count: number
  label: string
}

export function ImpactCounter({ icon, count, label }: ImpactCounterProps) {
  const [currentCount, setCurrentCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      const duration = 2000 // ms
      const frameDuration = 1000 / 60 // 60fps
      const totalFrames = Math.round(duration / frameDuration)
      const counterIncrement = count / totalFrames

      let frame = 0
      const counter = setInterval(() => {
        frame++
        const progress = frame / totalFrames
        const currentValue = Math.round(count * progress)

        setCurrentCount(currentValue)

        if (frame === totalFrames) {
          clearInterval(counter)
        }
      }, frameDuration)

      return () => clearInterval(counter)
    }
  }, [isInView, count])

  return (
    <div ref={ref} className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-sm">
      <div className="mb-4">{icon}</div>
      <div className="text-4xl font-bold text-gray-900 mb-2">{isInView ? currentCount.toLocaleString() : "0"}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  )
}
