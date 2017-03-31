var express = require('express');
var router = express.Router();
var dataCtrl = require('../controllers/user.controller'); // 引入控制器
router.get('/', dataCtrl.getall);

router.delete('/:id', dataCtrl.remove);
router.put('/data/:id', dataCtrl.update); // 修改
router.post('/data', dataCtrl.create); // 执行控制器中的create方法
router.post('/removes', dataCtrl.removes); // 执行控制器中的create方法
router.post('/list', dataCtrl.list); // 执行控制器中的create方法
router.post('/upload', dataCtrl.upload); // upload
router.post('/login', dataCtrl.login); // 执行控制器中的login方法


module.exports = router;