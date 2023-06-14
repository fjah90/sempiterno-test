const User = require('../services/userServices');

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.status(200).json({ users });
    } catch (error) {
        next(error);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({ user });
    } catch (error) {
        res.status(404).send('User not found');
    }
};

exports.createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ user });
    } catch (error) {
        next(error);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const { id, name, email, password } = req.body;
        const user = await User.findById(req.params.id);

        // console.log(user)

        user.id = id || user.id;
        user.name = name || user.name;
        user.email = email || user.email;
        user.password = password || user.password;

        const update = await user.update(user);

        if (update.check){
            res.status(200).json({ message: 'User updated sucess', data: user });
        }else{
            return res.status(404).json({ message: 'El correo electrónico ya está en uso' });
        }
    } catch (error) {
        res.status(404).send('User not found');
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        await user.delete();
        res.status(200).send('User delete sucess');
    } catch (error) {
        res.status(404).send('User not found');
    }
};