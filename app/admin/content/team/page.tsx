"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, Plus, Pencil, Trash2, Search, Loader2, Mail, Linkedin } from "lucide-react"
import { useFirebase } from "@/lib/firebase/firebase-provider"
import { createTeamMemberService } from "@/lib/firebase/firestore-service"
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
import Image from "next/image"

export default function TeamManagement() {
  const { db } = useFirebase()
  const [teamMembers, setTeamMembers] = useState<DocumentData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteMemberId, setDeleteMemberId] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchTeamMembers = async () => {
      if (!db) return

      try {
        setIsLoading(true)
        const teamMemberService = createTeamMemberService(db)
        const teamMembersData = await teamMemberService.getAll()
        setTeamMembers(teamMembersData)
      } catch (error) {
        console.error("Error fetching team members:", error)
        toast({
          title: "Error",
          description: "Failed to load team members. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (db) {
      fetchTeamMembers()
    }
  }, [db, toast])

  const handleDeleteMember = async () => {
    if (!db || !deleteMemberId) return

    try {
      const teamMemberService = createTeamMemberService(db)
      await teamMemberService.delete(deleteMemberId)

      // Update the local state
      setTeamMembers(teamMembers.filter((member) => member.id !== deleteMemberId))

      toast({
        title: "Success",
        description: "Team member deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting team member:", error)
      toast({
        title: "Error",
        description: "Failed to delete team member. Please try again.",
        variant: "destructive",
      })
    } finally {
      setDeleteMemberId(null)
    }
  }

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Team Members</h1>
        <Button onClick={() => router.push("/admin/content/team/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Member
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Team</CardTitle>
          <CardDescription>Add and manage your organization's team members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search team members..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
              <span className="ml-2">Loading team members...</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      {searchQuery
                        ? "No team members match your search"
                        : "No team members found. Add your first team member!"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full overflow-hidden relative bg-gray-100">
                            {member.image ? (
                              <Image
                                src={member.image || "/placeholder.svg"}
                                alt={member.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <Users className="h-6 w-6 m-2 text-gray-400" />
                            )}
                          </div>
                          <span className="font-medium">{member.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {member.social?.email && (
                            <a href={`mailto:${member.social.email}`} className="text-gray-500 hover:text-teal-600">
                              <Mail className="h-4 w-4" />
                            </a>
                          )}
                          {member.social?.linkedin && (
                            <a
                              href={member.social.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-500 hover:text-teal-600"
                            >
                              <Linkedin className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/admin/content/team/edit/${member.id}`)}
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600"
                            onClick={() => setDeleteMemberId(member.id)}
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
      <AlertDialog open={!!deleteMemberId} onOpenChange={(open) => !open && setDeleteMemberId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the team member.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteMember} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
