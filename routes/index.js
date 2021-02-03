var express = require('express');
var router = express.Router();

const {index, login, loginProcess, register, registerProcess, profile} = require('../controllers/indexController')

const upload = require('../middlewares/subirImagen')

/* GET home page. */
router.get('/', index);

router.get('/login', login);
router.post('/login', loginProcess);

router.get('/register', register);
router.post('/register',upload.any(),registerProcess);


router.get('/profile/:id', profile);

module.exports = router;
