import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export interface FormCheckoutProps {
  onCheckout?: () => void;
}

export function FormCheckout(props: FormCheckoutProps) {
  const { onCheckout } = props;

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">
          Ultimate Unicorn Subscription
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="text-left space-y-4">
          <p className="text-gray-600">
            Welcome to the land of dreams! Join the Ultimate Unicorn
            Subscription and unlock the mysteries of the rainbow.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Daily sprinkles of magic</li>
            <li>Access to the secret unicorn council</li>
            <li>Exclusive discounts on enchanted goodies</li>
          </ul>
          <p className="text-purple-600 font-medium">
            Price: $19.99/month – Subscribe now and be fabulous!
          </p>
        </div>
        <Button className="w-min self-end" onClick={() => onCheckout()}>
          Pagar
        </Button>
      </CardContent>
    </Card>
  );
}
