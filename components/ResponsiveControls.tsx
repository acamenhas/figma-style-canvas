import type React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type ScreenSize = "desktop" | "tablet" | "mobile"

interface ResponsiveControlsProps {
  screenSize: ScreenSize
  setScreenSize: (size: ScreenSize) => void
}

const ResponsiveControls: React.FC<ResponsiveControlsProps> = ({ screenSize, setScreenSize }) => {
  return (
    <div className="mb-4">
      <Select value={screenSize} onValueChange={(value: ScreenSize) => setScreenSize(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select screen size" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="desktop">Desktop</SelectItem>
          <SelectItem value="tablet">Tablet</SelectItem>
          <SelectItem value="mobile">Mobile</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default ResponsiveControls

