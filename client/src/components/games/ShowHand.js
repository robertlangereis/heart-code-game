import React from 'react'
export default function ShowHand(props) {
  
  return (
    <div className="player-hand">
      {props
        .hand
        .map(
          card => {
            const className = `heart-code-card-${card.color} heart-code-card-standard`
            return <div key={card.id} className={className} onClick={() => props.onCardClick(card.id)}>
              {card.points} Point(s)
              {/* ,{card.color} */}
            </div>
          }
        )
      }
      <div className="score-wrapper">
        <p>Player score:</p>
        <p>{props.playerScore}</p>
      </div>
    </div>
  )
}
