import jwt from 'jsonwebtoken'
import createError from './error.js'


const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token

    if (!token) return next(createError(401, 'You are not authenticated'))

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            console.log(error);
            return next(createError(401, 'Token is no longer valid!'))
        }

        req.user = user
        next()
    })
    
}


export default verifyToken