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
`

export default function Column({ data }) {
  return (
    <Container>
      <Droppable droppableId={'hi'}>
        {(provided) => (
          <TaskList ref={provided.innerRef} {...provided.droppableProps}>
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
