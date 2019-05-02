import React, { Component } from 'react'
import { connect } from 'react-redux'
import ShowHand from './ShowHand';

class Hand extends Component {
  render() {
    if (!this.props.game) {
      return 'Loading...'
    } else {
    return (
      <div>
        <ShowHand games={this.props.games}/>
      </div>
    )}
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser,
  games: state.games
})

export default connect(mapStateToProps)(Hand)
