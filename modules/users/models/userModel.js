const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
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
    },
    country: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    user: { type: Schema.Types.ObjectId, ref: "Product"}
});

UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
};
UserSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });


module.exports = mongoose.model('User', UserSchema);
