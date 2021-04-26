import { AuthenticationError, UserInputError } from 'apollo-server-errors'
import Post from '../models/Post.js'
import { auth } from '../utils/auth.js'

const createComment = async (_, { postId, body }, context) => {
  const { username } = auth(context)
  if (body.trim() === '') {
    throw new UserInputError('Empty comment', {
      errors: {
        body: 'Comment must not be empty',
      },
    })
  }

  const post = await Post.findById(postId)
  if (post) {
    post.comments.unshift({
      body,
      username,
      createdAt: new Date().toISOString(),
    })
    await post.save()
    return post
  } else throw new UserInputError('Post not found')
}

const deleteComment = async (_, { postId, commentId }, context) => {
  const { username } = auth(context)

  const post = await Post.findById(postId)

  if (post) {
    const commentIndex = post.comments.findIndex((c) => c.id === commentId)

    if (commentIndex < 0) throw new UserInputError('Post not found')

    if (post.comments[commentIndex].username === username) {
      post.comments.splice(commentIndex, 1)

      await post.save()
      return post
    } else throw new AuthenticationError('Action not allowed')
  } else throw new UserInputError('Post not found')
}

export { createComment, deleteComment }
