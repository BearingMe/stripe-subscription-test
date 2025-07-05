import { Router } from "express";
import paymentMethodsService from "./payment-methods.service";
import { createResponseObject } from "../../common/utils/responses";

const paymentMethodsController = Router();

paymentMethodsController.post("/setup", async (req, res) => {
  const { customerId } = req.body;
  const clientSecret = paymentMethodsService.setup(customerId);
  const response = createResponseObject(clientSecret);

  res.status(201).json(response);
});
