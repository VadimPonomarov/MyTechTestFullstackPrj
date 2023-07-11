import {JwtEnum} from "../../constants/user.enums";
import {IsNotEmpty, Matches} from 'class-validator'

export class RefreshTokenPairDto {
    @IsNotEmpty()
    @Matches(/REFRESH/, {message: `Valid JWT type is ${JwtEnum.REFRESH}`})
    type: JwtEnum;
    @IsNotEmpty()
    token: string;
}