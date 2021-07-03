import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {CreateRoleDto} from "./dto/create-role.dto";
import { Role } from './roles.model';

@Injectable()
export class RolesService 
{
    constructor(@InjectModel(Role) private roleRepository: typeof Role){}
    
    async CreateRole(CreateRoleDto: CreateRoleDto)
    {
        const role = this.roleRepository.create(CreateRoleDto);
    
        return role;
    }

    async getRoleByValue(value:string)
    {
        const role = this.roleRepository.findOne({where: {value} });
    
        return role;
    }
}
