import { CreateEmployeDTO } from ".";
import HttpStatusEnum from "../../shared/Enums/httpStatus.enum";
import HttpException from "../../utils/exceptions/httpException";
import CheckInOutDTO from "./dto/checkin.dto";
import Employe from "./models/employe/employe.entity";
import EmployeManager from "./models/employe/employe.manager";
import { IPagination } from "./models/entity.manager.interface";
import Pointage from "./models/pointage/pointage.entity";
import PointageManager from "./models/pointage/pointage.manager";

/**
 *
 *
 * @Employe_Service
 *
 * Represente notre couche métier de l'Employeés
 *
 *  - Elle se charge de récupérer, à partir des différences sources de données ( client / DB ),
 *      les données nécessaires pour assure les traitement métiers.
 *
 */
export default class EmployeService {
  static employeManager: EmployeManager = new EmployeManager();
  static pointageManager: PointageManager = new PointageManager();

  static createEmploye = (
    createEmployeDTO: CreateEmployeDTO
  ): Promise<Employe> => {
    return EmployeService.employeManager.create(createEmployeDTO);
  };

  static listeEmployes = (
    filter: Record<string, any>
  ): Promise<IPagination<Employe>> => {
    return EmployeService.employeManager.list(filter);
  };

  static listEmployePointages = (
    filter: Record<string, any>
  ): Promise<IPagination<Pointage>> => {
    return EmployeService.pointageManager.list(filter);
  };

  static checkIn = async (checkInOutDTO: CheckInOutDTO): Promise<Pointage> => {
    const { comment, employeID } = checkInOutDTO;

    try {
      const employe = await EmployeService.employeManager.find({ employeID });

      const lastCheckin = await EmployeService.pointageManager.getLastCheckIn(
        employe.id
      );

      /**
       * souvent, le pointage sera marqué 2 fois de suite, par erreur
       *   c'arrive que le pointeuse elle mem buger, ou on bouge la carte au moment du lecture
       *
       * donc on ignore tt nouvelle lecture pendant une minute
       */
      const beforInstante = new Date();
      beforInstante.setMinutes(beforInstante.getMinutes() - 1);

      if (lastCheckin?.check_in && lastCheckin.check_in >= beforInstante)
        return lastCheckin;

      const pointage = await EmployeService.pointageManager.create({ employe });

      return pointage.checkIn(comment);
    } catch (err: any) {
      return Promise.reject(
        new HttpException(
          err?.status ?? HttpStatusEnum.BAD_REQUEST,
          err?.message ?? "une erreur inattendue s'est produite"
        )
      );
    }
  };

  static checkOut = async (checkInOutDTO: CheckInOutDTO): Promise<Pointage> => {
    const { comment, employeID } = checkInOutDTO;

    try {
      const employe = await EmployeService.employeManager.find({ employeID });

      const lastCheckOut = await EmployeService.pointageManager.getLastCheckOut(
        employe.id
      );

      /**
       * souvent, le pointage sera marqué 2 fois de suite, par erreur
       *   c'arrive que le pointeuse elle mem buger, ou on bouge la carte au moment du lecture
       *
       * donc on ignore tt nouvelle lecture pendant une minute
       */
      const beforInstante = new Date();
      beforInstante.setMinutes(beforInstante.getMinutes() - 1);

      if (lastCheckOut?.check_in && lastCheckOut.check_in >= beforInstante)
        return lastCheckOut;

      const lastCheckin = await EmployeService.pointageManager.getLastCheckIn(
        employe.id
      );

      if (!lastCheckin || (lastCheckin && !!lastCheckin.check_out)) {
        /**
         * l'employe essaie de marquer son départ,
         *  et qu'il a oublié de se checker-in
         *
         *  - on va cree un Pointage object avec seulement le checkout date, la duration sera indeterminé
         */

        const pointage = await EmployeService.pointageManager.create({
          employe,
        });
        return pointage.checkOut(comment);
      }

      return lastCheckin.checkOut(comment);
    } catch (err: any) {
      return Promise.reject(
        new HttpException(
          err?.status ?? HttpStatusEnum.BAD_REQUEST,
          err?.message ?? "une erreur inattendue s'est produite"
        )
      );
    }
  };
}
