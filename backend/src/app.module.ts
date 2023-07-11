import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {UsersModule} from './modules/users/users.module';
import {CategoriesModule} from './modules/categories/categories.module';
import {TasksModule} from './modules/tasks/tasks.module';
import configuration from './config/configuration';
import {PrismaClient} from "@prisma/client";
import {JwtModule} from "@nestjs/jwt";
import {ScheduleModule} from "@nestjs/schedule";

@Module({
    imports: [
        ConfigModule.forRoot(),
        PrismaClient,
        JwtModule.register({}),
        ScheduleModule.forRoot(),
        UsersModule,
        CategoriesModule,
        TasksModule
    ],
    controllers: [AppController],
    providers: [AppService, ConfigService],
})
export class AppModule {
}
