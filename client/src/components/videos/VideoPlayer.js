import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const VideoPlayer = () => {

      const { id } = useParams()

       const [video, setVideo] = useState({})
       const [isLoading, setIsLoading] = useState(true)

       console.log(id);


       useEffect(() => {
        const getVideo = async () => {
          setIsLoading(true)
          const res = await axios.get(`/video/s/${id}`)
          setVideo(res.data)
          setIsLoading(false)
        }

        getVideo()
       },[id])


       if (isLoading) {
        return<div className="col-lg-8 col-md-8 col-sm-12 
        col-12 d-flex justify-content-center align-items-center" style={{height: "700px"}}>
         
         <div class="spinner-border text-info" role="status">
  <span class="visually-hidden">Loading...</span>
</div>

       </div>
       }

  return (
    <div className="col-lg-8 col-md-8 col-sm-12 col-12">

        <video controls className="w-100">
            <source src={video.videoUrl}
                type="video/mp4"/>
        </video>
         
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
                <button className="btn btn-primary">Follow</button>
              </div>
         </div>



        <h3>{video.title}</h3>
        <p>{video.desc}</p>
        <p>{video.tags}</p>
    </div>
  )
}

export default VideoPlayer