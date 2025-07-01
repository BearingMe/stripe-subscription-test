import { PrismaClient } from "../../generated/prisma";

// TODO: move it somewhere else
const prisma = new PrismaClient();

interface CreateUser {
  name: string;
  email: string;
}

// TODO: add error treatment 
export async function createUser(data: CreateUser) {
  const { name, email } = data;
  return prisma.user.create({ data: { name, email }})
}