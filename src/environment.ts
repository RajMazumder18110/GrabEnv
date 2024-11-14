/** @notice library imports */
import "dotenv/config";
import { z, type ZodTypeAny } from "zod";
/// Local imports
import type { Configs, OutputVariables } from "./@types/environment";
import { GrabEnvInvalidTypeError, GrabEnvValidationError } from "./errors";

export function grabEnv<T>(configs: Configs<T>): OutputVariables<T> {
  // Build the Zod schema dynamically based on the provided variable configurations
  const schema = Object.keys(configs).reduce((prevSchema, variableKey) => {
    let zodType: ZodTypeAny;
    const variable = configs[variableKey as keyof typeof configs];

    // Dynamically select the correct Zod type based on the variable's `type`
    switch (variable.type) {
      case "string":
        zodType = z.string();
        break;
      case "number":
        zodType = z.coerce.number();
        break;
      case "boolean":
        zodType = z.coerce.boolean();
        break;
      default:
        throw new GrabEnvInvalidTypeError(variable.type);
    }

    // Apply default value if provided
    if ("defaultValue" in variable) {
      zodType = zodType.default(variable.defaultValue);
    }

    // Attach the current validator to the schema
    prevSchema[variableKey] = zodType;
    return prevSchema;
  }, {} as Record<string, ZodTypeAny>);

  /// Include NODE_ENV
  const nodeEnvIncludedSchema = z.object({
    ...schema,
    NODE_ENV: z.enum(["development", "production"]).default("development"),
  });

  // Parse and check if it's valid else throw Error
  const parsedValues = nodeEnvIncludedSchema.safeParse(process.env);
  if (!parsedValues.success) {
    throw new GrabEnvValidationError(parsedValues.error.flatten().fieldErrors);
  }
  /// Return the validated environment variables with the inferred type
  return parsedValues.data as OutputVariables<T>;
}
