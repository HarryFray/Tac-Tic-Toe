export default class Game {
  constructor(size) {
    // IIFE creating board at start of game
    this.board = (() => {
      let board = [];
      for (let y = 0; y < size; y++) {
        board.push([]);
        for (let x = 0; x < size; x++) {
          board[y].push({ cord: [x, y], mark: '' });
        }
      }
      return board;
    })(size);
  }

  move(x, y, player) {
    this.board[y][x].mark = player;
    return this.board;
  }

  checkRow(xCord) {
    let rowOfOnlyMarks = this.board[xCord].map(cell => cell.mark);
    return rowOfOnlyMarks.every(val => val === rowOfOnlyMarks[0]);
  }

  checkCol(yCord) {
    let colOfOnlyMarks = this.board.map(row => row[yCord].mark);
    return colOfOnlyMarks.every(val => val === colOfOnlyMarks[0]);
  }

  checkTopLeftToRightDiag() {
    let diag = this.board.map((row, i) => row[i].mark);
    let isEmpty = diag[0] === '';
    return diag.every(val => val === diag[0]) && !isEmpty;
  }

  checkTopRightToLeftDiag() {
    let diag = this.board.map((row, i) => row[row.length - i - 1].mark);
    let isEmpty = diag[0] === '';
    return diag.every(val => val === diag[0]) && !isEmpty;
  }

  checkForAWin(cord) {
    let checks = [
      this.checkRow(cord[1]),
      this.checkCol(cord[0]),
      this.checkTopLeftToRightDiag(),
      this.checkTopRightToLeftDiag()
    ];
    return checks.some(check => check === true);
  }
}
