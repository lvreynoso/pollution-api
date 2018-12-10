// years.js

// app
import express from 'express'
const years = express.Router();

// models
import Country from '../models/Country.js'
import Year from '../models/Year.js'

// read one year
years.get('/country/:code/year/:year', async (req, res) => {
    let query = {
        year: req.params.year,
        code: req.params.code
    }
    let year = await Year.findOne(query).catch(err => {
        console.log(err);
        res.status(404).send(err);
    })
    res.status(200).send(year);
})

// create one year
years.post('/country/:code/year', async (req, res) => {
    let query = {
        code: req.params.code
    }
    let country = await Country.findOne(query).populate('years').catch(err => {
        console.log(err);
        return res.status(404);
    });

    let year = new Year(req.body);
    let yearExists = false;
    country.years.map(entry => {
        if (entry.year = year.year) {
            yearExists = true;
        }
    })
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
    })
    res.status(200).send(result);
})

// update one year
years.put('/country/:code/year/:year', async (req, res) => {
    let updatedYear = req.body;
    let query = {
        year: req.params.year,
        code: req.params.code
    }
    let result = await Year.findOneAndUpdate(query, updatedYear, { new: true }).catch(err => {
        console.log(err);
        res.status(500).send(err);
    });
    res.status(200).send(result);
})

// delete one year
years.delete('/country/:code/year/:year', async (req, res) => {
    let query = {
        year: req.params.year,
        code: req.params.code,
    }
    let result = Year.findOneAndDelete(query).catch(err => {
        console.log(err);
        res.status(404).send(err);
    })
    res.status(200).send(result);
})

export default years;
