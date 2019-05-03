import React from 'react'
import './GameDetails.css'

export default function ShowStack(props) {
  const lastCard = props.stack[props.stack.length-1]
  if(lastCard){
  return (
    <div className="stack-last-card">
      <div key={lastCard.id} className={`heart-code-card-${lastCard.color}`}>{lastCard.color}{lastCard.points}</div>
    </div>
  )
}
  return null
}