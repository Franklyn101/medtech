import Image from "next/image"
import Link from "next/link"
import { Linkedin, Twitter, Mail } from "lucide-react"

export const metadata = {
  title: "Our Team | Africa Healthcare Innovation",
  description: "Meet the dedicated professionals behind Africa Healthcare Innovation",
}

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  social: {
    linkedin?: string
    twitter?: string
    email?: string
  }
}

const teamMembers: TeamMember[] = [
  {
    name: "Dr. Amina Okafor",
    role: "Founder & Executive Director",
    bio: "Dr. Amina has over 15 years of experience in healthcare innovation and policy. She founded Africa Healthcare Innovation with a vision to transform healthcare delivery across the continent.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "amina@africahealthcare.org",
    },
  },
  {
    name: "Dr. Emmanuel Adeyemi",
    role: "Medical Director",
    bio: "Dr. Emmanuel brings his extensive clinical experience to guide our healthcare programs and ensure they meet the highest standards of medical practice and patient care.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "emmanuel@africahealthcare.org",
    },
  },
  {
    name: "Fatima Ibrahim",
    role: "Director of Education Programs",
    bio: "Fatima leads our education initiatives, bringing her background in educational technology and curriculum development to create impactful learning experiences.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      linkedin: "https://linkedin.com",
      email: "fatima@africahealthcare.org",
    },
  },
  {
    name: "Kofi Mensah",
    role: "Technology Innovation Lead",
    bio: "Kofi oversees our technology initiatives, leveraging his expertise in digital health solutions and software development to drive innovation in healthcare delivery.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "kofi@africahealthcare.org",
    },
  },
  {
    name: "Ngozi Okonkwo",
    role: "Partnerships Director",
    bio: "Ngozi manages our strategic partnerships, building relationships with organizations, governments, and donors to expand our impact across Africa.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      linkedin: "https://linkedin.com",
      email: "ngozi@africahealthcare.org",
    },
  },
  {
    name: "Dr. Kwame Nkrumah",
    role: "Research Director",
    bio: "Dr. Kwame leads our research initiatives, ensuring that our programs are evidence-based and contribute to the growing body of knowledge in healthcare innovation.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "kwame@africahealthcare.org",
    },
  },
  {
    name: "Zainab Mohammed",
    role: "Community Engagement Manager",
    bio: "Zainab works directly with communities to understand their needs and ensure our programs are culturally appropriate and responsive to local contexts.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "zainab@africahealthcare.org",
    },
  },
  {
    name: "David Osei",
    role: "Operations Manager",
    bio: "David oversees the day-to-day operations of our organization, ensuring that our programs are implemented efficiently and effectively.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      linkedin: "https://linkedin.com",
      email: "david@africahealthcare.org",
    },
  },
]

export default function TeamPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] bg-gradient-to-r from-teal-500 to-cyan-600">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <Image
          src="/placeholder.svg?height=800&width=1600"
          alt="Team collaboration"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-3xl space-y-4 text-white">
            <h1 className="text-4xl md:text-5xl font-bold">Our Team</h1>
            <p className="text-xl opacity-90">
              Meet the dedicated professionals working to transform healthcare across Africa
            </p>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Leadership Team</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Our diverse team brings together expertise in healthcare, education, technology, and community development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-64 w-full">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-gray-900">{member.name}</h3>
                  <p className="text-teal-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-700 mb-4">{member.bio}</p>
                  <div className="flex space-x-3">
                    {member.social.linkedin && (
                      <Link
                        href={member.social.linkedin}
                        className="text-gray-500 hover:text-teal-600 transition-colors"
                      >
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                      </Link>
                    )}
                    {member.social.twitter && (
                      <Link
                        href={member.social.twitter}
                        className="text-gray-500 hover:text-teal-600 transition-colors"
                      >
                        <Twitter className="h-5 w-5" />
                        <span className="sr-only">Twitter</span>
                      </Link>
                    )}
                    {member.social.email && (
                      <Link
                        href={`mailto:${member.social.email}`}
                        className="text-gray-500 hover:text-teal-600 transition-colors"
                      >
                        <Mail className="h-5 w-5" />
                        <span className="sr-only">Email</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Join Our Team</h2>
              <p className="text-lg text-gray-700 mb-6">
                We're always looking for passionate individuals to join our team and contribute to our mission of
                transforming healthcare across Africa.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Whether you're a healthcare professional, educator, technologist, or community organizer, there may be a
                place for you on our team.
              </p>
              <Link
                href="/careers"
                className="inline-flex items-center justify-center rounded-md bg-teal-600 px-6 py-3 text-white font-medium shadow transition-colors hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                View Open Positions
              </Link>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="Team working together"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
