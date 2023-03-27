import { useState } from 'react'
import initialData from '../component/03/initial-data'
import Column from '../component/03/Column'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'

// https://egghead.io/lessons/react-persist-list-reordering-with-react-beautiful-dnd-using-the-ondragend-callback

const Container = styled.div`
  display: flex;
`

function Index03() {
  const [lists, setLists] = useState(initialData)
  const [home, setHome] = useState()

  const onDragEnd = (result) => {
    document.body.style.color = 'inherit'
    document.body.style.background = 'inherit'

    setHome(null)

    // destination 目標物件, source 拖拉物件, source的id
    const { destination, source, draggableId } = result

    // 沒目標 return
    if (!destination) {
      return
    }

    // 同id或同位置 return
    if (
      destination.draggableId === source.draggableId &&
      destination.index === source.index
    ) {
      return
    }

    // 獲取 columns 物件
    // const column = lists.columns[source.droppableId]
    const start = lists.columns[source.droppableId]
    const finish = lists.columns[destination.droppableId]

    if (start === finish) {
      // 建立新 Array
      const newTaskIds = Array.from(start.taskIds)
      // 剪下拖拉的位子
      newTaskIds.splice(source.index, 1)
      // 插入目標的位子
      newTaskIds.splice(destination.index, 0, draggableId)

      // 建立新的 column, 取代舊的 taskIds
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      }

      // 建立新的 state, 取代舊的 columns
      const newState = {
        ...lists,
        columns: {
          ...lists.columns,
          [newColumn.id]: newColumn,
        },
      }

      setLists(newState)
      return
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index, 1)

    const newStart = {
      ...start,
      taskIds: startTaskIds,
    }

    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    }

    const newState = {
      ...lists,
      columns: {
        ...lists.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    }

    setLists(newState)
  }

  const onDragStart = (result) => {
    document.body.style.color = 'orange'
    document.body.style.transition = 'background-color 0.2s ease'

    const homeIndex = lists.columnOrder.indexOf(result.source.draggableId)
    setHome(homeIndex)
  }

  const onDragUpdate = (result) => {
    const { destination } = result
    const opacity = destination
      ? destination.index / Object.keys(lists).length
      : 0
    document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`
  }

  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Container>
        {lists.columnOrder.map((columnId, index) => {
          const column = lists.columns[columnId]
          const tasks = column.taskIds.map((taskId) => lists.tasks[taskId])

          const isDropDisabled = index < home

          return (
            <Column
              key={column.id}
              column={column}
              data={tasks}
              isDropDisabled={isDropDisabled}
            />
          )
        })}
      </Container>
    </DragDropContext>
  )
}

export default Index03
