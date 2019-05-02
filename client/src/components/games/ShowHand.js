import React from 'react'

export default function ShowHand(props) {
  return (
    <div className="player-hand">
      {props
        .hand
        .map(
          card => {
            const className = `heart-code-card-${card.color}`
            return <div key={card.id} className={className} onClick={props.onCardClick}>
              {card.points},{card.color}
            </div>
          }
        )
      }
      <p>{props.playerScore}</p>
    </div>
  )
}
