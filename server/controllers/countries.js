"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _Country = _interopRequireDefault(require("../models/Country.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// countries.js
// app
const countries = _express.default.Router(); // models


// returns a list of countries
countries.get('/country', async (req, res) => {
  let allCountries = await _Country.default.find().populate('years').catch(err => {
    console.log(err);
  });
  res.status(200).send(allCountries);
}); // read one country

countries.get('/country/:code', async (req, res) => {
  let query = {
    code: req.params.code
  };
  let country = await _Country.default.findOne(query).populate('years').catch(err => {
    console.log(err);
  });
  res.status(200).send(country);
}); // create one country

countries.post('/country', async (req, res) => {
  let country = new _Country.default(req.body);
  let result = country.save().catch(err => {
    console.log(err);
  });
  res.status(200).send(result);
}); // update one country

countries.put('/country/:code', async (req, res) => {
  let query = {
    code: req.params.code
  };
  let country = req.params.body;

  let result = _Country.default.findOneAndUpdate(query, country, {
    new: true
  }).catch(err => {
    console.log(err);
    return res.status(400);
  });

  res.status(200).send(result);
}); // delete one country

countries.delete('/country/:code', async (req, res) => {
  let query = {
    code: req.params.code
  };
  let result = await _Country.default.findOneAndDelete(query).catch(err => {
    console.log(err);
    return res.status(404);
  });
  res.status(200).send(result);
});
var _default = countries;
exports.default = _default;
//# sourceMappingURL=countries.js.map