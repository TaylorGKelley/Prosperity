import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });
  app.enableCors({
    origin: process.env.WEB_URL,
    credentials: true,
  });
  app.useGlobalGuards();

  await app.listen(process.env.PORT ?? 7701);
}
bootstrap();
