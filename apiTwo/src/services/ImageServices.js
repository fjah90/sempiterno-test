
const axios = require('axios');
const fs = require('fs');
const path = require('path');

class Image {
    constructor(url, filename) {
        this.url = url;
        this.filename = filename;
    }

    async downloadAndSave() {
        try {
            const response = await axios({
                method: 'GET',
                url: this.url,
                responseType: 'stream'
            });

            //se extrae la extension
            const extension = path.extname(this.url);
            const folderPath = path.resolve(__dirname, '../../', 'public', 'images');

            if (!fs.existsSync(folderPath)) { // Verificar si la carpeta existe
                fs.mkdirSync(folderPath, { recursive: true }); // Crear la carpeta si no existe
            }

            const timestamp = Date.now();
            const fullName = `${this.filename}-${timestamp}${extension}`; //nombre completo del archivo

            //ubicación del archivo
            const filePath = path.resolve(folderPath, `${fullName}`);

            const writer = fs.createWriteStream(filePath);

            response.data.pipe(writer);

            return new Promise((resolve, reject) => {
                writer.on('finish', () => {
                    const internalPath = `/images/${fullName}`;
                    resolve(internalPath); // Devuelve la ruta interna de la imagen guardada
                });
                writer.on('error', reject);
            });
        } catch (error) {
            console.error(error);
            throw new Error('Error al descargar la imagen');
        }
    }
}

module.exports = Image;