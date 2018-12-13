"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// year.js - simple year model
const Schema = _mongoose.default.Schema;
const YearSchema = new Schema({
  year: {
    type: Number,
    required: true
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: "Country",
    required: true
  },
  code: {
    type: String,
    required: true
  },
  pollutants: [{
    type: Schema.Types.ObjectId,
    ref: "Pollutant"
  }]
});

const Year = _mongoose.default.model('Year', YearSchema);

var _default = Year;
exports.default = _default;
//# sourceMappingURL=Year.js.map