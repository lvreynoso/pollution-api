// mocha chai testing

// dependencies & setup
import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../source/server.js'
const should = chai.should()

// test api key setup
import dotenv from 'dotenv'
const result = (process.env.NODE_ENV == 'development') ? dotenv.config() : false
var TEST_API_KEY = '';

before(function() {
    TEST_API_KEY = process.env.TEST_API_KEY;
    console.log(TEST_API_KEY);
})


// models
const testYear = {
    year: 2016 // it's $CURRENT_YEAR !
}
const testCountry = {
    name: 'California',
    code: 'cal'
}

chai.use(chaiHttp);

describe('site', function() {

    // setup a country
    before(async function() {
        const res = await chai.request(server)
            .post(`/country?key=${TEST_API_KEY}`)
            .send(testCountry)
            .catch(err => { return err });
        res.status.should.be.equal(200);
        res.should.be.json;
    })

    // delete our test country
    after(async function() {
        const res = await chai.request(server).delete(`/country/${testCountry.code}?key=${TEST_API_KEY}`);
        res.status.should.be.equal(200);
        res.should.be.json;
    })

    // Create
    it('Should be able to create a year', async function() {
        const res = await chai.request(server)
            .post(`/country/${testCountry.code}/year?key=${TEST_API_KEY}`)
            .send(testYear)
            .catch(err => { return err });
        res.status.should.be.equal(200);
        res.should.be.json;
    });

    // Read
    it('Should be able to read a year', async function() {
        const res = await chai.request(server).get(`/country/${testCountry.code}/year/${testYear.year}?key=${TEST_API_KEY}`);
        res.status.should.be.equal(200);
        res.should.be.json;
        res.body.should.have.property('year');
        res.body.year.should.be.equal(2016);
    });

    // Update. Wat.
    it('Should be able to update a year', async function() {
        const updatedTestYear = {
            year: 2020
        }
        const res = await chai.request(server)
            .put(`/country/${testCountry.code}/year/${testYear.year}?key=${TEST_API_KEY}`)
            .send(updatedTestYear)
            .catch(err => { return err });
        res.status.should.be.equal(200);
        res.should.be.json;
    });

    // Delete
    it('Should be able to delete a year', async function() {
        const res = await chai.request(server).delete(`/country/${testCountry.code}/year/2020?key=${TEST_API_KEY}`);
        res.status.should.be.equal(200);
        res.should.be.json;
    })
})
