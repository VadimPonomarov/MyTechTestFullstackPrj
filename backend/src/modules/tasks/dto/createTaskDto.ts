import {IsNotEmpty, IsString, IsInt, IsDate} from "class-validator";
import {Type} from "class-transformer";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsDate({message: 'Format data as yyyy-mm-dd'})
    @Type(() => Date)
    @IsNotEmpty()
    dateStart: Date;
    @IsDate({message: 'Format data as yyyy-mm-dd'})
    @Type(() => Date)
    @IsNotEmpty()
    dateEnd: Date;
    @IsString()
    description: string
    @IsInt()
    @IsNotEmpty()
    categoryId: number;
}