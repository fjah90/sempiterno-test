const Image = require('../services/ImageServices');

exports.downloadImage = async (req, res) => {
    const { url, filename } = req.query;

    try {
        const image = new Image(url, filename);
        const internalPath = await image.downloadAndSave();

        const host = req.get('host');
        const protocol = req.protocol;
        const urlPath = `${protocol}://${host}${internalPath}`; // Construir la URL completa de la imagen

        res.status(200).json({
            message: 'Imagen descargada con éxito',
            imagePath: urlPath // Incluir la URL completa de la imagen en la respuesta JSON
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Error al descargar la imagen'
        });
    }
};