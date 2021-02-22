const User = require('../models/usuario');

class UsersService {

    addUser = (name, email, password, state, role) => {
        return new Promise((resolve, reject) => {
            const user = new User({
                name, email, password, state, role
            }).save( (err, userDB) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(userDB);
                }
            })
        });
    }
}

module.exports = new UsersService();
