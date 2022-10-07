import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = new Schema({
  name:  {
    type: String,
    required: true,
  },
  email:  {
    type: String,
    required: true,
    unique: true,
  },
  profileImage:{
    type: String,
  },

  followedBy:{
    type: Number,
    default: 0,
  },

  followers:{
    type: [String],
    default: []
  },
},
{
    timestamps: true
}
)


export default mongoose.model('users', userSchema)