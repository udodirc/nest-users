import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './posts.model';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post) private postRepository: typeof Post,
        private fileService: FilesService
    ){}

    async create(createPostDto: CreatePostDto, image: any)
    {
        const fileName = await this.fileService.createFile(image);
        const post = this.postRepository.create({...createPostDto, image: fileName});
    
        return post;
    }
}
