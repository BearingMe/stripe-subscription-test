import "./index.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./pages/home";

export interface CreateUser {
  name: string;
  email: string;
}

const stripePublicKey =
  "pk_test_51ReKoD4W6VeYsGFrcACXFJnYGFwchrvc3THTXMmyPwzDB0Rthlqjj4h0pC4MfUgFx8uROy06UcWtVeRAGBV0WXpt00AR8bjYm5";
const stripePromise = loadStripe(stripePublicKey);

const client = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={client}>
      <Elements stripe={stripePromise}>
        <Home />
      </Elements>
    </QueryClientProvider>
  );
}

export default App;
