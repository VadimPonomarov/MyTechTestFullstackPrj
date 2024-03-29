import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Res,
} from "@nestjs/common";
import {Response} from "express";
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/createUser.dto";
import {UpdateUserDto} from "./dto/updateUser.dto";

@Controller("users")
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @Get()
    async getAll(@Res() res: Response): Promise<void> {
        try {
            const result = await this.usersService.getAll();
            res.status(HttpStatus.OK).send({message: "Success", data: result});
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).send({
                message: "Failure",
                reason: e.message
            });
        }
    }

    @Get(":userId")
    async getById(@Param("userId") userId: string, @Res() res: Response): Promise<void> {
        try {
            const result = await this.usersService.getById(userId);
            res.status(HttpStatus.OK).send({message: "Success", data: result});
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).send({
                message: "Failure",
                reason: e.message
            });
        }
    }

    @Post()
    async create(@Body() body: CreateUserDto, @Res() res: Response): Promise<any> {
        try {
            const result = await this.usersService.create(body);
            res.status(HttpStatus.OK).send({message: "Success", data: result});
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).send({
                message: "Failure",
                reason: e.message
            });
        }
    }

    @Put(":userId")
    async update(@Param("userId") userId: string,
                 @Body() body: UpdateUserDto, @Res() res: Response): Promise<void> {
        try {
            const result = await this.usersService.update(userId, body);
            res.status(HttpStatus.OK).send({message: "Success", data: result});
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).send({
                message: "Failure",
                reason: e.message
            });
        }
    }

    @Delete(":userId")
    async delete(@Param("userId") userId: string, @Res() res: Response): Promise<void> {
        try {
            const result = await this.usersService.delete(userId);
            res.status(HttpStatus.OK).send({message: "Success", data: result});
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).send({
                message: "Failure",
                reason: e.message
            });
        }
    }
}
