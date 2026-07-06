import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}
