"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Keys = _interopRequireDefault(require("../models/Keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// check-api-key.js
const checkApiKey = async function checkApiKey(req, res, next) {
  const masterKey = await _Keys.default.findOne({
    level: 'master'
  });

  if (masterKey.list.get(`${req.query.key}`) === true) {
    next();
  } else {
    return res.status(401).send({
      message: '401 Unauthorized'
    });
  }
};

var _default = checkApiKey;
exports.default = _default;
//# sourceMappingURL=check-api-key.js.map