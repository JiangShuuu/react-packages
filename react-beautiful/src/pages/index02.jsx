import { useState } from 'react'
import initialData from '../component/02/initial-data'
import Column from '../component/02/Column'
import { DragDropContext } from 'react-beautiful-dnd'

// https://egghead.io/lessons/react-persist-list-reordering-with-react-beautiful-dnd-using-the-ondragend-callback

export default function Index02() {
  const [lists, setLists] = useState(initialData)

  const onDragEnd = (result) => {
    // destination 目標物件, source 拖拉物件, source的id
    const { destination, source, draggableId } = result

    console.log(destination, source, draggableId)

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
    // const column = lists.columns

    // 建立新 Array
    console.log('0', lists)
    const newTaskIds = Array.from(lists)
    console.log('1', newTaskIds)
    // 剪下拖拉的位子
    newTaskIds.splice(source.index, 1)
    // 插入目標的位子
    newTaskIds.splice(destination.index, 0, draggableId)

    console.log(source.index)

    // 建立新的 column, 取代舊的 taskIds
    // const newColumn = {
    //   ...column,
    //   taskIds: newTaskIds,
    // }

    // 建立新的 state, 取代舊的 columns
    // const newState = {
    //   ...lists,
    //   columns: {
    //     ...lists.columns,
    //     [newColumn.id]: newColumn,
    //   },
    // }

    // setLists(newState)
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Column key={'column-1'} column={'column-1'} data={lists} />
    </DragDropContext>
  )
}
