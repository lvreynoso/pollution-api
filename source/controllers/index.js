// index.js

import express from 'express'
const index = express.Router()

index.get('/', (req, res) => {
    const currentUser = req.user;
    // console.log(req.user);
    res.render('index', { currentUser })
})

index.get('/help', (req, res) => {
    res.render('help')
})

export default index;
