import { 
  JsonController, Authorized, CurrentUser, Post, Param, BadRequestError, HttpCode, NotFoundError, ForbiddenError, Get, 
  Body, Patch 
} from 'routing-controllers'
import User from '../users/entity'
import { Game, Player, Card } from './entities'
import {calculateWinner, generateRandomCard} from './logic'
import {io} from '../index'

class GameUpdate {
  game: Game
  card: Card
}

@JsonController()
export default class GameController {

  @Authorized()
  @Post('/games')
  @HttpCode(201)
  async createGame(
    @CurrentUser() user: User
  ) {
    const entity = await Game.create().save()

    const cardOne = await Card.create(generateRandomCard('x')).save()
    const cardTwo = await Card.create(generateRandomCard('x')).save()
    const cardThree = await Card.create(generateRandomCard('x')).save()


    await Player.create({
      game: entity, 
      user,
      symbol: 'x',
      hand: [cardOne, cardTwo, cardThree]
    }).save()

    const game = await Game.findOneById(entity.id)

    io.emit('action', {
      type: 'ADD_GAME',
      payload: game
    })

    return game
  }

  @Authorized()
  @Post('/games/:id([0-9]+)/players')
  @HttpCode(201)
  async joinGame(
    @CurrentUser() user: User,
    @Param('id') gameId: number
  ) {
    const game = await Game.findOneById(gameId)
    if (!game) throw new BadRequestError(`Game does not exist`)
    if (game.status !== 'pending') throw new BadRequestError(`Game is already started`)

    game.status = 'started'
    await game.save()

    const cardOne = await Card.create(generateRandomCard('o')).save()
    const cardTwo = await Card.create(generateRandomCard('o')).save()
    const cardThree = await Card.create(generateRandomCard('o')).save()

    const player = await Player.create({
      game, 
      user,
      symbol: 'o',
      hand: [cardOne, cardTwo, cardThree]
    }).save()
    console.log("player hand test: ", player.hand)
    io.emit('action', {
      type: 'UPDATE_GAME',
      payload: await Game.findOneById(game.id)
    })

    return player
  }

  @Authorized()
  // the reason that we're using patch here is because this request is not idempotent
  // http://restcookbook.com/HTTP%20Methods/idempotency/
  // try to fire the same requests twice, see what happens
  @Patch('/games/:id([0-9]+)')
  async updateGame(
    @CurrentUser() user: User,
    @Param('id') gameId: number,
    @Body() update: GameUpdate
  ) {
    const game = await Game.findOneById(gameId)
    if (!game) throw new NotFoundError(`Game does not exist`)

    const player = await Player.findOne({ user, game })

    if (!player) throw new ForbiddenError(`You are not part of this game`)
    if (game.status !== 'started') throw new BadRequestError(`The game is not started yet`)
    if (player.symbol !== game.turn) throw new BadRequestError(`It's not your turn`)   

    const card = update.card

    const winner = calculateWinner(update.game)
    if (winner) {
      game.winner = winner
      game.status = 'finished'
    } else {
      game.turn = player.symbol === 'x' ? 'o' : 'x'
    }
    game.stack = update.game.stack
    await game.save()
    
    io.emit('action', {
      type: 'UPDATE_GAME',
      payload: game
    })

    return game
  }

  @Authorized()
  @Get('/games/:id([0-9]+)')
  getGame(
    @Param('id') id: number
  ) {
    return Game.findOneById(id)
  }

  @Authorized()
  @Get('/games')
  getGames() {
    return Game.find()
  }
}

generateRandomCard