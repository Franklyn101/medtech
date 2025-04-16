"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Slide {
  image: string
  title: string
  description: string
}

interface HeroSliderProps {
  slides: Slide[]
}

export function HeroSlider({ slides }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const nextSlide = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }, [isTransitioning, slides.length])

  const prevSlide = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }, [isTransitioning, slides.length])

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 6000)

    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-500 ease-in-out",
              currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0",
            )}
          >
            {/* Background Image */}
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />

            {/* Content */}
            <div className="relative pt-14 sm:ml-14 z-20 container mx-auto px-4 h-full flex flex-col justify-center items-start">
              <div
                className={cn(
                  "max-w-2xl space-y-6 text-white transition-all duration-700",
                  currentSlide === index ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
                )}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">{slide.title}</h1>
                <p className="text-lg md:text-xl opacity-90">{slide.description}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700">
                    <Link href="/programs">Explore Our Programs</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20"
                  >
                    <Link href="/get-involved">Get Involved</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-1 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              currentSlide === index ? "bg-white w-6" : "bg-white/50 hover:bg-white/80",
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
