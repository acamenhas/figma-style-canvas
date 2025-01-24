import type React from "react"
import { useEffect, useCallback } from "react"
import Sidebar from "./components/Sidebar"
import Canvas from "./components/Canvas"
import RightSidebar from "./components/RightSidebar"
import ResponsiveControls from "./components/ResponsiveControls"
import UndoRedoControls from "./components/UndoRedoControls"
import PageManagement from "./components/PageManagement"
import { useCanvas } from "./hooks/useCanvas"

const App: React.FC = () => {
  const {
    pages,
    currentPageId,
    addPage,
    switchPage,
    renamePage,
    deletePage,
    blocks,
    addBlock,
    removeBlock,
    duplicateBlock,
    moveBlock,
    selectBlock,
    updateBlockProperties,
    updateSectionProperties,
    getSelectedBlock,
    screenSize,
    setScreenSize,
    undo,
    redo,
    canUndo,
    canRedo,
    replaceBlock,
    aiEditBlock,
  } = useCanvas()

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return // Don't trigger shortcuts when typing in input fields
      }

      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0
      const modifier = isMac ? event.metaKey : event.ctrlKey

      if (modifier && event.key === "z") {
        event.preventDefault()
        if (event.shiftKey) {
          redo()
        } else {
          undo()
        }
      } else if (modifier && event.key === "y") {
        event.preventDefault()
        redo()
      }
    },
    [undo, redo],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <div className="flex h-screen">
      <Sidebar addBlock={addBlock} />
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center p-4 bg-gray-100 border-b">
          <PageManagement
            pages={pages}
            currentPageId={currentPageId}
            addPage={addPage}
            switchPage={switchPage}
            renamePage={renamePage}
            deletePage={deletePage}
          />
          <div className="flex items-center space-x-4">
            <ResponsiveControls screenSize={screenSize} setScreenSize={setScreenSize} />
            <UndoRedoControls onUndo={undo} onRedo={redo} canUndo={canUndo} canRedo={canRedo} />
          </div>
        </div>
        <Canvas
          blocks={blocks}
          moveBlock={moveBlock}
          selectBlock={selectBlock}
          removeBlock={removeBlock}
          duplicateBlock={duplicateBlock}
          screenSize={screenSize}
          updateBlockProperties={updateBlockProperties}
          updateSectionProperties={updateSectionProperties}
          replaceBlock={replaceBlock}
          aiEditBlock={aiEditBlock}
        />
      </div>
      <RightSidebar
        selectedBlock={getSelectedBlock()}
        updateBlockProperties={updateBlockProperties}
        updateSectionProperties={updateSectionProperties}
      />
    </div>
  )
}

export default App

