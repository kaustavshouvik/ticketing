import express from 'express'
import cookieSession from 'cookie-session'
import 'express-async-errors'

import { signupRouter } from './routes/signup'
import { loginRouter } from './routes/login'
import { currentUserRouter } from './routes/current-user'
import { logoutRouter } from './routes/logout'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'

const app = express()

app.set('trust proxy', true);

app.use(express.json())
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'test',
}))

// Using routes
app.use(signupRouter)
app.use(loginRouter);
app.use(currentUserRouter);
app.use(logoutRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError('Page not found');
})

app.use(errorHandler);

export { app };