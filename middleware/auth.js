const {UnauthenticatedError} = require('../errors')
const jwt = require('jsonwebtoken')

const authicationMiddleware = async (req,res,next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('No token proveded')
    }
    const token = authHeader.split(' ')[1]
       
    try {
        const decoded =jwt.verify(token,process.env.JWT_SECRET)
        const {id,username} = decoded
         req.user = {id,username}
         //send the is and username to dashboard
         next()
    } catch (error) {
        throw new UnauthenticatedError('No authorised to this route')
    }


}

module.exports = authicationMiddleware