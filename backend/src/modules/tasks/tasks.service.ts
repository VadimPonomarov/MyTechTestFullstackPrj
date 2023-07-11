import {Injectable} from "@nestjs/common";
import {PrismaService} from "../../core/prisma.service";
import {Category, Task, User} from "@prisma/client";
import {CreateTaskDto} from "./dto/createTaskDto";
import {UpdateTaskDto} from "./dto/updateTaskDto";

@Injectable()
export class TasksService {
    constructor(private readonly prismaService: PrismaService) {
    }

    async getAll(): Promise<Partial<User & Category[] & Task[]>[]> {
        try {
            return await this.prismaService.user.findMany({
                select: {
                    id: true,
                    role: true,
                    email: true,
                    categories: {
                        include: {
                            tasks: true
                        }
                    }
                }
            });
        } catch (e) {
            throw new Error(e);
        }
    }

    async getAllByUserId(userId: string | number): Promise<Partial<User & Category[] & Task>[]> {
        try {
            return await this.prismaService.user.findMany({
                where: {id: +userId},
                select: {
                    email: true,
                    categories: {
                        include: {
                            tasks: true
                        }
                    }
                }
            });
        } catch (e) {
            throw new Error(e);
        }
    }

    async getAllByUserIdAndCategoryId(userId: string | number, categoryId: string | number): Promise<Partial<User & Category[] & Task>[]> {
        try {
            return await this.prismaService.user.findMany({
                where: {id: +userId},
                select: {
                    categories: {
                        where: {id: +categoryId},
                        include: {
                            tasks: true
                        }
                    }
                }
            });
        } catch (e) {
            throw new Error(e);
        }
    }

    async getAllByCategoryId(categoryId: string | number): Promise<Task[]> {
        try {
            return await this.prismaService.task.findMany({
                where: {categoryId: +categoryId}
            });
        } catch (e) {
            throw new Error(e);
        }
    }

    async create(data: CreateTaskDto): Promise<Task> {
        try {
            return await this.prismaService.task.create({data: {id: undefined, ...data}});
        } catch (e) {
            throw new Error(e);
        }
    }

    async update(id: string | number, data: UpdateTaskDto): Promise<Task> {
        try {
            await this.prismaService.task.findUniqueOrThrow({where: {id: +id}});
            return await this.prismaService.task.update({where: {id: +id}, data});
        } catch (e) {
            throw new Error(e);
        }
    }

    async delete(id: string | number): Promise<void> {
        try {
            await this.prismaService.task.findUniqueOrThrow({where: {id: +id}});
            await this.prismaService.task.delete({where: {id: +id}});
        } catch (e) {
            throw new Error(e);
        }
    }
}
