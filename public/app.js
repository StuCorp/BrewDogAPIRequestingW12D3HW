
var beersAPI = ""

var app = function(){

var url = 'https://api.punkapi.com/v2/beers'; 

makeRequest(url, requestComplete);

var select = document.getElementById("beer-selector");
select.addEventListener("change", handleBeerSelected);

var listButton = document.getElementById("list-all");
listButton.addEventListener("click", handleListAll);

}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url); 
  request.addEventListener("load", callback);
  request.send(); 
}

var requestComplete = function(){
  if(this.status !==200) return; 
  var jsonString = this.responseText; 
  beers = JSON.parse(jsonString);
  beersAPI = beers;
  populateSelectList(beers);
// if(beerSelected !== "") populateBeerList(beers);

};

var populateSelectList = function(beers){
  var select = document.getElementById("beer-selector");
  beers.forEach(function(beer){
    var option = document.createElement("option");
    option.innerText = beer.name;
    select.appendChild(option);
  });
};

var populateBeerList = function(beerArray){
  
  beerArray.forEach(function(beer){ 
    if(beer.name === beerSelected){
    createLiItem(beer);
  }
  });
}

var handleListAll = function(){
  clearList(); 
  beersAPI.forEach(function(beer){
    createLiItem(beer);
  });
};

var handleBeerSelected = function(){
var beerSelected = this.value; 
debugger;
clearList();
beersAPI.forEach(function(beer){
  if(beer.name === beerSelected){
    createLiItem(beer);
  }
});
// makeRequest(url, requestComplete);
  // this.value
};

var clearList = function(){
  var ul = document.getElementById("beer-list");
 while(ul.firstChild){
   ul.removeChild(ul.firstChild);
 }
};

var createLiItem = function(beer){
  var ul = document.getElementById("beer-list");
  var li = document.createElement('li');
  li.textContent = "Beer name: " + beer.name;
  var img = document.createElement('img');
  img.src = beer.image_url;
  // img.height = 50;
  img.width = 50;
  ul.appendChild(img);

  ul.appendChild(li);
  addIngredients(beer, li);
};

var addIngredients = function(beer, li){
  var ul = document.getElementById("beer-list");
  var myh2 = document.createElement("h3");
  myh2.textContent = "Ingredients:"; 
  ul.appendChild(myh2);
  // debugger;
  var myh3 = document.createElement("h3");
  myh3.textContent = "Malts:"; 
  ul.appendChild(myh3);
  addMalts(beer); 
  var myh3 = document.createElement("h3");
  myh3.textContent = "Hops:"; 
  ul.appendChild(myh3);
  addHops(beer);
  var myh3 = document.createElement("h3");
  myh3.textContent = "Yeast:"; 
  ul.appendChild(myh3);

  addYeast(beer);
 
}; 

var addMalts = function(beer){
  var num = 1; 
  var ul = document.getElementById("beer-list");
  beer.ingredients.malt.forEach(function(malt){
    var pTag = document.createElement("p");
    pTag.textContent = "Matlt " + num + ": " + malt.name; 
    ul.appendChild(pTag);
    var pTag2 = document.createElement("p");
    pTag2.textContent = "Amount: " + malt.amount.value + malt.amount.unit; 
    ul.appendChild(pTag2);
    num++;
  });
};

var addHops = function(beer){
  var num = 1; 
  var ul = document.getElementById("beer-list");
  beer.ingredients.hops.forEach(function(hops){
    var pTag = document.createElement("p");
    pTag.textContent = "Hops " + num + ": " + hops.name; 
    ul.appendChild(pTag);
    var pTag2 = document.createElement("p");
    pTag2.textContent = "Amount: " + hops.amount.value + hops.amount.unit; 
    ul.appendChild(pTag2);
    num++;
  });
};

var addYeast = function(beer){

  var ul = document.getElementById("beer-list");
    var pTag = document.createElement("p");
    pTag.textContent = "Yeast: " + beer.ingredients.yeast; 
    ul.appendChild(pTag);

};


window.addEventListener('load', app);