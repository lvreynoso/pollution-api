"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// country.js - top level model
const Schema = _mongoose.default.Schema;
const CountrySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  years: [{
    type: Schema.Types.ObjectId,
    ref: "Year"
  }]
}); // CountrySchema.pre('save', function(next) {
//     const country = this;
//     if (!country.years) {
//         country.years = [];
//     }
//     next();
// })

const Country = _mongoose.default.model('Country', CountrySchema);

var _default = Country;
exports.default = _default;
//# sourceMappingURL=Country.js.map