import type { CreateUser } from "./types";
import { PrismaClient } from "../../generated/prisma";

// TODO: move it somewhere else
const prisma = new PrismaClient();

// TODO: add error treatment 
// TODO: create interface for return, so I can use select to filter out shit
export async function createUser(data: CreateUser) {
  const { name, email } = data;
  return prisma.user.create({ data: { name, email }})
}