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
app.use("/users", usersController);
app.use("/billing/customers", customersController);
app.use("/billing/payment-methods", paymentMethodsController);
app.use("/billing/plans", plansController);
app.use("/billing/subscriptions", subscriptionsController);

app.listen(3000, () => console.log("Listening at port 3000"));
