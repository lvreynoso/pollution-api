// mocha chai testing

// dependencies & setup
import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../source/server.js'
const should = chai.should()

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
            .post('/countries')
            .send(testCountry)
            .catch(err => { return err });
        res.status.should.be.equal(200);
        res.should.be.json;
    })

    // delete our test country
    after(async function() {
        const res = await chai.request(server).delete(`/country/${testCountry.code}`);
        res.status.should.be.equal(200);
        res.should.be.json;
    })

    // Create
    it('Should be able to create a year', async function() {
        const res = await chai.request(server)
            .post(`/country/${testCountry.code}/year`)
            .send(testYear)
            .catch(err => { return err });
        res.status.should.be.equal(200);
        res.should.be.json;
    });

    // Read
    it('Should be able to read a year', async function() {
        const res = await chai.request(server).get(`/country/${testCountry.code}/year/${testYear.year}`);
        res.status.should.be.equal(200);
        res.should.be.json;
    });

    // Update. Wat.
    it('Should be able to update a year', async function() {
        const updatedTestYear = {
            year: 2020
        }
        const res = await chai.request(server)
            .put(`/country/${testCountry.code}/year/${testYear.year}`)
            .send(updatedTestYear)
            .catch(err => { return err });
        res.status.should.be.equal(200);
        res.should.be.json;
    });

    // Delete
    it('Should be able to delete a year', async function() {
        const res = await chai.request(server).delete(`/country/${testCountry.code}/year/2020`);
        res.status.should.be.equal(200);
        res.should.be.json;
    })
})
