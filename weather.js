"use strict";

let cities = [
  { name: "Benbrook, TX",
    latitude: 32.6732,
    longitude: -97.4606 },

    { name: "New York City, NY ",
    latitude: 40.7549 ,
    longitude: -73.9841 },

    { name: "Boston, MA",
    latitude: 42.3688, 
    longitude: -71.0107 },
    
    { name: "Denver, CO ",
    latitude: 39.7531, 
    longitude: -104.9457},

    { name: "Dallas, TX",
    latitude: 32.7975, 
    longitude: -96.8009},
    
    { name: "Chicago, IL ",
    latitude: 41.8755, 
    longitude: -87.6324},

    { name: "Los Angeles, CA",
    latitude: 34.0544, 
    longitude: -118.2279 },
    
    { name: "Seattle, WA ",
    latitude: 47.6291, 
    longitude: -122.3537 },
];


window.onload = function () {

  let citySelect = document.getElementById("citySelect")
  citySelect.onchange = citySelectOnChange;

  populateCitySelect();
}


function populateCitySelect(){
 
  let citySelect = document.getElementById("citySelect");
  
  let defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Please select a City!";
  citySelect.appendChild(defaultOption);
  
  for (let city of cities){
    let newOption = document.createElement("option");
    newOption.value =city.name;
    newOption.textContent = city.name;
    citySelect.appendChild(newOption);
  }
}

function citySelectOnChange(){

  let citySelect = document.getElementById("citySelect").value;
  let selectCityLatitude = "";
  let selectCityLongitude ="";
  document.getElementById("displayTable").innerHTML =""
   
  for(let city of cities){
    
    if(city.name.includes(citySelect)){
      selectCityLatitude = city.latitude
      selectCityLongitude = city.longitude
    }
  }
  
  fetch(`https://api.weather.gov/points/${selectCityLatitude},${selectCityLongitude}`)
  .then(response => response.json()) 
  .then(data => {
    let weatherUrl = data.properties.forecast;
    displaytable(weatherUrl)
   } );
   
   if(citySelect == ""){
    document.getElementById("displayTable").style.display = "none"
   }
   else{
    document.getElementById("displayTable").style.display = "block"
   }
   
}


function displaytable(weatherUrl){
  
    let displayTable = document.getElementById("displayTable")
   
    fetch(weatherUrl)
    .then(response => response.json()) 
    .then(data => {

       let period = data.properties.periods
      
            for(let i=0; i<period.length; i++) {
             
               let row = displayTable.insertRow(-1);
               let cell1 = row.insertCell(0);
               let cell2 = row.insertCell(1);
               let cell3 = row.insertCell(2);
               let cell4 = row.insertCell(3);
               let cell5 = row.insertCell(4);
               cell1.innerHTML = period[i].name;
               cell2.innerHTML = period[i].temperature;
               cell3.innerHTML = period[i].temperatureUnit;
               cell4.innerHTML = period[i].shortForecast;
               cell5.innerHTML = period[i].windSpeed;
              
    } });

}