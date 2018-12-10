// country.js - top level model

import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const CountrySchema = new Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    years: [{ type: Schema.Types.ObjectId, ref: "Year" }]
});

const Country = mongoose.model('Country', CountrySchema);
export default Country;
