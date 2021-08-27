import mongoose from 'mongoose'
import { app } from './app';

const startServer = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT is not defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
  }
  
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    console.log('Connected to MongoDB');
  } catch(err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log(`Tickets: Listening on port 3000`);
  })
}

startServer();