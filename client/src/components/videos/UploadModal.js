import { useState, useEffect } from 'react'

import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage"

import firebase from '../../firebase/firrbase'


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



  const uploadFiles = (file, setProgress, setDownloadUrl) => {
    const storage = getStorage(firebase);

    const fileName = new Date().getTime() + file.name;


    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

    setProgress(progress)

    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
    console.log(error);
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);

      setDownloadUrl(downloadURL)
    });
  }
);

  }

//thumbnail upload effect
useEffect(() => {
  if (img) {
    uploadFiles(img, setImgProgress, setImgUrl)
  }
},[img])


//video upload effect
useEffect(() => {

  if (video) {
    uploadFiles(video, setVideoProgress, setVideoUrl)
  }

},[video])



  

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
 
  <button type="submit" className="btn btn-primary">Upload</button>
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