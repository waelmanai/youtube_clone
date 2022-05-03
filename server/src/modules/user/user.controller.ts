import { Request, Response } from "express";
import StatusCodes from "http-status-codes";
import { createUser } from "./user.service";
import { RegisterUserSchema } from "./user.schema"

export async function registerUserHandler(req: Request<{},{},RegisterUserSchema>, res: Response) {
    
    const { username, email, password } = req.body;

    console.log(req.body);

    try{
        await createUser({username, email, password});
        return res.status(StatusCodes.CREATED).send("user created successfully");
    } catch(e){
        if(e.code === 11000){
            return res.status(StatusCodes.CONFLICT).send("user already exist")
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
    }

}