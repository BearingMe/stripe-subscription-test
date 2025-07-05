export function isError(err: unknown): err is Error {
  return err instanceof Error;
}

export function extractErrorMessage(err: unknown) {
  if (!isError(err)) return "Unknown error";
  return err.message;
}
