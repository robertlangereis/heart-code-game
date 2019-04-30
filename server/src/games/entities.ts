import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
import User from '../users/entity'

export type Symbol = 'x' | 'o'
// replaced by: P1 or P2
export type Row = [ Symbol | null, Symbol | null, Symbol | null ]
// Each player has their own row:

// STACK: 

// {id: 'p1', 
// color: red, 
// points: if(isValid === true){return +2}
//         else{0},
//  isValid: true
// },

// {id: 'p2', 
//  color: blue, 
//  points: if(isValid === true){array.length.isValid = false} 
//         else{0},
//  isValid: true
// },

// {id: 'p1', 
//  color: blue, 
//  points: if(isValid === true){array.length.isValid = false} 
//         else{return 0},
//  isValid: true
// }

// ROW2: [{color: red, points: -2}, {color: blue, points: 0}, {color: green, points: +2}, Symbol: 'p2'] 

// ROW3-TABLE: [{color: red, points: -2, ID: P1}, {color: blue, points: 0, ID: P2}] 

//CSS Layer so you can't see what cards the other player has, but

export type Board = [ Row, Row , Row]
// HAND P1, STACK, HAND-P2

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
  @OneToMany(_ => Player, player => player.game, {eager:true})
  players: Player[]
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
}
