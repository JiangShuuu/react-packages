import React, {useState, useCallback} from 'react'
import update from 'immutability-helper'
import { Motion, spring } from 'react-motion';
import Card from './Card';
const data = [
  {
    id: 1,
    order: 0,
    text: 'Item One',
  }, 
  {
    id: 2,
    order: 1,
    text: 'Item Two',
  }, 
  {
    id: 3,
    order: 2,
    text: 'Item Three',
  }, 
  {
    id: 4,
    order: 3,
    text: 'Item Four',
  }
]

interface Item {
  id: number,
  order: number,
  text: string
}

export default function Container() {
  const [cards, setCards] = useState(data)

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: Item[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as Item],
        ],
      }),
    )}, [])

  // const moveCard = (dragId:number, hoverId:number) => {
  //   const dragIndex = cards.findIndex((el) => el.id === dragId)
  //   const hoverIndex = cards.findIndex((el) => el.id === hoverId)
  //   const dragCardOrder = cards[dragIndex].order
  //   const hoverCardOrder = cards[hoverIndex].order
  //   console.log(cards)

  //   setCards((prev) => update(prev, {
  //     dragIndex: {order: { $set: hoverCardOrder }},
  //     hoverIndex: {order: { $set: dragCardOrder }}
  //   }))
  // }

  return (
    <div>
      {cards.map((card, i) => (
        <Motion key={i} style={{ y: spring(card.order * 80, { stiffness: 500, damping: 32 }) }}>
          {
            ({ y }) => 
              <Card id={card.id} index={card.order} text={card.text} moveCard={moveCard} num={y} />
          }
        </Motion>
      ))}
    </div>
  )
}
