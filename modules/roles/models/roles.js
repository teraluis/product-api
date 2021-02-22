const {Schema, model} = require('mongoose');

const RoleSchema = Schema({
    role: {
        type: String,
        require: [true, 'role is mandatory']
    },

});

module.exports = model('roles', RoleSchema);
