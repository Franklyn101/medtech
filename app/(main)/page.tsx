import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Heart, Users, Calendar, Lightbulb, Leaf, Stethoscope } from "lucide-react"
import { FeaturedProgram } from "@/components/featured-program"
import { UpcomingEvent } from "@/components/upcoming-event"
import { ImpactCounter } from "@/components/impact-counter"
import { HeroSlider } from "@/components/hero-slider"

export default function Home() {
  // Hero slider images
  const heroSlides = [
    {
      image: "../../public/dronenurse.jpeg",
      title: "Transforming Healthcare Across Africa",
      description: "Driving innovation, education, and sustainable solutions for better healthcare outcomes",
    },
    {
      image: "/placeholder.svg?height=1080&width=1920",
      title: "Building Healthier Communities",
      description: "Empowering local healthcare providers with innovative tools and knowledge",
    },
    {
      image: "/placeholder.svg?height=1080&width=1920",
      title: "Advancing Medical Education",
      description: "Training the next generation of healthcare professionals with cutting-edge approaches",
    },
  ]

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section with Slider */}
      <HeroSlider slides={heroSlides} />

      {/* Impact Stats */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <ImpactCounter icon={<Users className="w-10 h-10 text-teal-600" />} count={50000} label="People Impacted" />
            <ImpactCounter
              icon={<Calendar className="w-10 h-10 text-teal-600" />}
              count={120}
              label="Events Organized"
            />
            <ImpactCounter
              icon={<Heart className="w-10 h-10 text-teal-600" />}
              count={35}
              label="Partner Organizations"
            />
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Key Programs</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Driving innovation and sustainable solutions across healthcare, education, and climate initiatives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeaturedProgram
              icon={<Stethoscope className="w-8 h-8" />}
              title="Med Innovate Network"
              description="Connecting healthcare innovators with resources, mentorship, and funding opportunities"
              link="/programs/med-innovate-network"
              color="bg-cyan-500"
            />
            <FeaturedProgram
              icon={<Lightbulb className="w-8 h-8" />}
              title="Smart Education Alliance"
              description="Transforming education through technology and innovative teaching methodologies"
              link="/programs/smart-education-alliance"
              color="bg-teal-500"
            />
            <FeaturedProgram
              icon={<Leaf className="w-8 h-8" />}
              title="Climate Change Initiative"
              description="Addressing the intersection of climate change and public health across Africa"
              link="/programs/climate-change-initiative"
              color="bg-green-500"
            />
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" className="group">
              <Link href="/programs">
                View All Programs
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join us at our upcoming summits and conferences focused on healthcare innovation and technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <UpcomingEvent
              image="/placeholder.svg?height=400&width=600"
              title="Africa Healthcare Innovation Summit"
              date="June 15-17, 2023"
              location="Lagos, Nigeria"
              link="/events/ahis"
            />
            <UpcomingEvent
              image="/placeholder.svg?height=400&width=600"
              title="Bayelsa Ed Tech Festival"
              date="August 22-24, 2023"
              location="Yenagoa, Nigeria"
              link="/events/bef"
            />
            <UpcomingEvent
              image="/placeholder.svg?height=400&width=600"
              title="Emerging Technology Summit"
              date="October 10-12, 2023"
              location="Accra, Ghana"
              link="/events/ets"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-cyan-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Us in Transforming Healthcare</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 opacity-90">
            Whether through donations, volunteering, or partnerships, your contribution can make a significant impact
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-teal-600 hover:bg-gray-100">
              <Link href="/get-involved/donate">Make a Donation</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Link href="/get-involved/volunteer">Become a Volunteer</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
