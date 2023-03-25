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

    // 建立新 Array
    const newArr = [...lists]

    const draggableItem = newArr.find((item) => item.id === draggableId)
    // 剪下拖拉的位子
    newArr.splice(source.index, 1)
    // 插入目標的位子
    newArr.splice(destination.index, 0, draggableItem)

    setLists(newArr)
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Column key={'column-1'} column={'column-1'} data={lists} />
    </DragDropContext>
  )
}
