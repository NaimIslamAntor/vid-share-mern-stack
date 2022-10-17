import { useState, useEffect } from 'react'
import useUpload from '../../hooks/useUpload'

import axios from 'axios'

import { useParams } from 'react-router-dom'

const VideoEditModal = ({ thumbnail, title:exTitle, desc:exDesc, tags:exTags, setVideo }) => {

  const [img, setImg] = useState(null)
 
  const [title, setTitle] = useState(null)
  const [desc, setDesc] = useState(null)
  const [tags, setTags] = useState(null)
 
  const [imgProgress, setImgProgress] = useState(0)
  
  const [imgUrl, setImgUrl] = useState(null)

  const { id } = useParams()


  const upload = useUpload(img, setImgProgress, setImgUrl)


  useEffect(() => {
    setImgUrl(thumbnail)
      setTitle(exTitle)
      setDesc(exDesc)
      setTags(exTags)
  }, [])


  //thumbnail upload effect
useEffect(() => {
    if (img) {
      upload()
    }
  },[img])


  const editVideo = async (e) => {
    e.preventDefault()

    const creds ={
        imgUrl,
        title,
        desc,
        tags
    }

    try {
        const res = axios.put(`/video/s/${id}`, creds)
        setVideo(res.data)

        setImgUrl(thumbnail)
        setTitle(exTitle)
        setDesc(exDesc)
        setTags(exTags)


    } catch (error) {
        console.log(error)
    }
  }
  

 
  return (
    <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Edit</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">


        <form>
        <div className="mb-3">
        <label htmlFor="thumbnail" className="form-label">Thumbnail</label>
        <input type="file" className="form-control" id="thumbnail" accept="image/*"  onChange={e => setImg(e.target.files[0])}/>
        <img src={imgUrl} alt="thumbnail" className="py-3" style={{width: "100%", height: "300px"}}/>

        <h6 className="py-3">Leave the thumbnail empty if you dont wanna change the image</h6>



        {
          imgProgress ? <div className="progress my-2">
          <div className="progress-bar" role="progressbar" style={{width: `${imgProgress}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div> : ''
        }

  </div>
  


  <div className="mb-3">
    <input type="text" className="form-control" placeholder="Title" 
    onChange={e => setTitle(e.target.value)} value={title}/>
   
  </div>
  <div className="mb-3">
    <textarea className="form-control" placeholder="Description" rows="3"
      onChange={e => setDesc(e.target.value)} value={desc}></textarea>
  </div>

  <div className="mb-3">
    <input type="text" className="form-control"
     placeholder="Tags (,) separated"  onChange={e => setTags(e.target.value)} value={tags}/>
  </div>
 
  <button type="submit" className="btn btn-primary" onClick={editVideo}>Edit</button>
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

export default VideoEditModal