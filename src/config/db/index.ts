import IDataBase from "./db.interface";
import ISgbd from "./sgbds/sgbd.interface";
import { DBConfig } from "../envs/envs.type";
import envs from "../envs";


export default class DataBase implements IDataBase {
  private dbConfigs: DBConfig;

  constructor() {
    const dbConfigs: DBConfig = envs()["db"];
    this.dbConfigs = dbConfigs;
  }

  connect = async (sgbd: ISgbd): Promise<boolean> => {
    return sgbd.connect(this.dbConfigs);
  };
}
