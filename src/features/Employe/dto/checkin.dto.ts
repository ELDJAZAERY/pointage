import { IsString, IsNotEmpty, IsUUID } from "class-validator";

export default class CheckInOutDTO {
  @IsUUID()
  employeID: string;

  @IsString()
  @IsNotEmpty()
  comment: string;
}
