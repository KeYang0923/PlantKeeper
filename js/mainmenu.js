//function to dynamically generate the detail table of plant pets
function createPlantsTable(data){
    var nrCols=2;
    var numberPlant=data.length;
    var nRow=0;
    if (numberPlant % 2 == 0){
        nRow=numberPlant / 2;
    }
    else{
        nRow=numberPlant / 2;
        nRow=parseInt(nRow+1);
    }    
    var root=document.getElementById('tablecontainer');
    var tab=document.createElement('table');
    tab.setAttribute("class", "deck");
    var row, cell;
    var countP=1;
    for(var i=0;i<nRow;i++){
      row=document.createElement('tr');

     for(var j=0;j<nrCols;j++){
           if (countP <= numberPlant ){              
              
               cell=document.createElement('td');  
               cell.setAttribute("class", "card");
               var totaldiv = document.createElement('div');
               totaldiv.setAttribute("class", "totalddiv");
               
               var a= document.createElement('a');
               a.setAttribute("href", "detail.html");
               a.setAttribute("id", "detailName");
               a.setAttribute("class", "nameDiv");
               a.setAttribute("onclick", "showDetail(this)");
               var namespam= document.createElement('span');
               namespam.setAttribute("id", "p"+countP+"name");
               
               a.appendChild(namespam); 
               
               var x = document.createElement("IMG");               
               x.setAttribute("id", "p"+countP+"i");
               x.setAttribute("src", data[countP-1].image);
               x.setAttribute("width", "125");
               x.setAttribute("height", "125");
               x.setAttribute("alt", "Plant");
               
               a.appendChild(x);
               
               totaldiv.appendChild(a); 
               cell.appendChild(totaldiv);
               row.appendChild(cell);
               countP++;
           } 
     }

     tab.appendChild(row);
    }
     root.appendChild(tab);
    for (var i=0; i<numberPlant; i++ ){
        var pid=i+1;
        document.getElementById("p"+pid+"name").innerHTML=data[i].name; 
    }
}
//function to store the selected pet ID into local storage
function showDetail(obj){
    var nameSpan = obj.children[0].id;   
    nameSpan = nameSpan.replace("p", "");
    var resID = nameSpan.replace("name", "");   
    localStorage.setItem("selectedPId",resID);     
    
}