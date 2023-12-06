import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
   @Prop({ required: false })
   name: string

   @Prop({ required: true, unique: true})
   username:string

   @Prop({ required: true, select: false})
   password: string

   @Prop() 
   token: string
}

export const UserSchema = SchemaFactory.createForClass(User);