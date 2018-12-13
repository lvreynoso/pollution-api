"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _Country = _interopRequireDefault(require("../models/Country.js"));

var _Year = _interopRequireDefault(require("../models/Year.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// years.js
// app
const years = _express.default.Router(); // models


// read one year
years.get('/country/:code/year/:year', async (req, res) => {
  let query = {
    year: req.params.year,
    code: req.params.code
  };
  let year = await _Year.default.findOne(query).populate('pollutants').catch(err => {
    console.log(err);
    res.status(404).send(err);
  });
  res.status(200).send(year);
}); // create one year

years.post('/country/:code/year', async (req, res) => {
  let query = {
    code: req.params.code
  };
  let country = await _Country.default.findOne(query).populate('years').catch(err => {
    console.log(err);
    return res.status(404);
  });
  let year = new _Year.default(req.body);
  let yearExists = false;
  country.years.map(entry => {
    if (entry.year = year.year) {
      yearExists = true;
    }
  });

  if (yearExists == true) {
    console.log('POSTed Year already exists; aborting');
    return res.status(400);
  }

  year.country = country._id;
  year.code = req.params.code;
  let result = year.save().catch(err => {
    console.log(err);
    return res.status(500);
  });
  country.years.push(result);
  await country.save().catch(err => {
    console.log(err);
    return res.status(500);
  });
  res.status(200).send(result);
}); // update one year

years.put('/country/:code/year/:year', async (req, res) => {
  let updatedYear = req.body;
  let query = {
    year: req.params.year,
    code: req.params.code
  };
  let result = await _Year.default.findOneAndUpdate(query, updatedYear, {
    new: true
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  });
  res.status(200).send(result);
}); // delete one year

years.delete('/country/:code/year/:year', async (req, res) => {
  let query = {
    year: req.params.year,
    code: req.params.code
  };
  let result = await _Year.default.findOneAndDelete(query).catch(err => {
    console.log(err);
    res.status(404).send(err);
  });
  res.status(200).send(result);
});
var _default = years;
exports.default = _default;
//# sourceMappingURL=years.js.map