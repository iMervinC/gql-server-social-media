import mongoose from 'mongoose'

const userSchem = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  email: String,
  createdAt: String,
})

export default mongoose.model('User', userSchem, 'users')
