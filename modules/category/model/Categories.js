const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is mandatory']
    }
});

module.exports = mongoose.model('Category', usersSchema);
