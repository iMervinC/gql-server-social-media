import Post from '../models/Post.js'

const getPosts = async () => {
  const posts = await Post.find({})
  return posts
}

const getPost = async (_, { postId }) => {
  try {
    const post = await Post.findById(postId)
    if (post) {
      return post
    } else {
      throw new Error('Post not found')
    }
  } catch (err) {
    throw new Error(err)
  }
}

const createPost = async () => {}
const deletePost = async () => {}

export { getPosts, getPost, deletePost, createPost }
