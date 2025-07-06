import { stripe } from "../common/lib/stripe";
import { mapStripeProductToPlanEntity } from "./mappers/plan.mapper";

class StripePlansService {
  async findAll() {
    const productList = await stripe.products.list();
    return productList.data.map(mapStripeProductToPlanEntity);
  }
}

const stripePlansService = new StripePlansService();
export default stripePlansService;
