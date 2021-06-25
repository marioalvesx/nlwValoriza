import { getCustomRepository } from "typeorm"

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { UsersRepositories } from "../repositories/UsersRepositories"

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {

  async execute({email, password}: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);
    
    // verifica se email informado existe
    const user = await usersRepositories.findOne({
      email
    });

    if(!user) {
      throw new Error("Email/Password incorrect")
    }
    
    // após, verifica se senha está correta
    // compare checa a string da senha informada com a senha criptografada
    
    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      throw new Error("Email/Password incorrect")
    }

    // Por fim, gerar token
    const token = sign(
      {
        email: user.email
      }, "b632cf66cc10b298ed16a8b92fcc297f", // Colocar em uma variavel de ambiente
      { 
        subject : user.id,
        expiresIn: "1d"
      }
    );
    
    return token;
  };  
}

export { AuthenticateUserService }