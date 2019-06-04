import { Game, Card, Symbol, Player } from "./entities";

export const calculateWinner = (player: Player, game: Game): Symbol | null => {
  const opponent = game.players.find(item => item.id !== player.id);
  if (opponent) {
    if (player.score <= 0) {
      return opponent.symbol;
    } else if (opponent.score <= 0) {
      return player.symbol;
    } else return null;
  }
  return null;
};

export const generateRandomCard = (symbol: Symbol): Card => {
  const randomCard = new Card();
  randomCard.points = Math.floor(1 + Math.random() * 3);
  randomCard.symbol = symbol;
  const randomNumber = Math.floor(Math.random() * 100);
  let color = "";
  if (randomNumber <= 35) {
    color = "green";
  } else if (randomNumber <= 70 && randomNumber >= 36) {
    color = "red";
  } else if (randomNumber <= 86 && randomNumber >= 71) {
    color = "blue";
  } else if (randomNumber <= 93 && randomNumber >= 87) {
    color = "black";
  } else if (randomNumber <= 100 && randomNumber >= 94) {
    color = "purple";
  }
  randomCard.color = color;
  return randomCard;
};

export const calculatePoints = (game: Game, player: Player) => {
  const gameStack = game.stack;
  const opponent = game.players.find(item => item.id !== player.id);
  let isValid: boolean = true;

  if (!gameStack) return null;
  gameStack.map(card => {
    if (!isValid) {
      return (isValid = true);
    } else {
      switch (card.color) {
        case "red":
          if (card.symbol === "x") {
            return opponent && opponent.score - card.points;
          } else {
            return player.score - card.points;
          }

        case "green":
          if (card.symbol === "x") {
            return player.score + card.points;
          } else {
            return opponent && opponent.score + card.points;
          }

        case "blue":
          return (isValid = false);

        case "black":
          if (card.symbol === "x") {
            return (
              opponent && (opponent.score = Math.floor(opponent.score / 2))
            );
          } else {
            return (player.score = Math.floor(player.score / 2));
          }

        case "purple":
          if (card.symbol === "x") {
            return player.score * 2;
          } else return opponent && opponent.score * 2;
      }
    }
  });
};
