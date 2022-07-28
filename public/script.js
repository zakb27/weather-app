
const replacer = (item)=>{
    document.querySelector(".feels").textContent=item.main.feels_like;
    document.querySelector(".humidity").textContent=item.main.humidity;
    document.querySelector(".pressure").textContent=item.main.pressure;
    document.querySelector(".min").textContent=item.main.temp_min;
    document.querySelector(".max").textContent=item.main.temp_max;
    document.querySelector('.temp').textContent=item.main.temp;
    document.querySelector('.temp').textContent=item.main.temp;
    document.querySelector('.smaller_location').textContent=item.name;
    document.querySelector('.weather').textContent=item.weather[0].main;
    document.querySelector('.weather_small').textContent=item.weather[0].description;
}



async function test(item='London'){
    const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q='+item+'&APPID='+token);
    console.log(item);
    const info = await response.json();
    console.log(info);
    replacer(info);
}

const switchDisplay=()=>{

    if(value2.style.display==='none'){
        value2.style.display='block'
        value.style.display='none';
    }
    else{
        value2.style.display = 'none';
        value.style.display='block';
    }
}



async function mapDirection(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPos);
    } else{
        alert("Sorry, browser does not support geolocation!");
    }
}
async function showPos(position){
    currentPosition = {"lat":position.coords.latitude,"lng":position.coords.longitude};
}


const form = document.querySelector('#form');
const second = document.querySelector('#search-input');
const value = document.querySelector('.enter_container');
const value2 = document.querySelector('.display');
const returns = document.querySelector('#switcher');
const current = document.querySelector('#current_location');
value2.style.display='none';

form.addEventListener('submit',(event) =>{
    switchDisplay();
    test(second.value);
    event.preventDefault();
});

returns.addEventListener('click',() =>{
    switchDisplay();
    second.value='';
});

current.addEventListener('click',async() =>{
    switchDisplay();
    await mapDirection();
    console.log(currentPosition);
    test(currentPosition);
});
