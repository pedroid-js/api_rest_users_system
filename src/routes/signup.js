const { Router } = require('express');
const router = Router();

const { signup } = require('../controllers/auth.controller.js')

router.route('/')
    .post(signup)


module.exports = router;