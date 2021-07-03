import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Table, Model, BelongsToMany, HasMany } from "sequelize-typescript";
import { Post } from "src/posts/posts.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttrs
{
    email:string,
    password:string
}

@Table({tableName:'users'})
export class User extends Model<User, UserCreationAttrs>
{
    @ApiProperty({example: 1, description: 'Unique id'})
    @Column({
        type: DataType.INTEGER, 
        unique:true, 
        autoIncrement:true,
        primaryKey:true
    })
    id: Number;

    @ApiProperty({example: 'user@test.io', description: 'User email'})
    @Column({
        type: DataType.STRING, 
        unique:true,
        allowNull:false
    })
    email:String;

    @ApiProperty({example: '123456', description: 'User password'})
    @Column({
        type: DataType.STRING, 
        allowNull:false
    })
    password:String;

    @ApiProperty({example: true, description: 'User ban'})
    @Column({
        type: DataType.BOOLEAN, 
        defaultValue:false
    })
    banned:boolean;

    @ApiProperty({example: 'Abuse', description: 'User ban reason'})
    @Column({
        type: DataType.STRING, 
        allowNull:true
    })
    banReason:String;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @HasMany(() => Post)
    posts: Post[];
}