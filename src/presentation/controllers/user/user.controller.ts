import { NextFunction, Request,Response } from "express";
import { CreateUserUseCase } from "../../../application/use-cases/create-user-usecase";

export const register = async (req:Request, res:Response,next:NextFunction) => {
  try {
    const createUserUseCase = new CreateUserUseCase();
    const result  = await createUserUseCase.execute(req.body)
    return res.status(200).send({sucess:true,message:"adipoli",result})
  } catch (error:any) {
    next(error)
  }
};
