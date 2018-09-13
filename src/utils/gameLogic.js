class Game {
  constructor(size) {
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
    this.board[x][y].mark = player;
  }
}
