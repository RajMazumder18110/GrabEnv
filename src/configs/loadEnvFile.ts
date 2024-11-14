/** @notice library imports */
import path from "path";
import { config } from "dotenv";

/// Default to 'development' if NODE_ENV is not set
const NODE_ENV = process.env["NODE_ENV"] || "development";

/// Default to `.env`
let envFile = ".env";

/// Determine the file path based on NODE_ENV
if (NODE_ENV === "production") {
  envFile = ".env.production";
} else if (NODE_ENV === "development") {
  envFile = ".env.development";
}

/// Load the appropriate file
const result = config({
  path: path.resolve(process.cwd(), envFile),
});

/// If loading fails, fallback to `.env` (it is loaded by default)
if (result.error) {
  console.error(`Error loading .env file: ${result.error.message}`);
  console.log(`Falling back to .env`);
  /// Fallback to default .env
  config();
}
