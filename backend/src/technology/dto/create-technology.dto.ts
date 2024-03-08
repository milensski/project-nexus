import { IsNotEmpty } from "class-validator";

export class CreateTechnologyDto {

    @IsNotEmpty()
    technologyName: string;
}
