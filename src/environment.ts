/** @notice library imports */
import "dotenv/config";
import { z, ZodError, type ZodTypeAny } from "zod";
/// Local imports
import type { Configs, OutputVariables } from "./@types/environment";

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
        throw new Error(`[UNSUPPORTED_TYPE]: ${variable.type}`);
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

  try {
    // Parse and return the validated environment variables with the inferred type
    return nodeEnvIncludedSchema.parse(process.env) as OutputVariables<T>;
  } catch (error) {
    if (error instanceof ZodError) {
      console.error(
        "Environment variable validation error:",
        error.flatten().fieldErrors
      );
    }
    process.exit(1);
  }
}
