import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Spiner from '../global/Spiner'

import { format } from 'timeago.js';

import { useSelector } from 'react-redux'


import VideoEditModal from './VideoEditModal';



const VideoPlayer = () => {

      const { id } = useParams()

       const [video, setVideo] = useState({})
       const [isLoading, setIsLoading] = useState(true)

       const { user } = useSelector(state => state.auth)

       


       //bring the video
       useEffect(() => {
        const getVideo = async () => {
            try {

              setIsLoading(true)
              const res = await axios.get(`/video/s/${id}`)
              setVideo(res.data)
              setIsLoading(false)


            } catch (error) {
              console.log(error);
            }
        }

        getVideo()
       },[id])


       useEffect(() => {
        const addView = async () => {
          try {
            const res = await axios.patch(`/video/s/${id}`)
          } catch (error) {
            console.log(error)
          }
         
        }

          addView()
       },[])



       const follow = async() => {
              

        try {
          const res = axios.patch(`/follow/${video.userId._id}`)

          video.userId.followers.push(user._id)
          setVideo({...video})

        } catch (error) {
          console.log(error)
        }


       }



       if (isLoading) {
        return<div className="col-lg-8 col-md-8 col-sm-12 
        col-12 d-flex justify-content-center align-items-center" style={{height: "700px"}}>
         <Spiner/>
       </div>
       }

  return (
    <>
    {
      user && <VideoEditModal
        thumbnail={video.imgUrl}
        title={video.title}
        desc={video.desc}
        tags={video.tags}
        setVideo={setVideo}
      />
    }
    <div className="col-lg-8 col-md-8 col-sm-12 col-12">

        <video controls className="w-100">
            <source src={video.videoUrl}
                type="video/mp4"/>
        </video>
         
         <div className="py-4">
          <h5>{video.views} {video.views > 1 ? 'views' : 'view'}</h5>
          <h6>{format(video.createdAt)}</h6>

            {
              user && video.userId._id === user._id ? 
              <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button> : ''
            }
         </div>
         <div className="d-flex justify-content-between align-items-center">
              {/* img and name */}
              <div className="d-flex align-items-center">
                <img
                src={video.userId.profileImage}
                alt={video.userId.name}
                className="rounded-circle"
                style={{width: '50px', height: '50px'}}
                />
                <h5 className="px-2">{video.userId.name}</h5>
              </div>

               {/* follower and follow btn */}
               <div className="d-flex align-items-center">
               <h5 className="mx-2">{video.userId.followers.length} followers</h5>

               {
                user && 
                !video.userId.followers.includes(user._id) ?
                <button className="btn btn-primary" onClick={follow}>Follow</button>
                :
                <button className="btn btn-primary">Unfollow</button>
               }
                
              </div>
         </div>



        <h3>{video.title}</h3>
        <p>{video.desc}</p>
        <p>{video.tags}</p>
    </div>

    </>
  )
}

export default VideoPlayer