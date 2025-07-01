import type { HttpError } from "../exceptions/HttpError";

export function createResponseObject<T>(data: T) {
  return { data };
}

export function createResponseList<T>(data: T[], total: number) {
  return { data, total };
}

export function createResponseError<T extends HttpError>(err: T) {
  return { error: err.message, status: err.status, cause: err.cause }
}