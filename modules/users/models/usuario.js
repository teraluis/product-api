const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let usersSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is mandatory']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email is mandatory']
    },
    password: {
        type: String,
        required: [true, 'password is mandatory']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE'
    },
    state: {
        type: Boolean,
        required: [true, 'state is mandatory']
    },
    google: {
        type: Boolean,
        default: false
    }
});
usersSchema.methods.toJSON = function () {
    // other way : const { __v, password, ...user} = this.toObject();
    let userObject = this.toObject();
    userObject.uid = userObject._id;
    delete userObject._id;
    delete userObject.password;
    delete userObject.__v;
    return userObject;
};
usersSchema.plugin(uniqueValidator, {
    message: '{PATH} must be unique'
});


module.exports = mongoose.model('users', usersSchema);
