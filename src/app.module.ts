import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SetController } from './controllers/set/set.controller';
import { CardController } from './controllers/card/card.controller';
import { PokemonTcgPocketApiService } from './services/pokemon-tcg-pocket-api/pokemon-tcg-pocket-api.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CardScannerController } from './controllers/card-scanner/card-scanner.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    HttpModule,
    ClientsModule.register([
      {
        name: 'CARD_SCANNER_SERVICE',
        transport: Transport.TCP,
        options: { port: 3001 },
      },
    ]),
  ],
  controllers: [
    AppController,
    SetController,
    CardController,
    CardScannerController,
  ],
  providers: [AppService, PokemonTcgPocketApiService],
})
export class AppModule {}
