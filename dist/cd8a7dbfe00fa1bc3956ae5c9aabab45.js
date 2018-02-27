// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      
      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module;

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({13:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TetrominoType;
(function (TetrominoType) {
    TetrominoType[TetrominoType["SQUARE"] = 1] = "SQUARE";
    TetrominoType[TetrominoType["LINE"] = 2] = "LINE";
    TetrominoType[TetrominoType["L"] = 3] = "L";
    TetrominoType[TetrominoType["J"] = 4] = "J";
    TetrominoType[TetrominoType["T"] = 5] = "T";
    TetrominoType[TetrominoType["S"] = 6] = "S";
    TetrominoType[TetrominoType["Z"] = 7] = "Z";
})(TetrominoType = exports.TetrominoType || (exports.TetrominoType = {}));
/**
 * Each shape is stored in a 5x5 array because the 4x4 piece moves when rotated.
 * Each rotation of the shape is stored in each object.
 */
exports.Shapes = (_a = {},
    _a[TetrominoType.SQUARE] = [
        [
            [0, 1, 1],
            [0, 1, 1],
            [0, 0, 0],
        ],
        [
            [0, 1, 1],
            [0, 1, 1],
            [0, 0, 0],
        ],
        [
            [0, 1, 1],
            [0, 1, 1],
            [0, 0, 0],
        ],
        [
            [0, 1, 1],
            [0, 1, 1],
            [0, 0, 0],
        ]
    ],
    _a[TetrominoType.LINE] = [
        [
            [0, 0, 0, 0],
            [2, 2, 2, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
        [
            [0, 0, 2, 0],
            [0, 0, 2, 0],
            [0, 0, 2, 0],
            [0, 0, 2, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [2, 2, 2, 2],
            [0, 0, 0, 0],
        ],
        [
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0],
        ]
    ],
    _a[TetrominoType.L] = [
        [
            [0, 0, 3],
            [3, 3, 3],
            [0, 0, 0]
        ],
        [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3]
        ],
        [
            [0, 0, 0],
            [3, 3, 3],
            [3, 0, 0]
        ],
        [
            [3, 3, 0],
            [0, 3, 0],
            [0, 3, 0]
        ]
    ],
    _a[TetrominoType.J] = [
        [
            [4, 0, 0],
            [4, 4, 4],
            [0, 0, 0]
        ],
        [
            [0, 4, 4],
            [0, 4, 0],
            [0, 4, 0]
        ],
        [
            [0, 0, 0],
            [4, 4, 4],
            [0, 0, 4]
        ],
        [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0]
        ]
    ],
    _a[TetrominoType.S] = [
        [
            [0, 5, 5],
            [5, 5, 0],
            [0, 0, 0]
        ],
        [
            [0, 5, 0],
            [0, 5, 5],
            [0, 0, 5]
        ],
        [
            [0, 0, 0],
            [0, 5, 5],
            [5, 5, 0]
        ],
        [
            [5, 0, 0],
            [5, 5, 0],
            [0, 5, 0]
        ]
    ],
    _a[TetrominoType.Z] = [
        [
            [6, 6, 0],
            [0, 6, 6],
            [0, 0, 0]
        ],
        [
            [0, 0, 6],
            [0, 6, 6],
            [0, 6, 0]
        ],
        [
            [0, 0, 0],
            [6, 6, 0],
            [0, 6, 6]
        ],
        [
            [0, 6, 0],
            [6, 6, 0],
            [6, 0, 0]
        ]
    ],
    _a[TetrominoType.T] = [
        [
            [0, 7, 0],
            [7, 7, 7],
            [0, 0, 0]
        ],
        [
            [0, 7, 0],
            [0, 7, 7],
            [0, 7, 0]
        ],
        [
            [0, 0, 0],
            [7, 7, 7],
            [0, 7, 0]
        ],
        [
            [0, 7, 0],
            [7, 7, 0],
            [0, 7, 0]
        ]
    ],
    _a);
var _a;

},{}],15:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addClass(node, classes) {
    if (node.className) {
        node.className += " " + classes;
    }
    else {
        node.className = classes;
    }
}
exports.addClass = addClass;
function drawSquare(x, y, ctx, size) {
    ctx.fillRect(x * size, y * size, size, size);
    var ss = ctx.strokeStyle;
    ctx.strokeStyle = "#222222";
    ctx.strokeRect(x * size, y * size, size, size);
    ctx.strokeStyle = ss;
}
exports.drawSquare = drawSquare;

},{}],14:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Colors;
(function (Colors) {
    Colors[Colors["red"] = 1] = "red";
    Colors[Colors["blue"] = 2] = "blue";
    Colors[Colors["green"] = 3] = "green";
    Colors[Colors["brown"] = 4] = "brown";
    Colors[Colors["purple"] = 5] = "purple";
    Colors[Colors["aqua"] = 6] = "aqua";
    Colors[Colors["orange"] = 7] = "orange";
})(Colors = exports.Colors || (exports.Colors = {}));
exports.Backgrounds = [
    "#ffffff",
    "#52aced",
    "#388601",
    "#30f894",
    "#550918",
    "#917232",
    "#ad18dc",
    "#6181d9",
    "#97226e",
    "#e0a60a",
    "#340770",
];

},{}],10:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shape_1 = require("./shape");
var color_1 = require("../util/color");
var util_1 = require("../util");
var Piece = /** @class */ (function () {
    function Piece(type, boardWidth, size) {
        this.type = type;
        this.boardWidth = boardWidth;
        this.size = size;
        this.rotation = 0;
        this.color = color_1.Colors[this.type];
        this.shape = shape_1.Shapes[this.type][this.rotation];
        this.row = 0; // y
        this.col = (this.boardWidth / 2) - Math.ceil(this.shape.length / 2); // x
    }
    Piece.prototype.draw = function (ctx) {
        this.fill(ctx, color_1.Colors[this.type]);
    };
    Piece.prototype.clearNextPiece = function (ctx) {
        this.fillNextPiece(ctx, "white");
    };
    Piece.prototype.drawNextPiece = function (ctx) {
        this.fillNextPiece(ctx, color_1.Colors[this.type]);
    };
    Piece.prototype.left = function (ctx) {
        this.clear(ctx);
        this.col--;
        this.draw(ctx);
    };
    Piece.prototype.right = function (ctx) {
        this.clear(ctx);
        this.col++;
        this.draw(ctx);
    };
    Piece.prototype.down = function (ctx) {
        this.clear(ctx);
        this.row++;
        this.draw(ctx);
    };
    Piece.prototype.hardDown = function (ctx, dy) {
        this.clear(ctx);
        this.row += dy - 1;
        this.draw(ctx);
    };
    Piece.prototype.rotate = function (ctx, nudge) {
        this.clear(ctx);
        this.col += nudge;
        this.rotation = (this.rotation + 1) % 4;
        this.shape = shape_1.Shapes[this.type][this.rotation];
        this.draw(ctx);
    };
    /**
     * Draw the piece onto the board (once it can no longer move).
     * @param setOnBoard Function to draw onto the board
     */
    Piece.prototype.set = function (setOnBoard) {
        for (var r = 0; r < this.shape.length; r++) {
            for (var c = 0; c < this.shape.length; c++) {
                if (!this.shape[r][c])
                    continue;
                setOnBoard(this.row + r, this.col + c, this.type);
            }
        }
    };
    /**
     * Check if the piece is at the top of the board, and if
     * therefore it should be game over.
     */
    Piece.prototype.isAtTop = function () {
        for (var r = 0; r < this.shape.length; r++) {
            for (var c = 0; c < this.shape.length; c++) {
                if (!this.shape[r][c])
                    continue;
                if (this.row + r < 0)
                    return true;
            }
        }
        return false;
    };
    Piece.getRandomType = function () {
        return Math.floor(Math.random() * 7) + 1;
    };
    Piece.randomPiece = function (boardWidth, size) {
        var newType = Piece.getRandomType();
        return new Piece(newType, boardWidth, size);
    };
    Piece.prototype.fill = function (ctx, fillstyle) {
        for (var r = 0; r < this.shape.length; r++) {
            for (var c = 0; c < this.shape.length; c++) {
                var cell = this.shape[r][c];
                if (cell > 0) {
                    ctx.fillStyle = fillstyle;
                    util_1.drawSquare(this.col + c, this.row + r, ctx, this.size);
                }
            }
        }
    };
    Piece.prototype.clear = function (ctx) {
        this.fill(ctx, "white");
    };
    Piece.prototype.fillNextPiece = function (ctx, fillstyle) {
        for (var r = 0; r < 4; r++) {
            for (var c = 0; c < 4; c++) {
                if (this.shape[r] && this.shape[r][c]) {
                    if (this.shape[r][c] > 0) {
                        ctx.fillStyle = fillstyle;
                        util_1.drawSquare(c, r, ctx, this.size);
                    }
                }
                else {
                    ctx.fillStyle = "white";
                    util_1.drawSquare(c, r, ctx, this.size);
                }
            }
        }
    };
    return Piece;
}());
exports.Piece = Piece;

},{"./shape":13,"../util/color":14,"../util":15}],18:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameEvent;
(function (GameEvent) {
    GameEvent[GameEvent["PAUSE"] = 0] = "PAUSE";
    GameEvent[GameEvent["UNPAUSE"] = 1] = "UNPAUSE";
    GameEvent[GameEvent["START"] = 2] = "START";
    GameEvent[GameEvent["RESTART"] = 3] = "RESTART";
    GameEvent[GameEvent["GAME_OVER"] = 4] = "GAME_OVER";
    GameEvent[GameEvent["MOVE_LEFT"] = 5] = "MOVE_LEFT";
    GameEvent[GameEvent["MOVE_RIGHT"] = 6] = "MOVE_RIGHT";
    GameEvent[GameEvent["MOVE_DOWN"] = 7] = "MOVE_DOWN";
    GameEvent[GameEvent["HARD_DOWN"] = 8] = "HARD_DOWN";
    GameEvent[GameEvent["ROTATE"] = 9] = "ROTATE";
})(GameEvent = exports.GameEvent || (exports.GameEvent = {}));

},{}],11:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shape_1 = require("./shape");
var util_1 = require("../util");
var color_1 = require("../util/color");
var piece_1 = require("./piece");
var event_1 = require("./event");
var Board = /** @class */ (function () {
    function Board(container, width, height, tileSize) {
        this.width = width;
        this.height = height;
        this.container = container;
        this.ctx = this.container.getContext('2d');
        this.tileSize = tileSize;
        this.container.width = (this.width * this.tileSize);
        this.container.height = (this.height * this.tileSize);
        this.grid = this.initGrid();
    }
    Board.prototype.draw = function () {
        for (var r = 0; r < this.height; r++) {
            var row = this.grid[r];
            for (var c = 0; c < this.width; c++) {
                var cell = row[c];
                this.ctx.fillStyle = cell > 0 ? color_1.Colors[cell] : "white";
                util_1.drawSquare(c, r, this.ctx, this.tileSize);
            }
        }
        this.activePiece.draw(this.ctx);
    };
    Board.prototype.clearLines = function () {
        var numLines = 0;
        for (var row = 0; row < this.height; row++) {
            var line = this.grid[row].filter(function (el) { return el === 0; }).length === 0;
            if (line) {
                numLines++;
                for (var r = row; r > 0; r--) {
                    for (var c = 0; c < this.width; c++) {
                        this.grid[r][c] = this.grid[r - 1][c];
                    }
                }
                for (var c = 0; c < this.width; c++) {
                    this.grid[0][c] = 0;
                }
            }
        }
        return numLines;
    };
    /**
     * Returns true if the piece is stuck and a new piece should be created
     * @param event GameEvent
     */
    Board.prototype.handleEvent = function (event) {
        switch (event) {
            case event_1.GameEvent.MOVE_LEFT: {
                if (!this.collides(this.activePiece, -1, 0, this.activePiece.shape)) {
                    this.activePiece.left(this.ctx);
                }
                break;
            }
            case event_1.GameEvent.MOVE_RIGHT: {
                if (!this.collides(this.activePiece, 1, 0, this.activePiece.shape)) {
                    this.activePiece.right(this.ctx);
                }
                break;
            }
            case event_1.GameEvent.MOVE_DOWN: {
                if (this.collides(this.activePiece, 0, 1, this.activePiece.shape)) {
                    return true;
                }
                this.activePiece.down(this.ctx);
                break;
            }
            case event_1.GameEvent.HARD_DOWN: {
                var dy = 1;
                while (!this.collides(this.activePiece, 0, dy, this.activePiece.shape)) {
                    dy++;
                }
                this.activePiece.hardDown(this.ctx, dy);
                break;
            }
            case event_1.GameEvent.ROTATE: {
                var nextRotationIx = (this.activePiece.rotation + 1) % 4;
                var nextRotation = shape_1.Shapes[this.activePiece.type][nextRotationIx];
                var nudge = 0;
                if (this.collides(this.activePiece, 0, 0, nextRotation)) {
                    nudge = this.activePiece.col > this.width / 2 ? -1 : 1;
                }
                if (this.collides(this.activePiece, nudge, 0, nextRotation)) {
                    break;
                }
                this.activePiece.rotate(this.ctx, nudge);
                break;
            }
            default: {
                return false;
            }
        }
        return false;
    };
    Board.prototype.reset = function () {
        this.grid = this.initGrid();
        this.activePiece = piece_1.Piece.randomPiece(this.width, this.tileSize);
    };
    Board.prototype.initGrid = function () {
        var rows = [];
        for (var r = 0; r < this.height; r++) {
            var cells = [];
            for (var c = 0; c < this.width; c++) {
                cells.push(0);
            }
            rows.push(cells);
        }
        return rows;
    };
    Board.prototype.movePieceDown = function () {
        if (this.collides(this.activePiece, 0, 1, this.activePiece.shape)) {
            return true;
        }
        this.activePiece.down(this.ctx);
        return false;
    };
    Board.prototype.lockPiece = function () {
        this.activePiece.set(this.setOnBoard.bind(this));
    };
    Board.prototype.setOnBoard = function (row, col, type) {
        this.grid[row][col] = type;
    };
    Board.prototype.collides = function (piece, dx, dy, nextShape) {
        for (var r = 0; r < nextShape.length; r++) {
            for (var c = 0; c < nextShape.length; c++) {
                var cell = nextShape[r][c];
                if (cell === 0)
                    continue;
                var x = piece.col + c + dx;
                var y = piece.row + r + dy;
                if (y >= this.height || x < 0 || x >= this.width) {
                    return true;
                }
                if (y < 0)
                    continue;
                if (this.grid[y][x]) {
                    return true;
                }
            }
        }
        return false;
    };
    return Board;
}());
exports.Board = Board;

},{"./shape":13,"../util":15,"../util/color":14,"./piece":10,"./event":18}],12:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Keys;
(function (Keys) {
    Keys[Keys["SPACE"] = 32] = "SPACE";
    Keys[Keys["UP"] = 38] = "UP";
    Keys[Keys["DOWN"] = 40] = "DOWN";
    Keys[Keys["LEFT"] = 37] = "LEFT";
    Keys[Keys["RIGHT"] = 39] = "RIGHT";
    Keys[Keys["A"] = 65] = "A";
    Keys[Keys["D"] = 68] = "D";
    Keys[Keys["Q"] = 81] = "Q";
    Keys[Keys["S"] = 83] = "S";
    Keys[Keys["W"] = 87] = "W";
})(Keys = exports.Keys || (exports.Keys = {}));

},{}],6:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var board_1 = require("./model/board");
var piece_1 = require("./model/piece");
var keys_1 = require("./util/keys");
var color_1 = require("./util/color");
var event_1 = require("./model/event");
var Tetris = /** @class */ (function () {
    function Tetris(container) {
        this.container = container;
        this.width = 10;
        this.height = 20;
        this.tileSize = 32;
        this.board = new board_1.Board(this.container, this.width, this.height, this.tileSize);
        this.nextPiece = piece_1.Piece.randomPiece(this.width, this.tileSize);
        this.levelEl = document.getElementById("level");
        this.linesEl = document.getElementById("lines");
        this.scoreEl = document.getElementById("score");
        this.nextPieceContainer = document.getElementById("nextpiece");
        this.nextPieceContainer.width = (4 * this.tileSize);
        this.nextPieceContainer.height = (4 * this.tileSize);
        this.paused = false;
        this.level = 0;
        this.lines = 0;
        this.score = 0;
        this.queuedActions = [];
        this.dt = 0;
        this.step = 1.0;
        this.needNewPiece = false;
    }
    Tetris.prototype.start = function () {
        this.getInput();
        this.board.activePiece = this.nextPiece;
        this.nextPiece = piece_1.Piece.randomPiece(this.width, this.tileSize);
        this.drawNextPiece(this.nextPiece);
        this.lastTick = performance.now();
        requestAnimationFrame(this.loop.bind(this));
    };
    Tetris.prototype.getInput = function () {
        var _this = this;
        document.body.addEventListener("keydown", function (e) {
            switch (e.keyCode) {
                case keys_1.Keys.A, keys_1.Keys.LEFT: {
                    _this.queuedActions.push(event_1.GameEvent.MOVE_LEFT);
                    break;
                }
                case keys_1.Keys.D, keys_1.Keys.RIGHT: {
                    _this.queuedActions.push(event_1.GameEvent.MOVE_RIGHT);
                    break;
                }
                case keys_1.Keys.W, keys_1.Keys.UP: {
                    _this.queuedActions.push(event_1.GameEvent.ROTATE);
                    break;
                }
                case keys_1.Keys.D, keys_1.Keys.DOWN: {
                    _this.queuedActions.push(event_1.GameEvent.MOVE_DOWN);
                    break;
                }
                case keys_1.Keys.SPACE: {
                    _this.queuedActions.push(event_1.GameEvent.HARD_DOWN);
                    break;
                }
                case keys_1.Keys.Q: {
                    if (_this.paused) {
                        _this.queuedActions.push(event_1.GameEvent.UNPAUSE);
                    }
                    else {
                        _this.queuedActions.push(event_1.GameEvent.PAUSE);
                    }
                    break;
                }
            }
        }, false);
        var pauseButton = document.getElementById("btn-pause");
        var restartButton = document.getElementById("btn-restart");
        var playAgainButton = document.getElementById("btn-playagain");
        pauseButton.addEventListener("click", function (e) {
            if (_this.paused) {
                _this.queuedActions.push(event_1.GameEvent.PAUSE);
            }
            else {
                _this.queuedActions.push(event_1.GameEvent.UNPAUSE);
            }
        }, false);
        restartButton.addEventListener("click", function (e) {
            _this.queuedActions.push(event_1.GameEvent.RESTART);
        }, false);
        playAgainButton.addEventListener("click", function (e) {
            _this.queuedActions.push(event_1.GameEvent.RESTART);
        });
    };
    Tetris.prototype.loop = function (time) {
        var now = performance.now();
        this.update((now - this.lastTick) / 1000.0);
        this.draw();
        this.lastTick = now;
        requestAnimationFrame(this.loop.bind(this));
    };
    Tetris.prototype.draw = function () {
        this.board.draw();
        this.drawNextPiece(this.nextPiece);
    };
    Tetris.prototype.update = function (ticks) {
        var e = this.queuedActions.shift();
        if (e !== undefined)
            this.handleEvent(e);
        if (this.paused)
            return;
        this.dt += ticks;
        if (this.dt > this.step) {
            this.dt -= this.step;
            this.needNewPiece = this.board.movePieceDown();
        }
        if (this.needNewPiece) {
            if (this.board.activePiece.isAtTop()) {
                this.queuedActions = Array.of(event_1.GameEvent.GAME_OVER);
                return;
            }
            this.needNewPiece = false;
            this.board.lockPiece();
            this.board.activePiece = this.nextPiece;
            this.nextPiece = piece_1.Piece.randomPiece(this.width, this.tileSize);
        }
        var linesCleared = this.board.clearLines();
        this.lines += linesCleared;
        this.linesEl.textContent = "" + this.lines;
        this.score += this.getScoreForLines(linesCleared);
        this.scoreEl.textContent = "" + this.score;
        // if (this.shouldIncreaseLevel()) {
        //   this.level++
        //   this.gravity = this.gravity - 4
        //   this.updateBackground()
        // }
        // this.levelEl.textContent = `${this.level}`
    };
    Tetris.prototype.handleEvent = function (event) {
        switch (event) {
            case event_1.GameEvent.HARD_DOWN:
            case event_1.GameEvent.MOVE_DOWN:
            case event_1.GameEvent.MOVE_LEFT:
            case event_1.GameEvent.MOVE_RIGHT:
            case event_1.GameEvent.ROTATE: {
                this.board.handleEvent(event);
                break;
            }
            case event_1.GameEvent.PAUSE: {
                this.pauseGame();
                break;
            }
            case event_1.GameEvent.UNPAUSE: {
                this.unpauseGame();
                break;
            }
            case event_1.GameEvent.RESTART: {
                this.reset();
                break;
            }
            case event_1.GameEvent.GAME_OVER: {
                this.gameOver();
                break;
            }
        }
    };
    Tetris.prototype.drawNextPiece = function (toDraw) {
        var ctx = this.nextPieceContainer.getContext('2d');
        this.nextPiece.clearNextPiece(ctx);
        this.nextPiece.drawNextPiece(ctx);
    };
    Tetris.prototype.updateBackground = function () {
        document.body.style.backgroundColor = color_1.Backgrounds[this.level];
    };
    Tetris.prototype.pauseGame = function () {
        this.paused = true;
        var overlay = document.getElementById("pause-overlay");
        if (overlay)
            overlay.style.display = "block";
    };
    Tetris.prototype.unpauseGame = function () {
        this.paused = false;
        var overlay = document.getElementById("pause-overlay");
        if (overlay)
            overlay.style.display = "none";
        requestAnimationFrame(this.loop.bind(this));
    };
    Tetris.prototype.gameOver = function () {
        var overlay = document.getElementById("overlay");
        if (overlay)
            overlay.style.display = "block";
    };
    Tetris.prototype.reset = function () {
        var overlay = document.getElementById("overlay");
        if (overlay)
            overlay.style.display = "none";
        this.lines = 0;
        this.score = 0;
        this.level = 0;
        this.board.reset();
        this.updateBackground();
        requestAnimationFrame(this.loop.bind(this));
    };
    // NES scoring
    Tetris.prototype.getScoreForLines = function (lines) {
        var multipliers = [0, 40, 100, 300, 1200];
        return multipliers[lines] * (this.level + 1);
    };
    Tetris.prototype.shouldIncreaseLevel = function () {
        if (this.level === 10)
            return false; // max level
        return (this.lines >= (this.level + 1) * 10);
    };
    return Tetris;
}());
var container = document.getElementById("game");
var game = new Tetris(container);
game.start();

},{"./model/board":11,"./model/piece":10,"./util/keys":12,"./util/color":14,"./model/event":18}],16:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module() {
  OldModule.call(this);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

if (!module.bundle.parent && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var ws = new WebSocket('ws://' + hostname + ':' + '46583' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[16,6])
//# sourceMappingURL=/dist/cd8a7dbfe00fa1bc3956ae5c9aabab45.map