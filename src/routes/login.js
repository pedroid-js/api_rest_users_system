const { Router } = require('express');
const router = Router();

const { login } = require('../controllers/auth.controller.js')

router.route('/')
    .post(login)


module.exports = router;