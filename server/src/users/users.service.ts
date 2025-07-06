import type { User } from "./user.entity";
import type { CreateUserDTO } from "./create-user.schema";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

class UsersService {
  async create(data: CreateUserDTO): Promise<User> {
    const { name, email } = data;
    const newUser = await prisma.user.create({ data: { name, email } });

    return {
      uuid: newUser.uuid,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
    };
  }
}

export default new UsersService();
