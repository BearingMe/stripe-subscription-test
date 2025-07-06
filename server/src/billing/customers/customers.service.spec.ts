import type { StripeCustomerService } from "../../stripe/customers.service";
import { CustomerService } from "./customers.service";

describe("CustomerService", () => {
  let customerService: CustomerService;
  let mockStripeCustomerService: jest.Mocked<StripeCustomerService>;

  beforeEach(() => {
    mockStripeCustomerService = {
      create: jest.fn(),
    };

    customerService = new CustomerService(mockStripeCustomerService);
  });

  describe(".create", () => {
    it("should create a customer", async () => {
      const now = new Date();
      const initialPayload = {
        uuid: "test-uuid",
        name: "Test User",
        email: "test@example.com",
      };

      mockStripeCustomerService.create.mockResolvedValue({
        stripeId: "stripe_customer_id",
        systemEmail: initialPayload.email,
        systemName: initialPayload.name,
        metadata: {},
        createdAt: now,
      });

      const customer = await customerService.create(initialPayload);

      expect(mockStripeCustomerService.create).toHaveBeenCalled();
      expect(customer).toBeDefined();
      expect(customer.createdAt).toBe(now); // from stripe api
    });
  });
});
