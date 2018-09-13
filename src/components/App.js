import React, { Component } from 'react';
import styled from 'styled-components';
import Cell from './Cell';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: 0,
      boardSize: 0,
      board: [
        [{ location: [0, 0], mark: 'X' }, { location: [0, 1], mark: 'O' }],
        [{ location: [1, 0], mark: 'X' }, { location: [1, 1], mark: '' }]
      ]
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
      boardSize: this.state.inputValue
    });
    // this.setState({
    //   board: new Game(this.boardSize)
    // });
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
        <Grid boardSize={this.state.boardSize}>
          {[].concat.apply([], this.state.board).map(cellData => {
            return <Cell cellData={cellData} />;
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
