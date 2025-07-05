import { Router } from "express";
import { createResponseObject } from "../../common/utils/responses";
import customerService from "./customers.service";

const customers = Router();

customers.post("/", async (req, res) => {
  // TODO: add zod validation
  const { customer } = req.body;
  const newCustomer = customerService.create(customer);
  const response = createResponseObject(newCustomer);

  res.status(201).json(response);
});

export default customers;
