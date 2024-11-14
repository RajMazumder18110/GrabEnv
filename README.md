# GrabEnv – Type-Safe Env Management

GrabEnv is a lightweight utility designed to simplify the validation, parsing, and management of environment variables in TypeScript applications. Combining `dotenv` for loading environment variables and `Zod` for schema-based validation, GrabEnv ensures robust and type-safe configuration, reducing the risk of errors from missing or mistyped variables.

## Features

- **Type-Safe Environment Variables**: Enforce strict type constraints on environment variables.
- **Schema-Based Validation**: Leverage `Zod` to validate each variable based on type.
- **Default Values for Optional Variables**: Assign default values to optional variables for stable configurations.
- **Automatic `.env` Loading**: Uses `dotenv` to load variables seamlessly from `.env` files.
- **Clear Error Handling**: Detailed error messages simplify troubleshooting.

## Installation

To get started, install `grabenv` using npm or yarn:

```bash
npm install grabenv
# or
yarn add grabenv
```

## Usage

Define your environment variables in a `.env` file:

```bash
### Optional ###
# PORT=3000
# ENABLE_LOGGING=true

### Mandatory ###
DATABASE_URL=my_database_url
```

**Configure and Use GrabEnv** in your `TypeScript/Javascript` application:

```typescript
import { grabEnvironments } from "grabenv";

/// Define the interface/type for your environment variables.
/// This interface dictates which variables are optional or mandatory,
/// providing a clear contract for configuration in your project.
type Environments = {
  /// Optional Environment Variables ///
  PORT?: number;
  ENABLE_LOGGING?: boolean;

  /// Mandatory Environment Variables ///
  DATABASE_URL: string;
};

/// Use `grabEnvironments` with type inference to ensure type safety.
/// By passing the `Environments` type as a generic, TypeScript enforces
/// type constraints on the configuration array, ensuring only valid
/// variable names and types are used.
const config = grabEnvironments<Environments>([
  /// Mandatory Variable ///
  { name: "DATABASE_URL", type: "string" },

  /// Optional Variables ///
  /// For optional keys, `defaultValue` is required to provide a fallback
  /// if the environment variable is not set. TypeScript will enforce this rule
  /// based on the `Environments` type definition.
  { name: "PORT", type: "number", defaultValue: 3000 },
  { name: "ENABLE_LOGGING", type: "boolean", defaultValue: true },
]);

/// Safely access validated and parsed environment variables.
/// TypeScript guarantees that these variables are correctly typed
/// and accessible as per the `Environments` type.
console.log(config.DATABASE_URL); // Access mandatory variable
console.log(config.PORT); // Access optional variable with default value if not set
console.log(config.ENABLE_LOGGING); // Access optional variable with default value if not set
```

## Why GrabEnv?

GrabEnv simplifies environment variable management, enhances type safety, and offers reliable configuration for TypeScript projects across any environment. With minimal dependencies, it’s an efficient addition to projects prioritizing stability and error-free configuration handling.
