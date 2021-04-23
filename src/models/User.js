import { Schema, model } from 'mongoose'

const userSchem = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
})

export default model('User', userSchem, 'users')
