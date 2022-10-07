import jwt from 'jsonwebtoken'
import User from '../models/User.js'

import createError from '../configs/error.js'

export const signin = async (req, res, next) => {

    try {
        let user = await User.findOne({ email: req.body.email })

       if (!user) {
            user = await User.create(req.body)
       }

       const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

       res.cookie('access_token', token, {
        httpOnly: true
       })

      res.status(201).json(user)

    } catch (error) {
        next(createError(500, 'something went wrong on user authentication'))
    }

}