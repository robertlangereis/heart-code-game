import React from 'react'
export default function ShowHand(props) {
  
  return (
    <div className="player-hand">
      {props
        .hand
        .map(
          card => {
            const className = `heart-code-card-${card.color} heart-code-card-standard`
            if (card.color === 'red'){
            return <div key={card.id} className={className} onClick={() => props.onCardClick(card.id)}>
              {card.points} attack points
              {/* ,{card.color} */}
            </div>
          } else if (card.color === 'black'){
            return <div key={card.id} className={className} onClick={() => props.onCardClick(card.id)}>
              10 attack points
              {/* ,{card.color} */}
            </div>
          } else if (card.color === 'purple'){
            return <div key={card.id} className={className} onClick={() => props.onCardClick(card.id)}>
              10 health points
              {/* ,{card.color} */}
            </div>
          }
          else if (card.color === 'green'){
            return <div key={card.id} className={className} onClick={() => props.onCardClick(card.id)}>
              {card.points} health points
              {/* ,{card.color} */}
            </div>
          }
          else if (card.color === 'blue'){
            return <div key={card.id} className={className} onClick={() => props.onCardClick(card.id)}>
              counter opponent card
              {/* ,{card.color} */}
          </div>} else {
            return null
          }
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
