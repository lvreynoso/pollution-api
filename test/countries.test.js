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
const testCountry = {
    name: 'California',
    code: 'cal'
}

chai.use(chaiHttp);

describe('site', function() {

    // Create
    it('Should be able to create a country', async function() {
        const res = await chai.request(server)
            .post(`/country?key=${TEST_API_KEY}`)
            .send(testCountry)
            .catch(err => { return err });
        res.status.should.be.equal(200);
        res.should.be.json;
    });

    // Read
    it('Should be able to read a country', async function() {
        const res = await chai.request(server).get(`/country/${testCountry.code}?key=${TEST_API_KEY}`);
        res.status.should.be.equal(200);
        res.should.be.json;
    });

    // Update
    it('Should be able to update a country', async function() {
        const updatedTestCountry = {
            name: 'California Republic',
            code: 'cal'
        }
        const res = await chai.request(server)
            .put(`/country/${testCountry.code}?key=${TEST_API_KEY}`)
            .send(updatedTestCountry)
            .catch(err => { return err });
        res.status.should.be.equal(200);
        res.should.be.json;
    });

    // Delete
    it('Should be able to delete a country', async function() {
        const res = await chai.request(server).delete(`/country/${testCountry.code}?key=${TEST_API_KEY}`);
        res.status.should.be.equal(200);
        res.should.be.json;
    })
})
