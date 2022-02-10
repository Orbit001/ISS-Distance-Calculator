var ISSX
var ISSY
var ISSZ

var USERX 
var USERY 
var USERZ 

var CITYX
var CITYY

var  x,y,z
var  isx,isy,isz;

var answer

var CallCount= 0

let locationinterval
let Minterval

const chimpbutton = document.getElementById("dad");
const yourlocation = document.getElementById("greenbeansbutton");
const starter = document.getElementById("Starter")
const title = document.getElementById("header")

starter.addEventListener("click", function(){
    document.getElementById("starterbutton").style.display = "none"
    document.getElementById("countercon").style.display = "flex"
    locationinterval = setInterval(bangarang, 1250);
    Minterval = setInterval(citylocater, 1250);
    clearInterval(locationinterval)
    clearInterval(Mintervaa);
})

chimpbutton.addEventListener("click",function(){
    // document.getElementById("header").innerHTML = "Distance To International Space Station" + "("+ document.getElementById('Cityfetch').value + ")"
    clearInterval(locationinterval)
    clearInterval(Minterval)
    Minterval = setInterval(citylocater, 1250);
});

yourlocation.addEventListener("click",function(){
    document.getElementById("header").innerHTML = "Distance To International Space Station From Your Location"
    clearInterval(Minterval);
    clearInterval(locationinterval);
    getLocation();
    locationinterval = setInterval(bangarang, 1250);

});




function citylocater(){
    
    var CityName = document.getElementById('Cityfetch').value;
    console.log(CityName)
    title.innerHTML= "Distance To Internation Space Station from " + CityName;
    const APIkey = "ab1575ee1ccdc121fcad7be6bd5e5ed5"
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + CityName + "&appid=" + APIkey+ "&units=imperial";
fetch(queryURL)
    .then(function (response) {
        return response.json();

})
// Takes longitude and Latitude data from first API call and fetchs the ONECALLAPI which provides all necessary information
.then(function (response) {

  
    CITYX = response.coord.lat;
    CITYY = response.coord.lon;
    inputfinder()
})
}

function inputfinder(){
        
        
        var  ecef = new Array(3);
        var  latitude,longitude,height;
        var  sans;
    
        var  dtr = Math.PI/180;
    
        CallCount = CallCount + 1;
    
        latitude =  CITYX;
        longitude=  CITYY;
        height   =  0;
    
        latitude = Number(latitude);
        longitude= Number(longitude);
        height   = Number(height);
    
        good =  goodnum(latitude) && goodnum(longitude) && goodnum(height);
        
        if ( !good ) sans = sans+"\nInvalid Numeric Input \n"
    
        if ( good )
        {
    
        ecef  = llhxyz(latitude,longitude,height);
        cityx     = ecef[0];
        cityy     = ecef[1];
        cityz     = ecef[2];
        console.log(cityx,cityy,cityz)

        fetch('https://api.wheretheiss.at/v1/satellites/25544')
        .then(response => response.json())
        .then(function(data){
        ISSX = data.latitude
        ISSY = data.longitude
        ISSZ = data.altitude
    
            
    var  ecef = new Array(3);
    var  latitude,longitude,height;
    var  sans;

    var  dtr = Math.PI/180;

    CallCount = CallCount + 1;

    latitude =  ISSX;
    longitude=  ISSY;
    height   =  ISSZ;

    latitude = Number(latitude);
    longitude= Number(longitude);
    height   = Number(height);

    good =  goodnum(latitude) && goodnum(longitude) && goodnum(height);
    
    if ( !good ) sans = sans+"\nInvalid Numeric Input \n"

    if ( good )
    {

    ecef  = llhxyz(latitude,longitude,height);
    isx     = ecef[0];
    isy     = ecef[1];
    isz     = ecef[2];
    answer = (Math.sqrt((cityx - isx)**2 + (cityy - isy)**2 + (cityz - isz)**2));
    console.log(answer)
    tobeans()
}
})}   
};



function distanceequation(){
    answer = (Math.sqrt((x - isx)**2 + (y - isy)**2 + (z - isz)**2));
    console.log(answer)
    tobeans()
}


function tobeans(){
    beans = answer/.0001016
    beansnodecimal = Math.trunc (beans);
    document.getElementById("greencounter").innerHTML = beansnodecimal + " green beans"
    document.getElementById("kmcounter").innerHTML = Math.trunc (answer) + " kilometers"
    document.getElementById("milecounter").innerHTML = Math.trunc (answer*0.621371) + " miles"
    document.getElementById("greenbeanlogo").style.display = "flex";
}



function getLocation()
{
if (navigator.geolocation)
    {
    navigator.geolocation.watchPosition(showPosition);
    }
else{x.innerHTML="Geolocation is not supported by this browser.";}

}



function showPosition(position)
{
    USERX = position.coords.latitude;
    USERY = position.coords.longitude;
}



function convertISS()
{

    var  ecef = new Array(3);
    var  latitude,longitude,height;
    var  sans;

    var  dtr = Math.PI/180;

    CallCount = CallCount + 1;

    latitude =  ISSX;
    longitude=  ISSY;
    height   =  ISSZ;

    latitude = Number(latitude);
    longitude= Number(longitude);
    height   = Number(height);

    good =  goodnum(latitude) && goodnum(longitude) && goodnum(height);
    
    if ( !good ) sans = sans+"\nInvalid Numeric Input \n"

    if ( good )
    {

    ecef  = llhxyz(latitude,longitude,height);
    isx     = ecef[0];
    isy     = ecef[1];
    isz     = ecef[2];
    console.log(isx,isy,isz)
    distanceequation()
}
}



function ConvertLocation(){
    var  ecef = new Array(3);
    var  latitude,longitude,height;
    
    var  sans;

    var  dtr = Math.PI/180;

    CallCount = CallCount + 1;

    latitude =  USERX;
    longitude=  USERY;
    height   =  1;
    latitude = Number(latitude);
    longitude= Number(longitude);
    height   = Number(height);
    console.log(latitude,longitude)
     hkm      = 0.001 * height

    good =  goodnum(latitude) && goodnum(longitude) && goodnum(hkm);
    
    if ( !good ) sans = sans+"\nInvalid Numeric Input \n"

    if ( good )
    {

    sans = " \n";

    ecef  = llhxyz(latitude,longitude,hkm);
    x     = ecef[0];
    y     = ecef[1];
    z     = ecef[2];


}
}



function bangarang() {
    fetch('https://api.wheretheiss.at/v1/satellites/25544')
    .then(response => response.json())
    .then(function(data){
        ISSX = data.latitude
        ISSY = data.longitude
        ISSZ = data.altitude
        convertISS()
        ConvertLocation()
        ;})


}
