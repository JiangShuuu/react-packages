import React from 'react'
import styled from 'styled-components'
import Task from './Task'
import Droppable from '../../StrictModeDroppable'

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`
const Title = styled.h3`
  padding: 8px;
`
const TaskList = styled.div`
  padding: 8px;
  background-color: ${(props) => (props.isDraggingOver ? 'skyblue' : 'white')};
`

export default function Column({ column, data }) {
  return (
    <Container>
      <Title>{column.title}</Title>
      <p>{column.id}</p>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {data.map((task, idx) => (
              <Task key={task.id} task={task} index={idx} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  )
}