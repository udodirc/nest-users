import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length,IsEmail } from "class-validator";

export class CreateUserDto
{
    @ApiProperty({example: 'user@test.io', description: 'User email'})
    @IsString({message: 'Value must be string!'})
    @IsEmail({}, {message: "Incorrect email"})
    readonly email: string;
    
    @IsString({message: 'Value must be string!'})
    @Length(4, 16, {message: 'Value must be not lesser 4 and more 16!'})
    @ApiProperty({example: '123456', description: 'User password'})
    readonly password: string;
}