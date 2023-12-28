"use strict";
exports.__esModule = true;
exports.TicTacToe = void 0;
var events_1 = require("../events/events");
var types_1 = require("../events/types");
var gameTypes_1 = require("../shared/types/gameTypes");
var playerTypes_1 = require("../shared/types/playerTypes");
var TicTacToe = /** @class */ (function () {
    function TicTacToe(toMove, gameType) {
        if (toMove === void 0) { toMove = playerTypes_1.PlayerTypes.player1; }
        if (gameType === void 0) { gameType = gameTypes_1.GameTypes.twoPlayer; }
        this.gameType = gameTypes_1.GameTypes[gameType];
        this.piecesEnum = {
            x: "X",
            o: "O"
        };
        this.eventsEnum = {
            gameStart: 0,
            player1Moved: 1,
            player2Moved: 2,
            aiMoved: 3,
            gameOver: 4
        };
        this.toMove = playerTypes_1.PlayerTypes[toMove];
        this.board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ];
    }
    TicTacToe.prototype.print = function () {
        var _this = this;
        console.log("\n");
        this.board.forEach(function (row, i) {
            console.log(row.map(function (cell) { return cell || " "; }).join(" | "));
            if (i < _this.board.length - 1) {
                console.log("---------");
            }
        });
        console.log("\n");
    };
    /** Forcibly makes a move. Does not check for legality */
    TicTacToe.prototype.placeMove = function (row, column, piece) {
        this.board[row][column] = piece;
    };
    TicTacToe.prototype.isWin = function () {
        var lines = [
            [this.board[0][0], this.board[0][1], this.board[0][2]],
            [this.board[1][0], this.board[1][1], this.board[1][2]],
            [this.board[2][0], this.board[2][1], this.board[2][2]],
            [this.board[0][0], this.board[1][0], this.board[2][0]],
            [this.board[0][1], this.board[1][1], this.board[2][1]],
            [this.board[0][2], this.board[1][2], this.board[2][2]],
            [this.board[0][0], this.board[1][1], this.board[2][2]],
            [this.board[0][2], this.board[1][1], this.board[2][0]],
        ];
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            if (line.every(function (value, i, arr) { return value && value === arr[0]; })) {
                return true;
            }
        }
    };
    TicTacToe.prototype.isDraw = function () {
        return !this.isWin() && this.board.flat().every(function (cell) { return cell !== ""; });
    };
    TicTacToe.prototype.isGameOver = function () {
        return this.isWin() || this.isDraw();
    };
    TicTacToe.prototype.getLegalMoves = function () {
        var moves = [];
        for (var i = 0; i < this.board.length; i++) {
            for (var j = 0; j < this.board[i].length; j++) {
                if (!this.board[i][j]) {
                    moves.push([i, j]);
                }
            }
        }
        return moves;
    };
    TicTacToe.prototype.isLegalMove = function (row, column, piece) {
        console.log(this.getLegalMoves());
    };
    TicTacToe.prototype.newGame = function () {
        this.print();
    };
    return TicTacToe;
}());
exports.TicTacToe = TicTacToe;
var game = new TicTacToe();
events_1.eventHandler.subscribe(types_1.Event.gameStart, function () { return game.newGame; });
// game.isLegalMove(0, 0, game.piecesEnum.x);
// game.placeMove(0, 0, game.piecesEnum.x);
// game.print();
// game.placeMove(1, 1, game.piecesEnum.o);
// game.print();
// game.placeMove(0, 2, game.piecesEnum.x);
// game.print();
// console.log(game.getLegalMoves());
