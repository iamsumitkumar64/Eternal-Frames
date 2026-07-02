import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateEventImageDto {
    @IsUUID()
    @IsNotEmpty()
    event_uuid: string;

    @IsString()
    @IsNotEmpty()
    tag_name: string;

    @IsString()
    image_url: string;
}
