import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { UsersDto } from '../users/dto/users.dto';
import { ApiResponse, ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @ApiOperation({ summary: 'Iniciar sesión' })
    @ApiBody({ type: UsersDto })
    @ApiResponse({ status: 200, description: 'Iniciar sesión correctamente', type: UsersDto })
    @Post('login')
    signIn(@Body() signInDto: UsersDto) {
        return this.authService.signIn(signInDto);
    }

    @ApiOperation({ summary: 'Registrarse' })
    @ApiBody({ type: UsersDto })
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: 'Registrado correctamente', type: UsersDto })
    @Post('signup')
    signUp(@Body() signUpDto: UsersDto) {
        return this.authService.signUp(signUpDto);
    }

    @ApiOperation({ summary: 'Obtener perfil' })
    @ApiResponse({ status: 200, description: 'Obtener perfil correctamente', type: UsersDto })
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
