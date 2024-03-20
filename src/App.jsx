import React from "react"
import Game from "./pages/Game.jsx";
import { staticData } from "./constants/static-data.ts";

class App extends React.Component {
  state = {
    players: []//staticData
  }

  addPts = (pts, id) => {
    let players = [...this.state.players];
    let player = players.find(p => p.id === id);
    player.pts += pts;

    if (player.pts < 0)
      player.pts = 0;

    this.setState({players});
  }

  addReb = (rebs, id) => {
    let players = [...this.state.players];
    let player = players.find(p => p.id === id);
    player.rebs += rebs;

    if (player.rebs < 0)
      player.rebs = 0;

    this.setState({players});
  }

  addAst = (ast, id) => {
    let players = [...this.state.players];
    let player = players.find(p => p.id === id);
    player.ast += ast;

    if (player.ast < 0)
      player.ast = 0;

    this.setState({players});
  }

  addStl = (stl, id) => {
    let players = [...this.state.players];
    let player = players.find(p => p.id === id);
    player.stl += stl;

    if (player.stl < 0)
      player.stl = 0;

    this.setState({players});
  }

  addBlk = (blk, id) => {
    let players = [...this.state.players];
    let player = players.find(p => p.id === id);
    player.blk += blk;

    if (player.blk < 0)
      player.blk = 0;

    this.setState({players});
  }

  addFgMake = (fgMake, id) => {
    let players = [...this.state.players];
    let player = players.find(p => p.id === id);
    player.fgMake += fgMake;
    player.fgAttempt++;
    player.fgMakeAttemptPercent = this.computeFgMakeAttemptPercentage(player);

    this.setState({players});
  }

  addFgAttempt = (fgAttempt, id) => {
    let players = [...this.state.players];
    let player = players.find(p => p.id === id);
    player.fgAttempt += fgAttempt;
    player.fgMakeAttemptPercent = this.computeFgMakeAttemptPercentage(player);

    this.setState({players});
  }

  addFtMake = (ftMake, id) => {
    let players = [...this.state.players];
    let player = players.find(p => p.id === id);
    player.ftMake += ftMake;
    player.ftAttempt++;
    player.ftMakeAttemptPercent = this.computeFtMakeAttemptPercentage(player);

    this.setState({players});
  }

  addFtAttempt = (ftAttempt, id) => {
    let players = [...this.state.players];
    let player = players.find(p => p.id === id);
    player.ftAttempt += ftAttempt;
    player.ftMakeAttemptPercent = this.computeFtMakeAttemptPercentage(player);

    this.setState({players});
  }

  addThreePtMake = (threePtMake, id) => {
    let players = [...this.state.players];
    let player = players.find(p => p.id === id);
    player.threePtMake += threePtMake;
    player.threePtAttempt++;
    player.threePtMakeAttemptPercent = this.computeThreePtMakeAttemptPercentage(player);

    this.setState({players});
  }

  addThreePtAttempt = (threePtAttempt, id) => {
    let players = [...this.state.players];
    let player = players.find(p => p.id === id);
    player.threePtAttempt += threePtAttempt;
    player.threePtMakeAttemptPercent = this.computeThreePtMakeAttemptPercentage(player);

    this.setState({players});
  }

  addTov = (tov, id) => {
    let players = [...this.state.players];
    let player = players.find(p => p.id === id);
    player.tov += tov;

    if (player.tov < 0)
      player.tov = 0;

    this.setState({players});
  }

  addFls = (fls, id) => {
    let players = [...this.state.players];
    let player = players.find(p => p.id === id);
    player.fls += fls;

    if (player.fls < 0)
      player.fls = 0;

    this.setState({players});
  }

  addPlayer = (player) => {
    let players = [...this.state.players];
    player.pts = 0;
    player.rebs = 0;
    player.ast = 0;
    player.stl = 0;
    player.blk = 0;
    player.fgMake = 0;
    player.fgAttempt = 0;
    player.fgMakeAttemptPercent = 0;
    player.ftMake = 0;
    player.ftAttempt = 0;
    player.ftMakeAttemptPercent = 0;
    player.threePtMake = 0;
    player.threePtAttempt = 0;
    player.threePtMakeAttemptPercent = 0;
    player.tov = 0;
    player.fls = 0;
    players.push(player);

    this.setState({players}, () => console.log(this.state.players));
  }

  computeFgMakeAttemptPercentage = (player) => player.fgMake / player.fgAttempt * 100;
  computeFtMakeAttemptPercentage = (player) => player.ftMake / player.ftAttempt * 100;
  computeThreePtMakeAttemptPercentage = (player) => player.threePtMake / player.threePtAttempt * 100;

  render () {
      return (
        <Game players={this.state.players}
              addPts={this.addPts}
              addReb={this.addReb}
              addAst={this.addAst}
              addStl={this.addStl} 
              addBlk={this.addBlk}
              addFgAttempt={this.addFgAttempt} 
              addFgMake={this.addFgMake}
              addFtAttempt={this.addFtAttempt} 
              addFtMake={this.addFtMake}
              addThreePtAttempt={this.addThreePtAttempt} 
              addThreePtMake={this.addThreePtMake}
              addTov={this.addTov} 
              addFls={this.addFls}
              addPlayer={this.addPlayer}
              />
      )
  };
}

export default App;
