import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  NatsContext,
  Payload,
} from '@nestjs/microservices';

@Controller()
export class CardScannerController {
  @MessagePattern({ cmd: 'scan-images' })
  public async scanImages(
    @Payload() data: { images: string[] },
  ): Promise<string> {
    console.log('📸 Received images:', data.images.length);

    // example: log base64 headers only
    data.images.forEach((img, idx) => {
      console.log(`Image ${idx + 1} starts with:`, img.slice(0, 30));
    });

    // Do something with the images (e.g., call Python lib here)

    return Promise.resolve(`${data.images.length} images processed.`);
  }

  @MessagePattern({ cmd: 'test' })
  accumulate(data: number[]): number {
    return (data || []).reduce((a, b) => a + b);
  }

  @MessagePattern('time.us.*')
  getDate(@Payload() data: number[], @Ctx() context: NatsContext) {
    console.log(`Subject: ${context.getSubject()}`); // e.g. "time.us.east"
    return new Date().toLocaleTimeString();
  }

  @MessagePattern({ cmd: 'test2' })
  scan(data: any) {
    console.log('🔍 Got data:', data);
    return { scanned: true };
  }
}
