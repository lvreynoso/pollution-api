// pollutants.js

// app
import express from 'express'
import slugify from 'slugify'
const pollutants = express.Router();

// models
import Year from '../models/Year.js'
import Pollutant from '../models/Pollutant.js'

// read one pollutant
pollutants.get('/country/:code/year/:year/pollutant/:pollutant', async (req, res) => {
    let query = {
        slug: req.params.pollutant,
        year: req.params.year,
        countryCode: req.params.code
    };
    let pollutant = await Pollutant.findOne(query).catch(err => {
        console.log(err);
        return res.status(404).send(err);
    })
    res.status(200).send(pollutant);
})

// create one pollutant
pollutants.post('/country/:code/year/:year/pollutant', async (req, res) => {
    // console.log(req.body);
    // pull the proper year
    let query = {
        year: req.params.year,
        code: req.params.code
    }
    let year = await Year.findOne(query).populate('pollutants').catch(err => {
        console.log(err);
        return res.status(404).send(err);
    })

    // check for redundancy
    let pollutantExists = false;
    year.pollutants.map(entry => {
        if (entry.name = req.body.name) {
            pollutantExists = true;
        }
    })
    if (pollutantExists == true) {
        console.log('POSTed pollutant already exists; aborting');
        return res.status(400);
    }

    // create the pollutant object
    let submission = req.body;
    submission.slug = slugify(submission.name, {
        replacement: '-',
        remove: null,
        lower: true
    })
    submission.year = req.params.year;
    submission.countryCode = req.params.code;
    let pollutant = new Pollutant(submission);

    // save it
    let result = await pollutant.save().catch(err => {
        console.log(err);
        return res.status(500).send(err);
    })

    year.pollutants.push(pollutant);
    let newYear = await year.save().catch(err => {
        console.log(err);
        return res.status(500).send(err);
    })
    // console.log(result);
    res.status(200).send(result);
})

pollutants.put('/country/:code/year/:year/pollutant/:pollutant', async (req, res) => {
    let updatedPollutant = req.body;
    let query = {
        slug: req.params.pollutant,
        year: req.params.year,
        countryCode: req.params.code
    };
    let result = await Pollutant.findOneAndUpdate(query, updatedPollutant, { new: true}).catch(err => {
        console.log(err);
        return res.status(404).send(err);
    })
    res.status(200).send(result);
})

pollutants.delete('/country/:code/year/:year/pollutant/:pollutant', async (req, res) => {
    let updatedPollutant = req.body;
    let query = {
        slug: req.params.pollutant,
        year: req.params.year,
        countryCode: req.params.code
    };
    let result = await Pollutant.findOneAndDelete(query).catch(err => {
        console.log(err);
        return res.status(404).send(err);
    })
    res.status(200).send(result);
})

export default pollutants;
