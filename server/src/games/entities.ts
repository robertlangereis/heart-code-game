import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm'
import User from '../users/entity'

export type Symbol = 'x' | 'o'
export type Row = [ Symbol | null, Symbol | null, Symbol | null ]
export type Board = [ Row, Row, Row ]

type Status = 'pending' | 'started' | 'finished'

const emptyRow: Row = [null, null, null]
const emptyBoard: Board = [ emptyRow, emptyRow, emptyRow ]

@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('json', {default: emptyBoard})
  board: Board

  @Column('char', {length:1, default: 'x'})
  turn: Symbol

  @Column('char', {length:1, nullable: true})
  winner: Symbol

  @Column('text', {default: 'pending'})
  status: Status

  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  @OneToMany(_ => Player, player => player.game, {eager: true})
  @JoinColumn()
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


