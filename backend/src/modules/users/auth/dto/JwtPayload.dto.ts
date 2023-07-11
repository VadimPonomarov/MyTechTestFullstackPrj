import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class JwtPayloadDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()

  role: string;
}