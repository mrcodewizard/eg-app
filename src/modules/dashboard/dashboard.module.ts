import { Module } from '@nestjs/common';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from "../../schemas/user.schema";
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { config } from 'dotenv';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: Math.floor(Date.now() / 1000) + 3600 }
    })
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
config();
