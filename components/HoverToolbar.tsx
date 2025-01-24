import type React from "react"
import { Trash2, Copy, Replace, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useCanvas } from "../hooks/useCanvas"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

interface HoverToolbarProps {
  onDelete: () => void
  onDuplicate: () => void
  onReplace: () => void
  onAIEdit: (prompt: string) => void
}

const HoverToolbar: React.FC<HoverToolbarProps> = ({ onDelete, onDuplicate, onReplace, onAIEdit }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [aiPrompt, setAiPrompt] = useState("")

  const {
    getSelectedBlock,
  } = useCanvas()

  const handleAIEdit = () => {
    onAIEdit(aiPrompt)
    setAiPrompt("")
    setIsPopoverOpen(false)
  }

  return (
    <div
      data-hover-toolbar
      className="absolute top-2 right-2 bg-white shadow-md rounded-md p-1 flex space-x-1 z-10 pointer-events-auto"
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation()
          onDelete()
        }}
        title="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation()
          onDuplicate()
        }}
        title="Duplicate"
      >
        <Copy className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation()
          onReplace()
        }}
        title="Replace"
      >
        <Replace className="h-4 w-4" />
      </Button>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              handleAIEdit()
              e.stopPropagation()
            }}
            title="AI Edit"
          >
            <Wand2 className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
      </Popover>
    </div>
  )
}

export default HoverToolbar

