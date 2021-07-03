import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdatedAt } from 'sequelize-typescript';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController 
{
    constructor(private postService:PostsService){}

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() createPostDto: CreatePostDto, @UploadedFile() image)
    {
        return this.postService.create(createPostDto, image);
    }
}
