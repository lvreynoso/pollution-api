// landing page testing

// dependencies & setup
import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../source/server.js'
import dotenv from 'dotenv'
const result = (process.env.NODE_ENV == 'development') ? dotenv.config() : false
const should = chai.should()

chai.use(chaiHttp);

var TEST_API_KEY = '';

before(function() {
    TEST_API_KEY = process.env.TEST_API_KEY;
    console.log(TEST_API_KEY);
})

describe('site', function() {

    it('Should have a home page', async function() {
        const res = await chai.request(server).get('/').catch(err => { return err })
        res.status.should.be.equal(200);
        res.should.be.html;
    });
})
