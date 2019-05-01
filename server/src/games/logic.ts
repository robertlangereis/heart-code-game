import { Game, Card, Symbol } from './entities'

export const calculateWinner = (game: Game): Symbol | null => {
  return game.turn
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
