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
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
        ],
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
/**
 * Relative coordinates of starting point for each shape
 * [hor, vert] i.e. [2, 1] means move left 2, up 1
 */
exports.Offset = (_b = {},
    _b[TetrominoType.SQUARE] = [[1, 2], [1, 2], [1, 2], [1, 2]],
    _b[TetrominoType.LINE] = [[1, 2], [2, 1], [0, 2], [2, 0]],
    _b[TetrominoType.L] = [[1, 1], [0, 2], [0, 1], [0, 1]],
    _b[TetrominoType.J] = [[0, 1], [1, 1], [2, 1], [1, 2]],
    _b[TetrominoType.S] = [[1, 1], [0, 2], [0, 1], [0, 1]],
    _b[TetrominoType.Z] = [[1, 1], [0, 2], [0, 1], [0, 1]],
    _b[TetrominoType.T] = [[1, 1], [0, 2], [0, 1], [0, 1]],
    _b);
var _a, _b;

},{}],22:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shape_1 = require("./shape");
var color_1 = require("./color");
var util_1 = require("../util");
var Piece = /** @class */ (function () {
    function Piece(type, boardWidth, ctx, size) {
        this.type = type;
        this.color = color_1.Colors[this.type];
        this.rotation = 0;
        this.shape = shape_1.Shapes[this.type][this.rotation];
        this.row = -2; // y
        this.col = (boardWidth / 2) - Math.ceil(this.shape.length / 2); // x
        this.ctx = ctx;
        this.size = size;
    }
    Piece.prototype.draw = function () {
        this.fill(color_1.Colors[this.type]);
    };
    Piece.prototype.clear = function () {
        this.fill("white");
    };
    Piece.prototype.fill = function (fillstyle) {
        for (var r = 0; r < this.shape.length; r++) {
            for (var c = 0; c < this.shape.length; c++) {
                var cell = this.shape[c][r];
                if (cell > 0) {
                    this.ctx.fillStyle = fillstyle;
                    util_1.drawSquare(this.col + c, this.row + r, this.ctx, this.size);
                }
            }
        }
    };
    Piece.prototype.left = function () {
        this.clear();
        this.col--;
        this.draw();
    };
    Piece.prototype.right = function () {
        this.clear();
        this.col++;
        this.draw();
    };
    Piece.prototype.down = function () {
        this.clear();
        this.row++;
        this.draw();
    };
    Piece.prototype.rotate = function () {
        this.clear();
        this.rotation = (this.rotation + 1) % 4;
        this.shape = shape_1.Shapes[this.type][this.rotation];
        this.draw();
    };
    return Piece;
}());
exports.Piece = Piece;

},{"./shape":10,"./color":19,"../util":21}],8:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../util");
var color_1 = require("./color");
var piece_1 = require("./piece");
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
        this.activePiece = new piece_1.Piece(shape, this.width, this.ctx, this.tileSize);
    };
    Board.prototype.drawPiece = function () {
        // const hOffset = ((this.width / 2) - 2)
        // const t = Shapes[shape][rotation]
        // const offset = Offset[shape][rotation]
        this.activePiece.draw();
    };
    Board.prototype.shiftBoardDown = function () {
        var bottomRow = this.grid[this.grid.length - 1].filter(function (el) { return el !== 0; });
        var shouldNotShift = bottomRow.length > 0;
        if (shouldNotShift) {
            return;
        }
        var cells = [];
        for (var c = 0; c < this.width; c++) {
            cells.push(0);
        }
        this.grid.pop();
        this.grid.unshift(cells);
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
    return Board;
}());
exports.Board = Board;

},{"../util":21,"./color":19,"./piece":22}],4:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var board_1 = require("./model/board");
var shape_1 = require("./model/shape");
var Tetris = /** @class */ (function () {
    function Tetris(container) {
        this.container = container;
        this.board = new board_1.Board(this.container);
        this.step = 1;
        this.lastTime = 0;
        this.newPiece = true;
    }
    Tetris.prototype.start = function () {
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    Tetris.prototype.getInput = function () {
    };
    Tetris.prototype.gameLoop = function (timestamp) {
        if (timestamp < this.lastTime + (1000 / this.step)) {
            requestAnimationFrame(this.gameLoop.bind(this));
            return;
        }
        this.lastTime = timestamp;
        if (this.newPiece) {
            this.board.setActivePiece(shape_1.TetrominoType.SQUARE);
            this.newPiece = false;
        }
        this.board.draw();
        this.board.drawPiece();
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    return Tetris;
}());
var container = document.getElementById("game");
var game = new Tetris(container);
game.start();

},{"./model/board":8,"./model/shape":10}],26:[function(require,module,exports) {

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
},{}]},{},[26,4])
//# sourceMappingURL=/dist/37b3b555bd92e05828ed5f1dc323386e.map