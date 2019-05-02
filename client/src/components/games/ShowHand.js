import React from 'react'

export default function ShowHand(props) {
  return (
    <div>
      {props.hand.map(card => {
        return <div key={card.id}>
          {card.points}, {card.color}
        </div>
      })}
      <p>{props.playerScore}</p>
    </div>
  )
}
