import React from 'react'
import styled from 'styled-components'
import Task from './Task'
import Droppable from '../../StrictModeDroppable'

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  padding: 8px;
`
const TaskList = styled.div`
  padding: 8px;
  background-color: ${(props) => (props.isDraggingOver ? 'skyblue' : 'white')};
  flex-grow: 1;

  display: flex;
`

export default function Column({ column, data, isDropDisabled }) {
  return (
    <Container>
      <Title>{column.title}</Title>
      <p>{column.id}</p>
      <Droppable
        droppableId={column.id}
        isDropDisabled={isDropDisabled}
        direction="horizontal"
        // type={column.id === 'column-3' ? 'done' : 'active'}
      >
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
