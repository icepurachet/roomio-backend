import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateOwnerDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6, { message: 'Password should be at least 6 characters long' })
    password: string
}