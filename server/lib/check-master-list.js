"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Keys = _interopRequireDefault(require("../models/Keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// check-master-list.js
const checkMasterList = async () => {
  const masterKey = await _Keys.default.findOne({
    level: 'master'
  });

  if (!masterKey) {
    console.log('No Master List of API Keys found, initializing...');
    let newMasterKey = new _Keys.default({
      level: 'master'
    });
    let result = await newMasterKey.save().catch(err => {
      console.log(err);
    });
    console.log('New Master List created!');
    console.log(result);
  } else {
    console.log('Master API Key List found!');
  }
};

var _default = checkMasterList;
exports.default = _default;
//# sourceMappingURL=check-master-list.js.map