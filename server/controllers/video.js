import Video from '../models/Video.js'
import createError from '../configs/error.js'



//get single videos
export const singleVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id).populate('userId')
        console.log(video);
        res.status(200).json(video)
    } catch (error) {
        next(error)
    }
}

//add views
export const addView = async (req, res, next) => {

    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        },
        )

        res.status(200).json({message: 'View increased'})

    } catch (error) {
        next(error)
    }

}

//adds a video
export const randomVideos = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{$sample: {size: 60}}])
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}

//adds a video
export const addVideo = async (req, res, next) => {
    try {
        const video = await Video.create({userId: req.user.id, ...req.body})
        res.status(201).json(video)
    } catch (error) {
        next(error)
    }
}


//updates a video

export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)

        if (!video) return next(createError(403, 'Video is not avilable'))

        if (video.userId !== req.user.id) return next(createError(403, 'You can only edit your videos'))

        const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{
            new: true
        })


        res.status(200).json(updatedVideo)
            

    } catch (error) {
        next(error)
    }
}