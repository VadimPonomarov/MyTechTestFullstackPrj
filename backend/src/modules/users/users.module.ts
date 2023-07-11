import {forwardRef, Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {PrismaService} from "../../core/prisma.service";
import {PrismaClient} from "@prisma/client";
import {AuthController} from './auth/auth.controller';
import {AuthService} from './auth/auth.service';
import {JwtService} from "@nestjs/jwt";
import JwtProvider from "./auth/providers/jwt.provider";
import {RolesGuard} from "./auth/guards/roles.guard";
import {JwtStrategy} from "./auth/jwt.strategy";
import {CategoriesModule} from "../categories/categories.module";

@Module({
    controllers: [UsersController, AuthController],
    providers: [UsersService, PrismaService, AuthService, JwtService, JwtProvider, RolesGuard, JwtStrategy],
    imports: [PrismaClient, forwardRef(() => CategoriesModule)],
    exports: [RolesGuard]
})
export class UsersModule {
}
