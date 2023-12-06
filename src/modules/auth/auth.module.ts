import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt/dist';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from '../../schemas/user.schema';
import { config } from 'dotenv';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: Math.floor(Date.now() / 1000) + 3600 }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
config();
