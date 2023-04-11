import { config } from "@/config/config";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

export function jwtGenerate(user: User) {
  const payload: Express.User = {
    id: user.id,
    rol: user.role!,
    name: user.name,
  };

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
     config.jwtSecret!,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}

export function jwtGenerateRefresh(user: User) {
  const payload: Express.User = {
    id: user.id,
    rol: user.role!,
    name: user.name,
  };

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
     config.jwtRefreshSecret!,
      {
        expiresIn: "2d",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}

export async function verifyToken(refreshToken:string) {
 const payload = jwt.verify(refreshToken,config.jwtRefreshSecret!)
 return payload
}