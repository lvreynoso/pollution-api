"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// pollutant.js
const Schema = _mongoose.default.Schema;
const PollutantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: false
  },
  total: {
    type: Number,
    required: false
  },
  perCapita: {
    type: Number,
    required: false
  },
  perGDP: {
    type: Number,
    required: false
  },
  year: {
    type: Number,
    required: true
  },
  countryCode: {
    type: String,
    required: true
  }
});

const Pollutant = _mongoose.default.model('Pollutant', PollutantSchema);

var _default = Pollutant;
exports.default = _default;
//# sourceMappingURL=Pollutant.js.map