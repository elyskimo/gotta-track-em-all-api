import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { CardScannerModule } from './microservices/card-scanner/card-scanner.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CardScannerModule,
    {
      transport: Transport.TCP,
      options: { port: 3001 },
    },
  );
  await app.listen();
  console.log('✅ CardScanner microservice is running on port 3001');
}
void bootstrap();
