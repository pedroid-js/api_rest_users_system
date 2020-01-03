const { Router } = require('express');
const router = Router();

const { getUsers, deleteUser } = require('../controllers/users.controller');

router.route('/')
    .get(getUsers)

router.route('/:id')
    .delete(deleteUser)

module.exports = router;