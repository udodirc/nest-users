import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import {JwtService} from "@nestjs/jwt";
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model';
import { throwError } from 'rxjs';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ){}

    async login(userDto: CreateUserDto)
    {
        const user = await this.validateUser(userDto)
    
        return this.generateToken(user);
    }

    async registration(userDto: CreateUserDto)
    {   
        const candidate = this.userService.getUserByEmail(userDto.email);
        //console.log(candidate);
        /*if(candidate)
        {
            throw new HttpException('User email is exist', HttpStatus.BAD_REQUEST);
        }*/
        
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashPassword});
        
        return this.generateToken(user);
    }

    private async generateToken(user: User)
    {
        const payload = {email: user.email, id: user.id, roles: user.roles}
        const token = {
            token: this.jwtService.sign(payload)
        }
        console.log(token);
        return token;
    }

    private async validateUser(userDto: CreateUserDto)
    {
        const user = await this.userService.getUserByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        console.log(passwordEquals);
        if(user && passwordEquals)
        {   //console.log('Work!');
            return user;
        }

        throw new UnauthorizedException({message: 'Wrong email or password!'})
    }
}
