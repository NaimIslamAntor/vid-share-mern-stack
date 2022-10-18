import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage"

import firebase from '../../firebase/firrbase'


import useUpload from '../../hooks/useUpload'

import axios from 'axios'

const UploadModal = () => {


  const [img, setImg] = useState(null)
  const [video, setVideo] = useState(null)


  const [title, setTitle] = useState(null)
  const [desc, setDesc] = useState(null)
  const [tags, setTags] = useState(null)
 

  const [imgProgress, setImgProgress] = useState(0)
  const [videoProgress, setVideoProgress] = useState(0)


  const [imgUrl, setImgUrl] = useState(null)
  const [videoUrl, setVideoUrl] = useState(null)

  const navigate = useNavigate()

  const imgUpload = useUpload(img, setImgProgress, setImgUrl)
  const videoUpload = useUpload(video, setVideoProgress, setVideoUrl)


  
//thumbnail upload effect
useEffect(() => {
  if (img) {
    // uploadFiles(img, setImgProgress, setImgUrl)
    imgUpload()
  }
},[img])


//video upload effect
useEffect(() => {

  if (video) {
    // uploadFiles(video, setVideoProgress, setVideoUrl)
    videoUpload()
  }

},[video])



const uploadToServer = async (e) => {
  e.preventDefault()

  const creds = {
    title,
    desc,
    tags,
    imgUrl,
    videoUrl,
  }


  try {

    const res = await axios.post('/video/add', creds)
    

    setImg(null)
    setVideo(null)
  
  
    setTitle(null)
    setDesc(null)
    setTags(null)
   
  
    setImgProgress(0)
    setVideoProgress(0)
  
  
    setImgUrl(null)
    setVideoUrl(null)

    navigate(`/video/${res.data._id}`)

  } catch (error) {
    console.log(error);
  }

}



  

  return (
    <div className="modal fade" id="uploadModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Upload a new video</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">


        <form>
        <div className="mb-3">
        <label htmlFor="thumbnail" className="form-label">Thumbnail</label>
        <input type="file" className="form-control" id="thumbnail" accept="image/*"  onChange={e => setImg(e.target.files[0])}/>

        {
          imgProgress ? <div className="progress my-2">
          <div className="progress-bar" role="progressbar" style={{width: `${imgProgress}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div> : ''
        }

  </div>
  <div className="mb-3">
  <label htmlFor="video" className="form-label">Video</label>
    <input type="file" className="form-control" id="video" accept="video/*" onChange={e => setVideo(e.target.files[0])}/>

{
  videoProgress ? <div className="progress my-2">
  <div className="progress-bar" role="progressbar"  style={{width: `${videoProgress}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
</div> : ''
}
    

  </div>


  <div className="mb-3">
    <input type="text" className="form-control" placeholder="Title" onChange={e => setTitle(e.target.value)}/>
   
  </div>
  <div className="mb-3">
    <textarea className="form-control" placeholder="Description" rows="3"  onChange={e => setDesc(e.target.value)}></textarea>
  </div>

  <div className="mb-3">
    <input type="text" className="form-control" placeholder="Tags (,) separated"  onChange={e => setTags(e.target.value)}/>
  </div>
 
  <button type="submit" className="btn btn-primary" disabled={imgProgress === 100 && videoProgress === 100 ? false : true} onClick={uploadToServer}>Upload</button>
</form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" className="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default UploadModal