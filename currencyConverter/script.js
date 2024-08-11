import { country_list } from "./countries.js";
const amount = document.getElementById('amount');
const amountError = document.getElementById("amountError");
const from = document.getElementById('from');
const to = document.getElementById('to');
const flagFrom = document.getElementById('flagfrom');
const flagTo = document.getElementById('flagto');
const convertBtn = document.getElementById('convertBtn');
const exchangeBtn = document.getElementById('exchangeIcon');
const currencyFrom = document.querySelectorAll(".currencyFrom");
const currencyTo = document.querySelectorAll(".currencyTo");
const currencyFromabb = document.querySelectorAll(".currencyFromabb");
const currencyToabb = document.querySelectorAll(".currencyToabb");
const resultFrom = document.getElementById("resultFrom")
const resultTo = document.getElementById("resultTo")
const priceFrom = document.getElementById("priceFrom")
const priceTo = document.getElementById("priceTo")

const keyApi = `078d52e9af0c55d041157abd`; //https://app.exchangerate-api.com
// console.log(`https://flagcdn.com/48x36/ua.png`);


Object.entries(country_list).forEach(([key, value]) => {
    let imgsrc = `https://flagcdn.com/48x36/${key.toLocaleLowerCase()}.png`;
    // console.log(imgsrc);
    
    let optionFrom = document.createElement('option')
    optionFrom.value = key;

    // console.log(optionFrom.value);
    // console.log(value[0]);
    // console.log(value[1]);
    
    optionFrom.textContent = `${value[0]} - ${value[1]}`;
    from.appendChild(optionFrom);

    let optionTo = document.createElement('option')
    optionTo.textContent = `${value[0]} - ${value[1]}`;
    optionTo.value = key;
    to.appendChild(optionTo)
})

from.addEventListener("change" , function (){
    const selectedCountry = this.value;
    if (selectedCountry) {
        flagFrom.src = `https://flagcdn.com/48x36/${selectedCountry.toLocaleLowerCase()}.png`;
        flagFrom.alt = `${this.value} flag`;
    }
})
to.addEventListener("change" , function (){
    const selectedCountry = this.value;
    if (selectedCountry) {
        flagTo.src = `https://flagcdn.com/48x36/${selectedCountry.toLocaleLowerCase()}.png`;
        flagTo.alt = `${this.value} flag`;
    }
})

exchangeBtn.addEventListener("click", function(){
    let fromCountry = from.value;
    let toCountry = to.value;

    [fromCountry, toCountry] = [toCountry, fromCountry]
    from.value = fromCountry
    to.value = toCountry
    
    flagFrom.src = `https://flagcdn.com/48x36/${fromCountry.toLocaleLowerCase()}.png`;
    flagFrom.alt = `${fromCountry} flag`;
    
    if (flagTo) {
        flagTo.src = `https://flagcdn.com/48x36/${toCountry.toLocaleLowerCase()}.png`;
        flagTo.alt = `${toCountry} flag`;
    }
})

convertBtn.addEventListener("click" , async e => {
    e.preventDefault();
    let amountValue = amount.value;
    if (isNaN(amountValue) || amountValue <= 0) {
        amountError.textContent = `Please enter a valid amount`;
        return;
    }else{
        amountError.textContent = ``;
        resultFrom.textContent = amount.value
    }
    // amount.value = '';

    let fromValue = from.value;
    let toValue = to.value;
    const fromCurrencyName = country_list[fromValue][1] 
    const toCurrencyName = country_list[toValue][1] 
    currencyFrom.forEach((cur) => {
        cur.textContent = fromCurrencyName;
    })
    currencyTo.forEach((cur) => {
        cur.textContent = toCurrencyName;
    })

    const fromCurrencyNameabb = country_list[fromValue][0] 
    const toCurrencyNameabb = country_list[toValue][0] 
    currencyFromabb.forEach((cur) => {
        cur.textContent = fromCurrencyNameabb;
    })
    currencyToabb.forEach((cur) => {
        cur.textContent = toCurrencyNameabb;
    })
    
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${keyApi}/latest/${fromCurrencyNameabb}`); 
        if (!response.ok) {
            throw new Error("something's wrong with the api");
        }
        const data = await response.json()
        // console.log(data);
        const result = await data.conversion_rates;
        console.log(result);
        let r = amount.value * result[toCurrencyNameabb];
        resultTo.textContent = `${r}`.length < 16 ? r : r.toFixed(8);
        // resultTo.textContent = r.toFixed(8);
        // resultTo.textContent = r;
        // console.log(result[toCurrencyNameabb]);

        priceTo.textContent = await result[toCurrencyNameabb]
        const secondResponse = await fetch(`https://v6.exchangerate-api.com/v6/${keyApi}/latest/${toCurrencyNameabb}`); 
        const secondData = await secondResponse.json();
        const secondResult = await secondData.conversion_rates;
        console.log(secondResult);
        priceFrom.textContent = await secondResult[fromCurrencyNameabb];
    } catch (error) {
        console.log(error);
        console.error(error);
        amountError.textContent = `something's wrong with the api`   
    }
})