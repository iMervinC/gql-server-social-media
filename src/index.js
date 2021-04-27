import { ApolloServer } from 'apollo-server'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import { typeDefs } from './schema.js'
import resolvers from './resolvers/index.js'

dotenv.config()

const server = new ApolloServer({
  introspection: true,
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
})

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`🍁 Connected to DB`)
    return server.listen({ port: process.env.PORT || 4000 })
  })
  .then((res) => {
    console.log(`
  🚀  Server is running!
  🔉  Listening on port ${res.port}
  📭  Query at https://studio.apollographql.com/dev
`)
  })
  .catch((err) => console.error(err))
