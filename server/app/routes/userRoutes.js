const router = require('express').Router();
const mongoose = require('mongoose');

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../controller/userController');

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.post('/', createUser);

router.put('/:id',     updateUser,
);

router.delete('/:id', deleteUser);

module.exports = router;