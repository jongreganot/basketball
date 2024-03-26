import React from "react"
import Game from "./pages/Game.jsx";
import { staticData } from "./constants/static-data.ts";
import { animateEnter } from "./behaviors/animation.js";
import { addStat, setDefaultProperties, updateStat } from "./repository/player-repository.ts";

class App extends React.Component {
  state = {
    players: staticData
  }

  addStat = (statType) => {
    let players = [...this.state.players];
    let player = players.find(p => p.selected);

    if (player) {
      addStat(player, statType);
    }

    this.setState({players});
  }

  addPlayer = (player) => {
    let players = [...this.state.players];
    setDefaultProperties(player);

    players.push(player);

    this.setState({players}, animateEnter);
  }

  toggleActivePlayer = (id) => {
    let players = [...this.state.players];
    let player = players.find(p => p.id === id);

    player.isActive = !player.isActive;

    if (player.selected)
      player.selected = player.isActive;

    this.setState({players});
  }

  changeSelected = (id) => {
    let players = [...this.state.players];
    let player = players.find(p => p.id === id);
    let currentSelectedPlayer = players.find(p => p.selected);

    if (currentSelectedPlayer)
      currentSelectedPlayer.selected = false;
    player.selected = true;

    this.setState({players});
  }

  updateStat = (statPt, id, statType) => {
    let players = [...this.state.players];
    let player = players.find(p => p.id === id);

    updateStat(player, statPt, statType);

    this.setState({players});
  }

  render () {
      return (
        <>
          <div className="mask"></div>
          <Game players={this.state.players}
                addStat={this.addStat}
                updateStat={this.updateStat}
                addPlayer={this.addPlayer}
                toggleActivePlayer={this.toggleActivePlayer}
                changeSelected={this.changeSelected}
                />
        </>
      )
  };
}

export default App;
