// year.js - simple year model

import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const YearSchema = new Schema({
    year: { type: Number, required: true },
    country: { type: String, required: true },
    pollutants: [{ type: Schema.Types.ObjectId, ref: "Pollutant" }]
});

const Year = mongoose.model('Year'. YearSchema);
export default Year;
