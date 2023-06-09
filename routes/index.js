const router = require('express').Router();

const { validatorSignin, validatorSignup } = require('../utils/validator');
const { getCharacter } = require('../controllers/characters');
const {
  login,
  registration,
  activate,
  logout,
  refresh,
} = require('../controllers/users');
const { refactor } = require('../controllers/spells');
const auth = require('../middlewares/auth');

router.post('/signin', validatorSignin, login);
router.post('/signup', validatorSignup, registration);
router.get('/activate/:link', activate);
router.post('/signout', logout);
router.get('/refresh', refresh);
router.get('/characters/:id', getCharacter);
router.get('/spells/refactor', refactor);

router.use(auth);

router.use('/characters', require('./characters'));
router.use('/spells', require('./spells'));

module.exports = router;
