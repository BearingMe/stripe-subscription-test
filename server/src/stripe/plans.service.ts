import { stripe } from "../common/lib/stripe";
import { mapStripeProductToPlanEntity } from "./mappers/plan.mapper";

export class StripePlansService {
  async findAll() {
    const productList = await stripe.products.list();
    return productList.data.map(mapStripeProductToPlanEntity);
  }
}

const stripePlansServiceInjectable = new StripePlansService();
export default stripePlansServiceInjectable;
