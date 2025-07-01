// routes/subscriptions.ts

import { Router } from 'express';
import {
  createSubscriptionCheckout,
  createSubscriptionCustomer,
  attachSubscriptionPaymentMethod,
  retrieveSubscriptionProducts,
} from './lib';

import type {
  CreateSubscriptionCheckout,
  CreateSubscriptionCustomer,
  AttachSubscriptionPaymentMethod,
} from './types';
import { createResponseObject } from '../common/utils/responses';

const subscriptions = Router();

subscriptions.get('/products', async (_req, res) => {
  const products = await retrieveSubscriptionProducts();
  const response = createResponseObject(products);

  res.status(200).json(response);
});


// TODO: add request body validation with Zod or Yup
subscriptions.post('/customer', async (req, res) => {
  const customerData = req.body as CreateSubscriptionCustomer;
  const customer = await createSubscriptionCustomer(customerData);
  res.status(201).json({ customer });
});

subscriptions.post('/customer/payment-method/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body as AttachSubscriptionPaymentMethod;

  const result = await attachSubscriptionPaymentMethod(id, data);
  res.status(200).json({ attached: result });
});

subscriptions.post('/checkout', async (req, res) => {
  const data = req.body as CreateSubscriptionCheckout;
  const subscription = await createSubscriptionCheckout(data);
  res.status(201).json({ subscription });
});

export default subscriptions;
