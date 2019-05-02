import React from 'react'

export default function ShowHand(props) {
  console.log('ShowHand test: ',props)
  return (
    <div>
      <p>{props.games.players[0].hand}</p>
      <p>{props.games.playerXScore}</p>
    </div>
  )
}
