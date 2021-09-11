import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

const whitelist = ['http://localhost:3000'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: function (origin, callback) {
      callback(null, true);

      // if (whitelist.indexOf(origin) !== -1) {
      //   console.log('allowed cors for:', origin);
      //   callback(null, true);
      // } else {
      //   console.log('blocked cors for:', origin);
      //   callback(new Error('Not allowed by CORS'));
      // }
    },
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, Authorization',
    methods: 'GET,PUT,PATCH,POST,DELETE,UPDATE,OPTIONS',
    credentials: true,
  });

  await app.listen(3200);
}
bootstrap();
