import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UseGuards
} from "@nestjs/common";
import JwtProvider from "../providers/jwt.provider";
import {PrismaService} from "../../../../core/prisma.service";
import {Reflector} from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwtProvider: JwtProvider,
        private prismaService: PrismaService,
    ) {
    }

    canActivate(context: ExecutionContext): boolean {
        try {
            /*const authRoles = this.reflector.get<string[]>(
                'roles',
                context.getHandler(),
            );

            if (!authRoles) return true;
            const request = context.switchToHttp().getRequest();
            const authorisationHeader = request.headers.authorization;

            const jwt = this.jwtProvider
                .getJwtFromRequest(authorisationHeader)

            const isJwtValid = await this.jwtProvider.getIsJwtValid(jwt)

            if (!isJwtValid) return false;*/

            return true /*!!authRoles.includes(isJwtValid.role)*/
        } catch (e) {
        }
    }
}