import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, OneToOne, ManyToOne } from 'typeorm'
import User from '../users/entity'

export type PlayerHand = 'hand1' | 'hand2'
export type Card = {color: string, points: number, playerId: PlayerHand}
// export type Hand = [Card, Card, Card]
export type Stack = Card[] | null

type Status = 'pending' | 'started' | 'finished';

@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', {default: 'hand1'})
  turn: PlayerHand

  @Column('text', {nullable: true})
  winner: PlayerHand

  @Column('text', {default: 'pending'})
  status: Status
  
  @Column('text', {default: null})
  stack: Stack
  
  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  @OneToMany(_ => Player, player => player.game, {eager:true})
  players: Player[]
}

@Entity()
export class Hand extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id?: number
  
  @Column('text', {default: [null, null, null]})
  cards: Card[]

  @OneToOne(_ => Player, player => player.hand)
  player: Player
}

@Entity()
@Index(['game', 'user'], {unique:true})
export class Player extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id?: number
  
  @ManyToOne(_ => User, user => user.players)
  user: User
  
  @ManyToOne(_ => Game, game => game.players)
  game: Game
  
  @OneToOne(_ => Hand, hand => hand.playerId)
  hand: Hand
  
  @Column('text', {default: 'hand1'})
  playerHand: PlayerHand
  
  @Column('integer', { name: 'user_id' })
  userId: number
  
  @Column('number', {default: 20})
  points: number
}


