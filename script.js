const showLocation = document.getElementById('show-location');
const errorLocation = document.getElementById('error-location');
const userLocation = document.getElementById('user-location');
const errorCounter = document.getElementById('counter')

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
        
    } else {
        errorLocation.innerHTML = 'Geolocation is not supported by this browser.';
    }
}

function showPosition(position) {
    let latlon = 'My latitude: ' + position.coords.latitude + '</br>' + 'My longitude: ' + position.coords.longitude;
    showLocation.innerHTML = latlon;
    allowedGeolocation()
}
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorLocation.innerHTML = 'User rejected Geolocation request.'
            deniedGeolocation()
            break;
        case error.POSITION_UNAVAILABLE:
            errorLocation.innerHTML = 'Location unavailable.'
            break;
        case error.TIMEOUT:
            errorLocation.innerHTML = 'Request timed out.'
            break;
        case error.UNKNOWN_ERROR:
            errorLocation.innerHTML = 'Some unknown error has happened.'
            break;
    }
    errorGeolocation()
}

async function allowedGeolocation() {
    const result = await fetch('https://api.countapi.xyz/update/clima/allowed?amount=1');
    const dataAllowed= await result.json();
    console.log(dataAllowed);
    
}

async function deniedGeolocation() {
    const result = await fetch('https://api.countapi.xyz/update/clima/denied?amount=1');
    const dataDenied= await result.json();
    console.log(dataDenied);

}

async function errorGeolocation() {
    const result = await fetch('https://api.countapi.xyz/update/clima/error?amount=1');
    const dataError= await result.json();
    console.log(dataError);
}

