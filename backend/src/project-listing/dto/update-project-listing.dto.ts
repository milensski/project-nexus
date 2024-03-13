import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectListingDto } from './create-project-listing.dto';

export class UpdateProjectListingDto extends PartialType(CreateProjectListingDto) {}
