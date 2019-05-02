import React from 'react'

export default function StackDetails (props) {
  console.log(props.game.stack)
    if (props){
      // const {games, cards} = props
    return (<div>
            <h1>{props.game.stack}</h1>
            {/* <ul>{props.game.cards.map(card =>
                    <li>{props.cards.id}{props.cards.color}</li>)}
            </ul> */}
            </div>)    }
    else return 'Loading stack of cards...'
}