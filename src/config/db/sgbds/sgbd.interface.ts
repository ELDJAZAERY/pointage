import { DBConfig } from "../../envs/envs.type";

export default interface ISgbd {
  connect(dbConfig: DBConfig): Promise<boolean>;
  success(): void;
  issue(err: string): void;
}
