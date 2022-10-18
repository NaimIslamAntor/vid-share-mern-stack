//imports packages
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

//imports created module
import connectDB from './configs/connectDB.js'
import { errorHandler } from './configs/error.js'

//imports routes
import auth from './routes/auth.js'
import video from './routes/video.js'
import follow from './routes/follow.js'

//initialization
dotenv.config()
const app = express()
const port = process.env.PORT || 8000


//register middlewares
app.use(express.json())
app.use(cookieParser())


//register routes
app.use('/api', auth)
app.use('/api', video)
app.use('/api', follow)


//error handling

app.use(errorHandler)

//starts the server
app.listen(port, () => {
    connectDB()
    console.log(`server running on port ${port}`);
})