import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import config from '../../../config/configuration'
import {JwtPayloadDto} from "./dto/JwtPayload.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config().jwt.secret,
        });
    }

    async validate(payload: JwtPayloadDto) {
        return { id: payload.id, email: payload.email, role: payload.role };
    }
}