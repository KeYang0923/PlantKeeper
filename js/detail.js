//get the data from local storage
var readnew = localStorage.getItem("localdata");
readnew = JSON.parse(readnew);
//get the selected pet ID from local storage
var curPID = localStorage.getItem("selectedPId");
curPID = JSON.parse(curPID);

var newimagesrc="";
var operatorId=curPID-1;
var uploadImageF=0;
//function to set the selected pet detail from the database
function setDetail(careRes){    
    
    var curName=readnew[operatorId].name;
    var curSpecie=readnew[operatorId].specie;
    var curImage=readnew[operatorId].image;
    
    document.getElementById("name").value=curName;
    document.getElementById("specie").value=curSpecie;
    document.getElementById('addedImage').src=curImage;
    //update the care information
    document.getElementById("careTitle").innerHTML='How to raise '+curSpecie;
    var curCare;
    for (var i=0; i<careRes.length; i++ ){
        if( careRes[i].specie == curSpecie){
            curCare=careRes[i].href;
        }         
    }
    document.getElementById("careTitle").href=curCare;    
    document.getElementById("specie").disabled=true;  
    
}
//function to get the watering schedule from database
function getWaterHistory(){    
    var curWaterHistory='';
    curWaterHistory=readnew[operatorId].WaterDate;
    var curWater = JSON.stringify(curWaterHistory);
    localStorage.setItem("curWaterHis",curWater);
}
//function to load the selected pet image from database
function loadImage(){
       uploadImageF++;
       var preview = document.getElementById('addedImage'); //selects the query named img
       var file    = document.querySelector('input[type=file]').files[0]; //sames as here
       var reader  = new FileReader();
       
       reader.onloadend = function () {
           preview.src = reader.result;
           newimagesrc = preview.src;
        }       
       if (file) {
           reader.readAsDataURL(file); //reads the data as a URL
       }else{
           newimagesrc = readnew[operatorId].image;
       } 

}

var newId=operatorId+1;
var nameInput="Pet"+newId;
var specieInput=" ";
//function to save the chage to database
function saveUpdate(){    
       //update the data
    if (uploadImageF == 0){//not click the upload button
        newimagesrc = readnew[operatorId].image;
    }
    readnew[operatorId].name=nameInput;
    readnew[operatorId].specie=specieInput;
    readnew[operatorId].image=newimagesrc;   

    
    var datastring = JSON.stringify(readnew);
    localStorage.setItem("localdata",datastring);
 
}
//function to show the save confirmation div
function showSaveDiv(){
    saveUpdate();
    document.getElementById("saveDiv").style.display = 'block';    
}
//function to validate user input
function validateInput(){
    var nameCur=document.getElementById("name").value;    
    var specieCur=document.getElementById("specie").value;
    
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
//function to show the delete confirmation div
function showDelete(){
    document.getElementById("deleteDiv").style.display = 'block';
}
//function to delete selected pet from database
function deletePlant(){
    readnew.removeAt(operatorId);    
    var datastring = JSON.stringify(readnew);
    localStorage.setItem("localdata",datastring);    
}
//define the function to delete an item form an array
Array.prototype.removeAt = function(id) {
        for (var item in this) {
            if (item == id) {
                this.splice(item, 1);
                return true;
            }
        }
        return false;
}