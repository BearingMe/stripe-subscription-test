import { Router } from "express";
import { CreateUserSchema } from "./create-user.schema";
import { tryParseAsync } from "../common/lib/validator";
import { createResponseObject } from "../common/utils/responses";
import usersService from "./users.service";

const usersController = Router();

usersController.post("/", async (req, res) => {
  const payload = await tryParseAsync(CreateUserSchema, req.body);
  const newUser = await usersService.create(payload);
  const response = createResponseObject(newUser);

  res.status(201).json(response);
});

export default usersController;
