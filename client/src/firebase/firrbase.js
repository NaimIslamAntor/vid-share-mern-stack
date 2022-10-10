
import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyEAGB_Idlv9kvBtLYGJTFTI_K1CBCav0",
  authDomain: "vids-share-38954.firebaseapp.com",
  projectId: "vids-share-38954",
  storageBucket: "vids-share-38954.appspot.com",
  messagingSenderId: "586715247046",
  appId: "1:586715247046:web:16c7b31f910491ba84c2c7"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const googleAuth = new GoogleAuthProvider()

export default app