"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _db = _interopRequireDefault(require("../config/db"));

var _schema = _interopRequireDefault(require("../model/schema"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _joi = _interopRequireDefault(require("joi"));

var _secret = _interopRequireDefault(require("../config/secret"));

var _queries = _interopRequireDefault(require("../config/queries"));

var _user = _interopRequireDefault(require("../../usingObjects/data/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LoginController =
/*#__PURE__*/
function () {
  function LoginController() {
    _classCallCheck(this, LoginController);
  }

  _createClass(LoginController, null, [{
    key: "login",
    value: function () {
      var _login = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var validateUser, userData, _ref, rowCount, rows, validPassword, id, token;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                validateUser = _schema.default.loginUser(req.body);

                if (!(validateUser.error === null)) {
                  _context.next = 28;
                  break;
                }

                userData = {};
                userData = (_readOnlyError("userData"), req.body);
                userData.email = req.body.email;
                userData.password = req.body.password;
                _context.next = 9;
                return _db.default.query(_queries.default.checkIfUserExist, [userData.email]);

              case 9:
                _ref = _context.sent;
                rowCount = _ref.rowCount;
                rows = _ref.rows;

                if (!(rowCount === 0)) {
                  _context.next = 16;
                  break;
                }

                return _context.abrupt("return", res.status(404).json({
                  'status': 404,
                  'message': 'Email Does not Exist'
                }));

              case 16:
                _context.next = 18;
                return _bcryptjs.default.compareSync(userData.password, rows[0].password);

              case 18:
                validPassword = _context.sent;

                if (validPassword) {
                  _context.next = 23;
                  break;
                }

                return _context.abrupt("return", res.status(401).json({
                  'status': 401,
                  'message': 'Invalid Password'
                }));

              case 23:
                id = rows[0].id;
                token = _jsonwebtoken.default.sign({
                  id: id
                }, _secret.default.secret, {
                  expiresIn: '24h'
                });
                return _context.abrupt("return", res.status(200).json({
                  'status': 200,
                  token: token,
                  'message': 'Login Successful'
                }));

              case 26:
                _context.next = 29;
                break;

              case 28:
                res.status(401).json({
                  'status': 401,
                  'message': 'Invalid Input'
                });

              case 29:
                _context.next = 33;
                break;

              case 31:
                _context.prev = 31;
                _context.t0 = _context["catch"](0);

              case 33:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 31]]);
      }));

      function login(_x, _x2) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }]);

  return LoginController;
}();

exports.default = LoginController;