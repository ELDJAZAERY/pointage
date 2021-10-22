import ISgbd from "./sgbds/sgbd.interface";

export default interface IDataBase {
  connect(sgbd: ISgbd): Promise<boolean>;
}
