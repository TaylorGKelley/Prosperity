export class ValidationError extends Error {
  public errors: Record<string, string[]>;

  constructor(errors: Record<string, string[]>) {
    super("Validation error");
    Object.setPrototypeOf(this, ValidationError.prototype);

    this.name = "ValidationError";
    this.errors = errors;
  }
}
