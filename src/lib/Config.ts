// lib/Config.ts
export class Config {
  // Define environment variables with types
  static GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID as string;
  static GOOGLE_CLIENT_SECRET: string = process.env
    .GOOGLE_CLIENT_SECRET as string;
  static DATABASE_URL: string = process.env.DATABASE_URL as string;

  // Optionally, add validation to ensure variables are defined
  static validateEnv() {}
}
