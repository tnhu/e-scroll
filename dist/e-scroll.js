'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addHandler(element, callback) {
  var progress = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {
    return null;
  };

  var onProgress = false;

  if (element.onScrollHandler && element.onScrollHandler.callback === callback) {
    return;
  }

  element.onScrollHandler = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(e) {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!onProgress) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return');

            case 2:
              if (!(element.scrollTop + element.clientHeight >= element.scrollHeight)) {
                _context.next = 18;
                break;
              }

              _context.prev = 3;

              onProgress = true;
              progress({ type: 'start' });
              _context.next = 8;
              return callback(e);

            case 8:
              _context.next = 14;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context['catch'](3);

              progress({ type: 'error', error: _context.t0 });
              console.error(_context.t0);

            case 14:
              _context.prev = 14;

              onProgress = false;
              progress({ type: 'end' });
              return _context.finish(14);

            case 18:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 10, 14, 18]]);
    }));

    return function (_x2) {
      return _ref.apply(this, arguments);
    };
  }();

  element.onScrollHandler.callback = callback;
  element.addEventListener('scroll', element.onScrollHandler);
}

function removeHandler(element, callback) {
  if (!element.onScrollHandler || element.onScrollHandler !== callback) {
    return;
  }

  element.removeEventListener('scroll', element.onScrollHandler);

  delete element.onScrollHandler.callback;
  delete element.onScrollHandler;
}

module.exports = {
  addHandler: addHandler,
  removeHandler: removeHandler
};