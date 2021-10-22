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
    const { search, from, to, date, limit, page } = filter;

    const take = parseInt(limit);
    const skip = parseInt(page) * limit;

    let emploies = Employe.createQueryBuilder("employe")
      .where("")
      .skip(skip ?? 0)
      .take(take ?? 0);

    if (search) {
      emploies = emploies.andWhere(
        `LOWER(employe.name) LIKE LOWER('%:search%') OR LOWER(article."firstName") LIKE LOWER('%:search%')`,
        { search }
      );
    }

    if (isValidDate(from) && isValidDate(to)) {
      emploies = emploies.andWhere(
        `employe."creationDate" BETWEEN :from AND :to`,
        { from: new Date(from), to: new Date(from) }
      );
    }

    if (isValidDate(date)) {
      emploies = emploies.andWhere(
        `DATE_TRUNC('day', "employe."creationDate"") = :date`,
        {
          date: new Date(date).toISOString().split("T")[0],
        }
      );
    }

    const [items, count] = await emploies.getManyAndCount();

    let totalPages: number = Math.trunc(count / limit);
    totalPages = count % limit === 0 ? totalPages : totalPages + 1;

    return { items, count, page, totalPages };
  }

  async find(filter: Record<string, any>): Promise<Employe> {
    const { employeID, search, from, to, date } = filter;

    let query = Employe.createQueryBuilder(
      "employe"
    ).where("employe.id = :employeID", { employeID });

    if (search) {
      query = query.andWhere(
        `LOWER(employe.name) LIKE LOWER('%:search%') OR LOWER(article."firstName") LIKE LOWER('%:search%')`,
        { search }
      );
    }

    if (isValidDate(from) && isValidDate(to)) {
      query = query.andWhere(`employe."creationDate" BETWEEN :from AND :to`, {
        from: new Date(from),
        to: new Date(from),
      });
    }

    if (isValidDate(date)) {
      query = query.andWhere(
        `DATE_TRUNC('day', "employe."creationDate"") = :date`,
        {
          date: new Date(date).toISOString().split("T")[0],
        }
      );
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
