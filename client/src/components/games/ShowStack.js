import React from 'react'
import './GameDetails.css'

export default function ShowStack(props) {
  return (
    <div className="stack-last-card">
      <div key={props.stack[0].id} className={`heart-code-card-${props.stack[0].color}`}>{props.stack[0].color}{props.stack[0].points}</div>
      <div key={props.stack[1].id} className={`heart-code-card-${props.stack[1].color}`}>{props.stack[1].color}{props.stack[1].points}</div>
      {console.log("check ShowStack in component",props.stack)}
    </div>
  )
}
