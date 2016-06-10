//get the local storage data
var readnew = localStorage.getItem("localdata");
readnew = JSON.parse(readnew);
//get the specie data from local storage
var specieWater = localStorage.getItem("specieWater");
specieWater = JSON.parse(specieWater);

var waterDates=[];
//get the selected pet id
var curPID = localStorage.getItem("selectedPId");
curPID = JSON.parse(curPID);
var operID=curPID-1;
//function to show the selected Pet name
function showTitle(){    
    document.getElementById("curpetname").innerHTML=readnew[operID].name;
}

$(function () {    		
    //generate the day list for watering, sunshining and fertilizing
    waterDates=readnew[operID].WaterDate.split(/[\s,]+/);
    var strWaterDate=readnew[operID].WaterDate;
    $("#datepicker").datepicker({
        numberOfMonths: 1,        
        beforeShowDay: function (date) {
            var theday = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
            return [true, ($.inArray(theday, waterDates) >= 0 ? "waterDate"  : "")];
        },

        onSelect: function (date) {          
            date = new Date(date);
            var theday = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();        
            
            var today = new Date();
            var todayStr = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
            if (today.getFullYear() == date.getFullYear() && today.getMonth() == date.getMonth() && today.getDate() == date.getDate()){
                if($.inArray(todayStr, waterDates) < 0){//if today is not in the original schedule
                    var newWaterDates= '';
                    for (var i=1; i < 10; i++){//find the nearest original date to replace                               
                        var tempdate = new Date(date); 
                        tempdate.setDate(tempdate.getDate()+i);
                        var strtempdate = (tempdate.getMonth() + 1) + '/' + tempdate.getDate() + '/' + tempdate.getFullYear();
                        if (($.inArray(strtempdate, waterDates) >= 0)) {
                            newWaterDates=strtempdate;
                            break;                    
                        }                
                    }
                    var indexDeleteFrom=0;
                    indexDeleteFrom=strWaterDate.indexOf(newWaterDates);

                    var oldWaterDate=strWaterDate.substring(0,indexDeleteFrom);

                    var newFutureDate=getWaterDays(theday);

                    readnew[operID].WaterDate=oldWaterDate+newFutureDate;

                    var datastring = JSON.stringify(readnew);
                    localStorage.setItem("localdata",datastring);  

                    $('#datepicker').datepicker("refresh");
                    showIDdiv(theday);                    
                }                
            } 
        }
    });
});
//function to calculate the water days for this pet
function getWaterDays(initial_date){    
    var time_span=0;
    for (var i=0; i< specieWater.length; i++){
        if(specieWater[i].Specie == readnew[operID].specie){
            time_span=specieWater[i].SuggestSpan;
        }
    }

    var waterdays="";
    var current_date = new Date(initial_date);
    var keep_adding = true;
    while(keep_adding){
        var current_year = current_date.getFullYear();
        var current_month = 1 + current_date.getMonth();
        var current_day = current_date.getDate();

        var current_date_string = current_month + "/" + current_day + "/" + current_year;
        waterdays += "," + current_date_string;
        current_date.setDate(current_date.getDate()+time_span);
        if (current_year>2016){
            keep_adding = false;
        }
    }
    waterdays = waterdays.slice(1);
    return waterdays;
}
//function to show the clicked event detail div
function showIDdiv(dayname){    
    
    document.getElementById("newWaterDay").innerHTML=dayname;
    document.getElementById("newWaterDay").style.fontStyle = "italic";
    document.getElementById("newWaterDay").style.color = "#FF6666";
    
    
    document.getElementById("idDiv").style.display = "block";
}