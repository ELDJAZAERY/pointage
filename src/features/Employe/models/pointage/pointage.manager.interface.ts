import { IEntityManager } from "../entity.manager.interface";
import Pointage from "./pointage.entity";

export interface IPointageManager extends IEntityManager<Pointage> {
  getLastCheckIn(employeID: string): Promise<Pointage | undefined>;
  getLastCheckOut(employeID: string): Promise<Pointage | undefined>;
}
