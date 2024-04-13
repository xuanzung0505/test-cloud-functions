import { ErrorWithStatus } from "~/models/Errors";

export function isErrorWithStatus(error: any): error is ErrorWithStatus {
  return (
    typeof error === "object" &&
    error.status !== undefined &&
    error.message !== undefined
  );
}
