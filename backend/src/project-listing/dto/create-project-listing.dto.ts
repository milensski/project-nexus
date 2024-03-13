import { IsArray, IsEnum, IsNotEmpty, IsString, ValidateNested } from "class-validator";

enum Category {
    Backend = 'Backend',
    Frontend = 'Frontend',
    Fullstack = 'Fullstack',
  }

export class CreateProjectListingDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsEnum(['Backend', 'Frontend', 'Full-stack'])
    @IsNotEmpty()
    category: Category;


    techStackNames: string[];

    @IsString()
    @IsNotEmpty()
    ownerId: string;

    @IsArray()
    @IsNotEmpty()
    participantIds: string[];

}
