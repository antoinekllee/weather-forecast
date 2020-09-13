// Access to fetch at 'https://www.metaweather.com/api/location/search/?query=sin' from origin 'http://127.0.0.1:5500' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.If an opaque response serves your needs, set the request's mode to 'no - cors' to fetch the resource with CORS disabled.

let cityInput = document.getElementById ("cityInput")
let cityDropdown = document.getElementById ("cityDropdown")
let cityInfo = document.getElementById ("cityInfo")

let UpdateCityDropdown = async () => 
{
    let response = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${cityInput.value}`)
    let json = await response.json()

    cityDropdown.innerHTML = '<option>None</option>\n'
    json.map((city) => 
    {
        cityDropdown.innerHTML += `<option>${city.title}</option>\n`
    })
}

let CheckWeatherForecast = async () => 
{
    if (cityDropdown.value == "None")
    {
        alert ("Please select a city")
        return
    }

    let response = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${cityDropdown.value}`)
    let json = await response.json()

    console.log (json[0].woeid)

    GetCityData(woeid = json[0].woeid)
}

let GetCityData = async (woeid) => 
{
    let response = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`)
    let json = await response.json()
    
    cityInfo.innerHTML = ''
    cityInfo.innerHTML = `<h1>${json.title}</h1>`
    
    console.log(json.consolidated_weather[0])

    json.consolidated_weather.map ((elem) => 
    {
        cityInfo.innerHTML += `<h2>Date: ${elem.applicable_date}</h2>\n<h2>Weather State: ${elem.weather_state_name}</h2>\n<h2>Min Temp: ${elem.min_temp}</h2>\n<h2>Max Temp: ${elem.max_temp}</h2>`
    })
}

cityInput.addEventListener("change", UpdateCityDropdown);
cityDropdown.addEventListener("change", CheckWeatherForecast);







// let value = document.getElementById ("value")
// let exchangeFrom = document.getElementById ("exchangeFrom")
// let exchangeTo = document.getElementById ("exchangeTo")
// let displaySelected = document.getElementById ("displaySelection")
// let displayAll = document.getElementById ("displayAll")

// let GetCurrancyData = async (currencyFrom, currency, currencyTo) => {
//     let response = await fetch(`https://api.exchangerate-api.com/v4/latest/${currencyFrom}`)
//     let json = await response.json()
    
//     displaySelected.innerHTML = ''
//     displaySelected.innerHTML = `<h1>${currencyTo}: ${Math.floor(json.rates[currencyTo] * currency * 100) / 100}</h1>`
    
//     let ratesArray = Object.entries (json.rates) // Convert json.rates dictionary into array
    
//     displayAll.innerHTML = ''
//     ratesArray.map((object) => {
//         if (object[0] != currencyFrom && object[0] != currencyTo)
//         displayAll.innerHTML += `<p>${object[0]} : ${Math.floor(object[1] * currency * 100) / 100}</p>\n`
//     })
// }

// let UpdateData = () => {
//     currency = value.value
//     currencyFrom = exchangeFrom.options[exchangeFrom.selectedIndex].value
//     currencyTo = exchangeTo.options[exchangeTo.selectedIndex].value
//     GetCurrancyData(currencyFrom, currency, currencyTo)
// }

// exchangeFrom.addEventListener("change", UpdateData)
// value.addEventListener("change", UpdateData)
// exchangeTo.addEventListener("change", UpdateData)