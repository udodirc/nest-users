import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController 
{
    constructor(private roleService: RolesService){}

    @Post()
    create(@Body() createRoleDto: CreateRoleDto)
    {
        return this.roleService.CreateRole(createRoleDto);
    }

    @Get('/:value')
    getByValue(@Param('value') value:string)
    {
        return this.roleService.getRoleByValue(value);
    }
}