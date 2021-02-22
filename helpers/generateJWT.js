const jwt = require('jsonwebtoken');
const generateJWT = (uuid = '') => {
    return new Promise( (resolve, reject) => {
        const payload = {uuid};

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                reject(' error: '+err);
            } else {
                resolve(token);
            }
        })
    })
}


module.exports = {generateJWT};
