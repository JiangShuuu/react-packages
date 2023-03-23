import React from 'react'
import styled from 'styled-components'
import Task from './Task'

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

export default function Column({ column, data }) {
  const t = data.map((item) => item.content)
  return (
    <Container>
      <Title>{column.title}</Title>
      <TaskList>
        {data.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </TaskList>
    </Container>
  )
}
