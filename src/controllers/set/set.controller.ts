import { Controller, Get } from '@nestjs/common';
import { PokemonTcgPocketApiService } from '../../services/pokemon-tcg-pocket-api/pokemon-tcg-pocket-api.service';
import { SetData } from '../../types/set';

@Controller('sets')
export class SetController {
  public constructor(
    private readonly pokemonService: PokemonTcgPocketApiService,
  ) {}

  @Get()
  public async getSets(): Promise<SetData[]> {
    return this.pokemonService.getSets();
  }
}
