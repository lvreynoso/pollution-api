// pollutant.js

import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const PollutantSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    code: { type: String, required: false },
    total: { type: Number, required: false },
    perCapita: { type: Number, required: false },
    perGDP: { type: Number, required: false },
    year: { type: Number, required: true }
})

const Pollutant = mongoose.model('Pollutant', PollutantSchema);
export default Pollutant;
