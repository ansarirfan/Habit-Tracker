 const User = require('../models/user');


//controller to authenticate the user and lands him on the home page
const login =  (req,res) =>{
    if(req.isAuthenticated()){
        return  res.redirect('/');
    }
    return  res.render('login');
}

//controller for creating the user on signup 
const createUser =  (req,res) =>{

        //if password and confirm_password doesn't match
    if(req.body.password != req.body.confirm_password){
        req.flash('error','Password does not match');
        return  res.redirect('back');
    }
    //if password matches,then find the user in the database with mail-id
    User.findOne({email:req.body.email},(err,user) =>{
        if(err){console.log("Error in finding the user");}
        //if user found then return because email should be unique
        if(user){
            req.flash('error','User Already Exist');
            return  res.redirect('back');
        }
        User.create(req.body,(err) =>{
            if(err){console.log("error in sign-up user creation");}
            req.flash('success','Signed-up Successfully');
            return  res.redirect('/users/sign-in');
        });
    });
    
}

//for creating session
const createSession =  (req,res) =>{
   
        req.flash('success','Logged in Successfully');
        return  res.redirect('/');
    
    
}

//for logout
const destroySession =  (req,res, ) =>{

    req.logout((err) =>{
        // req.flash('success','Successfully logged out');
        if(err){
            return next (err);
        }
        return  res.redirect('/users/sign-in');
    });
   
  
   
  
   }


module.exports = {login, createUser, createSession, destroySession }

