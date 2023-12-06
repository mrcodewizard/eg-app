import { Injectable } from '@nestjs/common';
import { UserSchema, User } from '../../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as JWT from 'jsonwebtoken';
import { config } from "dotenv";

@Injectable()
export class AuthService {
   constructor(@InjectModel(User.name) private userModel : Model<User>) {
      const result = config();
      if(result.error) {
         throw result.error;
      }
   }

   showLogin(): string {
      return "Login page"
   }

   async authenticate(user): Promise<User| null > {
      try{
         const { username, password } = user;
         const result = await this.userModel.findOne({   
            $and: [
               { username: username },
               { password: password },
               // Add more conditions as needed
            ]
         });

         if(!result) return null;

         /** save token in the db **/
         const updated = await this.userModel.findByIdAndUpdate(result._id, result).select("-_id");
         return updated;
      }
      catch(error) {
         throw new Error('Login failed: ' + error.message);
      }
   }

   async register(user):  Promise<User>{
      try {
         /** check if a user is already register */
         const { username, password } = user;
         const result = await this.userModel.findOne({   
            $and: [
               { username: username },
               { password: password },
               // Add more conditions as needed
            ]
         });

         if(result) return null;
         const newUser = new this.userModel(user);
         const createdUser = await newUser.save();
         const outputUser = createdUser.toObject();
         delete outputUser._id;
         delete outputUser.password;
         return outputUser;
      } catch(error) {
         throw new Error('Validation failed: ' + error.message);
      }
   }
}
