import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { findUserByEmail } from "../user/user.service";
import { signJwt } from "./auth.utils";
import omit from '../../helpers/omit';
import { LoginBody } from "./auth.schema";

export async function loginHandler(req: Request<{}, {}, LoginBody>, res: Response) {
    
    const { email, password } = req.body;

    // Find user by Email
    const user = await findUserByEmail(email);
    
    if(!user || !user.comparePassword(password)){
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .send("Invalid email or password");
    } 

    const payload = omit(user.toJSON(), ["password", "__v"]);

    const jwt = signJwt(payload);

    res.cookie("accessToken", jwt, {
        maxAge: 3.154e10, // 1 year
        httpOnly: true,
        domain: 'localhost', // in prod chage it
        path: '/',
        sameSite: 'strict',
        secure: false // in prod true
    });

    return res.status(StatusCodes.OK).send(jwt);


}