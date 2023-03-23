import { useState } from 'react'
import initialData from '../initial-data'
import Column from './Column'
import { DragDropContext } from 'react-beautiful-dnd'

function App() {
  const [lists, setLists] = useState(initialData)

  const onDragEnd = (result) => {}
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {lists.columnOrder.map((columnId) => {
        const column = lists.columns[columnId]
        const tasks = column.taskIds.map((taskId) => lists.tasks[taskId])
        return <Column key={column.id} column={column} data={tasks} />
      })}
    </DragDropContext>
  )
}

export default App
