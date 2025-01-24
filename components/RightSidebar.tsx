import type React from "react"
import PropertyEditor from "./PropertyEditor"
import type { Block, SectionProperties } from "../hooks/useCanvas"

interface RightSidebarProps {
  selectedBlock: Block | null
  updateBlockProperties: (id: string, properties: Record<string, any>) => void
  updateSectionProperties: (id: string, sectionProperties: Partial<SectionProperties>) => void
}

const RightSidebar: React.FC<RightSidebarProps> = ({
  selectedBlock,
  updateBlockProperties,
  updateSectionProperties,
}) => {
  return (
    <div className="w-64 bg-gray-100 p-4 overflow-auto">
      <h2 className="text-xl font-bold mb-4">Properties</h2>
      {selectedBlock ? (
        <PropertyEditor
          block={selectedBlock}
          updateBlockProperties={updateBlockProperties}
          updateSectionProperties={updateSectionProperties}
        />
      ) : (
        <p>Select a block to edit its properties</p>
      )}
    </div>
  )
}

export default RightSidebar

