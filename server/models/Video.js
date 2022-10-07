import mongoose from 'mongoose'

const { Schema } = mongoose

const videoSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  title:  {
    type: String,
    required: true,
  },

  desc:  {
    type: String,
  },

  imgUrl:  {
    type: String,
    required: true,
  },
  videoUrl:{
    type: String,
    required: true,
  },


  tags:{
    type: [String],
    default: [],
  },


  likes:{
    type: [String],
    default: [],
  },

  views:{
    type: Number,
    default: 0,
  },

},
{
    timestamps: true
}
)


export default mongoose.model('videos', videoSchema)