import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";

export interface CreateUser {
  name: string;
  email: string;
}

export interface AppFormProps {
  onSubmit?: (d: CreateUser) => void;
}

export function FormUser(props: AppFormProps) {
  const { onSubmit } = props;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    onSubmit?.({
      email: form.get("email") as string,
      name: form.get("email") as string,
    });
  }

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Criação de usuário</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-6" onSubmit={(f) => handleSubmit(f)}>
          <Input
            name="name"
            placeholder="Insira seu nome"
            required
            minLength={3}
          />
          <Input
            name="email"
            placeholder="Insira seu email"
            required
            type="email"
          />

          <Button> Criar cliente </Button>
        </form>
      </CardContent>
    </Card>
  );
}
