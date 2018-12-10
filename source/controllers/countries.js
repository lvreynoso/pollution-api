// countries.js

// app
import express from 'express'
const countries = express.Router();

// models
import Country from '../models/Country.js'

// returns a list of countries
countries.get('/country', async (req, res) => {
    let allCountries = await Country.find()
        .populate('years')
        .catch(err => { console.log(err) });
    res.status(200).send(allCountries);
})

// read one country
countries.get('/country/:code', async (req, res) => {
    let query = {
        code: req.params.code
    }
    let country = await Country.findOne(query)
        .populate('years')
        .catch(err => { console.log(err) });
    res.status(200).send(country);
})

// create one country
countries.post('/country', async (req, res) => {
    let country = new Country(req.body);
    let result = country.save().catch(err => { console.log(err) });
    res.status(200).send(result);
})

// update one country
countries.put('/country/:code', async (req, res) => {
    let query = {
        code: req.params.code
    }
    let country = req.params.body
    let result = Country.findOneAndUpdate(query, country, { new: true })
        .catch(err => {
            console.log(err);
            return res.status(400);
        });
    res.status(200).send(result);
})

// delete one country
countries.delete('/country/:code', async (req, res) => {
    let query = {
        code: req.params.code
    }
    let result = Country.findOneAndDelete(query).catch(err => {
        console.log(err);
        return res.status(404);
    })
    res.status(200).send(result);
})

export default countries;
