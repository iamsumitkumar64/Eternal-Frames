import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    image_url?: string;

    @IsString()
    @IsOptional()
    location?: string;
}
