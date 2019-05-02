import React, { Component } from 'react'
import { connect } from 'react-redux'
import ShowHand from './ShowHand';

class Hand extends Component {
  componentWillMount() {
  console.log("Hand componentdidmound test")
    if (this.props.authenticated) {
      console.log("Hand componentdidmound test 2", this.props.game)
      if (this.props.game === null) this.props.getGames()      
      if (this.props.users === null) this.props.getUsers()
    }
  }

  render() {
    const game = this.props.games[this.props.gameId]

    if (!game) {
      return 'Loading...'
    } else {
    return (
      <div>
        <ShowHand game={game}/>
      </div>
    )}
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.currentUser,
    users: state.users,
    games: state.games
  }
}

export default connect(mapStateToProps)(Hand)
