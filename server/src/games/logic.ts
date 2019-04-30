import { Stack, Player, PlayerHand } from './entities'

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