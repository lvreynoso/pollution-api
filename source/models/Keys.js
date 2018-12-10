// keys.js
// wat

import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const KeysSchema = new Schema({
    list: { type: Map, of: Boolean, default: {} },
    level: { type: String, required: true }
})

const Keys = mongoose.model('Keys', KeysSchema);
export default Keys;
