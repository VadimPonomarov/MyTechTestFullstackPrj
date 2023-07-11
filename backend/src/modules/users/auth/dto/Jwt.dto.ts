import {JwtEnum} from "../../constants/user.enums";
import {IsEnum, IsNotEmpty, IsString} from 'class-validator'

export class JwtDto {
    @IsEnum(JwtEnum, {message: `Valid types are ${Object.keys(JwtEnum).join(',')}`})
    @IsNotEmpty()
    type: JwtEnum;
    @IsNotEmpty()
    @IsString()
    token: string;

}