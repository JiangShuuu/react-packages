import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 50%;
  background-color: ${(props) => (props.isDragging ? 'lightgreen' : 'white')};
  display: flex;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    outline: none;
    border-color: red;
  }
`

const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: 'orange';
  border-radius: 4px;
  margin-right: 8px;
`

export default function Task({ task, index }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {task.content[0]}
        </Container>
      )}
    </Draggable>
  )
}
