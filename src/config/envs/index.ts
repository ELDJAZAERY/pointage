import dotenv from "dotenv";
import IEnvs from "./envs.type";
dotenv.config();

export default (): IEnvs => ({
  db: {
    port: Number.parseInt(process.env.DB_PORT ?? "5432"),
    host: process.env.DB_HOST ?? "localhost",
    name: process.env.DB_NAME ?? "postgres",
    user: process.env.DB_USER ?? "postgres",
    password: process.env.DB_PASSWORD ?? "",
  },
  server: {
    port: Number.parseInt(process.env.PORT ?? "8080"),
  },
  nodeEnv: {
    NODE_ENV: process.env.NODE_ENV ?? "dev",
  },
});
