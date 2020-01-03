const usersCtrl = {};

const User = require('../models/User');
const verifyToken = require('./verifyToken');

usersCtrl.getUsers = verifyToken, async (req, res) => {
    const users = await User.find();
    res.json({ auth: true, users: users});
};

usersCtrl.profile = verifyToken, async (req, res) => {
    const user = await User.findById(req.userId)
    if (!user) {
        return res.status(404).send('No user found')
    }

    res.json(user)
}

usersCtrl.deleteUser = verifyToken, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json('User deleted');
    } catch {
        res.json('User Not deleted');
    }
};

module.exports = usersCtrl;