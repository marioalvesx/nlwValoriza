import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { classToPlain } from "class-transformer";

class ListUserService {
  async execute(){
    const usersRepositories = getCustomRepository(UsersRepositories);
    // Busca o repositorio de usuarios 

    const users = await usersRepositories.find();
    // baseado nisso, busca no banco todos os usuarios

    return classToPlain(users);
    // retorna todos os usuarios;
    // Pronto, feito isso, só precisamos criar a Controller responsável por chamar esse service
  }
}

export { ListUserService }