export interface DBConfig {
  port: number;
  host: string;
  name: string;
  user: string;
  password: string;
}

export interface ServerConfig {
  port: number;
}

export interface nodeEnvConfig {
  NODE_ENV: string;
}

export default interface IEnvs {
  db: DBConfig;
  server: ServerConfig;
  nodeEnv: nodeEnvConfig;
}
