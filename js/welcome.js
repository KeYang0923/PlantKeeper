//define the specie database to compute the water schedule of each plant
var specieWaterDate =[
    {Specie: "Lily", SuggestSpan: 9, StartDate: '1/3/2016' },
    {Specie: "Aster", SuggestSpan: 7, StartDate: '1/1/2016' },
    {Specie: "Jasmine", SuggestSpan: 7, StartDate: '1/2/2016' }, 
    {Specie: "Rose", SuggestSpan: 6, StartDate: '1/7/2016' },
    {Specie: "Sunflower", SuggestSpan: 10, StartDate: '2/4/2016' },
    {Specie: "Lilac", SuggestSpan: 9, StartDate: '2/5/2016' }
];

//function to use data model to calculate the water reminder date
function loadWaterReminder(data){
    var speciestring = JSON.stringify(specieWaterDate);
    localStorage.setItem("specieWater",speciestring);
    for (var i=0; i < data.length; i++){
        var curSpecie=data[i].specie;
        var defaultstart='';
        var curspan=null;
        var j=0;           
        //get the suggested span days    
        while (j < specieWaterDate.length && !curspan) {
          
          if (curSpecie == specieWaterDate[j].Specie) {
              curspan = specieWaterDate[j].SuggestSpan;
              defaultstart= specieWaterDate[j].StartDate;
          }
          j++;
        }
        var waterdays="";
        waterdays=getWaterDays(defaultstart,curspan);
        data[i].WaterDate=waterdays;
        
    }
    var datastring = JSON.stringify(data);
    localStorage.setItem("localdata",datastring);    
            
} 
//function to compute the watering schedul using start date and watering span
function getWaterDays(initial_date,time_span){    
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