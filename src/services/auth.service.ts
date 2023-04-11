import { PrismaClient, User } from "@prisma/client";
import { UserService } from "./user.service";
import { notFound, unauthorized } from "@hapi/boom";

import { LoginDto, RegisterDto } from "@/models/auth.model";
import { compare } from "bcrypt";
import { jwtGenerate, jwtGenerateRefresh, verifyToken } from "@/helpers/jwt-gemerate.helper";

export class AuthService {
    constructor(private orm:PrismaClient,private userSrv:UserService){}

    async register(data:RegisterDto){
     const newUserAuth =  await this.userSrv.create(data)

     const token = await jwtGenerate(newUserAuth)

     return token
    }

    async login(data:LoginDto) {

      const user =  await this.userSrv.findByEmail(data.email)

      if(!user) throw notFound(`Usuario no encontrado ${data.email}`)

      const passwordValid = await compare(data.password,user.password)

      if(!passwordValid) throw notFound(`Usuario no encontrado ${data.password}`)

      const token = await jwtGenerate(user)

      const refreshToken = await jwtGenerateRefresh(user)

      return {token,refreshToken}
    }

    async generateAccessTokenByRefreshToken(refreshToken:string){
      try {
        const payload = await verifyToken(refreshToken) as any
      
        const user = await this.orm.user.findUnique({where:{id:payload.id}})

        const newAcessToken = await jwtGenerate(user!)
        
        const newRefreshToken = await jwtGenerateRefresh(user!)

        return {newAcessToken,newRefreshToken}
      } catch (error) {
        unauthorized("Invalida")
      }
    }
 
  async isAvailable(email:string) {

    const user = await this.orm.user.findUnique({where:{email}})

    if(user) {
      return {isAvailable: false}
    }else {
      return {isAvailable: true}
    }
    
  }
}