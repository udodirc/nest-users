import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Table, Model, BelongsToMany, ForeignKey } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Role } from "./roles.model";

@Table({tableName:'user_roles', createdAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles>
{
    @ApiProperty({example: 1, description: 'Unique id'})
    @Column({
        type: DataType.INTEGER, 
        unique:true, 
        autoIncrement:true,
        primaryKey:true
    })
    id: Number;

    @ApiProperty({example: 'admin', description: 'User role'})
    @ForeignKey(() => Role)
    @Column({
        type: DataType.INTEGER
    })
    roleId: Number;

    @ApiProperty({example: 'Administrator', description: 'Role description'})
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    userId: Number;
}