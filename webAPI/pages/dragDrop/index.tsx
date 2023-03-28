import React, { useRef } from 'react'

export default function DragDrop() {
  const dropRef = useRef(null)

  const handleDragOver = (event: any) => {
    event.preventDefault()
    const data = event.dataTransfer.getData('text/plain')
    const textX = event.clientX
    const textY = event.clientY
    // console.log(textX, textY)
    console.log('2', event.target.innerHTML)
  }

  const handleDrop = (event: any) => {
    event.preventDefault()
    const data = event.dataTransfer.getData('text/plain')
    const textX = event.clientX
    const textY = event.clientY
    // console.log(textX, textY)
    // console.log('1', event.target.innerHTML)
    // if (dropRef.current) {
    //   dropRef.current.style.top = `${event.clientY}px`
    // }
    // console.log(`dropped data: ${data}`)
  }

  return (
    <>
      <div
        className="container"
        ref={dropRef}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="box" draggable="true">
          01
        </div>
        <div className="box" draggable="true">
          02
        </div>
        <div className="box" draggable="true">
          03
        </div>
      </div>
      <div className="container"></div>
    </>
  )
}
