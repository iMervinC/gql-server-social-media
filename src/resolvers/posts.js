import { AuthenticationError } from 'apollo-server'
import Post from '../models/Post.js'
import { auth } from '../utils/auth.js'

const getPosts = async () => {
  const posts = await Post.find({}).sort({ createdAt: -1 })
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

const createPost = async (_, { body }, context) => {
  const user = auth(context)

  const newPost = new Post({
    body,
    user: user.id,
    username: user.username,
    createdAt: new Date().toISOString(),
  })

  const post = await newPost.save()

  // context.pubsub.publish('NEW_POST', {
  //   newPost: post,
  // })

  return post
}

const deletePost = async (_, { postId }, context) => {
  const user = auth(context)

  try {
    const post = await Post.findById(postId)

    if (post.username === user.username) {
      await post.delete()
      return 'Post deleted'
    } else {
      throw new AuthenticationError("This is not your's to take away!")
    }
  } catch (err) {
    throw new Error('Post not found')
  }
}

export { getPosts, getPost, deletePost, createPost }
