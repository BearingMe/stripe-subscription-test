import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useSubscriptionPlans } from "@/api/queries";

export interface ClickProductPayload {
  productId: string;
  priceId: string;
}

export interface FormProductsProps {
  onSubmit?: (payload: ClickProductPayload) => void;
}

export function FormPlans(props: FormProductsProps) {
  const { onSubmit } = props;
  const plans = useSubscriptionPlans();

  if (plans.isLoading || plans.error) return;

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Planos de assinaturas</CardTitle>
      </CardHeader>

      <CardContent className="flex gap-2">
        {plans.data.data.data
          .filter((e) => e.active)
          .map((e) => (
            <Button
              key={e.id}
              className="flex-1"
              onClick={() =>
                onSubmit?.({
                  priceId: e.default_price,
                  productId: e.id,
                })
              }
            >
              {e.name}
            </Button>
          ))}
      </CardContent>
    </Card>
  );
}
