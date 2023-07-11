import {Body, Controller, HttpStatus, Post, Res} from '@nestjs/common';
import {LogInDto} from "./dto/logIn.dto";
import {Response} from "express";
import {AuthService} from "./auth.service";
import {RefreshTokenPairDto} from "./dto/refreshTokenPair.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('login')
    async login(@Body() body: LogInDto, @Res() res: Response): Promise<void> {
        try {
            const result = await this.authService.logIn(body)
            res.status(HttpStatus.OK).send({message: 'Success', data: result})
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).send({message: 'Failure', reason: e.message})
        }
    }

    @Post('refresh')
    async postRefresh(@Body() body: RefreshTokenPairDto, @Res() res: Response) {
        try {
            const result = await this.authService.refreshTokenPair(body);
            res.status(HttpStatus.OK).send({message: 'Success', data: result})
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).send({message: 'Failure', reason: e.message})
        }
    }

}
