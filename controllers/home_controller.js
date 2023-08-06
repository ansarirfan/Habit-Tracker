
 const User = require('../models/user');

// Returns a date in 'yyyy-MM-dd' format
formatDate = (dateProperty) => {
    const newDate = new Date(dateProperty);
    let formattedDate = `${ newDate.getFullYear() }-`;
        formattedDate += `${ `0${ newDate.getMonth() + 1 }`.slice(-2) }-`;  // for double digit month
        formattedDate += `${ `0${ newDate.getDate() }`.slice(-2) }`;        // for double digit day
        return formattedDate;
}

//return the day-number of the week
today = () =>{
    let curr = new Date 
    let currentDay = curr.toString().substring(0,3);
    let weekdays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return weekdays.indexOf(currentDay);
}

//stores all the days of current week into week[] arrray 
getCurrentWeek = () =>{
    let curr = new Date;
    var week = [];
    for (let i = 0; i < 7; i++) {
        let first = curr.getDate() - curr.getDay() + i 
        let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
        week.push(day)
    }
    return week;
}

//renders the weekly homepage
const home = async (req,res) =>{
    try{
        if(req.user){
            let user = await User.findById(req.user.id).populate({path: 'habits', options: { sort: { 'createdAt': -1 } } });
            let habitsStatus = [];
            let week = getCurrentWeek();
            for(habit of user.habits){
                let subArr = ['unmarked','unmarked','unmarked','unmarked','unmarked','unmarked','unmarked'];
                for(let i=0;i<7;i++){
                    for(let j=0;j<habit.currentStatus.length;j++){
                        let formattedDate = formatDate(habit.currentStatus[j].date);
                        if(formattedDate == week[i]){
                            subArr[i] = habit.currentStatus[j].state; //subArr contains status of a day of particular habit
                            break;
                        }
                    }
                }
                habitsStatus.push(subArr);
            }
            // console.log(today());
            return res.render('home',{
                habits: user.habits,
                status: habitsStatus, 
                week: week
            });
        }
    }catch(err){
        console.log(err);
        return;
    }
}

//renders the daily view
 const daily = async (req,res) =>{
    try{
        if(req.user){
            let user = await User.findById(req.user.id).populate({path: 'habits', options: { sort: { 'createdAt': -1 } } });
            let habitsStatus = [];
            let week = getCurrentWeek();
            for(habit of user.habits){
                let subArr = ['unmarked','unmarked','unmarked','unmarked','unmarked','unmarked','unmarked'];
                for(let i=0;i<7;i++){
                    for(let j=0;j<habit.currentStatus.length;j++){
                        let formattedDate = formatDate(habit.currentStatus[j].date);
                        if(formattedDate == week[i]){
                            subArr[i] = habit.currentStatus[j].state;
                            break;
                        }
                    }
                }
                habitsStatus.push(subArr);
            }
            return res.render('daily',{
                habits: user.habits,
                status: habitsStatus,
                week: week,
                dayNumber: today()
            });
        }
    }catch(err){
        console.log(err);
        return;
    }
}

module.exports = {home, daily}