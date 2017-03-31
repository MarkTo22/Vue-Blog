var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user.controller'); // 引入控制器
router.get('/', userCtrl.getall);

router.delete('/:id', userCtrl.remove);
router.put('/data/:id', userCtrl.update); // 修改
router.post('/data', userCtrl.create); // 执行控制器中的create方法
router.post('/removes', userCtrl.removes); // 执行控制器中的create方法
router.post('/list', userCtrl.list); // 执行控制器中的create方法
router.post('/upload', userCtrl.upload); // upload

module.exports = router;