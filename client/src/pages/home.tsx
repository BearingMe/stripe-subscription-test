import type { CreditCardInfo } from "@/components/FormPayment";
import type { ClickProductPayload } from "@/components/FormPlans";
import type { CreateUser } from "@/components/FormUser";
import { FormPayment } from "@/components/FormPayment";
import { FormPlans } from "@/components/FormPlans";
import { FormUser } from "@/components/FormUser";
import { FormCheckout } from "@/components/FormCheckout";
import { useState } from "react";
import {
  useCheckout,
  useCreateSubscriptionCustomer,
  useCreateUser,
} from "@/api/mutations";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

enum Steps {
  CREATE_USER = 0,
  SELECT_PLAN = 1,
  CREATE_PAYMENT_METHOD = 2,
  CHECKOUT = 3,
}

export function Home() {
  const [uuid, setUuid] = useState<string | null>();
  const [step, setStep] = useState<Steps>(Steps.CREATE_USER);

  const [stripeCustomerId, setStripeCustomerId] = useState<string | null>();
  const [stripePriceId, setStripePriceId] = useState<string | null>();
  const [stripePaymentMethodId, setStripePaymentMethodId] = useState<
    string | null
  >();

  const createUser = useCreateUser();
  const createSubscriptionCustomer = useCreateSubscriptionCustomer();
  const attachPaymentMethod = attachSubscriptionCustomerPaymentMethod();
  const checkout = useCheckout();

  const handleFormUserSubmit = async (c: CreateUser) => {
    try {
      await createUser.mutateAsync(
        {
          name: c.email,
          email: c.email,
        },
        {
          onSuccess: ({ data }) => {
            setUuid(data.uuid);
          },
          onError: () => alert("Error, unable to create user"),
        }
      );

      await createSubscriptionCustomer.mutateAsync(
        {
          email: c.email,
          name: c.name,
          uuid: uuid,
        },
        {
          onSuccess: ({ data }) => {
            setStripeCustomerId(data.id);
            setStep((v) => v + 1);
          },
          onError: () => alert("Error, unable to create customer"),
        }
      );
    } catch {}
  };

  const handleFormPlansSubmit = (p: ClickProductPayload) => {
    setStripePriceId(p.priceId);
    setStep((v) => v + 1);
  };

  const handleFormPaymentSubmit = (c: CreditCardInfo) => {
    setStripePaymentMethodId(c.id);

    attachPaymentMethod.mutate(
      {
        cardId: c.id,
        customerStripeId: stripeCustomerId,
      },
      {
        onError: () => console.log("Error: Unable to attach payment method"),
      }
    );

    setStep((v) => v + 1);
  };

  const handleFormCheckout = () => {
    checkout.mutate(
      {
        stripeCustomerId,
        stripePaymentId: stripePaymentMethodId,
        stripePriceId,
      },
      {
        onSuccess: ({ data }) => console.log(data),
        onError: () => alert("Error, unable to complete subscription"),
      }
    );
  };

  return (
    <div className="container mx-auto p-8 text-center relative z-10">
      {step === Steps.CREATE_USER && (
        <FormUser onSubmit={handleFormUserSubmit} />
      )}
      {step === Steps.SELECT_PLAN && (
        <FormPlans onSubmit={handleFormPlansSubmit} />
      )}
      {step === Steps.CREATE_PAYMENT_METHOD && (
        <FormPayment onSubmit={handleFormPaymentSubmit} />
      )}
      {step === Steps.CHECKOUT && (
        <FormCheckout onCheckout={handleFormCheckout} />
      )}
    </div>
  );
}

function attachSubscriptionCustomerPaymentMethod() {
  interface AttachPaymentMethod {
    cardId: string;
    customerStripeId: string;
  }

  return useMutation({
    mutationFn: async (data: AttachPaymentMethod) => {
      const { cardId, customerStripeId } = data;

      const url = `http://localhost:3000/subscriptions/customers/payment-method/${cardId}`;
      const response = await axios.post(url, { customerStripeId });
      return response.data;
    },
  });
}
