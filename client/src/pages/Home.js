import { useEffect } from 'react'

import VideoCard from '../components/home/VideoCard'

import { useDispatch, useSelector } from 'react-redux'

import { randomVideos } from '../features/video/videoSlice'

const Home = () => {

   const dispatch = useDispatch()

   const {videos} = useSelector(state => state.video)

   useEffect(() => {
      dispatch(randomVideos())
   },[])


  return (
    <div className="container py-4">
      <div className="row">

         {
            videos.map(video => {
               return <VideoCard
               key={video._id}
               id={video._id}
               img={video.imgUrl}
               title={video.title}
            />
            })
         }
           
           
      </div>
    </div>
  )
}

export default Home