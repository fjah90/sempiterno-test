import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UsersDto } from '../users/dto/users.dto';
import { CRUDMessages } from 'src/shared/utils/message.enum';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async signIn(user: UsersDto) {
        console.log(user)
        // Generar el token de autenticación con los datos del usuario
        const payload = { email: user.email, sub: user.id };
        const token = this.jwtService.sign(payload);

        // Retornar el token de autenticación
        console.log(token)
        return {
            statusCode: HttpStatus.OK,
            message: [CRUDMessages.GetSuccess],
            data: [token]
        }
    }

    async signUp(user: UsersDto) {
        console.log(user)
        // Crear el usuario en la base de datos
        const result: any = await this.usersService.createRegistry(user);

        // Si el usuario se creó correctamente, generar y retornar el token de autenticación
        if (result.statusCode === 200) {
            const payload = { email: user.email, sub: user.id };
            const token = this.jwtService.sign(payload);
            return {
                tatusCode: HttpStatus.OK,
                message: [CRUDMessages.GetSuccess],
                data: [{ "record": result.data, "toke": token }]
            };
        }
        console.log(result.statusCode)
        // Si hubo un error al crear el usuario, lanzar una excepción
        throw new UnauthorizedException(result.message);
    }
}