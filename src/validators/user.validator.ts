import * as joi from "joi";

export const loginSchema  = joi.object({
   username: joi.string().min(6).required(),
   password: joi.string().min(6).required()
});

export const singupSchema  = joi.object({
   name: joi.string().required(),
   username: joi.string().min(6).required(),
   password: joi.string().min(6).required()
});