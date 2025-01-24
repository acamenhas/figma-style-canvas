import type React from "react"
import type { Block } from "../hooks/useCanvas"
import Header from "./blocks/Header"
import Hero from "./blocks/Hero"
import Features from "./blocks/Features"
import FeaturesGrid from "./blocks/FeaturesGrid"
import FeaturesAlternating from "./blocks/FeaturesAlternating"
import FAQs from "./blocks/FAQs"
import Footer from "./blocks/Footer"
import type { ScreenSize } from "./ResponsiveControls"
import HeroImageRight from "./blocks/HeroImageRight"
import HeroImageLeft from "./blocks/HeroImageLeft"

interface BlockRendererProps {
  block: Block
  updateBlockProperties: (id: string, properties: Record<string, any>) => void
  screenSize: ScreenSize
  className?: string
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ block, updateBlockProperties, screenSize, className }) => {
  const { type, sectionProperties } = block

  const sectionStyle = {
    backgroundColor: sectionProperties.backgroundColor,
    paddingTop: sectionProperties.paddingTop,
    paddingBottom: sectionProperties.paddingBottom,
  }

  const renderContent = () => {
    switch (type) {
      case "Header":
        return Header({ block, updateBlockProperties, screenSize }).renderContent()
      case "Hero":
        return Hero({ block, updateBlockProperties, screenSize }).renderContent()
      case "HeroImageRight":
        return HeroImageRight({ block, updateBlockProperties, screenSize }).renderContent()
      case "HeroImageLeft":
        return HeroImageLeft({ block, updateBlockProperties, screenSize }).renderContent()
      case "Features":
        return Features({ block, updateBlockProperties, screenSize }).renderContent()
      case "FeaturesGrid":
        return FeaturesGrid({ block, updateBlockProperties, screenSize }).renderContent()
      case "FeaturesAlternating":
        return FeaturesAlternating({ block, updateBlockProperties, screenSize }).renderContent()
      case "FAQs":
        return FAQs({ block, updateBlockProperties, screenSize }).renderContent()
      case "Footer":
        return Footer({ block, updateBlockProperties, screenSize }).renderContent()
      default:
        return null
    }
  }

  return (
    <section style={sectionStyle} className={className}>
      {renderContent()}
    </section>
  )
}

export default BlockRenderer

