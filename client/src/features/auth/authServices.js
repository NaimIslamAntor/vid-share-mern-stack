import axios from 'axios'


const userSignIn = async (creds) => {

    const res = await axios.post('/auth/signin', creds)

    localStorage.setItem('auth', JSON.stringify(res.data))

    return res.data
}


export default { userSignIn }