import mongoose from 'mongoose'
import { app } from './app';

const startServer = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT is not defined');
  }
  
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    console.log('Connected to MongoDB');
  } catch(err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log(`Auth: Listening on port 3000`);
  })
}

startServer();