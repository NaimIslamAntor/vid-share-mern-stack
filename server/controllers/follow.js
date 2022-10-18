
import User from '../models/User.js'

export const follow = async (req, res, next) => {

    const channelId = req.params.userId

    const userId = req.user.id

    try {
        const findUser = await User.findByIdAndUpdate(channelId, {
            $push: {followers: userId}
        })

        res.json({message: 'following successfully'})
    } catch (error) {
        next(error)
    }
}