"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom.iterable");

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// keys.js
// wat
const Schema = _mongoose.default.Schema;
const KeysSchema = new Schema({
  list: {
    type: Map,
    of: Boolean,
    default: {}
  },
  level: {
    type: String,
    required: true
  }
});

const Keys = _mongoose.default.model('Keys', KeysSchema);

var _default = Keys;
exports.default = _default;
//# sourceMappingURL=Keys.js.map