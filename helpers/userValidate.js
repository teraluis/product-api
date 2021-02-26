const User = require('../modules/users/models/userModel');

const exits = async ( id ) => {
    const exits = await User.findById(id);
    if (!exits.state) {
        throw new Error(`user with id ${id} was removed`);
    }
    if (!exits){
        throw new Error(`user with id ${id} dont exits`);
    }
};

module.exports = {exits}
