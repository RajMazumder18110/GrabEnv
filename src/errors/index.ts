/** @notice local imports */
import type { ValidationIssue } from "../@types/errors";

export class GrabEnvValidationError extends Error {
  issues: ValidationIssue[];

  /// Initialize the Error and the error name.
  constructor(issues: Record<string, string[]>) {
    super("Validation Failed");
    this.name = "GrabEnvValidationError";

    /// Initialize the issues.
    this.issues = Object.entries(issues).map(([environment, errors]) => ({
      errors,
      environment,
    }));

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GrabEnvValidationError);
    }
  }
}

export class GrabEnvInvalidTypeError extends GrabEnvValidationError {
  constructor(path: string) {
    super({
      [path]: [`Expected one of: "string", "number", "boolean"`],
    });
    this.name = "GrabEnvInvalidType";
  }
}
