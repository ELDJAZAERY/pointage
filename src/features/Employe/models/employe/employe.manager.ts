import Employe from "./employe.entity";
import { CreateEmployeDTO } from "../..";
import HttpException from "../../../../utils/exceptions/httpException";
import HttpStatusEnum from "../../../../shared/Enums/httpStatus.enum";
import { IEntityManager, IPagination } from "../entity.manager.interface";
import { isValidDate } from "../../../../utils";

export default class EmployeManager implements IEntityManager<Employe> {
  create(createEmployeDTO: CreateEmployeDTO): Promise<Employe> {
    try {
      let employe = new Employe(createEmployeDTO);

      return employe.save();
    } catch {
      return Promise.reject(
        new HttpException(
          HttpStatusEnum.BAD_REQUEST,
          "Une erreur s'est produite lors de la création d'Employe"
        )
      );
    }
  }

  async list(filter: Record<string, any>): Promise<IPagination<Employe>> {
    let { search, from, to, date, limit = 0, page = 1 } = filter;

    page = Math.max(parseInt(page), 1);

    const take = parseInt(limit);
    const skip = (page - 1) * take;

    let emploies = Employe.createQueryBuilder("employe")
      .where("")
      .skip(skip ?? 0)
      .take(take ?? 0);

    if (search) {
      emploies = emploies.andWhere(
        `LOWER(employe.name) LIKE LOWER('%${search}%') OR LOWER(employe."firstName") LIKE LOWER('%${search}%')`
      );
    }

    if (isValidDate(from) && isValidDate(to)) {
      emploies = emploies.andWhere(
        `employe."creationDate" BETWEEN :from AND :to`,
        { from: new Date(from), to: new Date(to) }
      );
    }

    if (isValidDate(date)) {
      const cdate = new Date(date).toISOString().split("T")[0];
      emploies = emploies.andWhere(
        `employe."creationDate"::text LIKE '${cdate}%'`
      );
    }

    const [items, count] = await emploies.getManyAndCount();

    let totalPages: number = !!limit ? Math.trunc(count / limit) : 0;
    totalPages = !!limit && count % limit === 0 ? totalPages : totalPages + 1;

    return { items, count, page, totalPages };
  }

  async find(filter: Record<string, any>): Promise<Employe> {
    const { employeID, search, from, to, date } = filter;

    let query = Employe.createQueryBuilder("employe").where("");

    if (employeID) {
      query = query.andWhere("employe.id = :employeID", { employeID });
    }

    if (search) {
      query = query.andWhere(
        `LOWER(employe.name) LIKE LOWER('%:search%') OR LOWER(article."firstName") LIKE LOWER('%:search%')`,
        { search }
      );
    }

    if (isValidDate(from) && isValidDate(to)) {
      query = query.andWhere(`employe."creationDate" BETWEEN :from AND :to`, {
        from: new Date(from),
        to: new Date(to),
      });
    }

    if (isValidDate(date)) {
      const cdate = new Date(date).toISOString().split("T")[0];
      query = query.andWhere(`employe."creationDate"::text LIKE '${cdate}%'`);
    }

    try {
      const employe = await query.getOneOrFail();

      return employe;
    } catch {
      return Promise.reject(
        new HttpException(
          HttpStatusEnum.BAD_REQUEST,
          "Une erreur s'est produite, l'Employe n'exist pas"
        )
      );
    }
  }
}
