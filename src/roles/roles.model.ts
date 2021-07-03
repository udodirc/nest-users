import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Table, Model, BelongsToMany } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttrs
{
    value:string,
    description:string
}

@Table({tableName:'roles'})
export class Role extends Model<Role, RoleCreationAttrs>
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
    @Column({
        type: DataType.STRING, 
        unique:true,
        allowNull:false
    })
    value:String;

    @ApiProperty({example: 'Administrator', description: 'Role description'})
    @Column({
        type: DataType.STRING, 
        allowNull:false
    })
    description:String;

    @BelongsToMany(() => User, () => UserRoles)
    users: User[];
    role: string | number | Model<any, any>;
}