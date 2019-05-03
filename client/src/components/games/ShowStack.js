import React from 'react'
import './GameDetails.css'

export default function ShowStack(props) {
  const lastCard = props.stack[props.stack.length-1]
  
  if(lastCard){
    const className = `heart-code-card-${lastCard.color} heart-code-card-standard-without-transformation`
    
    return (
      <div className="stack-last-card">
        <div key={lastCard.id} className={className}>{lastCard.color}{lastCard.points}</div>
      </div>
    )
  }

  return null
}