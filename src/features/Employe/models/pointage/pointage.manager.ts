import { Employe } from "../..";
import { isValidDate } from "../../../../utils";
import { IPagination } from "../entity.manager.interface";
import { IPointageCreatoinDTO } from "./interfaces";
import Pointage from "./pointage.entity";
import { IPointageManager } from "./pointage.manager.interface";

export default class PointageManager implements IPointageManager {

  create({ employe }: IPointageCreatoinDTO): Promise<Pointage> {
    const pointage: Pointage = new Pointage(employe);
    return pointage.save();
  }

  async list(filter: Record<string, any>): Promise<IPagination<Pointage>> {
    const { employeID, from, to, date, limit, page } = filter;

    const take = parseInt(limit);
    const skip = parseInt(page) * limit;

    let pointages = Pointage.createQueryBuilder("pointage")
      .leftJoinAndSelect("pointage.employe", "employe")
      .where("employe.id = :employeID", { employeID })
      .skip(skip ?? 0)
      .take(take ?? 0);

    if (isValidDate(from) && isValidDate(to)) {
      pointages = pointages.andWhere(
        `pointage."creationDate" BETWEEN :from AND :to`,
        { from: new Date(from), to: new Date(from) }
      );
    }

    if (isValidDate(date)) {
      pointages = pointages.andWhere(
        `DATE_TRUNC('day', "pointage."creationDate"") = :date`,
        {
          date: new Date(date).toISOString().split("T")[0],
        }
      );
    }

    const [items, count] = await pointages.getManyAndCount();

    let totalPages: number = Math.trunc(count / limit);
    totalPages = count % limit === 0 ? totalPages : totalPages + 1;

    return { items, count, page, totalPages };
  }

  async getLastCheckIn(employeID: string): Promise<Pointage | undefined> {
    let pointages: Pointage[] = await Pointage.createQueryBuilder("pointage")
      .leftJoinAndSelect("pointage.employe", "employe")
      .where("employe.id = :employeID", { employeID })
      .orderBy("employe.check_in", "DESC", "NULLS LAST")
      .take(1)
      .getMany();

    return pointages.length > 0 && !!pointages[0].check_in ? pointages[0] : undefined;
  }

  async getLastCheckOut(employeID: string): Promise<Pointage | undefined> {
    let pointages: Pointage[] = await Pointage.createQueryBuilder("pointage")
      .leftJoinAndSelect("pointage.employe", "employe")
      .where("employe.id = :employeID", { employeID })
      .orderBy("employe.check_out", "DESC", "NULLS LAST")
      .take(1)
      .getMany();

    return pointages.length > 0 && !!pointages[0].check_out ? pointages[0] : undefined;
  }

  find(filter: Record<string, any>): Promise<Pointage> {
    throw new Error("Method not implemented.");
  }
}
