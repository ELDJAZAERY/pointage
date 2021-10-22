import { IsString, IsNotEmpty } from "class-validator";

export default class CreateEmployeDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  department: string;
}
