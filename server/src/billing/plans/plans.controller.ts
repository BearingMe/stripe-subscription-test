import { Router } from "express";
import plansService from "./plans.service";

const plansController = Router();

plansController.get("/", async (_, res) => {
  const plans = await plansService.findAll();
  res.json(plans);
});

export default plansController;
