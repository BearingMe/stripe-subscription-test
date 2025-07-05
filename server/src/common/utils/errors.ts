import { HttpError } from "../exceptions/HttpError";

export function isError(err: unknown): err is Error {
  return err instanceof Error;
}

export function isHttpError(err: unknown): err is HttpError {
  return err instanceof HttpError;
}

export function extractErrorMessage(err: unknown) {
  if (!isError(err)) return "Unknown error";
  return err.message;
}
