var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user.controller');//引入控制器

/* GET users listing. */
router.get('/', userCtrl.getall);

router.post('/data', userCtrl.create);//执行控制器中的create方法

module.exports = router;
