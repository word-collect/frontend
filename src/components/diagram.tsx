'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  src: string // e.g. "/diagram.svg"
  height?: string | number // optional height for the viewport
}

// Treat anything narrower than this as “mobile”.
const MOBILE_BREAKPOINT = 768 // px

export default function Diagram({ src, height = '80vh' }: Props) {
  const container = useRef<HTMLDivElement>(null)
  const [svgContent, setSvgContent] = useState<string | null>(null)

  /* 1️⃣  Fetch the SVG once on mount */
  useEffect(() => {
    fetch(src)
      .then((r) => r.text())
      .then(setSvgContent)
      .catch(console.error)
  }, [src])

  /* 2️⃣  Inject SVG + initialise pan/zoom in the browser only */
  useEffect(() => {
    if (!svgContent || !container.current) return

    container.current.innerHTML = svgContent

    // dynamic import prevents "window is not defined"
    let instance: any
    import('svg-pan-zoom').then(({ default: svgPanZoom }) => {
      const svgEl = container.current!.querySelector('svg') as SVGSVGElement
      instance = svgPanZoom(svgEl, {
        zoomEnabled: true,
        controlIconsEnabled: true,
        fit: true,
        center: true,
        minZoom: 0.5,
        maxZoom: 8
      })

      // 🎯  On mobile, zoom in so the diagram fills the tall viewport.
      if (window.innerWidth < MOBILE_BREAKPOINT) {
        const containerHeight = container.current!.clientHeight
        const { height: svgHeight } = svgEl.getBBox()
        const targetScale = containerHeight / svgHeight

        if (targetScale > 1) {
          instance.zoom(2) // scale up
          instance.center() // keep it centred
        }
      }
    })

    // clean up on unmount
    return () => instance?.destroy()
  }, [svgContent])

  return (
    <div
      ref={container}
      style={{
        width: '100%',
        height,
        border: '1px solid #ddd',
        overflow: 'hidden'
      }}
    />
  )
}
