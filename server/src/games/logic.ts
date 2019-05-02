import { Game, Card, Symbol } from './entities'

export const calculateWinner = (game: Game): Symbol | null => {
  if (game.playerOScore <= 0) {
    return 'x'
  } else if (game.playerXScore <= 0) {
    return 'o'
  } else 
  return null
}
 
export const generateRandomCard= (symbol: Symbol): Card => {
  const randomCard = new Card
  randomCard.points = Math.floor(1 + Math.random() * 3)
  randomCard.symbol = symbol
  const randomNumber = Math.floor(Math.random() * 100)
  let color = ''
  if (randomNumber <= 35) {
    color = 'green'
  } else if (randomNumber <= 70 && randomNumber >= 36) {
    color = 'red'
  } else if (randomNumber <= 86 && randomNumber >= 71) {
    color = 'blue'
  } else if (randomNumber <= 93 && randomNumber >= 87) {
    color = 'black'
  } else if (randomNumber <= 100 && randomNumber >= 94) {
    color = 'purple'
  }
  randomCard.color = color
  return randomCard
}

// export const calculatePoints = (stack: Stack) => {
  
//   let playerOScore: number = 20
//   let playerXScore: number = 20
//   let isValid: boolean = true
  
//   if (!stack) return
//   stack.map( card => {
//     if(!isValid) { return isValid = true}
//     else {
//       switch (card.color){
      
//       case "red":
//         if(card.playerId === "hand1"){
//         return playerTwoScore - card.points
//         }
//         else {return playerOneScore - card.points}
      
//       case "green":
//         if(card.playerId === "hand1"){
//         return playerOneScore + card.points
//         }
//         else {return playerTwoScore + card.points}
      
//       case "blue":
//         return isValid = false
      
//       case "black":
//         if(card.playerId === "hand1"){
//           return playerTwoScore = Math.floor(playerTwoScore / 2)
//         } else {return playerOneScore = Math.floor(playerOneScore / 2)}
      
//       case "purple":
//         if(card.playerId === "hand1"){
//         return playerOneScore * 2
//         }  else return playerTwoScore * 2
//       }
//     }
//   })
//   }
  
//   export const calculateWinner = (player: Player, player2: Player): PlayerHand | null =>{
//     if (player.points <= 0){
//       return "hand2"
//     } else if (player2.points <= 0) {
//       return "hand1"
//     } else {
//       return null
//     }
//   }