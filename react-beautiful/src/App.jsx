import { useState } from 'react'
import initialData from '../initial-data'
import Column from './Column'

function App() {
  const [lists, setLists] = useState(initialData)
  return (
    <div className="">
      {lists.columnOrder.map((columnId) => {
        const column = lists.columns[columnId]
        const tasks = column.taskIds.map((taskId) => lists.tasks[taskId])
        return <Column key={column.id} column={column} data={tasks} />
      })}
    </div>
  )
}

export default App
