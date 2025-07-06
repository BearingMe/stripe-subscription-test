import { Router } from "express";
import { createResponseObject } from "../../common/utils/responses";
import { tryParseAsync } from "../../common/lib/validator";
import { CreateCustomerSchema } from "../../../../shared/schemas/create-customer.schema";
import customerService from "./customers.service";

const customersController = Router();

customersController.post("/", async (req, res) => {
  const payload = await tryParseAsync(CreateCustomerSchema, req.body);
  const newCustomer = customerService.create(payload);
  const response = createResponseObject(newCustomer);

  res.status(201).json(response);
});

export default customersController;
