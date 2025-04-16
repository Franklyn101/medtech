import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "About Us | Africa Healthcare Innovation",
  description: "Learn about our mission, vision, and impact in healthcare innovation across Africa",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] bg-gradient-to-r from-teal-500 to-cyan-600">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <Image
          src="/placeholder.svg?height=800&width=1600"
          alt="Healthcare professionals in a meeting"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-3xl space-y-4 text-white">
            <h1 className="text-4xl md:text-5xl font-bold">About Us</h1>
            <p className="text-xl opacity-90">
              Driving innovation and sustainable solutions for better healthcare outcomes across Africa
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6">
                Our mission is to transform healthcare across Africa through innovation, education, and sustainable
                solutions. We believe that by empowering local communities with the right tools, knowledge, and
                resources, we can create lasting positive change in healthcare outcomes.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                We work at the intersection of healthcare, education, technology, and sustainability to address the most
                pressing challenges facing African communities today.
              </p>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Vision</h2>
              <p className="text-lg text-gray-700">
                We envision an Africa where quality healthcare is accessible to all, where innovation drives continuous
                improvement in healthcare delivery, and where sustainable solutions ensure the long-term health and
                wellbeing of communities across the continent.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="Healthcare professionals working together"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Core Values</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              These principles guide our work and define our approach to creating meaningful impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-teal-600 text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Innovation</h3>
              <p className="text-gray-700">
                We embrace creative thinking and novel approaches to solve complex healthcare challenges.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-cyan-600 text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Collaboration</h3>
              <p className="text-gray-700">
                We believe in the power of partnerships and working together across sectors and disciplines.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-green-600 text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Sustainability</h3>
              <p className="text-gray-700">
                We develop solutions that are environmentally responsible and can be maintained long-term.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 text-2xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Equity</h3>
              <p className="text-gray-700">
                We are committed to ensuring that healthcare innovations benefit all communities, especially the
                underserved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our History */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="Organization history timeline"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Our History</h2>
              <p className="text-lg text-gray-700 mb-6">
                Founded in 2015, Africa Healthcare Innovation began as a small initiative focused on bringing together
                healthcare professionals and technology experts to address critical healthcare challenges in Nigeria.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Over the years, we have expanded our reach across multiple African countries, developed numerous
                programs and initiatives, and built a network of partners committed to transforming healthcare across
                the continent.
              </p>
              <p className="text-lg text-gray-700">
                Today, we are recognized as a leading organization in healthcare innovation, education, and sustainable
                development, with a track record of impactful projects and initiatives that have improved healthcare
                outcomes for thousands of people.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-cyan-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Us in Our Mission</h2>
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
