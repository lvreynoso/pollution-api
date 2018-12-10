// check-api-key.js

import Keys from '../models/Keys.js'

const checkApiKey = async function(req, res, next) {
    const masterKey = await Keys.findOne({ level: 'master' });
    if (masterKey.list.get(`${req.query.key}`) === true) {
        next();
    } else {
        return res.status(401).send({ message: '401 Unauthorized'});
    }
}

export default checkApiKey;
