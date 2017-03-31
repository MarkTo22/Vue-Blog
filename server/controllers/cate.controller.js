const mongoose = require('mongoose');
const Cate = require('../models/cate.model')

exports.create = function (req, res, next) {
  // console.log('create')
  const cate = new Cate(req.body);

  cate.save()
    .then(data => {
      res.json(data)
    })
};


exports.update = function (req, res, next) {

};


exports.getall = function (req, res, next) {
  // Cate.GetFullTree(function (err, tree) {
  //   res.json(tree);
  // });
  Cate.GetFullArrayTree(function (err, tree) {//得到树形---数组结构
    res.json(tree);
  });
};

exports.remove = function (req, res, next) {

};