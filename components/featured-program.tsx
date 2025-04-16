import type React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeaturedProgramProps {
  icon: React.ReactNode
  title: string
  description: string
  link: string
  color: string
}

export function FeaturedProgram({ icon, title, description, link, color }: FeaturedProgramProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className={cn("absolute top-0 left-0 h-1 w-full transition-all duration-300 group-hover:h-2", color)} />
      <div className="mb-4">
        <div
          className={cn(
            "inline-flex items-center justify-center rounded-full p-2 transition-colors",
            color.replace("bg-", "bg-opacity-10 text-"),
          )}
        >
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link
        href={link}
        className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium group-hover:underline"
      >
        Learn more
        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  )
}
