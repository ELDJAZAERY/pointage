import envs from "../config/envs";

export default {
  log: (msg: string): void => {
    envs()["nodeEnv"].NODE_ENV !== "prod" && console.log(msg);
  },
  warn: (msg: string): void => {
    envs()["nodeEnv"].NODE_ENV !== "prod" && console.warn(msg);
  },
  error: (msg: string): void => {
    envs()["nodeEnv"].NODE_ENV !== "prod" && console.error(msg);
  },
  debug: (msg: string): void => {
    envs()["nodeEnv"].NODE_ENV !== "prod" && console.debug(msg);
  },
};
