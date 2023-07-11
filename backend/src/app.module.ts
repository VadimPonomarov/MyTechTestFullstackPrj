import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {UsersModule} from './modules/users/users.module';
import {CategoriesModule} from './modules/categories/categories.module';
import {TasksModule} from './modules/tasks/tasks.module';
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
    providers: [ConfigService],
})
export class AppModule {
}
