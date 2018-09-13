import React, { Component } from 'react';
import styled from 'styled-components';

class Cell extends Component {
  cellSelected() {
    const { cord, mark } = this.props.cellData;

    if (mark !== 'O' && mark !== 'X') {
      this.props.handleCellSelect(cord);
    }
  }
  render() {
    return (
      <Wrapper onClick={() => this.cellSelected()}>
        {this.props.cellData.mark}
      </Wrapper>
    );
  }
}

export default Cell;

const Wrapper = styled.div`
  border: 6px solid #2c3e50;
  border-radius: 2px;
  font-family: Helvetica;
  font-weight: bold;
  font-size: 4em;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    border: 6px solid #1a2530;
    cursor: pointer;
  }
`;
