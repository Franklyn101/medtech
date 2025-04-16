"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFirebase } from "@/lib/firebase/firebase-provider"
import { createPageService } from "@/lib/firebase/firestore-service"
import { createStorageService } from "@/lib/firebase/storage-service"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, ArrowLeft, Upload } from "lucide-react"
import { PageEditor } from "@/components/admin/page-editor"

export default function NewPage() {
  const { db, storage } = useFirebase()
  const router = useRouter()
  const { toast } = useToast()

  const [title, setTitle] = useState("")
  const [path, setPath] = useState("")
  const [content, setContent] = useState("")
  const [featuredImage, setFeaturedImage] = useState<File | null>(null)
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFeaturedImage(file)
      setFeaturedImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!db || !storage) {
      toast({
        title: "Error",
        description: "Database connection not available",
        variant: "destructive",
      })
      return
    }

    if (!title || !path) {
      toast({
        title: "Error",
        description: "Title and path are required",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)

      const pageService = createPageService(db)
      const storageService = createStorageService(storage)

      let imageUrl = null

      // Upload image if selected
      if (featuredImage) {
        const imagePath = storageService.generateFilePath("pages", featuredImage.name)
        imageUrl = await storageService.uploadFile(featuredImage, imagePath)
      }

      // Create page in Firestore
      const pageData = {
        title,
        path: path.startsWith("/") ? path : `/${path}`,
        content,
        featuredImage: imageUrl,
        status: "published",
      }

      await pageService.create(pageData)

      toast({
        title: "Success",
        description: "Page created successfully",
      })

      router.push("/admin/content/pages")
    } catch (error) {
      console.error("Error creating page:", error)
      toast({
        title: "Error",
        description: "Failed to create page. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={() => router.back()} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">Create New Page</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Page Content</CardTitle>
                <CardDescription>Enter the main content for this page</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Page Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter page title"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <PageEditor value={content} onChange={setContent} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Page Settings</CardTitle>
                <CardDescription>Configure page properties</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="path">Page Path</Label>
                  <Input
                    id="path"
                    value={path}
                    onChange={(e) => setPath(e.target.value)}
                    placeholder="/about-us"
                    required
                  />
                  <p className="text-xs text-muted-foreground">The URL path for this page (e.g., /about-us)</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="featured-image">Featured Image</Label>
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("featured-image")?.click()}
                      className="w-full"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {featuredImage ? "Change Image" : "Upload Image"}
                    </Button>
                    <Input
                      id="featured-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>

                  {featuredImagePreview && (
                    <div className="mt-4 relative aspect-video rounded-md overflow-hidden border">
                      <img
                        src={featuredImagePreview || "/placeholder.svg"}
                        alt="Featured image preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Publish</CardTitle>
                <CardDescription>Make this page available on your site</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Publish Page"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
