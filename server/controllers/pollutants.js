"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _slugify = _interopRequireDefault(require("slugify"));

var _Year = _interopRequireDefault(require("../models/Year.js"));

var _Pollutant = _interopRequireDefault(require("../models/Pollutant.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// pollutants.js
// app
const pollutants = _express.default.Router(); // models


// read one pollutant
pollutants.get('/country/:code/year/:year/pollutant/:pollutant', async (req, res) => {
  let query = {
    slug: req.params.pollutant,
    year: req.params.year,
    countryCode: req.params.code
  };
  let pollutant = await _Pollutant.default.findOne(query).catch(err => {
    console.log(err);
    return res.status(404).send(err);
  });
  res.status(200).send(pollutant);
}); // create one pollutant

pollutants.post('/country/:code/year/:year/pollutant', async (req, res) => {
  // console.log(req.body);
  // pull the proper year
  let query = {
    year: req.params.year,
    code: req.params.code
  };
  let year = await _Year.default.findOne(query).populate('pollutants').catch(err => {
    console.log(err);
    return res.status(404).send(err);
  }); // check for redundancy

  let pollutantExists = false;
  year.pollutants.map(entry => {
    if (entry.name = req.body.name) {
      pollutantExists = true;
    }
  });

  if (pollutantExists == true) {
    console.log('POSTed pollutant already exists; aborting');
    return res.status(400);
  } // create the pollutant object


  let submission = req.body;
  submission.slug = (0, _slugify.default)(submission.name, {
    replacement: '-',
    remove: null,
    lower: true
  });
  submission.year = req.params.year;
  submission.countryCode = req.params.code;
  let pollutant = new _Pollutant.default(submission); // save it

  let result = await pollutant.save().catch(err => {
    console.log(err);
    return res.status(500).send(err);
  });
  year.pollutants.push(pollutant);
  let newYear = await year.save().catch(err => {
    console.log(err);
    return res.status(500).send(err);
  }); // console.log(result);

  res.status(200).send(result);
});
pollutants.put('/country/:code/year/:year/pollutant/:pollutant', async (req, res) => {
  let updatedPollutant = req.body;
  let query = {
    slug: req.params.pollutant,
    year: req.params.year,
    countryCode: req.params.code
  };
  let result = await _Pollutant.default.findOneAndUpdate(query, updatedPollutant, {
    new: true
  }).catch(err => {
    console.log(err);
    return res.status(404).send(err);
  });
  res.status(200).send(result);
});
pollutants.delete('/country/:code/year/:year/pollutant/:pollutant', async (req, res) => {
  let updatedPollutant = req.body;
  let query = {
    slug: req.params.pollutant,
    year: req.params.year,
    countryCode: req.params.code
  };
  let result = await _Pollutant.default.findOneAndDelete(query).catch(err => {
    console.log(err);
    return res.status(404).send(err);
  });
  res.status(200).send(result);
});
var _default = pollutants;
exports.default = _default;
//# sourceMappingURL=pollutants.js.map