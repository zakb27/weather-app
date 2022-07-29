let currentPosition;
const replacer = (item)=>{
    let current =Math.round (Number(item.main.feels_like)-273);
    document.querySelector(".feels").textContent=current.toString() + '°';
    document.querySelector(".humidity").textContent=item.main.humidity + '%';
    document.querySelector(".pressure").textContent=item.main.pressure + 'mb';
    current =Math.round (Number(item.main.temp_min)-273);
    document.querySelector(".min").textContent=current.toString() + '°';
    current = Math.round(Number(item.main.temp_max)-273);
    document.querySelector(".max").textContent=current.toString()+ '°';
    current = Math.round(Number(item.main.temp)-273);
    document.querySelector('.temp').textContent=current.toString()+ '°';
    document.querySelector('.smaller_location').textContent=item.name;
    document.querySelector('.weather').textContent=item.weather[0].main;
    document.querySelector('.weather_small').textContent=item.weather[0].description;
}

const empty = async()=>{
    document.querySelector(".feels").textContent='';
    document.querySelector(".humidity").textContent='';
    document.querySelector(".pressure").textContent='';
    document.querySelector(".min").textContent='';
    document.querySelector(".max").textContent='';
    document.querySelector('.temp').textContent='';
    document.querySelector('.smaller_location').textContent='';
    document.querySelector('.weather').textContent='';
    document.querySelector('.weather_small').textContent='';
}


async function test(item){
    try {
        const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=' + item + '&APPID=' + token);
        console.log(item);
        const info = await response.json();
        console.log(info);
        replacer(info);
    }
    catch(error){
        await empty();
        alert('Cannot input false location');
    }
}

async function currentData(item){
    try {
        const response = await fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + item.lat + '&lon=' + item.lng + '&APPID=' + token);
        const info = await response.json();
        console.log(info);
        replacer(info);
    }
    catch(error){
        await empty();
        alert('Location data error try again');
    }
}

const switchDisplay=()=>{

    if(value2.style.display==='none'){
        value2.style.display='flex'
        value.style.display='none';
    }
    else{
        value2.style.display = 'none';
        value.style.display='flex';
    }
}



async function mapDirection(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(await showPos);
    } else{
        alert("Sorry, browser does not support geolocation!");
    }
}
async function showPos(position){
    currentPosition = {lat:position.coords.latitude,lng:position.coords.longitude};
}


const form = document.querySelector('#form');
const second = document.querySelector('#search-input');
const value = document.querySelector('.enter_container');
const value2 = document.querySelector('.display');
const returns = document.querySelector('#switcher');
const current = document.querySelector('#current_location');
value2.style.display='none';
mapDirection();




form.addEventListener('submit',(event) =>{


    test(second.value);
    event.preventDefault();
    switchDisplay();
});



returns.addEventListener('click',() =>{

    second.value='';
    switchDisplay();
});


current.addEventListener('click',async() =>{

    await mapDirection();
    console.log(currentPosition);
    await currentData(currentPosition);
    switchDisplay();
});
