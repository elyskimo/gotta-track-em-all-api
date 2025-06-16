import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { CardScannerController } from './card-scanner.controller';

@Module({
  controllers: [CardScannerController],
  imports: [
    ClientsModule.register([
      { name: 'CARD_SCANNER_SERVICE', transport: Transport.TCP },
    ]),
  ],
})
export class CardScannerModule {}
