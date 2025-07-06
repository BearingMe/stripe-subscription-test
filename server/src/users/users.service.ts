import type { User } from "../../../shared/entities/user.entity"
import type { CreateUserDTO } from "../../../shared/schemas/create-user.schema";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

class UsersService {
  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users.map((user) => ({
      uuid: user.uuid,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    }));
  }

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
