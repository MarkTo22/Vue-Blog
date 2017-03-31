const mongoose = require('mongoose');
const User = require('../models/user.model')
var multer = require('multer')
var path = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads')
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({ storage: storage })


// 新建用户
exports.create = function (req, res, next) {
  const user = new User(req.body);

  user.save()
    .then(data => {
      res.json(data)
    })
};


exports.update = function (req, res, next) {
  // const user = new User(req.body);
  const user = req.body;
  const id = req.params.id;
  delete user._id;

  // User.update({id:id},user,function(err,data){
  //   console.log("user.controller:"+data);
  // })

  User.findByIdAndUpdate(id, user, { new: false })
    .then((user) => {
      res.send({ user });
    })

};

exports.upload = function (req, res, next) {
  var upload = multer({
      storage: storage,
      fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname)
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
          return callback(res.end('Only images are allowed'), null)
        }
        callback(null, true)
      }
    })
    .single('avatar');
  upload(req, res, function (err) {
    res.end('File is uploaded')
  })
}

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

  User.paginate(queryCondition, { page: page, limit: limit }, function (err, result) {
    res.json(result);
  });

}


exports.getall = function (req, res, next) {
  User.find()
    .then(data => {
      res.json(data);
    })
};

exports.remove = function (req, res, next) {
  var id = req.params.id;
  User.findByIdAndRemove(id, function (err, doc) {
    res.json({ "message": "delete ok" });
  })

};

exports.removes = function (req, res, next) {
  var ids = req.body.ids;
  if (ids.length > 0) {
    User.remove({ _id: { $in: ids } })
      .then(deletedUsers => {
        res.json({ "message": "delete ok" });
      })
  } else {
    res.status(404)
      .send({ "message": "404" });
  }

};