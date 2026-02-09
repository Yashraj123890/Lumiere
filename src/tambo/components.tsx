
import { z } from "zod";

function GreetingCard({ name, message }: { name: string; message: string }) {
  return (
    <div className="greeting-card">
      <h3>Hello, {name}!</h3>
      <p>{message}</p>
    </div>
  );
}

export const components = [
  {
    name: "GreetingCard",
    description: "Displays a friendly greeting card to the user.",
    component: GreetingCard,
    propsSchema: z.object({
      name: z.string(),
      message: z.string(),
    }),
  },
];
