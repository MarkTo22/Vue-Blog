const mongoose = require('mongoose');
const Comment = require('../models/comment.model')
var path = require('path')

exports.create = function (req, res, next) {
  const comment = new Comment(req.body);
  comment.save()
    .then(data => {
      res.json(data)
    })
};


exports.update = function (req, res, next) {
  const comment = new Comment(req.body);
  const id = req.params.id;

  Comment.findByIdAndUpdate(id, { $set: req.body }, { new: false })
    .then((data) => {
      res.send({ data });
    })

};

exports.list = function (req, res, next) {
  var page = (req.body.page) ? req.body.page : 1;
  var limit = (req.body.limit) ? req.body.limit : 5;
  var queryCondition = {};
  if (req.body.name && req.body.name.trim()
    .length > 0) {
    name = req.body.name;
    queryCondition = {
      "name": new RegExp(name, "i")
    }
  }

  Comment.paginate(queryCondition, { page: page, limit: limit }, function (err, result) {
    res.json(result);
  });

}


exports.getall = function (req, res, next) {
  Comment.find()
    .then(data => {
      res.json(data);
    })
};

exports.remove = function (req, res, next) {
  var id = req.params.id;
  Comment.findByIdAndRemove(id, function (err, doc) {
    res.json({ "message": "delete ok" });
  })

};

exports.removes = function (req, res, next) {
  var ids = req.body.ids;
  if (ids.length > 0) {
    Comment.remove({ _id: { $in: ids } })
      .then(deletedData => {
        res.json({ "message": "delete ok" });
      })
  } else {
    res.status(404)
      .send({ "message": "404" });
  }

};