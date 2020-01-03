const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    displayname: {
        type: String,
        default: "anonymous"
    },
    username: {
        type: String, 
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    privilege: {
        type: Number,
        required: true,
        default: 3
    },
    active: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
})

userSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

userSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password)
}

module.exports = model('User', userSchema);