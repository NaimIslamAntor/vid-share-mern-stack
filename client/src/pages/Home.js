import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { randomVideos, reset } from '../features/video/videoSlice'

import VideoCard from '../components/home/VideoCard'
import Spiner from '../components/global/Spiner'


const Home = () => {

   const dispatch = useDispatch()

   const {videos, isLoading} = useSelector(state => state.video)

   useEffect(() => {
      dispatch(randomVideos())

      return () => {
         dispatch(reset())
      }
   },[])


   if (isLoading) {
     return <div className="container">
         <div className="row">
            <div className="col-12 d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
               <Spiner/>
            </div>
         </div>
      </div>
   }

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