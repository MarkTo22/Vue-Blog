const mongoose = require('mongoose');
const User = require('../models/user.model');

//新建用户
exports.create = function(req,res,next){
    const user = new User(req.body);
    // console.log(user);
    //res.json(user);//postman--显示返回json数据
    user.save()
        .then(data => {
            res.json(data)
        })
        // .catch(e => {
        //     res.status(400)
        //         .send(message.error400);
        // })
    
};