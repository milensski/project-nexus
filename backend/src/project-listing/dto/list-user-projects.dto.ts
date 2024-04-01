import { IsNotEmpty, IsString } from "class-validator";

export class ListUserProjectsDto {

    @IsString()
    @IsNotEmpty()
    userId: string;

}