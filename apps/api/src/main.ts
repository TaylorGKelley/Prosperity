import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });
  app.enableCors({
    origin: '*', // TODO: change before deploying
    credentials: 'include',
  });

  await app.listen(process.env.PORT ?? 7701);
}
bootstrap();
