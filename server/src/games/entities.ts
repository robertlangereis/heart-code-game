import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
import User from '../users/entity'

export type Symbol = 'x' | 'o'

type Status = 'pending' | 'started' | 'finished'

@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('char', {length:1, default: 'x'})
  turn: Symbol

  @Column('char', {length:1, nullable: true})
  winner: Symbol

  @Column('text', {default: 'pending'})
  status: Status

  @Column('text', {default: 10})
  playerXScore: number

  @Column('text', {default: 20})
  playerOScore: number

  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  @OneToMany(_ => Player, player => player.game, {eager: true})
  players: Player[]

  @OneToMany(_ => Card, card => card.game, {eager: true})
  stack: Card[]
}

@Entity()
@Index(['game', 'user', 'symbol'], {unique:true})
export class Player extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_ => User, user => user.players)
  user: User

  @ManyToOne(_ => Game, game => game.players)
  game: Game

  @Column('char', {length: 1})
  symbol: Symbol

  @Column('integer', { name: 'user_id' })
  userId: number

  @OneToMany(_ => Card, card => card.player, {eager: true})
  hand: Card[]
}

@Entity()
export class Card extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  color: string

  @Column()
  points: number

  @Column({nullable: true})
  symbol: Symbol

  @ManyToOne(_ => Player, player => player.hand, {nullable: true})
  player: Player | null

  @ManyToOne(_ => Game, game => game.stack)
  game: Game
}


