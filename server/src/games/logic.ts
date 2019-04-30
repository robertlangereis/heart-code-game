import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { Stack, Hand, Player, PlayerHand } from './entities'

@ValidatorConstraint()
export class IsHand implements ValidatorConstraintInterface {

  validate(hand: Hand) {
    return hand.cards.length === 3
  }
}


export const calculatePoints = (stack: Stack) => {
  
let playerOneScore: number = 20
let playerTwoScore: number = 20
let isValid: boolean = true

if (!stack) return
stack.map( card => {
  if(!isValid) { return isValid = true}
  else {
    switch (card.color){
    case "red":
      if(card.playerId === "hand1"){
      return playerTwoScore - card.points
      }
      else {return playerOneScore - card.points}
    case "green":
      if(card.playerId === "hand1"){
      return playerOneScore + card.points
      }
      else {return playerTwoScore + card.points}
    case "blue":
      return isValid = false
    case "black":
      if(card.playerId === "hand1"){
        return playerTwoScore = Math.floor(playerTwoScore / 2)
      } else {return playerOneScore = Math.floor(playerOneScore / 2)}
    case "purple":
      if(card.playerId === "hand1"){
      return playerOneScore * 2
      }  else return playerTwoScore * 2
    }
  }
})
}

export const calculateWinner = (player: Player, player2: Player): PlayerHand | null =>{
  if (player.points <= 0){
    return "hand2"
  } else if (player2.points <= 0) {
    return "hand1"
  } else {
    return null
  }
}

    // .concat(
    //   // vertical winner
    //   [0, 1, 2].map(n => board.map(row => row[n])) as Row[]
    // )
    // .concat(
    //   [
    //     // diagonal winner ltr
    //     [0, 1, 2].map(n => board[n][n]),
    //     // diagonal winner rtl
    //     [0, 1, 2].map(n => board[2-n][n])
    //   ] as Row[]
    // )
    // .filter(row => row[0] && row.every(symbol => symbol === row[0]))
    // .map(row => row[0])[0] || null

// export const finished = (board: Board): boolean =>
//   board
//     .reduce((a,b) => a.concat(b) as Row)
//     .every(symbol => symbol !== null)
