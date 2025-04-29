"use client"

import React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm py-2" : "bg-transparent py-4",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span
              className={cn(
                "text-xl font-bold transition-colors",
                isScrolled || isMobileMenuOpen ? "text-teal-600" : "text-white",
              )}
            >
              Africa Healthcare Innovation
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn("bg-transparent", isScrolled ? "text-gray-800" : "text-white")}>
                    About Us
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 w-[400px]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            href="/about"
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-teal-500 to-cyan-700 p-6 no-underline outline-none focus:shadow-md"
                          >
                            <div className="mt-4 mb-2 text-lg font-medium text-white">Our Mission</div>
                            <p className="text-sm leading-tight text-white/90">
                              Transforming healthcare across Africa through innovation, education, and sustainable
                              solutions
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/about" title="About Us">
                        Learn about our organization and mission
                      </ListItem>
                      <ListItem href="/team" title="Team Members">
                        Meet our dedicated team of professionals
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn("bg-transparent", isScrolled ? "text-gray-800" : "text-white")}>
                    Events
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <ListItem href="/events/ahis" title="Africa Healthcare Innovation Summit">
                        Annual summit for healthcare innovators
                      </ListItem>
                      <ListItem href="/events/bef" title="Bayelsa Ed Tech Festival">
                        Showcasing educational technology innovations
                      </ListItem>
                      <ListItem href="/events/ets" title="Emerging Technology Summit">
                        Exploring cutting-edge technologies in healthcare
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn("bg-transparent", isScrolled ? "text-gray-800" : "text-white")}>
                    Programs
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[500px] grid-cols-2 gap-3 p-4">
                      <ListItem href="/programs/smart-education-alliance" title="Smart Education Alliance">
                        Transforming education through technology
                      </ListItem>
                      <ListItem href="/programs/med-innovate-network" title="Med Innovate Network">
                        Supporting healthcare innovation
                      </ListItem>
                      <ListItem href="/programs/climate-change-initiative" title="Climate Change Initiative">
                        Addressing climate impacts on health
                      </ListItem>
                      <ListItem href="/programs/agriculture-initiatives" title="Agriculture Initiatives">
                        Sustainable farming practices
                      </ListItem>
                      <ListItem href="/programs/social-issues" title="Social Issues Initiatives">
                        Addressing key social determinants of health
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn("bg-transparent", isScrolled ? "text-gray-800" : "text-white")}>
                    Communities
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <ListItem href="/communities/healthcare-professionals" title="Healthcare Professionals">
                        Network for doctors, nurses, and medical practitioners
                      </ListItem>
                      <ListItem href="/communities/researchers" title="Researchers">
                        Collaborative space for healthcare researchers
                      </ListItem>
                      <ListItem href="/communities/innovators" title="Innovators">
                        Community for healthcare technology innovators
                      </ListItem>
                      <ListItem href="/communities/students" title="Students">
                        Resources and networking for healthcare students
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn("bg-transparent", isScrolled ? "text-gray-800" : "text-white")}>
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <ListItem href="/products/telemedicine-platform" title="Telemedicine Platform">
                        Our flagship remote healthcare solution
                      </ListItem>
                      <ListItem href="/products/medical-records-system" title="Medical Records System">
                        Secure and efficient digital record keeping
                      </ListItem>
                      <ListItem href="/products/health-education-apps" title="Health Education Apps">
                        Mobile applications for health education
                      </ListItem>
                      <ListItem href="/products/diagnostic-tools" title="Diagnostic Tools">
                        AI-powered diagnostic assistance
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn("bg-transparent", isScrolled ? "text-gray-800" : "text-white")}>
                    Get Involved
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <ListItem href="/get-involved/donate" title="Donate">
                        Support our initiatives financially
                      </ListItem>
                      <ListItem href="/get-involved/volunteer" title="Volunteer">
                        Join our team of dedicated volunteers
                      </ListItem>
                      <ListItem href="/get-involved/partnerships" title="Partnerships">
                        Collaborate with us on impactful projects
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/blog" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent",
                        isScrolled ? "text-gray-800" : "text-white",
                      )}
                    >
                      Blog
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/contact" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent",
                        isScrolled ? "text-gray-800" : "text-white",
                      )}
                    >
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(isScrolled ? "text-gray-800" : "text-white")}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button asChild className="bg-teal-600 hover:bg-teal-700">
              <Link href="/get-involved/donate">Donate Now</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                <div className="border-b pb-2">
                  <p className="font-medium text-gray-500 mb-2">About Us</p>
                  <Link href="/about" className="block py-2 text-gray-800 hover:text-teal-600">
                    About Us
                  </Link>
                  <Link href="/team" className="block py-2 text-gray-800 hover:text-teal-600">
                    Team Members
                  </Link>
                  <Link href="/blog" className="block py-2 text-gray-800 hover:text-teal-600">
                  Blog
                </Link>
                </div>

                <div className="border-b pb-2">
                  <p className="font-medium text-gray-500 mb-2">Events</p>
                  <Link href="/events/ahis" className="block py-2 text-gray-800 hover:text-teal-600">
                    Africa Healthcare Innovation Summit
                  </Link>
                  <Link href="/events/bef" className="block py-2 text-gray-800 hover:text-teal-600">
                    Bayelsa Ed Tech Festival
                  </Link>
                  <Link href="/events/ets" className="block py-2 text-gray-800 hover:text-teal-600">
                    Emerging Technology Summit
                  </Link>
                </div>

                <div className="border-b pb-2">
                  <p className="font-medium text-gray-500 mb-2">Programs</p>
                  <Link
                    href="/programs/smart-education-alliance"
                    className="block py-2 text-gray-800 hover:text-teal-600"
                  >
                    Smart Education Alliance
                  </Link>
                  <Link href="/programs/med-innovate-network" className="block py-2 text-gray-800 hover:text-teal-600">
                    Med Innovate Network
                  </Link>
                  <Link
                    href="/programs/climate-change-initiative"
                    className="block py-2 text-gray-800 hover:text-teal-600"
                  >
                    Climate Change Initiative
                  </Link>
                </div>

                <div className="border-b pb-2">
                  <p className="font-medium text-gray-500 mb-2">Communities</p>
                  <Link href="/communities/healthcare-professionals" className="block py-2 text-gray-800 hover:text-teal-600">
                    Healthcare Professionals
                  </Link>
                  <Link href="/communities/researchers" className="block py-2 text-gray-800 hover:text-teal-600">
                    Researchers
                  </Link>
                  <Link href="/communities/innovators" className="block py-2 text-gray-800 hover:text-teal-600">
                    Innovators
                  </Link>
                  <Link href="/communities/students" className="block py-2 text-gray-800 hover:text-teal-600">
                    Students
                  </Link>
                </div>

                <div className="border-b pb-2">
                  <p className="font-medium text-gray-500 mb-2">Products</p>
                  <Link href="/products/telemedicine-platform" className="block py-2 text-gray-800 hover:text-teal-600">
                    Telemedicine Platform
                  </Link>
                  <Link href="/products/medical-records-system" className="block py-2 text-gray-800 hover:text-teal-600">
                    Medical Records System
                  </Link>
                  <Link href="/products/health-education-apps" className="block py-2 text-gray-800 hover:text-teal-600">
                    Health Education Apps
                  </Link>
                  <Link href="/products/diagnostic-tools" className="block py-2 text-gray-800 hover:text-teal-600">
                    Diagnostic Tools
                  </Link>
                </div>

                <div className="border-b pb-2">
                  <p className="font-medium text-gray-500 mb-2">Get Involved</p>
                  <Link href="/get-involved/donate" className="block py-2 text-gray-800 hover:text-teal-600">
                    Donate
                  </Link>
                  <Link href="/get-involved/volunteer" className="block py-2 text-gray-800 hover:text-teal-600">
                    Volunteer
                  </Link>
                  <Link href="/get-involved/partnerships" className="block py-2 text-gray-800 hover:text-teal-600">
                    Partnerships
                  </Link>
                </div>

                <Link href="/contact" className="block py-2 text-gray-800 hover:text-teal-600">
                  Contact
                </Link>

                <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                  <Link href="/get-involved/donate">Donate Now</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string
  }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"