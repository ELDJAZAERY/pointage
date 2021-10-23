import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as express from 'express';
import HttpStatusEnum from '../shared/Enums/httpStatus.enum';
import HttpException from '../utils/exceptions/httpException';

/**
 * Reauest body data validator
 * 
 * @param type // le type qui doit être respecter
 * 
 * @returns 
 *  Appelle le middleware suivat si les donnes sont valid
 *    sinon throw une exceptions - dans ce cas le prochain middleware est le ErroHandler
 */
// eslint-disable-next-line
function validationMiddleware(type: any): express.RequestHandler {
  return async (req, _res, next): Promise<void> => {
    const errors: ValidationError[] = await validate(
      plainToClass(type, req.body),
    );
    if (errors.length > 0) {
      const message = errors
        .map((error: ValidationError) => Object.values(error.constraints))
        .join(', ');
      next(new HttpException(HttpStatusEnum.BAD_REQUEST, message));
    } else {
      next();
    }
  };
}

export default validationMiddleware;
