import {
  JsonController,
  Authorized,
  CurrentUser,
  Post,
  Param,
  BadRequestError,
  HttpCode,
  NotFoundError,
  ForbiddenError,
  Get,
  Body,
  Patch,
} from "routing-controllers";
import User from "../users/entity";
import { Game, Player, Card } from "./entities";
import { calculateWinner, generateRandomCard, calculatePoints } from "./logic";
import { io } from "../index";

class GameUpdate {
  cardId: number;
}

@JsonController()
export default class GameController {
  @Authorized()
  @Post("/games")
  @HttpCode(201)
  async createGame(@CurrentUser() user: User) {
    const entity = await Game.create().save();

    const cardOne = await Card.create(generateRandomCard("x")).save();
    const cardTwo = await Card.create(generateRandomCard("x")).save();
    const cardThree = await Card.create(generateRandomCard("x")).save();

    await Player.create({
      game: entity,
      user,
      symbol: "x",
      hand: [cardOne, cardTwo, cardThree],
    }).save();

    const game = await Game.findOneById(entity.id);

    io.emit("action", {
      type: "ADD_GAME",
      payload: game,
    });

    return game;
  }

  @Authorized()
  @Post("/games/:id([0-9]+)/players")
  @HttpCode(201)
  async joinGame(@CurrentUser() user: User, @Param("id") gameId: number) {
    const game = await Game.findOneById(gameId);
    if (!game) throw new BadRequestError(`Game does not exist`);
    if (game.status !== "pending")
      throw new BadRequestError(`Game is already started`);

    game.status = "started";
    await game.save();

    const cardOne = await Card.create(generateRandomCard("o")).save();
    const cardTwo = await Card.create(generateRandomCard("o")).save();
    const cardThree = await Card.create(generateRandomCard("o")).save();

    const player = await Player.create({
      game,
      user,
      symbol: "o",
      hand: [cardOne, cardTwo, cardThree],
    }).save();
    io.emit("action", {
      type: "UPDATE_GAME",
      payload: await Game.findOneById(game.id),
    });

    return player;
  }

  @Authorized()
  @Patch("/games/:id([0-9]+)")
  async updateGame(
    @CurrentUser() user: User,
    @Param("id") gameId: number,
    @Body() update: GameUpdate
  ) {
    const game = await Game.findOneById(gameId);
    if (!game) throw new NotFoundError(`Game does not exist`);

    const player = await Player.findOne({ user, game });

    if (!player) throw new ForbiddenError(`You are not part of this game`);
    if (game.status !== "started")
      throw new BadRequestError(`The game is not started yet`);
    if (player.symbol !== game.turn)
      throw new BadRequestError(`It's not your turn`);

    // replacing the card played with a new card
    const newCard = await Card.create(generateRandomCard(player.symbol)).save();
    player.hand = player.hand.map(handCard => {
      const isMatch = handCard.id === update.cardId;
      if (isMatch) {
        return newCard;
      }
      return handCard;
    });
    await player.save();

    // putting the card played into the game.stack
    const card = await Card.findOneById(update.cardId);
    if (card) {
      card.ordernumber = game.stackorder;
      game.stackorder++;
      await card.save();
      game.stack.push(card);
    }
    calculatePoints(game, player);
    await player.save();
    await game.save();

    const newGame = await Game.findOneById(gameId);
    if (!newGame) throw new NotFoundError(`Game does not exist`);

    newGame.stack = newGame.stack.sort((a, b) =>
      a.ordernumber > b.ordernumber ? 1 : -1
    );

    const winner = calculateWinner(player, newGame);
    if (winner) {
      newGame.winner = winner;
      newGame.status = "finished";
    } else {
      newGame.turn = player.symbol === "x" ? "o" : "x";
    }
    await newGame.save();

    io.emit("action", {
      type: "UPDATE_GAME",
      payload: newGame,
    });
    return newGame;
  }

  @Authorized()
  @Get("/games/:id([0-9]+)")
  getGame(@Param("id") id: number) {
    return Game.findOneById(id);
  }

  @Authorized()
  @Get("/games")
  getGames() {
    return Game.find();
  }
}
