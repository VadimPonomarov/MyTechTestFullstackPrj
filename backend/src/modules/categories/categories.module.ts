import {
    forwardRef,
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod
} from '@nestjs/common';
import {CategoriesController} from './categories.controller';
import {CategoriesService} from './categories.service';
import {PrismaService} from "../../core/prisma.service";
import JwtProvider from "../users/auth/providers/jwt.provider";
import {
    GetUserIdFromTokenMidleware
} from "./middleware/getUserIdFromToken.midleware";
import {UsersModule} from "../users/users.module";
import {JwtService} from "@nestjs/jwt";
import {JwtAuthGuard} from "../users/auth/guards/auth.guard";

@Module({
    controllers: [CategoriesController],
    providers: [CategoriesService, PrismaService, JwtProvider, JwtService, JwtAuthGuard],
    imports: [forwardRef(() => UsersModule)]
})
export class CategoriesModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(GetUserIdFromTokenMidleware)
            .forRoutes(
                {path: 'categories', method: RequestMethod.POST},
                {path: 'categories', method: RequestMethod.GET},
            );
    }
}
