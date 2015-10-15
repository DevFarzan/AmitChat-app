var mongoose=require('mongoose');
var userLogin = mongoose.model('userLogin');
var admin = mongoose.model('admin');
var userAddressList = mongoose.model('userAddressList');
var User=mongoose.model('User');
var chatMessage = mongoose.model('chatMessage');
var ChatRoom = mongoose.model('ChatRoom');
var friendInviteEmail = mongoose.model('inviteFriend');
//var userLogin = mongoose.model('userLogin');

var nodemailer = require("nodemailer");
var requestIp = require('request-ip');

// Twilio Credentials

var accountSid = 'AC2d7daf51473bbeb1adb316e08dcb6074';
var authToken = 'e24ea9d0bf757e890decce1224cce314';





module.exports.signUp = function(req,res) {


    var randomeNumber = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for(var i=0; i< 12; i++)
    {
        randomeNumber += possible.charAt(Math.floor(Math.random() * possible.length));
    }



    var user_info = new User({
        userName: req.body.signUpData.userName,
        email:  req.body.signUpData.email,
        pass: req.body.signUpData.password,
        userPhoneNumber:req.body.signUpData.PhoneNumber,
        code_Verified:false,
        verifyCode:randomeNumber,
        insertedBy:req.body.signUpData.userName,
        userGender:req.body.signUpData.gender,
        InsertedDate:new Date()
    });




    user_info.save(function (err, data) {


        /*var smtpTransport = nodemailer.createTransport("SMTP",{
            service: "Yahoo",
            auth: {
                user: "Chat_Company@yahoo.com",
                pass: "amit1234"
            }
        });
        var noreplyEmail= 'Chat_Company@yahoo.com';
        var userEmail = req.body.signUpData.email;
        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: noreplyEmail, // sender address
            to:  userEmail, // list of receivers
            subject: "Verification Code", // Subject line
            text: "Hello world", // plaintext body
            html: '<h3>Please Insert the following Code to verify '+ randomeNumber+' </h3>'
        };

        // send mail with defined transport object
        smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
                console.log(error);
            }else{
                console.log("Message sent: " + response.message);
            }

            // if you don't want to use this transport object anymore, uncomment following line
            //smtpTransport.close(); // shut down the connection pool, no more messages
        });*/

        //require the Twilio module and create a REST client
        var client = require('twilio')(accountSid, authToken);
        client.messages.create({
            to: "+923343566137",
            from: "+19706582182",
            body: "this is your verification code "+randomeNumber,
        }, function(err, message) {
            console.log(message.sid);
        });

        res.send({
            err: err,
            data: data
        })
    })
};

module.exports.signIn = function(req,res) {

    var username = req.body.loginData.Username;
    var password = req.body.loginData.Password;

    User.find({
        userName: username,
        pass: password
    }, function (err, data) {
        res.send({
            err: err,
            data: data
        })
    })

};

module.exports.recoverPassword = function(req,res){

    //code for randome number

    var randomeNumber = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for(var i=0; i< 5; i++)
    {
        randomeNumber += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    var userEmail = req.body.recoverEmail.email;


    User.update(
        {email:userEmail},
        {$set:{
            randomForPassword:randomeNumber
        }},function(err,data){
            var smtpTransport = nodemailer.createTransport("SMTP",{
                service: "Yahoo",
                auth: {
                    user: "Chat_Company@yahoo.com",
                    pass: "amit1234"
                }
            });
            var noreplyEmail= 'Chat_Company@yahoo.com';
            var userEmail = req.body.recoverEmail.email;
            // setup e-mail data with unicode symbols
            var mailOptions = {
                from: noreplyEmail, // sender address
                to:  userEmail, // list of receivers
                subject: "Verification Code", // Subject line
                text: "Hello world", // plaintext body
                html: '<h3>Please click the following link to '+ randomeNumber+' </h3>' +
                '<br><br><a href="http://localhost:8100/#/newPassword/'+randomeNumber+'"/>'+randomeNumber+'</a>'
            };

            // send mail with defined transport object
            smtpTransport.sendMail(mailOptions, function(error, response){
                if(error){
                    console.log(error);
                }else{
                    console.log("Message sent: " + response.message);
                }

                // if you don't want to use this transport object anymore, uncomment following line
                //smtpTransport.close(); // shut down the connection pool, no more messages
            });
        },function(err,data){
            res.send({
                err:err,
                data:data
            });
        });
};
module.exports.newPassword = function(req,res) {

    var newUserPassword = req.body.changeUserPassword.newUserPassword;
    //var confirmPassword = req.body.changeUserPassword.confirmPassword
    //
    var Token = req.body.randomeToken;

    User.update(
        {
            randomForPassword: Token
        },
        {   $set:{
            pass:newUserPassword
        }
        },function(err,data){
            res.send({
               err:err,
               data:data
            });
            console.log(err,data);
        })

};
//the var randtemp = number from the url, take this number and find the user using this number in db, then update the user pass,then again update query to remove the readnnd



module.exports.resetPassword = function(req,res){


    var confirmPassword = req.body.resetPassword.confirmPassword;
    var usernameLocal = req.body.usernameLocal;

    User.update({
        userName:usernameLocal
    },{
        $set:{
            pass:confirmPassword
        }
    },function(err,data){
        console.log(err,data);
        res.send({
          err:err,
          data:data
        });
    });
};

module.exports.loginDetail = function(req,res,next) {






    var login_info = new userLogin({
        UserNameID: req.body.usernameID,
        ip_address: req.connection.remoteAddress,
        Location:req.body.Loc,
        updatedBy:null,
        updatedOn:null,
        InsertedBy:req.body.usernameID,
        InsertedDate:new Date()
    });

    login_info.save(function (err, data) {
        res.send({
            err: err,
            data: data
        })
    })

};


module.exports.getUser = function(req,res){

    User.find(function(err,data){
        res.send({
            err:err,
            data:data
        })
    })
};

module.exports.sendSms = function(req,res){



};

module.exports.verifyCode = function(req,res){

    var verifyCode = req.body.userCode.verifyCode;
    var code = req.body.code;

    if(verifyCode == code){
        res.send('success');

        User.update({
            verifyCode:code
        },{
            $set:{
                code_Verified:true
            }
        },function(err,data){
            console.log(err,data);
        });
    }
    else{
        res.send('err');
    }



};

module.exports.addressList = function(req,res){

    var addressList_info = new userAddressList({
        userID:req.body.userID,
        aliasName:req.body.userAddress.aliasName,
        address1:req.body.userAddress.address1,
        address2:req.body.userAddress.address2,
        address3:req.body.userAddress.address3,
        Zip:req.body.userAddress.zipCode,
        insertedOn:new Date(),
        updatedBy:null,
        updatedOn:null


    });

    addressList_info.save(function (err, data) {
        res.send({
            err: err,
            data: data
        });
    });


};


module.exports.adminPanel = function(req,res){

    var adminPanel_info = new admin({
        Admin: {
            adminName: 'Amit',
            Password: 'Amit'
        }
    });
    adminPanel_info.save(function(err,data){
        res.send({
            err:err,
            data:data
        });
    });
};

module.exports.chatRoom = function(req,res){

    var chatRoom_info = new ChatRoom({
        RoomID:req.body.userChatName+'Admin',
        userName:req.body.userChatName,
        RoomName:req.body.userChatName+'Admin',
        RoomIcon:null
    });
    chatRoom_info.save(function(err,data){
        res.send({
            err:err,
            data:data
        });
    });
};
module.exports.chatMessage = function(req,res){

    var chatMessage_info = new chatMessage({
        RoomID:req.body.userChatName+'Admin',
        RoomIcon:null,
        RoomName:req.body.userChatName+'Admin',
        InsertedBy:req.body.userChatName,
        InsertedOn:new Date(),
        chatMessage:req.body.chatmesage
    });
    chatMessage_info.save(function(err,data){
        res.send({
            err:err,
            data:data
        });
    });
};

module.exports.getChatMessage = function(req,res){

    chatMessage.find({
        RoomID:req.body.userChatName+'Admin'
    },function (err, data) {
        res.send({
            err: err,
            data: data
        });
    });

};

module.exports.updatedMessage = function(req,res){

    var RoomID = req.body.userChatName;


    chatMessage.update({
        RoomID:RoomID
    },{
        chatMessage:   req.body.chatmesage

    },function(err,data){
        console.log(err,data);
    });

};


module.exports.friendInvite = function(req,res){

    var count = 0;

    var friendInviteEmail_info = new friendInviteEmail({
        user_id:req.body.UserID,
        friendsEmail:[req.body.inviteFriendByEmail],
        insertedBY:req.body.currentUser,
        insertedOn:new Date()
    });

    friendInviteEmail_info.save(function(err,data){
        sendemail(req.body.inviteFriendByEmail[count]);
 })
    function sendemail(email){

        if(count==req.body.inviteFriendByEmail.length){
           console.log('complete');
        }
        else{
            var smtpTransport = nodemailer.createTransport("SMTP",{
                service: "Yahoo",
                auth: {
                    user: "Chat_Company@yahoo.com",
                    pass: "amit1234"
                }
            });
            var noreplyEmail= 'Chat_Company@yahoo.com';
            var userEmail = email;
            // setup e-mail data with unicode symbols
            var mailOptions = {
                from: noreplyEmail, // sender address
                to:  userEmail, // list of receivers
                subject: "Verification Code", // Subject line
                text: "Hello world", // plaintext body
                html: '<h3></h3>'
            };

            // send mail with defined transport object
            smtpTransport.sendMail(mailOptions, function(error, response){
                if(error){
                    console.log(error);
                }else{
                    console.log("Message sent: " + response.message);
                }

                // if you don't want to use this transport object anymore, uncomment following line
                //smtpTransport.close(); // shut down the connection pool, no more messages
            });

            count++;
            sendemail(req.body.inviteFriendByEmail[count])
        }
    }



};

module.exports.UserProfile = function(req,res){

     var userID = req.body.userID;

    User.findOne({
        _id:userID
    },
        function(err,data){
       if(err){
           res.send(err);
       }
        else{
           if(data==null){
               res.send(data);
           }
           else{
               res.send(data);
           }
       }
    });

};

module.exports.updateUserProfile = function(req,res){
    var userID = req.body.userID;
    var userName = req.body.userNewName;
    var Email = req.body.Email;
    var Gender = req.body.Gender;
    var number = req.body.number;
    var ProfilePicture = req.body.ProfilePicture

    User.update({
        _id:userID
    },{
        $set:{
            userName:userName,
            email:Email,
            userPhoneNumber:number,
            userGender:Gender,
            ProfilePicture:ProfilePicture
        }
    },function(err,data){
        console.log(err,data);
        res.send({
            err:err,
            data:data
        });
    });

};
