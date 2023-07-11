import { Injectable, NotAcceptableException } from "@nestjs/common";
import { PrismaService } from "../../core/prisma.service";
import { User } from "@prisma/client";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { hashSync } from "bcryptjs";
import config from "../../config/configuration";

@Injectable()
export class UsersService {

  constructor(private readonly prismaService: PrismaService
  ) {
  }

  async getAll(): Promise<Partial<User>[]> {
    try {
      return await this.prismaService.user.findMany({
        select: { id: true, email: true, role: true }
      });
    } catch (e) {
      throw new Error(e);

    }
  }

  async getById(id: string | number): Promise<Partial<User>> {
    try {
      await this.isDataExist("id", +id);
      return await this.prismaService.user.findUnique({
        where: { id: +id },
        select: { id: true, email: true, role: true }
      });
    } catch (e) {
      throw new Error(e);

    }
  }

  async create(data: CreateUserDto): Promise<Partial<User>> {
    try {
      const isEmailNotUnique = await this.prismaService.user.findUnique({
        where: { email: data.email }
      });
      if (isEmailNotUnique) throw new NotAcceptableException("Email is not unique");
      const hashed_password = hashSync(data.password, config().bcrypt.salt);
      return await this.prismaService.user.create({
        data: {
          ...data, password: hashed_password
        },
        select: { id: true, email: true, role: true }
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async update(id: string, data: UpdateUserDto): Promise<Partial<User>> {
    try {
      await this.prismaService.user.findUniqueOrThrow({ where: { id: +id } });
      return await this.prismaService.user.update({
          where: { id: +id },
          data,
          select: { id: true, email: true, role: true }
        }
      );
    } catch (e) {
      throw new Error(e);
    }
  }

  async delete(id: string | number): Promise<void> {
    try {
      await this.prismaService.user.findUniqueOrThrow({ where: { id: +id } });
      await this.prismaService.user.delete({ where: { id: +id } });
    } catch (e) {
      throw new Error(e);
    }
  }

  async isDataExist(field: keyof User, data: unknown): Promise<void> {
    try {
      await this.prismaService.user.findUniqueOrThrow({ where: { [field]: data } });
    } catch (e) {
      throw new Error(e);
    }
  }

}
