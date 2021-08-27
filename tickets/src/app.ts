import express from 'express'
import cookieSession from 'cookie-session'
import 'express-async-errors'

import { errorHandler, NotFoundError } from '@bookitorg/common'

const app = express()

app.set('trust proxy', true);

app.use(express.json())
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'test',
}))

// Using routes


app.all('*', async (req, res) => {
  throw new NotFoundError('Page not found');
})

app.use(errorHandler);

export { app };