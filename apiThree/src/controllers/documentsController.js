const Document = require('../services/documentServices');

exports.getAllDocuments = async (req, res) => {
    try {
        const documents = await Document.findAll();
        res.status(200).json({ message: 'Sucess', data: documents });
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
};

exports.getDocumentById = async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        console.log(document)
        res.status(200).json({ message: 'Sucess', data: document });
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
};

exports.createDocument = async (req, res) => {
    try {
        const { title, content } = req.body;
        const document = new Document({ title, content });
        await document.save();
        res.status(201).json({ message: 'Document created sucess', data: document });
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
};


exports.updateDocument = async (req, res) => {
    try {
        const { id, title, content } = req.body;
        const document = await Document.findById(req.params.id);

        console.log(document)

        document.id = id || document.id;
        document.title = title || document.title;
        document.content = content || document.content;

        const update = await document.update(document);
        console.log(update)
        res.status(200).json({ message: 'Document updated sucess', data: update.document });
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
};

exports.deleteDocument = async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);

        await document.delete();
        res.status(200).send('Document delete sucess');
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
};