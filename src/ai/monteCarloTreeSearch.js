/* eslint-disable valid-jsdoc */
/* eslint-disable no-unused-vars */

// NOTE: This is a work in progress. It is not yet functional. 
// Some of this code needs to be extracted into a separate file.
// This does not yet comply with our folder structure.


function calculateUCB1Value(totalTrials, nodeReward, nodeTrials) {
  const explorationTerm = Math.sqrt(2 * Math.log(totalTrials) / nodeTrials);
  const averageReward = nodeReward / nodeTrials;
  const ucb1Value = averageReward + explorationTerm;
  return ucb1Value.toFixed(4);
}

function isLeafNode(node) {
  return !node.children.length;
}

class TicTacToe {
  constructor(toMove = 'player1', gameType = 'twoPlayer') {
    this.playersEnum = {
      player1: 0,
      player2: 1,
      ai: 2,
    };

    this.gameTypeEnum = {
      twoPlayer: 0,
      playerVsAi: 1,
      twoAi: 2,
    };

    this.gameType = this.gameTypeEnum[gameType];

    this.piecesEnum = {
      x: 'X',
      o: 'O',
    };

    this.eventsEnum = {
      gameStart: 0,
      player1Moved: 1,
      player2Moved: 2,
      aiMoved: 3,
      gameOver: 4,
    };

    this.toMove = this.playersEnum[toMove];

    this.board =
      [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ];
  }

  print() {
    console.log('\n');
    this.board.forEach((row, i) => {
      console.log(row.map((cell) => cell || ' ').join(' | '));
      if (i < this.board.length - 1) {
        console.log('---------');
      }
    });
    console.log('\n');
  }

  /** Forcibly makes a move. Does not check for legality */
  placeMove(row, column, piece) {
    this.board[row][column] = piece;
  }

  isWin() {
    const lines = [
      [this.board[0][0], this.board[0][1], this.board[0][2]],
      [this.board[1][0], this.board[1][1], this.board[1][2]],
      [this.board[2][0], this.board[2][1], this.board[2][2]],
      [this.board[0][0], this.board[1][0], this.board[2][0]],
      [this.board[0][1], this.board[1][1], this.board[2][1]],
      [this.board[0][2], this.board[1][2], this.board[2][2]],
      [this.board[0][0], this.board[1][1], this.board[2][2]],
      [this.board[0][2], this.board[1][1], this.board[2][0]],
    ];

    for (const line of lines) {
      if (line.every((value, i, arr) => value && value === arr[0])) {
        return true;
      }
    }
  }

  isDraw() {
    return !this.isWin() && this.board.flat().every((cell) => cell !== '');
  }

  isGameOver() {
    return this.isWin() || this.isDraw();
  }

  getLegalMoves() {
    const moves = [];
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (!this.board[i][j]) {
          moves.push([i, j]);
        }
      }
    }
    return moves;
  }
}
const game = new TicTacToe();
game.print();
game.placeMove(0, 0, game.piecesEnum.x);
game.print();
game.placeMove(1, 1, game.piecesEnum.o);
game.print();
game.placeMove(0, 2, game.piecesEnum.x);
game.print();
console.log(game.getLegalMoves());
