// check-master-list.js

import Keys from '../models/Keys.js'

const checkMasterList = async () => {
    const masterKey = await Keys.findOne({ level: 'master' });
    if (!masterKey) {
        console.log('No Master List of API Keys found, initializing...');
        let newMasterKey = new Keys({ level: 'master' });
        let result = await newMasterKey.save().catch(err => { console.log(err) });
        console.log('New Master List created!');
        console.log(result);
    } else {
        console.log('Master API Key List found!');
    }
}

export default checkMasterList;
