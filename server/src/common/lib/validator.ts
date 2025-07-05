import z from "zod/v4";
import { HttpError } from "../exceptions/HttpError";

export function createZodObject<T extends object>(data: T) {
  return z.object(data);
}

export async function tryParseAsync<S extends z.ZodObject>(schema: S, data: unknown) {
  try {
    const parsedData = await z.parseAsync(schema, data);
    return parsedData;
  } catch (e) {
    if (e instanceof z.ZodError) {
      const formatted = e.issues.map((issue) => {
        const path = issue.path.join(".");
        return path ? `${path}: ${issue.message}` : issue.message;
      });

      const errorMessage = formatted.join("; ");
      throw new HttpError(`Validation failed: ${errorMessage}`, 403);
    }

    throw new HttpError("Unexpected parsing error", 500);
  }
}

export { z };
