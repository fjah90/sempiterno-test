import { HttpStatus, Injectable, Inject } from '@nestjs/common';
import { CRUDMessages } from 'src/shared/utils/message.enum';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class ImageDownloadService {
    constructor(@Inject(REQUEST) private readonly request: Request) { }

    async downloadAndSaveImage(url: string, fileName: string): Promise<Object> {
        try {

            // Se usa axios
            const response = await axios.get(url, { responseType: 'stream' });

            // Definir la ruta de la carpeta de imágenes en el servidor
            const folderPath = path.join(__dirname, '..', '..', '..', '..', 'public', 'images');
            console.log(folderPath)

            // Verificar si la carpeta existe, sino, crearla
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath, { recursive: true });
            }

            // Obtener la extensión de la imagen
            const extension = path.extname(url);

            // Generar un nombre de archivo único
            const timestamp = Date.now();
            const fullName = `${fileName}-${timestamp}${extension}`;

            // Definir la ruta completa del archivo en el servidor
            const filePath = path.resolve(folderPath, fullName);

            // Crear un stream de escritura y guardar la imagen
            const writer = fs.createWriteStream(filePath);
            writer.on('close', () => {
                console.log('La escritura se ha completado correctamente.');
            });
            writer.on('error', (error) => {
                console.error('Se ha producido un error durante la escritura:', error);
            });
            response.data.pipe(writer);

            const imgUrl = `${this.request.protocol}://${this.request.get('host')}/public/images/${fullName}`;

            const res = {
                statusCode: HttpStatus.OK,
                message: 'Imagen descargada correctamente',
                data: imgUrl,
            }
            console.log(res)
            return res;
        } catch (error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: [error.message]
            };
        }
    }
}