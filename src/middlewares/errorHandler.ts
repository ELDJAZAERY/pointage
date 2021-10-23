import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import HttpException from "../utils/exceptions/httpException";
import HttpStatusEnum from "../shared/Enums/httpStatus.enum";

/**
 *
 *  Error Handler Middleware
 *
 */
export default (
  err: HttpException,
  _req: Request,
  res: Response,
  // eslint-disable-next-line
  _next: NextFunction
): void => {
  logger.error(`Error : ${err?.message ?? err}`);
  res
    .status(err.status || HttpStatusEnum.INTERNAL_SERVER_ERROR)
    .send(err?.message ?? err);
};
