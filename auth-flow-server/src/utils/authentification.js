const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET

const createToken = user => {
    return jwt.sign({...user}, jwtSecret, {expiresIn: '7days'})
}

const verifyToken = token => { 
    return jwt.verify(token, jwtSecret, (err, payload))
}

module.exports = createToken, verifyToken