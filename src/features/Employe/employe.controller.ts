import { Request, Response, Router } from "express";
import { Controller } from "../../shared";
import validationMiddleware from "../../middlewares/dataValidator";
import HttpStatusEnum from "../../shared/Enums/httpStatus.enum";
import { CreateEmployeDTO, EmployeService } from ".";
import Employe from "./models/employe/employe.entity";
import CheckInOutDTO from "./dto/checkin.dto";
import { IPagination } from "./models/entity.manager.interface";
import Pointage from "./models/pointage/pointage.entity";

/**
 *
 *
 * @_Employe_Controller
 *
 * Ce controleur est pour exposer les endpoint qui vont être consommés par le client final.
 * Aussi pour valider les donnes reçues, puis le rediriger vers le service concerné
 *
 */
class EmployeController implements Controller {
  path = "/employe";

  route = Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.route.post(
      "/",
      /**
       * @validationMiddleware
       *  c'est un Middleware permettant de valider les données transmises dans le request body
       *     le type du body doit être un @CheckInOutDTO
       */
      validationMiddleware(CreateEmployeDTO),
      this.createEmploye
    );

    this.route.get("/", this.listeEmployes);

    this.route.post(
      "/check-in",
      /**
       * @validationMiddleware
       *  c'est un Middleware permettant de valider les données transmises dans le request body
       *     le type du body doit être un @CheckInOutDTO
       */
      validationMiddleware(CheckInOutDTO),
      this.checkIn
    );

    this.route.post(
      "/check-out",
      /**
       * @validationMiddleware
       *  c'est un Middleware permettant de valider les données transmises dans le request body
       *     le type du body doit être un @CheckInOutDTO
       */
      validationMiddleware(CheckInOutDTO),
      this.checkOut
    );
  }

  async createEmploye(req: Request, res: Response): Promise<void> {
    const CreateEmployeDTO: CreateEmployeDTO = req.body;
    const employe: Employe = await EmployeService.createEmploye(
      CreateEmployeDTO
    );

    // si on arrive là, alors aucune exception a été generated
    res.status(HttpStatusEnum.CREATED).send({ employe });
  }

  async listeEmployes(req: Request, res: Response): Promise<void> {
    const emploies: IPagination<Employe> = await EmployeService.listeEmployes(
      req.query
    );

    // si on arrive là, alors aucune exception a été generée
    res.status(HttpStatusEnum.CREATED).send(emploies);
  }

  async checkIn(req: Request, res: Response): Promise<void> {
    const checkInOutDTO: CheckInOutDTO = req.body;
    const checkin: Pointage = await EmployeService.checkIn(checkInOutDTO);

    // si on arrive là, alors aucune exception a été generated
    res.status(HttpStatusEnum.CREATED).send({ checkin });
  }

  async checkOut(req: Request, res: Response): Promise<void> {
    const checkInOutDTO: CheckInOutDTO = req.body;
    const checkout: Pointage = await EmployeService.checkOut(checkInOutDTO);

    // si on arrive là, alors aucune exception a été generated
    res.status(HttpStatusEnum.CREATED).send({ checkout });
  }
}

export default EmployeController;
