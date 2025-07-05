import { Router } from "express";
import plansService from "./plans.service";

const plans = Router();

plans.get("/", async (_, res) => {
  const plans = await plansService.findAll();
  res.json(plans);
});
