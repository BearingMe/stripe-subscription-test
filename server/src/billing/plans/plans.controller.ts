import { Router } from "express";
import { createResponseList } from "../../common/utils/responses";
import plansService from "./plans.service";

const plansController = Router();

plansController.get("/", async (_, res) => {
  const plans = await plansService.findAll();
  const response = createResponseList(plans, plans.length);
  res.json(response);
});

export default plansController;
