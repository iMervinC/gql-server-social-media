import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserInputError } from 'apollo-server'

import User from '../models/User.js'
import {
  validateRegisterInput,
  validateLoginInput,
} from '../utils/validators.js'

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: '36h' }
  )
}

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

  const token = generateToken(res)

  return {
    ...res._doc,
    id: res._id,
    token,
  }
}

const login = async (_, { username, password }) => {
  const { errors, valid } = validateLoginInput(username, password)
  if (!valid) {
    throw new UserInputError('Errors', { errors })
  }

  const user = await User.findOne({ username })
  if (!user) {
    errors.general = 'User not found!'
    throw new UserInputError('User not found!', { errors })
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    errors.general = 'Wrong credentials'
    throw new UserInputError('Wrong credentials', { errors })
  }

  const token = generateToken(user)

  return {
    ...user._doc,
    id: user._id,
    token,
  }
}

export { register, login }
