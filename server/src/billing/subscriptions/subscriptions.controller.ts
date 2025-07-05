import { Router } from "express";
import subscriptionsService from "./subscriptions.service";
import { createResponseObject } from "../../common/utils/responses";

const subscriptionsController = Router();

subscriptionsController.post("/", (req, res) => {
  const createdSubscription = subscriptionsService.create(req.body);
  const response = createResponseObject(createdSubscription);

  res.status(201).json(response);
});
