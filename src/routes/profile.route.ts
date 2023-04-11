import { profileServce } from "@/services";
import { NextFunction, Response, Router, Request } from "express";
import passport from "passport";

export const profileRoute = Router()

profileRoute.get("/",[passport.authenticate("jwt",{session:false})], async (req: Request, res: Response, next: NextFunction)=>{
    const {id,name,rol} = req.user!
    console.log(id,name,rol);
   const resp =  await profileServce.profile(id)
    try {
        res.json(resp)
    } catch (error) {
        next(error)
    }
})