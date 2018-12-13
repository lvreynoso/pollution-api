"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// user.js
// our User model
const Schema = _mongoose.default.Schema;
const UserSchema = new Schema({
  password: {
    type: String,
    required: true,
    select: false
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  key: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
UserSchema.pre("save", function (next) {
  // encrypt password
  const user = this;

  if (!user.isModified(`password`)) {
    return next();
  }

  _bcryptjs.default.genSalt(10, (err, salt) => {
    _bcryptjs.default.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (password, done) {
  _bcryptjs.default.compare(password, this.password, (err, isMatch) => {
    done(err, isMatch);
  });
};

const User = _mongoose.default.model('User', UserSchema);

var _default = User;
exports.default = _default;
//# sourceMappingURL=User.js.map