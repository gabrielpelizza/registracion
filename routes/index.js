var express = require('express');
var router = express.Router();
const {index, login, loginProcess, register, registerProcess, profile} = require('../controllers/indexController')


/* GET home page. */
router.get('/', index);

router.get('/login', login);
router.post('/login', loginProcess);

router.get('/register', register);
router.post('/register', registerProcess);

router.get('/profile', profile);

module.exports = router;
