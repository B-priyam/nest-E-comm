import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from "cors"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({
    origin: '*', // Replace with your Next.js frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  await app.listen(3001);
}
bootstrap();
