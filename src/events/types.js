"use strict";
exports.__esModule = true;
exports.Event = void 0;
var Event;
(function (Event) {
    Event[Event["gameStart"] = 0] = "gameStart";
    Event[Event["player1Moved"] = 1] = "player1Moved";
    Event[Event["player2Moved"] = 2] = "player2Moved";
    Event[Event["aiMoved"] = 3] = "aiMoved";
    Event[Event["gameOver"] = 4] = "gameOver";
})(Event = exports.Event || (exports.Event = {}));
