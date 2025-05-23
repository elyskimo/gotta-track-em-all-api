import { Test, TestingModule } from '@nestjs/testing';
import { PokemonTcgPocketApiService } from './pokemon-tcg-pocket-api.service';

describe('PokemonTcgPocketApiService', () => {
  let service: PokemonTcgPocketApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonTcgPocketApiService],
    }).compile();

    service = module.get<PokemonTcgPocketApiService>(PokemonTcgPocketApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
