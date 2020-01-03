const usersCtrl = {};

const User = require('../models/User');

usersCtrl.getUsers = async (req, res) => {
    const user = await User.find();
    res.json(user);
};

usersCtrl.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json('User deleted');
    } catch {
        res.json('User Not deleted');
    }
};

module.exports = usersCtrl;