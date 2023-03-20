import Container from "@/component/Container"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


export default function Home() {
  return (
    <main>
      <DndProvider backend={HTML5Backend}>
        <Container />
      </DndProvider>
    </main>
  )
}
