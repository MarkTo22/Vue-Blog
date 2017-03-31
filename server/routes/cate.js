var express = require('express');
var router = express.Router();
var dataCtrl = require('../controllers/cate.controller'); // 引入控制器
router.get('/', dataCtrl.getall);

router.delete('/:id', dataCtrl.remove);
router.put('/data/:id', dataCtrl.update); // 修改
router.post('/data', dataCtrl.create); // 执行控制器中的create方法


module.exports = router;