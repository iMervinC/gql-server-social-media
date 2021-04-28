import { register, login } from './users.js'
import { getPosts, getPost, createPost, deletePost } from './posts.js'
import { createComment, deleteComment, likePost } from './comments.js'

const resolvers = {
  Query: {
    getPosts,
    getPost,
  },
  Mutation: {
    register,
    login,
    deletePost,
    createPost,
    createComment,
    deleteComment,
    likePost,
  },
}
export default resolvers
