"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Plus, Pencil, Trash2, Search, Loader2 } from "lucide-react"
import { useFirebase } from "@/lib/firebase/firebase-provider"
import { createPageService } from "@/lib/firebase/firestore-service"
import type { DocumentData } from "firebase/firestore"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function PagesManagement() {
  const { db } = useFirebase()
  const [pages, setPages] = useState<DocumentData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [deletePageId, setDeletePageId] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchPages = async () => {
      if (!db) return

      try {
        setIsLoading(true)
        const pageService = createPageService(db)
        const pagesData = await pageService.getAll()
        setPages(pagesData)
      } catch (error) {
        console.error("Error fetching pages:", error)
        toast({
          title: "Error",
          description: "Failed to load pages. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (db) {
      fetchPages()
    }
  }, [db, toast])

  const handleDeletePage = async () => {
    if (!db || !deletePageId) return

    try {
      const pageService = createPageService(db)
      await pageService.delete(deletePageId)

      // Update the local state
      setPages(pages.filter((page) => page.id !== deletePageId))

      toast({
        title: "Success",
        description: "Page deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting page:", error)
      toast({
        title: "Error",
        description: "Failed to delete page. Please try again.",
        variant: "destructive",
      })
    } finally {
      setDeletePageId(null)
    }
  }

  const filteredPages = pages.filter(
    (page) =>
      page.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.path?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Pages</h1>
        <Button onClick={() => router.push("/admin/content/pages/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Page
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Website Pages</CardTitle>
          <CardDescription>Edit and update content for all pages on your website</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search pages..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
              <span className="ml-2">Loading pages...</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page Title</TableHead>
                  <TableHead>Path</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPages.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      {searchQuery ? "No pages match your search" : "No pages found. Create your first page!"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPages.map((page) => (
                    <TableRow key={page.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-gray-500" />
                          {page.title}
                        </div>
                      </TableCell>
                      <TableCell>{page.path}</TableCell>
                      <TableCell>
                        {page.updatedAt ? new Date(page.updatedAt.toDate()).toLocaleDateString() : "N/A"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/admin/content/pages/edit/${page.id}`)}
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600"
                            onClick={() => setDeletePageId(page.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletePageId} onOpenChange={(open) => !open && setDeletePageId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the page and all its content.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePage} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
