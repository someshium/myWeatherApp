// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0


//select elements
const iconElement= document.querySelector(".weather-icon");
const tempElement= document.querySelector(".temperature-value p");
const descElement= document.querySelector(".temperature-description p");
const locationElement= document.querySelector(".location p");
const notificationElement= document.querySelector(".notification");


// App data
const weather = {};

weather.temperature = {
    unit: "celsius"
}

// APP consts and vars
const KELVIN= 273;
// API KEy
const key= "25d54a6ef1d6abd67671e6c5e2a69d5e";
 
// check if the browser supports geolocation 

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}
else{
    notificationElement.style.display = "block" ;
    notificationElement.innerHTML="<p>Browser doesn't support Geolocation</p>";

}

// set user position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude= position.coords.longitude;

    getWeather(latitude,longitude)
}

// show error when there is an issue with geolocation service
function showError(error){
    notificationElement.style.display = "block" ;
    notificationElement.innerHTML=`<p>${error.message} </p>` ;

}

// get weather from API provider
function getWeather(latitude,longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
    .then(function(response){
        let data = response.json();
        return data;
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId=data.weather[0].icon;
        weather.city= data.name;
        weather.country = data.sys.country; 
    })
    .then(function(){
        displayWeather();
    })
}

// displayweather function
function displayWeather(){
    tempElement.innerHTML=`${weather.temperature.value}° <span>C</span>` ;
    iconElement.innerHTML= `<img src="icons/${weather.iconId}.png"/>` ;
    descElement.innerHTML= weather.description;
    locationElement.innerHTML=`${weather.city}, ${weather.country}` ;

}


// c to f
function celsiusToFarenheit(temperature){
return 9/5*temperature+32;
}

//when the user clicks on the temperature element 
tempElement.addEventListener("click",function(){
    if(weather.temperature.value === undefined) retur ;

    if(weather.temperature.unit == "celsius"){
        let farenheit= celsiusToFarenheit(weather.temperature.value);
        farenheit=Math.floor(farenheit) ;

        tempElement.innerHTML = `${farenheit}° <span>F</span>` ;
        weather.temperature.unit= "farenheit" ;
    }
    else{
        tempElement.innerHTML= `${weather.temperature.value}° <span>C</span>` ;
        weather.temperature.unit= "celsius"
    }
});
