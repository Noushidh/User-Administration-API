import { Request,Response } from "express";

export const register = async (req:Request, res:Response) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
  } catch (error) {
    
  }
};
