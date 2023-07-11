import {Injectable, NotAcceptableException} from "@nestjs/common";
import {PrismaService} from "../../core/prisma.service";
import {CreateCategoryDto} from "./dto/createCategory.dto";
import {Category, Task} from "@prisma/client";
import {UpdateCategoryDto} from "./dto/updateCategory.dto";

@Injectable()
export class CategoriesService {
    constructor(private readonly prismaService: PrismaService) {
    }

    async getAll(): Promise<Category[]> {
        try {
            return await this.prismaService.category.findMany();
        } catch (e) {
            throw new Error(e);
        }
    }

    async getById(id: string | number): Promise<Category> {
        try {
            await this.prismaService.category.findUniqueOrThrow({where: {id: +id}});
            return await this.prismaService.category.findUniqueOrThrow({
                where: {id: +id}
            });
        } catch (e) {
            throw new Error(e);
        }
    }

    async getAllByUserId_WithCountTasks(body: { userId: string | number }): Promise<unknown> {
        return this.prismaService.category.findMany({
            where: {userId: +body.userId},
            include: {
                _count: {
                    select: {tasks: true},
                },
            },

        });
    }

    async getAllByUserId(userId: string | number): Promise<Category[]> {
        try {
            await this.prismaService.category.findFirstOrThrow({where: {userId: +userId}});
            return await this.prismaService.category.findMany({where: {userId: +userId}});
        } catch (e) {
            throw new Error(e);
        }
    }

    async create(data: CreateCategoryDto): Promise<Category> {
        try {
            const isCategoryUserIdNotUnique = await this.prismaService.category.findFirst({
                where: {
                    name: data.name,
                    userId: data.userId
                }
            });
            if (isCategoryUserIdNotUnique) throw new NotAcceptableException();
            return await this.prismaService.category.create({data});
        } catch (e) {
            throw new Error(e);
        }
    }

    async update(id: string | number, data: UpdateCategoryDto): Promise<Category> {
        try {
            const category = await this.prismaService.category.findUniqueOrThrow({where: {id: +id}});
            return await this.prismaService.category.update({where: {id: +id}, data});
        } catch (e) {
            throw new Error(e);
        }
    }

    async delete(id: string | number): Promise<void> {
        try {
            await this.prismaService.category.findUniqueOrThrow({where: {id: +id}});
            await this.prismaService.category.delete({where: {id: +id}});
        } catch (e) {
            throw new Error(e);
        }
    }
}
