import { Controller, Post, Body, Get, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('Users')
@Controller('users')
export class UsersController 
{
    constructor(private userService: UsersService){} 

    @ApiOperation({summary: 'Get user list'})
    @ApiResponse({status: 200, type: [User]})
    @Roles("admin")
    @UseGuards(JwtAuthGuard)
    @UseGuards(RolesGuard)
    @Get()
    getAll()
    {
        return this.userService.getAllUsers();
    }

    @ApiOperation({summary: 'User create'})
    @ApiResponse({status: 200, type: User})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() CreateUserDto: CreateUserDto)
    {
        return this.userService.createUser(CreateUserDto);
    }

    @ApiOperation({summary: 'Set user role'})
    @ApiResponse({status: 200, type: [User]})
    @Roles("admin")
    @UseGuards(JwtAuthGuard)
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() AddRoleDto: AddRoleDto)
    {
        return this.userService.addRole(AddRoleDto);
    }

    @ApiOperation({summary: 'Ban user'})
    @ApiResponse({status: 200, type: [User]})
    @Roles("admin")
    @UseGuards(JwtAuthGuard)
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() BanUserDto: BanUserDto)
    {
        return this.userService.ban(BanUserDto);
    }
}

