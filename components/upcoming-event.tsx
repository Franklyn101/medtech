import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UpcomingEventProps {
  image: string
  title: string
  date: string
  location: string
  link: string
}

export function UpcomingEvent({ image, title, date, location, link }: UpcomingEventProps) {
  return (
    <div className="group overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{location}</span>
          </div>
        </div>
        <Button asChild variant="outline" className="w-full group">
          <Link href={link} className="flex items-center justify-center">
            View Event Details
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
