
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage"

import firebase from '../../firebase/firrbase'


const UploadModal = () => {
  return (
    <div className="modal fade" id="uploadModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Upload a new video</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">


        <form>
  <div class="mb-3">
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
   
  </div>
  <div class="mb-3">
   
    <input type="password" class="form-control" id="exampleInputPassword1"/>
  </div>
 
  <button type="submit" class="btn btn-primary">Submit</button>
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