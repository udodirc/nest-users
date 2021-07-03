import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from "./users.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService 
{
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private roleService: RolesService
    ) {}
    async createUser(CreateUserDto:CreateUserDto)
    {
        const user = await this.userRepository.create(CreateUserDto);
        const role = await this.roleService.getRoleByValue('admin');
        
        await user.$set('roles', [role])
        user.roles = [role];
        
        return user;
    }

    async getAllUsers()
    {
        const users = await this.userRepository.findAll({include:{all:true}});

        return users;
    }

    async getUserByEmail(email:string)
    {
        const user = await this.userRepository.findOne({ where: {email}, include: {all: true}});
        
        return user;
    }

    async addRole(AddRoleDto: AddRoleDto)
    {
        const user = await this.userRepository.findByPk(AddRoleDto.userId);
        const role = await this.roleService.getRoleByValue(AddRoleDto.value);
    
        if(role && user)
        {
            await user.$add('role', role)

            return AddRoleDto;
        }

        throw new HttpException('User or role is not found!', HttpStatus.NOT_FOUND)
    }

    async ban(BanUserDto: BanUserDto)
    {
        const user = await this.userRepository.findByPk(BanUserDto.userId);
        
        if(!user)
        {
            throw new HttpException('User is not found!', HttpStatus.NOT_FOUND)
        }

        user.banned = true;
        user.banReason = BanUserDto.banReason;
        await user.save();

        return user;
    }
}
