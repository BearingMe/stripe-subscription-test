import paymentMethodsService from "./payment-methods.service";
import { Router } from "express";
import { createResponseObject } from "../../common/utils/responses";
import { tryParseAsync } from "../../common/lib/validator";
import { SetupIntentSchema } from "./setup-intent.schema";

const paymentMethodsController = Router();

paymentMethodsController.post("/setup", async (req, res) => {
  const payload = await tryParseAsync(SetupIntentSchema, req.body);
  const clientSecret = await paymentMethodsService.setup(payload);
  const response = createResponseObject(clientSecret);

  res.status(201).json(response);
});

export default paymentMethodsController;
