const mongoose = require('mongoose');
const Uploads = require('../models/uploads.model')
var path = require('path')
var multer = require('multer')//上传模块--nodejs-express

var storage = multer.diskStorage({ //存储
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

// var upload = multer({ storage: storage });

exports.filedata = function(req,res,next){
  var upload = multer({
    storage:storage,
    fileFilter:function (req, file, callback){
      var ext = path.extname(file.originalname)
      if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return callback(res.end('Only images are allowed'), null)
      }
      callback(null, true)
    }
  })
  .single('avatar');
  upload(req, res, function (err){
    res.end('File is uploaded');
  })
}

exports.create = function (req, res, next) {
  const uploads = new Uploads(req.body);
  uploads.save()
    .then(data => {
      res.json(data)
    })
};


exports.getData = function (req, res, next) {
  let id = req.params.id;
  Uploads.findById(id)
    .then(data => {
      res.json(data);
    })
};

exports.update = function (req, res, next) {
  const uploads = new Uploads(req.body);
  const id = req.params.id;

  Uploads.findByIdAndUpdate(id, { $set: req.body }, { new: false })
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

  Uploads.paginate(queryCondition, { page: page, limit: limit }, function (err, result) {
    res.json(result);
  });

}


exports.getall = function (req, res, next) {
  Uploads.find()
    .then(data => {
      res.json(data);
    })
};

exports.remove = function (req, res, next) {
  var id = req.params.id;
  Uploads.findByIdAndRemove(id, function (err, doc) {
    res.json({ "message": "delete ok" });
  })

};

exports.removes = function (req, res, next) {
  var ids = req.body.ids;
  if (ids.length > 0) {
    Uploads.remove({ _id: { $in: ids } })
      .then(deletedData => {
        res.json({ "message": "delete ok" });
      })
  } else {
    res.status(404)
      .send({ "message": "404" });
  }

};