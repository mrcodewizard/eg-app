import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { config } from 'dotenv';
config();

@Module({
  imports: [
    AuthModule, 
    DashboardModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: Math.floor(Date.now() / 1000) + 3600 }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
