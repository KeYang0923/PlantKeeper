//get the data stored in the local storage
var readnew = localStorage.getItem("localdata");
readnew = JSON.parse(readnew);
//get the specie data from the local storage
var specieWater = localStorage.getItem("specieWater");
specieWater = JSON.parse(specieWater);

var newImageSrc="./img/default.jpg";
//function to load image from user upload
function loadImage(){
     
       var preview = document.getElementById('addedImage'); //selects the query named img
       var file    = document.querySelector('input[type=file]').files[0]; //sames as here
       var reader  = new FileReader();
       
       reader.onloadend = function () {
           preview.src = reader.result;
           
            
        }
       
       if (file) {
           reader.readAsDataURL(file); //reads the data as a URL
       } else {
           preview.src = "";
       }
    newImageSrc="./img/"+file.name;
  }


var numberPlant=readnew.length;
var newId=numberPlant+1;
var nameInput="Pet"+(newId);
var specieInput=" ";
//function to save the user input into the local storage data
function saveInput(){    
    var element = {};    
    element.id = newId;
    element.name = nameInput;
    element.specie = specieInput;    
    element.image = newImageSrc;
    
    var curWaterdays="";
    curWaterdays=getWaterDays();
    element.WaterDate = curWaterdays;    
    
    var tempData = new Array();
    tempData.push(element);
    
    readnew = readnew.concat(tempData);
    
    var datastring = JSON.stringify(readnew);
    localStorage.setItem("localdata",datastring);   
}
//function to show the save confirmation div
function showSaveDiv(){
    saveInput();
    document.getElementById("saveDiv").style.display = 'block';
    
}
//function to validate user input 
function validateInput(){
    var nameCur=document.getElementById("newName").value;    
    var specieCur=document.getElementById("newSpecie").value;
    //prepare for the validation
    nameCur=nameCur.replace(/\s+/g, '');

    if (specieCur == "Choose here"){
        alert("Please select a specie for your pet! ");
        return false;
    }else{
        specieInput=specieCur;
    }    
    if (nameCur == null || nameCur == ""){    
    }else{
        nameInput=nameCur;
    }
    showSaveDiv();
}

//define the function to use data model to calculate the water reminder date
function getWaterDays(){  
    var time_span=null;
    var j=0;   
    
    //get the suggested span days    
    while (j < specieWater.length && !time_span) {
      if (specieInput == specieWater[j].Specie) {
          time_span = specieWater[j].SuggestSpan;
      }
      j++;
    }
    
    var waterdays="";
    var current_date = new Date();
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
