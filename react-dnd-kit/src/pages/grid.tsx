import React, { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable'

import { createRange } from '../../utilities'

import SortableGrid from '../../components/SortableGrid'

const fakeData = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
]

function getMockItems() {
  return createRange(50, (index) => ({ id: index + 1 }))
}

export default function Grid() {
  const [activeId, setActiveId] = useState(null)
  const [items, setItems] = useState(getMockItems)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event: any) => {
    setActiveId(null)
    const { active, over } = event

    if (active.id !== over.id) {
      setItems((items) => {
        console.log(active.id)
        // const oldIndex = items.indexOf(active.id)
        // const newIndex = items.indexOf(over.id)
        const oldIndex = items.findIndex((item: any) => item.id === active.id)
        const newIndex = items.findIndex((item: any) => item.id === over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <div style={{ maxWidth: '600px', display: 'flex', flexWrap: 'wrap' }}>
        <SortableContext items={items} strategy={rectSortingStrategy}>
          {items.map((item: any) => (
            <SortableGrid
              key={item.id}
              id={item.id}
              handle={true}
              value={item.id}
            />
          ))}
          <DragOverlay>
            {activeId ? (
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  backgroundColor: 'red',
                }}
              ></div>
            ) : null}
          </DragOverlay>
        </SortableContext>
      </div>
    </DndContext>
  )
}
