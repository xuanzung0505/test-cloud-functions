export class ErrorWithStatus {
  message: string;
  status: number;
  error?: string;

  constructor({
    message,
    status,
    error,
  }: {
    message: string;
    status: number;
    error?: string;
  }) {
    this.message = message;
    this.status = status;
    this.error = error;
  }
}
