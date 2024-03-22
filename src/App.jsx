import React from "react"
import Game from "./pages/Game.jsx";
import { staticData } from "./constants/static-data.ts";
import { animateEnter } from "./behaviors/animation.js";
import { setDefaultProperties, updateStat } from "./repository/player-repository.ts";

class App extends React.Component {
  state = {
    players: staticData
  }

  updateStat = (statPt, id, statType) => {
    let players = [...this.state.players];
    let player = players.find(p => p.id === id);

    updateStat(player, statPt, statType);

    this.setState({players});
  }

  addPlayer = (player) => {
    let players = [...this.state.players];
    setDefaultProperties(player);

    players.push(player);

    this.setState({players}, animateEnter);
  }

  render () {
      return (
        <>
          <div className="mask"></div>
          <Game players={this.state.players}
                updateStat={this.updateStat}
                addPlayer={this.addPlayer}
                />
        </>
      )
  };
}

export default App;
