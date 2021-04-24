import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    body: String,
    username: String,
    comments: [
      {
        body: String,
        username: String,
        createdAt: String,
      },
    ],
    likes: [{ username: String, createdAt: String }],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    createdAt: String,
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Post', postSchema, 'posts')
