import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards} from "@nestjs/common";
import {TasksService} from "./tasks.service";
import {Response} from "express";
import {CreateTaskDto} from "./dto/createTaskDto";
import {UpdateCategoryDto} from "../categories/dto/updateCategory.dto";
import {UpdateTaskDto} from "./dto/updateTaskDto";
import {JwtAuthGuard} from "../users/auth/guards/auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("tasks")
export class TasksController {
    constructor(private readonly tasksService: TasksService) {
    }

    @Get()
    async getAll(@Res() res: Response): Promise<void> {
        try {
            const result = await this.tasksService.getAll();
            res.status(HttpStatus.OK).send({message: "Success", data: result});
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).send({message: "Failure", reason: e.message});
        }
    }

    @Post()
    async create(@Body() body: CreateTaskDto, @Res() res: Response): Promise<any> {
        try {
            const result = await this.tasksService.create(body);
            res.status(HttpStatus.OK).send({message: "Success", data: result});
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).send({message: "Failure", reason: e.message});
        }
    }

    @Put(":id")
    async update(@Param("id") id: string | number, @Body() body: UpdateTaskDto, @Res() res: Response): Promise<void> {
        try {
            const result = await this.tasksService.update(id, body);
            res.status(HttpStatus.OK).send({message: "Success", data: result});
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).send({message: "Failure", reason: e.message});
        }
    }

    @Get("user/:userId")
    async getAllByUserId(@Param("userId") userId: string | number, @Body() body: UpdateCategoryDto, @Res() res: Response): Promise<void> {
        try {
            const result = await this.tasksService.getAllByUserId(userId);
            res.status(HttpStatus.OK).send({message: "Success", data: result});
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).send({message: "Failure", reason: e.message});
        }
    }

    @Get("category/:categoryId")
    async getAllByCategoryId(@Param("categoryId") categoryId: string | number, @Res() res: Response): Promise<void> {
        try {
            const result = await this.tasksService.getAllByCategoryId(categoryId);
            res.status(HttpStatus.OK).send({message: "Success", data: result});
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).send({message: "Failure", reason: e.message});
        }
    }

    @Get("user/:userId/category/:categoryId")
    async getAllByUserIdAndCategoryId(@Param("userId") userId: string | number, @Param("categoryId") categoryId: string | number, @Body() body: UpdateCategoryDto, @Res() res: Response): Promise<void> {
        try {
            const result = await this.tasksService.getAllByUserIdAndCategoryId(userId, categoryId);
            res.status(HttpStatus.OK).send({message: "Success", data: result});
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).send({message: "Failure", reason: e.message});
        }
    }

    @Delete(":id")
    async delete(@Param("id") id: string | number, @Res() res: Response): Promise<void> {
        try {
            const result = await this.tasksService.delete(id);
            res.status(HttpStatus.OK).send({message: "Success", data: result});
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).send({message: "Failure", reason: e.message});
        }
    }
}
