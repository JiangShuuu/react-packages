import React, { useState } from 'react'
import { createRange } from '../../utilities'
import SortableList from '../../components/SortableList'

function getMockItems() {
  return createRange(50, (index) => ({ id: index + 1 }))
}

export default function Index() {
  const [items, setItems] = useState(getMockItems)

  console.log(items)

  return (
    <div style={{ maxWidth: 400, margin: '30px auto' }}>
      <SortableList
        items={items}
        onChange={setItems}
        renderItem={(item) => (
          <SortableList.Item id={item.id}>
            {item.id}
            <SortableList.DragHandle />
          </SortableList.Item>
        )}
      />
    </div>
  )
}
