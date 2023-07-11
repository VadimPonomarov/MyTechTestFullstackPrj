import {PickType} from "@nestjs/mapped-types";
import {CreateCategoryDto} from "./createCategory.dto";

export class UpdateCategoryDto extends PickType(CreateCategoryDto, ['name']) {
}