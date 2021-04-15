import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true, // 아무 decorator 도 없는 어떤 property의 object를 거름
    forbidNonWhitelisted: true, // 잘못된 property의 리퀘스트 자체를 막아버림
    transform: true, // 실제 원하는 타입으로 변경해줌
  }));
  await app.listen(3000);
}
bootstrap();
