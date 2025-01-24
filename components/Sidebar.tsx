import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import AddBlockModal from "./AddBlockModal"
import type { BlockType } from "../hooks/useCanvas"

interface SidebarProps {
  addBlock: (type: BlockType) => void
}

const Sidebar: React.FC<SidebarProps> = ({ addBlock }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Components</h2>
      <Button onClick={() => setIsModalOpen(true)} className="w-full">
        <PlusCircle className="mr-2 h-4 w-4" /> Add Block
      </Button>
      <AddBlockModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} addBlock={addBlock} />
    </div>
  )
}

export default Sidebar

