import React, { Component } from 'react';
import styled from 'styled-components';
import Cell from './Cell';
import Game from '../utils/gameLogic';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: 0,
      boardSize: 0,
      game: { board: [] },
      turn: 'X'
    };
  }

  updateNumberOfSearchResults(e) {
    let number = e.target.value;
    this.setState({
      inputValue: number
    });
  }

  handleNewGame() {
    this.setState({
      boardSize: this.state.inputValue,
      game: new Game(this.state.inputValue),
      turn: 'X'
    });
  }

  handleCellSelect(cord) {
    this.setState(prevState => {
      return {
        Game: prevState.game.move(...cord, this.state.turn),
        turn: prevState.turn === 'X' ? 'O' : 'X'
      };
    });
  }

  render() {
    return (
      <Wrapper>
        <Controlls>
          <div>
            <button onClick={this.handleNewGame.bind(this)}>
              Create New Game
            </button>
            <input
              type="number"
              value={this.state.inputValue}
              onChange={this.updateNumberOfSearchResults.bind(this)}
            />
          </div>
        </Controlls>
        <h2>{`${this.state.turn} it's your turn!`}</h2>
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

const Controlls = styled.div`
  display: flex;
  align-itmes: center;
  justify-content: center;
  background-color: orange;
  height: 100px;

  div {
    height: 50px;
  }
`;
