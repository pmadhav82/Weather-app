const form = document.querySelector(".container form");
let userInput = form.querySelector("input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
let mykey = "2e8f0a7dd3688402b0ad036b43641a69";
let display =document.querySelector(".display");


form.addEventListener("submit",ev=>{
  ev.preventDefault();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${userInput.value}&appid=${mykey}&units=metric`;
 //check if item is already there or not
 let listItem = document.querySelector(".cities");
 
 
  fetch(url).then(response=>{
   if(response.status>=200&& response.status<300){
     return response.json();
   }else{
     throw new Error("Invalid input..");
   }
 }).then(responsedData=>{
   let cityName = responsedData.name;
   let country = responsedData.sys.country;

   let weatherDes = responsedData.weather[0]["description"];
   let temp = Math.round(responsedData.main.temp);
   let icon = 
   `http://openweathermap.org/img/wn/${responsedData.weather[0]["icon"]}@2x.png`;
let li = document.createElement("li");
li.classList.add("city");

let html =`
<button class="delete">❌</button>
<h2 class = "city-name" data-name="${cityName},${country}">
<span>${cityName}</span>
<sup>${country}</sup>
</h2>
<div class="city-temp">${Math.round(temp)}<sup>°C</sup></div>
<figure>

<img class="city-icon" src="${icon}" alt="${
weatherDes
}">
<figcaption>${responsedData.weather[0]["description"]}</figcaption>
</figure>
`;
li.innerHTML = html;
list.appendChild(li);
let delButton = document.querySelectorAll(".delete");
for(let btn of delButton){
  btn.addEventListener("click",()=>{
    li.style.display = "none";
  })
}
})
 .catch(er=>{
   alert(er);
 })
 userInput.value = "";

})
