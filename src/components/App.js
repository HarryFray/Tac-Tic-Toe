import React, { Component } from 'react';
import styled from 'styled-components';
import Cell from './Cell';
import Game from '../utils/gameLogic';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: 3,
      boardSize: 0,
      game: { board: [] },
      turn: 'X',
      message: 'WANNA PLAY A GAME?',
      gameOver: false
    };
  }

  handleNewGame() {
    if (this.state.inputValue !== 0) {
      this.setState({
        boardSize: this.state.inputValue,
        game: new Game(this.state.inputValue),
        message: `IT'S YOUR TURN ${this.state.turn}`,
        gameOver: false
      });
    }
  }

  handleCellSelect(cord) {
    if (!this.state.gameOver) {
      this.setState(
        prevState => {
          return {
            Game: prevState.game.move(...cord, this.state.turn),
            turn: prevState.turn === 'X' ? 'O' : 'X',
            message: `IT'S YOUR TURN ${this.state.turn === 'X' ? 'O' : 'X'}`
          };
        },
        () => {
          this.checkForWinningMove(cord);
        }
      );
    }
  }

  checkForWinningMove(cord) {
    if (this.state.game.checkForAWin(cord)) {
      this.setState({
        message: `${this.state.turn === 'X' ? 'O' : 'X'} HAS WON!`,
        turn: 'X',
        gameOver: true
      });
    }
  }

  updateInputValue(e) {
    let input = e.target.value;
    if (input > 0) {
      this.setState({
        inputValue: input
      });
    }
  }

  render() {
    return (
      <Wrapper>
        <Nav>
          <div>
            <button onClick={this.handleNewGame.bind(this)}>NEW GAME</button>
            <input
              type="number"
              value={this.state.inputValue}
              onChange={this.updateInputValue.bind(this)}
            />
          </div>
          <div>
            <h1>{this.state.message}</h1>
          </div>
        </Nav>
        <Grid boardSize={this.state.boardSize}>
          {[].concat.apply([], this.state.game.board).map(cellData => {
            return (
              <Cell
                cellData={cellData}
                key={cellData.cord}
                handleCellSelect={this.handleCellSelect.bind(this)}
              />
            );
          })}
        </Grid>
      </Wrapper>
    );
  }
}

export default App;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 100%;
  height: 100%;
`;

const Grid = styled.div`
  width: 800px;
  height: 800px;
  margin: 0 auto;
  background-color: #34495e;
  color: #fff;
  border: 6px solid #2c3e50;
  border-radius: 10px;

  display: grid;
  grid-template-rows: repeat(${props => props.boardSize}, 1fr);
  grid-template-columns: repeat(${props => props.boardSize}, 1fr);
`;

const Nav = styled.div`
  display: flex;
  align-itmes: center;
  justify-content: center;
  background-color: orange;
  height: 80px;
  margin-bottom: 20px;
  padding: 10px;
  div {
    display: flex;
    padding: 10px;
    justify-content: center;
    input {
      width: 50px;
    }
  }
`;
