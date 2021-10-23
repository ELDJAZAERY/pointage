import { IsString, IsUUID, IsOptional } from "class-validator";

export default class CheckInOutDTO {
  @IsUUID()
  employeID: string;

  @IsString()
  @IsOptional()
  comment?: string;
}
