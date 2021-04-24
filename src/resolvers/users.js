import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserInputError } from 'apollo-server'

import User from '../models/User.js'
import {
  validateRegisterInput,
  validateLoginInput,
} from '../utils/validators.js'

const register = async (
  _,
  { registerInput: { username, email, password, confirmPassword } }
) => {
  const { valid, errors } = validateRegisterInput(
    username,
    email,
    password,
    confirmPassword
  )
  if (!valid) {
    throw new UserInputError('Errors', { errors })
  }

  const user = await User.findOne({ username })
  if (user) {
    throw new UserInputError('UserName is already taken', {
      errors: {
        username: 'This username is already taken',
      },
    })
  }

  password = await bcrypt.hash(password, 12)

  const newUser = new User({
    email,
    username,
    password,
    createdAt: new Date().toISOString(),
  })

  const res = await newUser.save()

  const token = jwt.sign(
    {
      id: res.id,
      email: res.email,
      username: res.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )

  return {
    ...res._doc,
    id: res._id,
    token,
  }
}

const login = async (_, { username, password }) => {
  const { errors, valid } = validateLoginInput(username, password)
  if (!valid) {
  }
}

export { register, login }
