import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export interface CreditCardInfo {
  id: string;
  brand: string;
  expMonth: number;
  expYear: number;
  last4: string;
}

export interface AppPaymentProps {
  onSubmit?: (card: CreditCardInfo) => void;
}

export function FormPayment(props: AppPaymentProps) {
  const { onSubmit } = props;

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error || !paymentMethod.card) return null;

    onSubmit?.({
      id: paymentMethod.id,
      brand: paymentMethod.card.brand,
      expMonth: paymentMethod.card.exp_month,
      expYear: paymentMethod.card.exp_year,
      last4: paymentMethod.card.last4,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Insira seus dados bancários</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="border rounded-sm shadow-sm p-4">
            <CardElement
              options={{
                hidePostalCode: true,
              }}
            />
          </div>

          <Button type="submit" className="w-min self-end">
            Próximo passo
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
