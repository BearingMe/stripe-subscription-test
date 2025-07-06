import { Router } from "express";
import { tryParseAsync } from "../common/lib/validator";
import { createResponseList, createResponseObject } from "../common/utils/responses";
import { CreateUserSchema } from "../../../shared/schemas/create-user.schema";
import usersService from "./users.service";

const usersController = Router();

usersController.get("/", async (_, res) => {
  const users = await usersService.findAll();
  const response = createResponseList(users, users.length);
  res.json(response);
});

usersController.post("/", async (req, res) => {
  const payload = await tryParseAsync(CreateUserSchema, req.body);
  const newUser = await usersService.create(payload);
  const response = createResponseObject(newUser);

  res.status(201).json(response);
});

export default usersController;
