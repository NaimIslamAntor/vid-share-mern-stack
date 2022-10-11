import { signInWithPopup } from "firebase/auth"
import { auth, googleAuth } from '../../firebase/firrbase'

import { useDispatch, useSelector } from 'react-redux'
import { signIn } from "../../features/auth/authSlice"


import UploadModal from "../videos/UploadModal"


const Navbar = () => {

  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

     //sign in with google with help of firebase
    const signinWithGoogle = async (e) => {
      e.preventDefault()

    
        try {
            
        const signin = await signInWithPopup(auth, googleAuth)
        const { displayName:name, email, photoURL:profileImage } = signin.user

        const creds = {
            name,
            email,
            profileImage,
        }

        dispatch(signIn(creds))

        } catch (error) {
            console.log(error)
        }
    }




  return (
    <>
    <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
  <div className="container">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">

        {
          user ? <>
        

         <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <img src={user.profileImage} alt={user.name} width={30} height={30} className="rounded-circle" />
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#uploadModal">Upload</a></li>
            <li><a className="dropdown-item" href="#">My videos</a></li>
            <li><a className="dropdown-item" href="#">Logout</a></li>
          
          </ul>
        </li>


          </> : <li className="nav-item">
          <a className="nav-link cursor-pointer" onClick={signinWithGoogle}>Sign in with google</a>
        </li>
        }
        

      </ul>
      
    </div>
  </div>
</nav>

<UploadModal/>
</>

  )
}

export default Navbar