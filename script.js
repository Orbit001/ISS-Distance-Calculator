var ISSX
var ISSY
var ISSZ

var USERX = position.coords.latitude;
var USERY = position.coords.longitude;
var USERZ 
var  x,y,z
var  isx,isy,isz;
var answer
const counter = document.getElementById("greencounter")


function begin(){
    ConvertLocation();
    bangarang();
    
    setInterval(ConvertLocation, 2000);
    setInterval(bangarang, 2000);
}
function distanceequation(){
    answer = (Math.sqrt((x - isx)**2 + (y - isy)**2 + (z - isz)**2));
    tobeans()
}
function tobeans(){
    beans = answer/.0001016
    beansnodecimal = Math.trunc (beans);
    document.getElementById("greencounter").innerHTML = beansnodecimal + " green beans"
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


var CallCount= 0


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
}
distanceequation()
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

    console.log(x,y,z)
}}


    function bangarang() {
    fetch('https://api.wheretheiss.at/v1/satellites/25544')
    .then(response => response.json())
    .then(function(data){
        ISSX = data.latitude
        ISSY = data.longitude
        ISSZ = data.altitude
        // console.log(ISSX,ISSY,ISSZ)
            convertISS()
        ;})


}
