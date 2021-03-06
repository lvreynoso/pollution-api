"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateAPIKey;

require("core-js/modules/es6.regexp.to-string");

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// generate-api-key.js
// our API key maker module

/*
|--------------------------------------------------------------------------
| UUID (API Key) Generation
|--------------------------------------------------------------------------
|
| The following code generates a random, unique hexadecimal string that can be
| to uniquely identify an object, like a user api key.
| The code is based off of a kind comment at https://gist.github.com/jed/982883
|
*/
function generateAPIKey() {
  let key = new Promise(function (resolve, reject) {
    let hex = [];

    for (var i = 0; i < 256; i++) {
      hex[i] = (i < 16 ? '0' : '') + i.toString(16);
    }

    let r = new Uint8Array(16);

    _crypto.default.randomFill(r, (err, buf) => {
      if (err) throw err;
      console.log(Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength).toString('hex'));
      r[6] = r[6] & 0x0f | 0x40;
      r[8] = r[8] & 0x3f | 0x80;
      resolve(hex[r[0]] + hex[r[1]] + hex[r[2]] + hex[r[3]] + // "-" +
      hex[r[4]] + hex[r[5]] + // "-" +
      hex[r[6]] + hex[r[7]] + // "-" +
      hex[r[8]] + hex[r[9]] + // "-" +
      hex[r[10]] + hex[r[11]] + hex[r[12]] + hex[r[13]] + hex[r[14]] + hex[r[15]]);
    });
  });
  return key;
}
//# sourceMappingURL=generate-api-key.js.map