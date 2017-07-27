'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function addHandler(element, callback) {
  var progress = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {
    return null;
  };

  var onProgress = false;

  if (element.onScrollHandler && element.onScrollHandler.callback === callback) {
    return;
  }

  element.onScrollHandler = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(e) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
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