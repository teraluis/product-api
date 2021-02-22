const User = require('../modules/users/models/usuario');

const exits = async ( id ) => {
    const exits = await User.findById({id});
    if (!exits){
        throw new Error(`user with ${id} dont exits`);
    }
};

module.exports = {exits}
