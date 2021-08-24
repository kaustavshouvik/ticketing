import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken';

import { BadRequestError } from '../errors/bad-request-error'

import { validateRequest } from '../middlewares/validate-request';

import { User } from '../models/user'

const router = express.Router()

router.post('/api/users/signup', [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters')
], validateRequest, async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new BadRequestError('Email is not available');
  }

  const newUser = User.build({ email, password })
  await newUser.save();

  // Genereate JWT
  const userJWT = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_KEY!)

  req.session = {
    jwt: userJWT
  };

  res.status(201).send(newUser);
})

export { router as signupRouter };