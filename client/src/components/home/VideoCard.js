import { Link } from 'react-router-dom'


const VideoCard = ({id, img, title}) => {
  return (
     <div className="col-lg-4 col-md-4 col-sm-12 col-12 my-2">
         <div className="card">
  <img src={img} className="card-img-top" alt={title} style={{height: "400px"}}/>
  <div className="card-body">
    <Link to={`/video/${id}`}><h5 className="card-title">{title}</h5></Link>
  </div>
</div>
     </div>
  )
}

export default VideoCard