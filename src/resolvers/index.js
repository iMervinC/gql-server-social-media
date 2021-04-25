import { getPosts, getPost, createPost, deletePost } from './posts.js'
import { register, login } from './users.js'

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
  },
}
export default resolvers
