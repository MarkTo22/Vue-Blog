const mongoose = require('mongoose');
const User = require('../models/user.model');

//新建用户
exports.create = function(req,res,next){
    const user = new User(req.body);
    // console.log(user);
    res.json(user);
};