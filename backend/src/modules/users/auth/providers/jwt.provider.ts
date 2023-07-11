import {JwtEnum} from "../../constants/user.enums";
import {JwtDto} from "../dto/Jwt.dto";
import config from "../../../../config/configuration";
import {JwtPayloadDto} from "../dto/JwtPayload.dto";
import {JwtService} from "@nestjs/jwt";
import {PrismaService} from "../../../../core/prisma.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export default class JwtProvider {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prismaService: PrismaService
    ) {
    }

    getJwt(type: JwtEnum, payLoad: JwtPayloadDto): JwtDto {
        try {
            const token = this.jwtService.sign(payLoad, {
                secret: config().jwt.secret,
                expiresIn: config().jwt.signOptions[type].expiresIn
            });
            this.registerToken({type, token})
            return {type, token};
        } catch (e) {
        }
    }

    getJwtFromRequestHeader(bearer: string): JwtDto {
        if (!bearer || !bearer.includes('Bearer')) return;
        return {type: JwtEnum.REFRESH, token: bearer.split(' ')[1]}
    }

    async getTokenPair(payLoad: JwtPayloadDto): Promise<JwtDto[]> {
        try {
            return [
                this.getJwt(JwtEnum.ACCESS, payLoad),
                this.getJwt(JwtEnum.REFRESH, payLoad)
            ];
        } catch (e) {
        }
    }

    async registerToken(jwt: JwtDto): Promise<void> {
        try {
            await this.prismaService.token.create({
                data: {
                    type: jwt.type,
                    token: jwt.token
                }
            });
        } catch (e) {
        }
    }
}
