//get the data from local storage
var readnew = localStorage.getItem("localdata");
readnew = JSON.parse(readnew);

var waterDates=[];

$(function () {
    
    //generate the day list for watering, sunshining and fertilizing
    getalldays();

    $("#datepicker").datepicker({
        numberOfMonths: 1,        
        beforeShowDay: function (date) {
            var today = new Date();
            var theday = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
            //prepare for only showing the events after today
            today.setDate(today.getDate()-1);
            return [true, ($.inArray(theday, waterDates) >= 0 && (today.getTime() - date.getTime() <=0) ? "waterDate"  : "")];
        },

        onSelect: function (date) {          
            date = new Date(date);
            var theday = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();        
            
            var today = new Date();
            today.setDate(today.getDate()-1);
            if(today.getTime() -date.getTime() <= 0){//only reminds the future events
                var waterpetname="";
                var i=0;
                //get the all pet name related with this day
                for (var i=0; i < readnew.length; i++){
                     var curwaterdays=readnew[i].WaterDate.split(/[\s,]+/);
                    if (($.inArray(theday, curwaterdays) >= 0)) {
                          waterpetname += readnew[i].name+', ';
                    }            
                }
                //if has water event, then output the reminder dialog
                if(($.inArray(theday, waterDates) >= 0) ){                
                    showIDdiv(waterpetname);
                }                
                
            }
            
        }

    });
});
//function to generate the events array
function getalldays(){

    for (var i=0; i < readnew.length; i++){
        var curwaterdays=readnew[i].WaterDate.split(/[\s,]+/);

        for (var j=0; j < curwaterdays.length; j++){
            waterDates.push(curwaterdays[j])
        }
    }

}
//function to show the event detail div
function showIDdiv(petname){
    petname=petname.substring(0,petname.length-2);
    
    document.getElementById("petName").innerHTML=petname;
    document.getElementById("petName").style.fontStyle = "italic";
    document.getElementById("petName").style.color = "#FF6666";    
    
    document.getElementById("idDiv").style.display = "block";
}