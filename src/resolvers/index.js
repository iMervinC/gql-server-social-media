import { getPosts } from './posts.js'
import { register, login } from './users.js'

const resolvers = {
  Query: {
    getPosts,
  },
  Mutation: {
    register,
    login,
  },
}
export default resolvers
