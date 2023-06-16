import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

interface AuthRequest extends Request {
    user: any;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) { }

    async use(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith('Bearer')) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const token = authHeader.split(' ')[1];

            // Verificar el token JWT
            const decoded = await this.jwtService.verifyAsync(token);
            req.user = decoded;

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Unauthorized' });
        }
    }
}