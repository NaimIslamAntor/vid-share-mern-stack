import express from "express"

import { 
    randomVideos,
    addVideo,
    singleVideo,
    addView,
    updateVideo,

     } from "../controllers/video.js"


import verifyToken from '../configs/verifyToken.js'

const router = express.Router()

//get a single video
router.route('/video/s/:id')
               .get(singleVideo)
               .put(verifyToken, updateVideo)
               .patch(addView)
               

//get random videos
router.get('/videos/random', randomVideos)

//post a video
router.post('/video/add', verifyToken, addVideo)


export default router