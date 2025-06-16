import { ClientProxy } from '@nestjs/microservices';
import { Controller, Inject, Post } from '@nestjs/common';

@Controller('card-scanner')
export class CardScannerController {
  constructor(
    @Inject('CARD_SCANNER_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Post()
  public scanCards(): void {
    this.client
      .send({ cmd: 'scan-images' }, { images: ['1', '2', '3'] })
      .subscribe({
        next: (result) => {
          console.log(result);
        },
        error: (err) => {
          console.error('Error from microservice:', err);
        },
      });
  }

  @Post('test')
  public test(): void {
    this.client.send({ cmd: 'test' }, [1, 2, 3]).subscribe({
      next: (result) => {
        console.log(result);
      },
      error: (err) => {
        console.error('Error from microservice:', err);
      },
    });
  }
}
