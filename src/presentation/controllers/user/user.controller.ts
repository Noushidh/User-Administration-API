import { NextFunction, Request,Response } from "express";
import { makeCreateUserUserCase } from "../../../infrastructure/factories/create-user.factory";

export const register = async (req:Request, res:Response,next:NextFunction) => {
  try {
    const createUserUseCase =  makeCreateUserUserCase();
    const result  = await createUserUseCase.execute(req.body)
    return res.status(200).send({sucess:true,message:"user created successfully",result})
  } catch (error:any) {
    next(error)
  }
};
