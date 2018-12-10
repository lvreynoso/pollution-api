// user.js
// our User model

import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    password: { type: String, required: true, select: false },
    username: { type: String, required: true},
    email: { type: String },
    key: { type: String, required: true }
}, { timestamps: true });

UserSchema.pre("save", function(next) {
    // encrypt password
    const user = this;
    if (!user.isModified(`password`)) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            next();
        })
    })
});

UserSchema.methods.comparePassword = function(password, done) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        done(err, isMatch);
    });
};

const User = mongoose.model('User', UserSchema);
export default User;
