var moment = require('moment');
module.exports.getMonthDateRange=function getMonthDateRange(year,month){
     
 

    const startDate = moment([year, month - 1, 01]).format("YYYY-MM-DD");
 
    // get the number of days for this month
    let daysInMonth = moment(startDate).daysInMonth();
    
    // we are adding the days in this month to the start date (minus the first day)
    let endDate = moment(startDate).add(daysInMonth - 1, 'days').format("YYYY-MM-DD");
 
    // make sure to call toDate() for plain JavaScript date type
    return { start: startDate, end: endDate };
}