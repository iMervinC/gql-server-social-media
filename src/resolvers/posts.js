import Post from '../models/Post.js'

const getPosts = async () => {
  try {
    const posts = await Post.find({})
    return posts
  } catch (err) {
    throw new Error(err)
  }
}

export { getPosts }
