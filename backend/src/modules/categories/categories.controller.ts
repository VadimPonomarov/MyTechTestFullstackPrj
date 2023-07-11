import {
    Body,
    Controller,
    Delete,
    Get, HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    Res,
    UseGuards
} from "@nestjs/common";
import {CategoriesService} from "./categories.service";
import {Response} from "express";
import {CreateCategoryDto} from "./dto/createCategory.dto";
import {UpdateCategoryDto} from "./dto/updateCategory.dto";
import {JwtAuthGuard} from "../users/auth/guards/auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("categories")
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {
    }

    @Get()
    async getAll(@Body() body, @Res() res: Response): Promise<void> {
        try {
            const result = await this.categoriesService.getAllByUserId_WithCountTasks(body);
            res.status(HttpStatus.OK).send({message: "Success", data: result});
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).send({
                message: "Failure",
                reason: e.message
            });
        }
    }

    @Get("user/:userId")
    async getAllByUserId(@Param("userId") userId: string | number, @Res() res: Response): Promise<void> {
        try {
            const result = await this.categoriesService.getAllByUserId(userId);
            res.status(HttpStatus.OK).send({message: "Success", data: result});
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).send({
                message: "Failure",
                reason: e.message
            });
        }
    }

    @Get(":id")
    async getById(@Param("id") id: string | number, @Res() res: Response): Promise<void> {
        try {
            const result = await this.categoriesService.getById(id);
            res.status(HttpStatus.OK).send({message: "Success", data: result});
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).send({
                message: "Failure",
                reason: e.message
            });
        }
    }

    @Post()
    async create(@Body() body: CreateCategoryDto, @Res() res: Response): Promise<any> {
        try {
            const result = await this.categoriesService.create(body);
            res.status(HttpStatus.OK).send({message: "Success", data: result});
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).send({
                message: "Failure",
                reason: e.message
            });
        }
    }

    @Put(":id")
    async update(@Param("id") id: string | number, @Body() body: UpdateCategoryDto, @Res() res: Response): Promise<void> {
        try {
            const result = await this.categoriesService.update(id, body);
            res.status(HttpStatus.OK).send({message: "Success", data: result});
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).send({
                message: "Failure",
                reason: e.message
            });
        }
    }

    @Delete(":id")
    async delete(@Param("id") id: string, @Res() res: Response): Promise<void> {
        try {
            const result = await this.categoriesService.delete(id);
            res.status(HttpStatus.OK).send({message: "Success", data: result});
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).send({
                message: "Failure",
                reason: e.message
            });
        }
    }
}
