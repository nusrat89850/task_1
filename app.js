//12 cards in home page
function fetchAllDrink() {
  
let URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=cocktail";
  fetch(URL)
    .then((res) => res.json())
    .then((drinks) => showAllDrink(drinks.drinks));
  
} 
function showAllDrink(drinks) {
  console.log("Show drink: ", drinks);
  //nndrink.classList.add("invisible");
  for (let drink of drinks.slice(0,12)) {
    document.querySelector(".all-drinks").innerHTML += `
        <div class="drink-box border border-gray-500 rounded-xl">
        <img src=${drink.strDrinkThumb} alt=${
      drink.strDrinkThumb
    } class="rounded h-[200px] w-full object-cover">
         <div class="p-3">
            <h3 class="heading text-2xl text-white"> ${drink.strDrink}</h3>
            <p class="text-gray-400 my-2">${drink.strInstructions.slice(
              0,
              100
            )}... </p>
            <button class="mt-5 text-white  bg-orange-500 hover:bg-orange-700 taxt-white px-4 py-2 rounded-xl" onClick="lookUpDetails('${
              drink.idDrink
            }')">View Details</button>
         </div> 
      </div>
        `;
  }
}
fetchAllDrink();

// Searched Drinks Wrapper

const searchDrink = document.getElementById("input");

function fetchDrink() {
  if (searchDrink.value) {
    let URL = `https://thecocktaildb.com/api/json/v1/1/search.php?s=${searchDrink.value}`;
    fetch(URL)
      .then((res) => res.json())
      .then((drinks) => showDrink(drinks.drinks));
    document.getElementById("nndrink").style.display = "none";
    document.querySelector(".drink-wrapper").innerHTML = " ";
  } else {
    alert("Search for a drink first");
    document.getElementById("noDrink").style.display = "block";
  }
}

function showDrink(drinks) {
  console.log("Show drink: ", drinks);
  for (let drink of drinks) {
    document.querySelector(".drink-wrapper").innerHTML += `
        <div class="drink-box border border-gray-500 rounded-xl">
        <img src=${drink.strDrinkThumb} alt=${
      drink.strDrinkThumb
    } class="rounded h-[200px] w-full object-cover">
         <div class="p-3">
            <h3 class="heading text-2xl text-white"> ${drink.strDrink}</h3>
            <p class="text-gray-400 my-2">${drink.strInstructions.slice(
              0,
              100
            )}... </p>
            <button class="mt-5 text-white  bg-orange-500 hover:bg-orange-700 taxt-white px-4 py-2 rounded-xl" onClick="lookUpDetails('${
              drink.idDrink
            }')">View Details</button>
         </div> 
      </div>
        `;
  }
}

// pop-up cocktail details by id

function lookUpDetails(id) {
  console.log("Look Up", id);
  let URL = `https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(URL)
    .then((res) => res.json())
    .then((drinks) => showDrinkDetails(drinks.drinks[0]));
}

function showDrinkDetails(drink) {
  console.log(drink);
  const details = document.getElementById("details");
  details.classList.add("visible");
  details.classList.remove("invisible");

  details.innerHTML = `
      <div class="pop-up bg-white w-64 p-6 rounded shadow-lg w-[70%] h-[600px]">
        <h2 class="text-xl font-bold mb-4">${drink.strDrink}</h2>
        <p class="mb-4">${drink.strInstructions}</p>
        <button onclick="closeDetails()" class="bg-black hover:bg-gray-600 text-white px-4 py-2 rounded ml-1 cursor">Close</button> 
        
      </div>
    `;
}
function closeDetails() {
  const details = document.getElementById("details");
  details.classList.add("invisible");
  details.classList.remove("visible");
}
const search = document.getElementById("search");
search.addEventListener("click", () => {
  fetchDrink();
});
