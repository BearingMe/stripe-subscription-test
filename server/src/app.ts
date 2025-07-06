import { 
  USERS, 
  BILLING_CUSTOMERS, 
  BILLING_PAYMENT_METHODS, 
  BILLING_PLANS, 
  BILLING_SUBSCRIPTIONS 
} from "../../shared/constants/endpoints";
import express from "express";
import usersController from "./users/users.controller";
import cors from "cors";
import customersController from "./billing/customers/customers.controller";
import paymentMethodsController from "./billing/payment-methods/payment-methods.controller";
import plansController from "./billing/plans/plans.controller";
import subscriptionsController from "./billing/subscriptions/subscriptions.controller";

const app = express();

app.use(cors());
app.use(express.json());

// routers
app.use(USERS, usersController);
app.use(BILLING_CUSTOMERS, customersController);
app.use(BILLING_PAYMENT_METHODS, paymentMethodsController);
app.use(BILLING_PLANS, plansController);
app.use(BILLING_SUBSCRIPTIONS, subscriptionsController);

app.listen(3000, () => console.log("Listening at port 3000"));
