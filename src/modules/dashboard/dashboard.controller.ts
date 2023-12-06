import { Controller, Get, Req, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DashboardService } from './dashboard.service';
import { Request } from 'express';

@Controller('dashboard')
export class DashboardController {
  constructor(
   private readonly dashboardService: DashboardService, 
   private readonly jwtService: JwtService) {
  }

  @Get("/")
  async welcomeScreen(@Req() request: Request) {
      try {
        const cookie = request.cookies['jwt'];
        const data = await this.jwtService.verifyAsync(cookie);

        if (!data) {
          throw new UnauthorizedException();
        }

        return "Welcome to Easy Generator";
      } catch (e) {
            throw new UnauthorizedException();
      }
  }
}
