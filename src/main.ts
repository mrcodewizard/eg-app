import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import * as mongoose from "mongoose";
import * as express from "express";
import * as cookieParser from "cookie-parser";
import { config } from 'dotenv';

async function bootstrap() {
  const result = config();
  if(result.error) {
    throw result.error;
  }
  
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true}));
  app.enableCors({
    origin: process.env.REACT_APP_URL,
    credentials: true
  });

  // Establish a connection to the MongoDB

  try {
    // Connect to the MongoDB cluster
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (e) {
    console.log("could not connect");
  }

  const connecion = mongoose.connection;
  connecion.on("error", (err) => console.log(`Connection error ${err}`));
  connecion.once("open", () => console.log("Connected to DB!"));
  

  const port = process.env.PORT || 8080 || 80;
  await app.listen(port)
    .then(res => console.log(`Server started on port ${port}`))
    .catch(err => console.log("Error" + err));

}
bootstrap();
