import {Injectable, NestMiddleware} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import config from "../../../config/configuration";

@Injectable()
export class GetUserIdFromTokenMidleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) {
    }

    use(req: any, res: any, next: (error?: any) => void): any {
        const isBearer = req.headers.authorization;

        if (!isBearer || !isBearer.includes('Bearer')) return next();

        const _jwt: string = isBearer.split(' ')[1];

        const tokenPayloadData = this.jwtService.verify(_jwt, {
            secret: config().jwt.secret,
            ignoreExpiration: true
        })
        if (!tokenPayloadData) return next();
        req.body = {...req.body, userId: tokenPayloadData.id}
        next();
    }
}
