const city = document.querySelector('.cityinput input');
const card = document.querySelector(".card")
const form = document.querySelector(".cityinput")
const keyapi = ""; // get your api https://home.openweathermap.org/api_keys 
console.log(keyapi);

form.addEventListener("submit", async e =>{
    e.preventDefault();
    let cityvalue = city.value;
    if (cityvalue) {
        try {
            const dataweather = await getdataweather(cityvalue);
            weatherinfo(dataweather)
        } catch (error) {
            console.error(error);
            // displayerror(error)
            displayerror("Please write a readable city!")
            
        }
        
    } else {
        displayerror("Please enter a city name")
    }
}
);

function weatherinfo(data) {
    // const {name : cityn} = data
    const city =  document.createElement("h1");
    city.textContent = data.name;
    city.classList.add("cityname");

    const humidity=  document.createElement("p");
    humidity.textContent = `Humidity : ${data.main.humidity} %`;
    humidity.classList.add("humidity");

    const temp =  document.createElement("p");
    temp.textContent = `${(data.main.temp - 273.15).toFixed(1)} °C`;
    temp.classList.add("tempdegree");

    const description =  document.createElement("p");
    description.textContent = data.weather[0].description;
    description.classList.add("description");

    const weatherEmoji =  document.createElement("p");
    weatherEmoji.textContent = getEmoji(data.weather[0].id);
    weatherEmoji.classList.add("weatherEmoji");

    console.log(data);
    console.log(data.weather[0].id);

    

    card.textContent = "";
    card.appendChild(city);
    card.appendChild(humidity);
    card.appendChild(temp);
    card.appendChild(description);
    card.appendChild(weatherEmoji);

}

function getEmoji(id) {
    
    switch (true) {
        case (id >= 200) && (id <= 232):
            return '⛈'
            break;
        case (id >= 300) && (id <= 321):
            return '🌧'
            break;
        case (id >= 500) && (id <= 531):
            return '🌧'
            break;
        case (id >= 600) && (id <= 622):
            return '❄'
            break;
        case (id >= 701) && (id <= 781):
            return '🌫'
            break;
        case id === 800:
            return '☁'
            break;
        case (id >= 801) && (id <= 804):
            return '☁'
            break;
    
        default:
            return '❔';
    }
}

async function getdataweather(cityname) {
    try {
        const callApi = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${keyapi}`); 

        if (!callApi.ok) {
            displayerror('city name is wrong')
        }
        const data = await callApi.json();
        
        return data;

    } catch (error) {
        console.error(error);
        displayerror(error)
    }
};

function displayerror(error) {
    const errordisplay = document.createElement("p")
    errordisplay.textContent = error
    errordisplay.classList.add("error")
    
    card.textContent = "";
    card.style.display = 'grid'
    card.appendChild(errordisplay)
}