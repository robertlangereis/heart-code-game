import React from 'react'

export default function ShowOpponentStats(props) {
  return (
    <div className="opponent-stats">
      <div className="heart-code-card-back heart-code-card-standard-without-transformation"></div>
      <div className="heart-code-card-back heart-code-card-standard-without-transformation"></div>
      <div className="heart-code-card-back heart-code-card-standard-without-transformation"></div>
      <div className="score-wrapper">
        <p>Enemy score:</p>
        <p>{props.score}</p>
      </div>
    </div>
  )
}
