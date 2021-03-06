import express, { Request, Response } from 'express'
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';

import { validateRequest, BadRequestError } from '@bookitorg/common';

import { Password } from '../services/password';

const router = express.Router()

router.post('/api/users/login',
  [
    body('email')
      .isEmail()
      .withMessage('Inavlid email'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must enter a password')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError('Invalid credentials')
    }
    
    const passwordMatch = await Password.compare(existingUser.password, password);
    
    if (!passwordMatch) {
      throw new BadRequestError('Invalid credentials')
    }

    const userJWT = jwt.sign({ id: existingUser.id, email: existingUser.email }, process.env.JWT_KEY!)

    req.session = {
      jwt: userJWT
    };

    res.status(201).send(existingUser);
  }
)

export { router as loginRouter };