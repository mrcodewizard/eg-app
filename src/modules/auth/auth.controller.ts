import { Controller, Get, Post, Put, Delete, Req, Res, Body } from '@nestjs/common';
import { Request, Response } from "express";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { AuthInterface, LoginInterface } from '../../interfaces/auth.interface';
import { loginSchema, singupSchema } from '../../validators/user.validator';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService, 
    private readonly jwtService: JwtService) {
  }

  @Get("/login") 
  showLogin(): string {
    return this.authService.showLogin();
  }

  @Post("/login") 
  async submitLogin(@Body() user: LoginInterface, @Res({passthrough: true}) response: Response) {
    try {
      await loginSchema.validateAsync(user);
      const result = await this.authService.authenticate(user);
      const jwt = await this.jwtService.signAsync({id: result.username});
      response.cookie('jwt', jwt, { httpOnly: true});

      if(!result) {
        return {
          status: 404,
          msg: "Username or password is incorrect"
        };
      } else {
        response.redirect('/dashboard');
      }
    }
    catch(error) {
      console.error('Validation error:', error.details[0].message);
      return {
       status: 400,
       msg: `Error! ${error.details[0].message}`
      }
    }
  }

  @Post("/register")
  async register(@Body() user: AuthInterface) {
    try {
      await singupSchema.validateAsync(user);
      const response = await this.authService.register(user);
      if(!response) {
        return {
          status: 403,
          msg: "Unable to register user"
        };
      } else {
        return {
          status: 200,
          msg: "User registered succesfully",
          user: response
        }
      }
    }
    catch(error) {
      console.error('Validation error:', error.details[0].message);
      return {
       status: 400,
       msg: `Error! ${error.details[0].message}`
      }
    }
  }
}
