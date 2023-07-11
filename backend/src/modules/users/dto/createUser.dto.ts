import { IsEmail, IsEnum, IsNotEmpty, Matches } from "class-validator";
import { UserEnums } from "../constants/user.enums";

export class CreateUserDto {
  id?: number;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @Matches(/^[\d\w]{5,8}$/, {
    message: "Invalid password: The only string of digital or alpha symbols can be valid !!!. Min length 5 - max 8"
  })
  password: string;
  @IsNotEmpty()
  @IsEnum(UserEnums, { message: `Invalid role: Valid are: ${Object.keys(UserEnums).join(",")}` })
  role: UserEnums = UserEnums.USER;
}