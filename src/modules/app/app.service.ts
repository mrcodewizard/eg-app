import { Injectable } from '@nestjs/common';
import { config } from "dotenv";

@Injectable()
export class AppService {
  constructor() {}

  connectMongoDb() : any {
    const result = config();
    if(result.error) {
      throw result.error;
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
