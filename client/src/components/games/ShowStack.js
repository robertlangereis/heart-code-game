import React from 'react'
import './GameDetails.css'

export default function ShowStack(props) {
  if (props.stack[0]) {
    const className = `heart-code-card-${props.stack[0].color} heart-code-card-standard-without-transformation`
    return (
      <div className="stack-last-card">
        <div key={props.stack[0].id} className={className}>{props.stack[0].points} Point(s)</div>
        {console.log("check ShowStack in component",props.stack)}
      </div>
    )
  }
  return null
}
