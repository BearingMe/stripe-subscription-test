import type { CreateUser } from './types';
import { createUser } from './lib';
import { Router } from 'express';
import { createResponseObject } from '../common/utils/responses';

const users = Router();

// TODO: create an error treatment middleware
// TODO: validate request body (e.g. using Zod or Joi)
// FIX: handle case where createUser fails or returns null/undefined
users.post('/', async (req, res) => {
  const result = await createUser(req.body as CreateUser);
  const response = createResponseObject(result)

  res.status(201).json(response);
});

export default users;