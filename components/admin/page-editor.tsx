"use client"

import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PageEditorProps {
  value: string
  onChange: (value: string) => void
}

export function PageEditor({ value, onChange }: PageEditorProps) {
  const [activeTab, setActiveTab] = useState<string>("write")
  const [preview, setPreview] = useState<string>("")

  // Update preview when switching to preview tab
  useEffect(() => {
    if (activeTab === "preview") {
      // Simple markdown-like preview (in a real app, use a proper markdown parser)
      const formattedPreview = value
        .replace(/# (.*?)$/gm, '<h1 class="text-2xl font-bold my-4">$1</h1>')
        .replace(/## (.*?)$/gm, '<h2 class="text-xl font-bold my-3">$1</h2>')
        .replace(/### (.*?)$/gm, '<h3 class="text-lg font-bold my-2">$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/\n/g, "<br />")

      setPreview(formattedPreview)
    }
  }, [activeTab, value])

  return (
    <Tabs defaultValue="write" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="write">Write</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
      </TabsList>
      <TabsContent value="write" className="mt-2">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter page content here..."
          className="min-h-[300px] font-mono"
        />
        <p className="text-xs text-muted-foreground mt-2">
          You can use basic formatting: **bold**, *italic*, # Heading, ## Subheading
        </p>
      </TabsContent>
      <TabsContent value="preview" className="mt-2">
        <div
          className="min-h-[300px] border rounded-md p-4 overflow-auto prose max-w-none"
          dangerouslySetInnerHTML={{ __html: preview }}
        />
      </TabsContent>
    </Tabs>
  )
}
