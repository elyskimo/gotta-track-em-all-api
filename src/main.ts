import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.connectMicroservice({
    transport: Transport.TCP,
    name: 'CARD_SCANNER_SERVICE',
    port: 3001,
    // noACK: false,
    // options: {
    //   urls: [`amqp://${rmqUser}:${rmqPassword}@127.0.0.1:5672`],
    //   queue: 'main_queue',
    //   queueOptions: {
    //     durable: false,
    //   },
    // },
  });
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
