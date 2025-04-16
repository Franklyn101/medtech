"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import AdminSidebar from "@/components/admin/sidebar"
import { useFirebase } from "@/lib/firebase/firebase-provider"
import { Loader2 } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useFirebase()
  const router = useRouter()
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)

  // Check if we're on the login page
  const isLoginPage = pathname === "/admin/login"

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    // Only redirect if not on login page and client-side rendering is active
    if (isClient && !loading && !user && !isLoginPage) {
      router.push("/admin/login")
    }
  }, [isClient, loading, user, router, isLoginPage])

  // If we're on the login page, just render the children (login form)
  if (isLoginPage) {
    return <>{children}</>
  }

  // Show loading state
  if (loading || !isClient) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
        <span className="ml-2 text-lg">Loading...</span>
      </div>
    )
  }

  // If not logged in and not on login page, don't render anything (will redirect)
  if (!user && !isLoginPage) {
    return null
  }

  // Render admin layout with sidebar
  return (
    <div className="flex gap-32  min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className=" ml-64 w-full p-8">{children}</div>
    </div>
  )
}
