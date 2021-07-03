import { ApiProperty } from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class AddRoleDto {
    @ApiProperty({example: 'user@test.io', description: 'User email'})
    @IsString({message: "Должно быть строкой"})
    readonly value: string;
    
    @ApiProperty({example: '1', description: 'User id'})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly userId: number;
}