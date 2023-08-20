import React, { useContext, useEffect, useState } from "react"
import { MouseContext } from "../context/mouse-context.jsx"

export default function Cursor() {
  const { cursorType, cursorChangeHandler } = useContext(MouseContext)
  const { x, y } = useMousePosition()
  return (
    <>
        <div
            className={"ring " + cursorType}  style={{ left: `${x}px`, top: `${y}px` }}
        ></div>
        <div
            className={"dot " + cursorType}
            style={{ left: `${x}px`, top: `${y}px` }}
        ></div>
    </>
  )
}

function useMousePosition() {
    const [mousePosition, setMousePosition] = useState({ x: null, y: null })
  
    useEffect(() => {
      const mouseMoveHandler = (event) => {
        const { clientX, clientY } = event;
        setMousePosition({ x: clientX, y: clientY })
      };
      document.addEventListener("mousemove", mouseMoveHandler)
  
      return () => {
        document.removeEventListener("mousemove", mouseMoveHandler)
      }
    }, [])
  
    return mousePosition
  }