import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { SetData } from '../../types/set';

@Injectable()
export class PokemonTcgPocketApiService {
  private baseUrl: string;

  public constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.baseUrl = this.configService.get<string>(
      'POKEMON_TCG_POCKET_API_URL',
    )!;
  }

  public async getSets(): Promise<SetData[]> {
    const url = `${this.baseUrl}/sets.json`;
    const { data } = await firstValueFrom(this.httpService.get<SetData[]>(url));

    return data;
  }
}
