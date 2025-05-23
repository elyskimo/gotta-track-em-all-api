import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SetController } from './controllers/set/set.controller';
import { CardController } from './controllers/card/card.controller';
import { PokemonTcgPocketApiService } from './services/pokemon-tcg-pocket-api/pokemon-tcg-pocket-api.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    HttpModule,
  ],
  controllers: [AppController, SetController, CardController],
  providers: [AppService, PokemonTcgPocketApiService],
})
export class AppModule {}
