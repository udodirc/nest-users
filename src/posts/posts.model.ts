import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Table, Model, BelongsTo, ForeignKey } from "sequelize-typescript";
import { User } from "src/users/users.model";

interface PostCreationAttrs
{
    title:string;
    content:string;
    userId:number;
    image:string;
}

@Table({tableName:'posts'})
export class Post extends Model<Post, PostCreationAttrs>
{
    @ApiProperty({example: 1, description: 'Unique id'})
    @Column({
        type: DataType.INTEGER, 
        unique:true, 
        autoIncrement:true,
        primaryKey:true
    })
    id: Number;

    @ApiProperty({example: 'Test', description: 'Post title'})
    @Column({
        type: DataType.STRING, 
        unique:true,
        allowNull:false
    })
    title:String;

    @ApiProperty({example: 'Test', description: 'Post content'})
    @Column({
        type: DataType.STRING, 
        allowNull:false
    })
    content:String;

    @ApiProperty({example: 'test.jpg', description: 'Post image'})
    @Column({
        type: DataType.STRING
    })
    image:String;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    userId: number;

    @BelongsTo(() => User)
    author: User;
}