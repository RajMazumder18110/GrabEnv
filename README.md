# GrabEnv – Type-Safe Env Management

GrabEnv is a lightweight utility designed to simplify the validation, parsing, and management of environment variables in TypeScript applications. Combining `dotenv` for loading environment variables and `Zod` for schema-based validation, GrabEnv ensures robust and type-safe configuration, reducing the risk of errors from missing or mistyped variables.

## Features

- **Type-Safe Environment Variables**: Enforce strict type constraints on environment variables.
- **Schema-Based Validation**: Leverage `Zod` to validate each variable based on type.
- **Default Values for Optional Variables**: Assign default values to optional variables for stable configurations.
- **Automatic `.env` Loading**: Uses `dotenv` to automatically load variables from `.env files`, with support for loading environment-specific files like `.env.development`, `.env.production` or `.env.test` based on the `NODE_ENV`.
- **Clear Error Handling**: Detailed error messages simplify troubleshooting.

## Loading Environment Variables

Based on the value of the `NODE_ENV` environment variable, the appropriate environment file will be loaded. The files are loaded in the following order:

- **For `NODE_ENV=production`**: Loads `.env.production`.
- **For `NODE_ENV=development`**: Loads `.env.development`.
- **For `NODE_ENV=test`**: Loads `.env.test`.
- **If `NODE_ENV` is not set or is set to any other value (e.g., `development`)**: Defaults to loading `.env`.

### File Loading Priority

1. `.env.production`: Used when `NODE_ENV=production`.
2. `.env.development`: Used when `NODE_ENV=development`.
3. `.env.test`: Used when `NODE_ENV=test`.
4. `.env`: Used as a fallback when no specific environment file is found or when `NODE_ENV` is not set.

## Installation

To get started, install `@rajmazumder/grabenv` using npm or yarn:

```bash
npm install @rajmazumder/grabenv
# or
yarn add @rajmazumder/grabenv
```

## Usage

Define your environment variables in a `.env` or `.env.x` file:

```bash
### Optional ###
# PORT=3000
# ENABLE_LOGGING=true

### Mandatory ###
DATABASE_URL=my_database_url
```

**Configure and Use GrabEnv** in your `TypeScript` application:

```typescript
import { grabEnv } from "@rajmazumder/grabenv";

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

/// Use `grabEnv` with type inference to ensure type safety.
/// By passing the `Environments` type as a generic, TypeScript enforces
/// type constraints on the configuration, ensuring only valid
/// variable names and types are used.
const config = grabEnv<Environments>({
  /// Mandatory Variable ///
  DATABASE_URL: {
    type: "string",
  },

  /// Optional Variables ///
  /// For optional keys, `defaultValue` is required to provide a fallback
  /// if the environment variable is not set. TypeScript will enforce this rule
  /// based on the `Environments` type definition.
  PORT: {
    type: "number",
    defaultValue: 3000,
  },
  ENABLE_LOGGING: {
    type: "boolean",
    defaultValue: true,
  },
});

/// Safely access validated and parsed environment variables.
/// TypeScript guarantees that these variables are correctly typed
/// and accessible as per the `Environments` type.
console.log(config.DATABASE_URL); // Access mandatory variable.
console.log(config.PORT); // Access optional variable with default value.
console.log(config.ENABLE_LOGGING); // Access optional variable with default value.
```

## Why GrabEnv?

`GrabEnv` simplifies environment variable management in TypeScript by providing type safety, dynamic loading of environment files, and easy configuration handling. It automatically loads the correct `.env` file based on `NODE_ENV`, with fallback to `.env` if no specific environment file is found. It supports optional environment variables with default values, custom error handling, and ensures type correctness using `zod` validation. This makes it easy to manage and validate configurations while reducing boilerplate code and potential errors.
