const router = require('express').Router();

const { validatorSignin, validatorSignup } = require('../utils/validator');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signin', validatorSignin, login);
router.post('/signup', validatorSignup, createUser);

router.use(auth);

router.use('/users', require('./users'));
router.use('/characters', require('./characters'));
router.use('/spells', require('./spells'));

module.exports = router;