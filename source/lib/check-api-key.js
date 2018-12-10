// check-api-key.js

import Keys from '../models/Keys.js'

const checkApiKey = async function(req, res, next) {
    const masterKey = Keys.findOne({ level: 'master' });
    const masterList = masterKey.list;
    if (masterList.get(`${req.query.key}`) === true) {
        next();
    } else {
        return res.status(401).send({ message: `401 Unauthorized`});
    }
}

export default checkApiKey;
