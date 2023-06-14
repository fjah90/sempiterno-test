const User = require('../services/userServices');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({ message: 'Sucess', data: users});
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({ message: 'Sucess', data: user });
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'User created sucess', data: user });
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id, name, email, password } = req.body;
        const user = await User.findById(req.params.id);

        user.id = id || user.id;
        user.name = name || user.name;
        user.email = email || user.email;
        user.password = password || user.password;

        const update = await user.update(user);

        if (update.check){
            res.status(201).json({ message: 'User updated sucess', data: update.user });
        }else{
            return res.status(404).json({ message: 'Email is already in use' });
        }
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        await user.delete();
        res.status(200).send({ message: `User ${id} delete sucess` });
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
};