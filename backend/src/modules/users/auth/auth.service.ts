import {
    Injectable,
    NotAcceptableException,
} from "@nestjs/common";
import {PrismaService} from "../../../core/prisma.service";
import JwtProvider from "./providers/jwt.provider";
import {JwtDto} from "./dto/Jwt.dto";
import {compare} from "bcryptjs";
import {JwtPayloadDto} from "./dto/JwtPayload.dto";
import {LogInDto} from "./dto/logIn.dto";
import {RefreshTokenPairDto} from "./dto/refreshTokenPair.dto";
import {JwtService} from "@nestjs/jwt";
import config from "../../../config/configuration";

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtProvider: JwtProvider,
        private readonly jwtService: JwtService
    ) {
    }


    async logIn(loginDto: LogInDto): Promise<JwtDto[]> {
        try {
            const _user =
                await this.prismaService.user.findUniqueOrThrow({
                    where: {email: loginDto.email}
                });

            const isValid =
                await compare(loginDto.password, _user.password);

            if (!isValid)
                throw new NotAcceptableException();

            const jwtPayload: JwtPayloadDto = {
                id: _user.id,
                email: _user.email,
                role: _user.role
            };

            return this.jwtProvider.getTokenPair(jwtPayload);

        } catch (e) {
            throw new Error(e);
        }
    }

    async refreshTokenPair(jwt: RefreshTokenPairDto): Promise<JwtDto[]> {
        try {
            const payLoadData =
                await this.jwtService.verify(jwt.token, {secret: config().jwt.secret})

            return this.jwtProvider.getTokenPair({
                id: payLoadData.id,
                email: payLoadData.email,
                role: payLoadData.role
            });

        } catch (e) {
            console.log(e)
        }
    }

}

