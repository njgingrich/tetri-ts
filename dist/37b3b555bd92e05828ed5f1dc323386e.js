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
})({21:[function(require,module,exports) {
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

},{}],19:[function(require,module,exports) {
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

},{}],10:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tetromino = /** @class */ (function () {
    function Tetromino(type, rotation) {
        if (rotation === void 0) { rotation = 0; }
        this.type = type;
        this.rotation = rotation;
        this.shape = exports.Shapes[type][this.rotation];
    }
    return Tetromino;
}());
exports.Tetromino = Tetromino;
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

},{}],22:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shape_1 = require("./shape");
var color_1 = require("./color");
var util_1 = require("../util");
var Piece = /** @class */ (function () {
    function Piece(type, boardWidth, collides, setOnBoard, ctx, size) {
        this.type = type;
        this.color = color_1.Colors[this.type];
        this.rotation = 0;
        this.shape = shape_1.Shapes[this.type][this.rotation];
        this.row = -2; // y
        this.col = (boardWidth / 2) - Math.ceil(this.shape.length / 2); // x
        this.ctx = ctx;
        this.size = size;
        this.boardWidth = boardWidth;
        this.collides = collides;
        this.setOnBoard = setOnBoard;
    }
    Piece.prototype.draw = function () {
        this.fill(color_1.Colors[this.type]);
    };
    Piece.prototype.clear = function () {
        this.fill("white");
    };
    Piece.prototype.left = function () {
        if (this.collides(this, -1, 0, this.shape)) {
            return;
        }
        this.clear();
        this.col--;
        this.draw();
    };
    Piece.prototype.right = function () {
        if (this.collides(this, 1, 0, this.shape)) {
            return;
        }
        this.clear();
        this.col++;
        this.draw();
    };
    Piece.prototype.down = function () {
        if (this.collides(this, 0, 1, this.shape)) {
            if (this.set())
                return true;
            return this.randomPiece();
        }
        this.clear();
        this.row++;
        this.draw();
        return false;
    };
    Piece.prototype.rotate = function () {
        var nextRotation = shape_1.Shapes[this.type][(this.rotation + 1) % 4];
        if (this.collides(this, 0, 0, nextRotation)) {
            return;
        }
        this.clear();
        this.rotation = (this.rotation + 1) % 4;
        this.shape = shape_1.Shapes[this.type][this.rotation];
        this.draw();
    };
    Piece.prototype.set = function () {
        for (var r = 0; r < this.shape.length; r++) {
            for (var c = 0; c < this.shape.length; c++) {
                if (!this.shape[r][c])
                    continue;
                if (this.row + r < 0) {
                    console.log("You lose");
                    return;
                }
                this.setOnBoard(this.row + r, this.col + c, this.type);
            }
        }
    };
    Piece.getRandomType = function () {
        return Math.floor(Math.random() * 7) + 1;
    };
    Piece.prototype.randomPiece = function () {
        return new Piece(Piece.getRandomType(), this.boardWidth, this.collides, this.setOnBoard, this.ctx, this.size);
    };
    Piece.prototype.fill = function (fillstyle) {
        for (var r = 0; r < this.shape.length; r++) {
            for (var c = 0; c < this.shape.length; c++) {
                var cell = this.shape[r][c];
                if (cell > 0) {
                    this.ctx.fillStyle = fillstyle;
                    util_1.drawSquare(this.col + c, this.row + r, this.ctx, this.size);
                }
            }
        }
    };
    return Piece;
}());
exports.Piece = Piece;

},{"./shape":10,"./color":19,"../util":21}],28:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Keys;
(function (Keys) {
    Keys[Keys["UP"] = 38] = "UP";
    Keys[Keys["DOWN"] = 40] = "DOWN";
    Keys[Keys["LEFT"] = 37] = "LEFT";
    Keys[Keys["RIGHT"] = 39] = "RIGHT";
    Keys[Keys["A"] = 65] = "A";
    Keys[Keys["D"] = 68] = "D";
    Keys[Keys["W"] = 87] = "W";
    Keys[Keys["S"] = 83] = "S";
})(Keys = exports.Keys || (exports.Keys = {}));

},{}],8:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../util");
var color_1 = require("./color");
var piece_1 = require("./piece");
var keys_1 = require("./keys");
var Board = /** @class */ (function () {
    function Board(container, width, height) {
        if (width === void 0) { width = 10; }
        if (height === void 0) { height = 20; }
        this.width = width;
        this.height = height;
        this.container = container;
        this.ctx = this.container.getContext('2d');
        this.tileSize = 32;
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
    };
    Board.prototype.setActivePiece = function (shape) {
        this.activePiece = new piece_1.Piece(shape, this.width, this.collides.bind(this), this.setOnBoard.bind(this), this.ctx, this.tileSize);
    };
    Board.prototype.drawPiece = function () {
        this.activePiece.draw();
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
    Board.prototype.getInput = function (e) {
        if (e.keyCode === keys_1.Keys.UP || e.keyCode === keys_1.Keys.W) {
            this.activePiece.rotate();
        }
        if (e.keyCode === keys_1.Keys.DOWN || e.keyCode === keys_1.Keys.S) {
            this.activePiece.down();
        }
        if (e.keyCode === keys_1.Keys.LEFT || e.keyCode === keys_1.Keys.A) {
            this.activePiece.left();
        }
        if (e.keyCode === keys_1.Keys.RIGHT || e.keyCode === keys_1.Keys.D) {
            this.activePiece.right();
        }
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

},{"../util":21,"./color":19,"./piece":22,"./keys":28}],4:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var board_1 = require("./model/board");
var piece_1 = require("./model/piece");
var Tetris = /** @class */ (function () {
    function Tetris(container) {
        this.container = container;
        this.board = new board_1.Board(this.container);
        this.newPiece = true;
        this.lines = 0;
        this.score = 0;
        this.limit = 300;
        this.lastFrameTimeMs = 0;
        this.maxFPS = 60;
        this.delta = 0;
        this.timestep = 1000 / 60;
        this.fps = 60;
        this.framesThisSecond = 0;
        this.lastFpsUpdate = 0;
        this.gravity = 40;
    }
    Tetris.prototype.start = function () {
        this.getInput();
        this.board.setActivePiece(piece_1.Piece.getRandomType());
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    Tetris.prototype.getInput = function () {
        document.body.addEventListener("keydown", this.board.getInput.bind(this.board), false);
    };
    Tetris.prototype.gameLoop = function (timestamp) {
        if (timestamp < this.lastFrameTimeMs + ((1000 / this.maxFPS) * this.gravity)) {
            requestAnimationFrame(this.gameLoop.bind(this));
            return;
        }
        this.delta += timestamp - this.lastFrameTimeMs;
        this.lastFrameTimeMs = timestamp;
        if (timestamp > this.lastFpsUpdate + 1000) {
            this.fps = 0.25 * this.framesThisSecond + 0.75 * this.fps;
            this.lastFpsUpdate = timestamp;
            this.framesThisSecond = 0;
        }
        this.framesThisSecond++;
        var numUpdateSteps = 0;
        while (this.delta >= this.timestep) {
            this.delta -= this.timestep;
            if (++numUpdateSteps >= 240) {
                break;
            }
        }
        this.draw();
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    Tetris.prototype.draw = function () {
        this.board.draw();
        this.board.drawPiece();
        var newPiece = this.board.activePiece.down();
        this.lines += this.board.clearLines();
        if (newPiece instanceof piece_1.Piece)
            this.board.activePiece = newPiece;
    };
    return Tetris;
}());
var container = document.getElementById("game");
var game = new Tetris(container);
game.start();

},{"./model/board":8,"./model/piece":22}],31:[function(require,module,exports) {

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
  var ws = new WebSocket('ws://' + hostname + ':' + '33147' + '/');
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
},{}]},{},[31,4])
//# sourceMappingURL=/dist/37b3b555bd92e05828ed5f1dc323386e.map