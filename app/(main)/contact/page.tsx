import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export const metadata = {
  title: "Contact Us | Africa Healthcare Innovation",
  description: "Get in touch with Africa Healthcare Innovation",
}

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-500 to-cyan-600 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl opacity-90">Have questions or want to get involved? We'd love to hear from you.</p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Send Us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="first-name" className="text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <Input id="first-name" placeholder="Your first name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="last-name" className="text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <Input id="last-name" placeholder="Your last name" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="Your email address" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <Input id="subject" placeholder="What is this regarding?" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <Textarea id="message" placeholder="Your message" rows={5} />
                </div>

                <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Contact Information</h2>
              <div className="space-y-8">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-teal-600 mr-4 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Our Location</h3>
                    <p className="text-gray-700">
                      123 Innovation Way
                      <br />
                      Lagos, Nigeria
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-teal-600 mr-4 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-700">+234 123 456 7890</p>
                    <p className="text-gray-700">+234 987 654 3210</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-teal-600 mr-4 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-700">info@africahealthcare.org</p>
                    <p className="text-gray-700">partnerships@africahealthcare.org</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-teal-600 mr-4 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Office Hours</h3>
                    <p className="text-gray-700">Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p className="text-gray-700">Saturday - Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 h-64 bg-gray-200 rounded-lg overflow-hidden relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.45932537!2d3.1191195!3d6.5483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Find answers to common questions about our organization and programs
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2 text-gray-900">How can I get involved with your organization?</h3>
              <p className="text-gray-700">
                There are many ways to get involved, including volunteering, donating, or partnering with us on specific
                initiatives. Visit our "Get Involved" page to learn more about these opportunities.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2 text-gray-900">Do you offer internship opportunities?</h3>
              <p className="text-gray-700">
                Yes, we offer internships for students and early-career professionals interested in healthcare
                innovation, education technology, and sustainable development. Check our "Careers" page for current
                opportunities.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2 text-gray-900">How can my organization partner with you?</h3>
              <p className="text-gray-700">
                We welcome partnerships with organizations that share our values and mission. Please contact our
                Partnerships Director at partnerships@africahealthcare.org to discuss potential collaboration
                opportunities.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2 text-gray-900">Where do you currently operate?</h3>
              <p className="text-gray-700">
                We currently have programs and initiatives in Nigeria, Ghana, Kenya, and Rwanda, with plans to expand to
                other African countries in the coming years.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
