import type React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { BlockType } from "../hooks/useCanvas"

interface AddBlockModalProps {
  isOpen: boolean
  onClose: () => void
  addBlock: (type: BlockType) => void
}

const blockTypes: BlockType[] = [
  "Header",
  "Hero",
  "HeroImageRight",
  "HeroImageLeft",
  "Features",
  "FeaturesGrid",
  "FeaturesAlternating",
  "FAQs",
  "Footer",
]

const AddBlockModal: React.FC<AddBlockModalProps> = ({ isOpen, onClose, addBlock }) => {
  const handleAddBlock = (type: BlockType) => {
    addBlock(type)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Block</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          {blockTypes.map((type) => (
            <Button key={type} onClick={() => handleAddBlock(type)} variant="outline">
              {type}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddBlockModal

