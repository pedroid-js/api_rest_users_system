const authCrl = {}
const jwt = require('jsonwebtoken')
const User = require('../models/User')

authCrl.login = async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({username:username})
    if (!user) {
        return res.status(404).send("The email doesn't exists")
    }
    const validPassword = await user.validatePassword(password)
    if (!validPassword) {
        return res.status(401).json({ auth:false, token: null })
    } 
    const token = jwt.sign({id: user._id}, process.env.API_SECRET, {
        expiresIn: 60 * 60 * 24
    })
    res.json({ auth: true, token: token })
}

authCrl.signup = async (req, res) => {
    const { displayname, username, password } = req.body
    const user = new User({
        displayname: displayname,
        username: username,
        password: password
    })
    user.password = await user.encryptPassword(user.password)
    try {
        await user.save()
        const token = jwt.sign(
            { id: user._id },
            process.env.API_SECRET, {
            expiresIn: 60 * 60 * 24
        })
        res.status(200).json({ auth: true, token: token })
    } catch {
        res.status(400).json({ auth: false, message: 'Duplicate key' })
    }
}

module.exports = authCrl