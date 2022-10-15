import axios from 'axios'


const getVideos = async () => {

    const res = await axios.get('/videos/random')
    return res.data
}


export default { getVideos }