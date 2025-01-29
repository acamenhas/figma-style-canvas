import type React from "react"
import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import BlockRenderer from "./BlockRenderer"
import HoverToolbar from "./HoverToolbar"
import type { Block, SectionProperties } from "../hooks/useCanvas"
import type { ScreenSize } from "./ResponsiveControls"
import DrawerFragment from "./DrawerFragment"

interface CanvasProps {
  blocks: Block[]
  moveBlock: (fromIndex: number, toIndex: number) => void
  selectBlock: (id: string) => void
  removeBlock: (id: string) => void
  duplicateBlock: (id: string) => void
  screenSize: ScreenSize
  updateBlockProperties: (id: string, properties: Record<string, any>) => void
  updateSectionProperties: (id: string, sectionProperties: SectionProperties) => void
  replaceBlock: (id: string) => void
  aiEditBlock: (id: string, prompt: string) => void
}

const Canvas: React.FC<CanvasProps> = ({
  blocks,
  moveBlock,
  selectBlock,
  removeBlock,
  duplicateBlock,
  screenSize,
  updateBlockProperties,
  updateSectionProperties,
  replaceBlock,
}) => {
  const [hoveredBlockId, setHoveredBlockId] = useState<string | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [drawerBlock, setDrawerBlock] = useState<Block | null>(null)

  const onDragEnd = (result: any) => {
    if (!result.destination) return
    moveBlock(result.source.index, result.destination.index)
  }

  const aiEditBlock = (blockId: string) => {
    const block = blocks.find(b => b.id === blockId)

    if (block) {
      setDrawerBlock(block)
      setIsDrawerOpen(true)
    }
  }

  const updateBlock = (block: Block) => {
    if (drawerBlock) {
      updateBlockProperties(drawerBlock.id, block.properties)
      updateSectionProperties(drawerBlock.id, block.sectionProperties)
      setDrawerBlock(block)
      setIsDrawerOpen(true)
    }
  }

  const getCanvasStyle = () => {
    switch (screenSize) {
      case "tablet":
        return "max-w-[768px] mx-auto"
      case "mobile":
        return "max-w-[375px] mx-auto"
      default:
        return "w-full"
    }
  }

  return (
    <div className={`flex-1 p-4 bg-gray-100 overflow-auto ${getCanvasStyle()}`}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="canvas">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {blocks.map((block, index) => (
                <Draggable key={block.id} draggableId={block.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="mb-4 relative"
                      style={{ zIndex: 1 }}
                      onClick={(e) => {
                        if (!(e.target as HTMLElement).closest("[data-hover-toolbar]")) {
                          selectBlock(block.id)
                        }
                      }}
                      onMouseEnter={() => setHoveredBlockId(block.id)}
                      onMouseLeave={() => setHoveredBlockId(null)}
                    >
                      <BlockRenderer
                        block={block}
                        updateBlockProperties={updateBlockProperties}
                        screenSize={screenSize}
                        className="pointer-events-auto"
                      />
                      {hoveredBlockId === block.id && (
                        <HoverToolbar
                          onDelete={() => removeBlock(block.id)}
                          onDuplicate={() => duplicateBlock(block.id)}
                          onReplace={() => replaceBlock(block.id)}
                          onAIEdit={() => aiEditBlock(block.id)}
                        />
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <DrawerFragment isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen} block={drawerBlock || undefined} screenSize={screenSize} updateBlock={updateBlock} />
    </div>
  )
}

export default Canvas