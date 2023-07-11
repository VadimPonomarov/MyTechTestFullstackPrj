import {IsEmail, IsNotEmpty, Matches} from "class-validator";

export class LogInDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @Matches(/^[\d\w]{5,8}$/, {
        message: 'Invalid password: The only figure or alpha symbols can be used !!!. Min length 5 - max 8'
    })
    @IsNotEmpty()
    password: string;
}