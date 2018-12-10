// mocha chai testing

// dependencies & setup
import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../source/server.js'
const should = chai.should()

// models
// these are Canada 2016 numbers
const testPollutant = {
    name: 'Carbon Dioxide',
    slug: 'carbon-dioxide',
    code: 'CO2',
    total: 675918.61, // kton CO2
    perCapita: 18.62, // ton CO2 per person
    perGDP: 0.43 // ton CO2 per $1000
}
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
        const country = await chai.request(server)
            .post('/countries')
            .send(testCountry)
            .catch(err => {
                return err
            });
        country.status.should.be.equal(200);
        country.should.be.json;

        const year = await chai.request(server)
            .post(`/country/${testCountry.code}/year`)
            .send(testYear)
            .catch(err => { return err });
        year.status.should.be.equal(200);
        year.should.be.json;
    })

    // delete our test country
    after(async function() {
        const country = await chai.request(server).delete(`/country/${testCountry.code}`);
        country.status.should.be.equal(200);
        country.should.be.json;

        const year = await chai.request(server).delete(`/country/${testCountry.code}/year/${testYear.year}`);
        year.status.should.be.equal(200);
        year.should.be.json;
    })

    // Create
    it('Should be able to create a pollutant', async function() {
        const res = await chai.request(server)
            .post(`/country/${testCountry.code}/year/${testYear.year}/pollutant/`)
            .send(testPollutant)
            .catch(err => {
                return err
            });
        res.status.should.be.equal(200);
        res.should.be.json;
    });

    // Read
    it('Should be able to read a pollutant', async function() {
        const res = await chai.request(server).get(`/country/${testCountry.code}/year/${testYear.year}/pollutant/${testPollutant.slug}`);
        res.status.should.be.equal(200);
        res.should.be.json;
    });

    // Update
    it('Should be able to update a pollutant', async function() {
        const updatedTestPollutant = {
            name: 'Carbon Dioxide',
            slug: 'carbon-dioxide',
            code: 'CO2',
            total: 675918.61, // kton CO2
            perCapita: 18.49, // ton CO2 per person
            perGDP: 0.43 // ton CO2 per $1000
        }
        const res = await chai.request(server)
            .put(`/country/${testCountry.code}/year/${testYear.year}/pollutant/${testPollutant.slug}`)
            .send(updatedTestYear)
            .catch(err => {
                return err
            });
        res.status.should.be.equal(200);
        res.should.be.json;
        res.should.have.property('perCapita');
        res.perCapita.should.be.equal(18.49);
    });

    // Delete
    it('Should be able to delete a pollutant', async function() {
        const res = await chai.request(server).delete(`/country/${testCountry.code}/year/${testYear.year}/pollutant/${testPollutant.slug}`);
        res.status.should.be.equal(200);
        res.should.be.json;
    })
})
