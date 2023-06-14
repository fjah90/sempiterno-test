const users = require('../assets/dummy');

exports.getAllUsers = (req, res) => {
    res.json(users);
};

exports.getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
};

exports.createUser = (req, res) => {
    const user = req.body;
    user.id = users.length + 1;
    users.push(user);
    res.status(201).json(user);
};

exports.updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        const user = req.body;
        user.id = id;
        users[index] = user;
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
};

exports.deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users.splice(index, 1);
        res.status(200).send('User delete sucess');
    } else {
        res.status(404).send('User not found');
    }
};