import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronDown, Plus, Trash } from "lucide-react"
import type { Page } from "../hooks/useCanvas"

interface PageManagementProps {
  pages: Page[]
  currentPageId: string
  addPage: () => void
  switchPage: (pageId: string) => void
  renamePage: (pageId: string, newName: string) => void
  deletePage: (pageId: string) => void
}

const PageManagement: React.FC<PageManagementProps> = ({
  pages,
  currentPageId,
  addPage,
  switchPage,
  renamePage,
  deletePage,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editingPageId, setEditingPageId] = useState<string | null>(null)
  const [editingPageName, setEditingPageName] = useState("")

  const handleRename = (pageId: string) => {
    setIsEditing(true)
    setEditingPageId(pageId)
    setEditingPageName(pages.find((p) => p.id === pageId)?.name || "")
  }

  const handleSaveRename = () => {
    if (editingPageId && editingPageName.trim()) {
      renamePage(editingPageId, editingPageName.trim())
      setIsEditing(false)
      setEditingPageId(null)
    }
  }

  const currentPage = pages.find((p) => p.id === currentPageId)

  return (
    <div className="flex items-center space-x-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[200px] justify-between">
            {currentPage?.name}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <div className="flex flex-col">
            {pages.map((page) => (
              <Button key={page.id} variant="ghost" className="justify-between" onClick={() => switchPage(page.id)}>
                {isEditing && editingPageId === page.id ? (
                  <Input
                    value={editingPageName}
                    onChange={(e) => setEditingPageName(e.target.value)}
                    onBlur={handleSaveRename}
                    onKeyPress={(e) => e.key === "Enter" && handleSaveRename()}
                    autoFocus
                  />
                ) : (
                  <>
                    {page.name}
                    <div className="flex space-x-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRename(page.id)
                        }}
                      >
                        ✏️
                      </Button>
                      {pages.length > 1 && (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            deletePage(page.id)
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <Button onClick={addPage}>
        <Plus className="mr-2 h-4 w-4" />
        Add Page
      </Button>
    </div>
  )
}

export default PageManagement

