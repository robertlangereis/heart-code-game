import React from 'react'

export default function ShowStack(props) {
  return (
    <div className="stack-last-card">
      {props.stack[0].color},{props.stack[0].points}
      {console.log("check ShowStack",props.stack)}
    </div>
  )
}
