
 const Habit = require('../models/habit');

 const User = require('../models/user');


//conroller to create new habit
const create = (req,res) =>{
    if(req.user){
        Habit.create({content: req.body.habit},(err,newHabit) =>{
            if(err){
                console.log("Error in creating new habit");
                return;
            }
            User.findById(req.user.id,(err,user) =>{
                if(err){
                    console.log('Error in finding the user');
                    return;
                }
                user.habits.push(newHabit);
                user.save();
            });
            req.flash('success','Habit Created Successfully');
            return res.redirect('back');
        });
    }
}

//controller to make the status of the day as finished
const done = (req,res) =>{
    if(req.user){
        let habitId = req.query.habitId;
        let date = req.query.date;

        Habit.findById(habitId,(err,habit) =>{
            if(err){
                console.log('Error in finding habit in done status');
                return;
            }
            habit.currentStatus.push({date: date,state:'finished'});
            habit.save();
            req.flash('success','Habit Finished');
            return res.redirect('back');
        });
    }
}

//controller to make the status of the day as not finished
const undone = (req,res) =>{
    if(req.user){
        let habitId = req.query.habitId;
        let date = req.query.date;

        Habit.findById(habitId,(err,habit) =>{
            if(err){
                console.log('error in finding habit in undone status');
                return;
            }
            habit.currentStatus.push({date: date, state:'unfinished'});
            habit.save();
            req.flash('success','Habit not finsished');
            return res.redirect('back');
        });
    }
}

//controller to delete the habit
const userDelete =  (req,res) =>{
    if(req.user){
        User.findById(req.user._id,(err,user) =>{
            if(err){
                console.log("error in finding the user in deleting habit");
                return;
            }
            let habitIndex = user.habits.indexOf(req.query.habitId);
            user.habits.splice(habitIndex, 1);
            user.save();

            Habit.findByIdAndDelete(req.query.habitId,(err) =>{
                if(err){
                    console.log("error in deleting the habit");
                    return;
                }
            });
            req.flash('success','Habit Deleted Successfully');
            return res.redirect('back');
        });
    }
}

//controller to add the habit as a favourite
const addFavourite = (req,res) =>{
    if(req.user){
        Habit.findById(req.query.habitId,(err,habit) =>{
            if(err){
                console.log('Error in finding habit in adding favourites');
                return;
            }

            habit.favourite = true;
            habit.save();
            req.flash('success','Habit added as favourite');
            return res.redirect('back');
        });
    }
}

//controller to remove the habit from favourite
const removeFavourite = (req,res) =>{
    if(req.user){
        Habit.findById(req.query.habitId,(err,habit) =>{
            if(err){
                console.log('Error in finding habit in adding favourites');
                return;
            }
            habit.favourite = false;
            habit.save();
            req.flash('success','Habit removed from favourite');
            return res.redirect('back');
        });
    }
}

module.exports = {create, done, undone, userDelete, addFavourite, removeFavourite}
