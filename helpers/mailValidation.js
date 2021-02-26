const User = require('../modules/users/models/userModel');

const unique = async (email = '') => {
    const exits = await User.findOne({email});
    if (exits){
       throw new Error(`${email} already exits`);
    }
}

module.exports = {unique}
