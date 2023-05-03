//TODO: add variables for each element we want to change
var searchResult = document.querySelector(".foodlist")
var cardArea = document.querySelector("#card-display")
//global vars
apiKeyUSDA = "s3qx66RYtQUg347PE1INNkwT7uxfU4Ht9YacRcaX"
var apiUrlUSDA_ID = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=s3qx66RYtQUg347PE1INNkwT7uxfU4Ht9YacRcaX"
var apiUrlUSDA_Nutrtition =" https://api.nal.usda.gov/fdc/v1/food/"
const NUMBEROFSEARCHRESULTS = 5;
var searchResultList = [];
localStorage.clear();
var userMeasurement = [];
if (JSON.parse(localStorage.getItem('userMeasurement'))!== null){
    userMeasurement = JSON.parse(localStorage.getItem('userMeasurement'));}

var imageList= [];
if (JSON.parse(localStorage.getItem('imageList'))!== null){
    imageList = JSON.parse(localStorage.getItem('imageList'));}
var cardFoodList = [];
if (JSON.parse(localStorage.getItem('cardFoodList'))!== null){
    cardFoodList = JSON.parse(localStorage.getItem('cardFoodList'));
    renderCards();
}



    /*https://api.nal.usda.gov/fdc/v1/foods/search?query=%22cheddar%20cheese%22&api_key=s3qx66RYtQUg347PE1INNkwT7uxfU4Ht9YacRcaX
    */
    //Function that takes in a string input representing
    //a food, and then returns the full unmodified JSON 
    //api response from the USDA api
    async function getFoodItemFromAPI(foodName){
        return fetch(apiUrlUSDA_ID + "&query=" + foodName +"&dataType=Foundation")
            .then((response)=>response.json())
            .then((responseJson)=>{return responseJson});
    }

    //TODO: Now that we have the data, what do we want to do with it? We can 
    ///* https://api.nal.usda.gov/fdc/v1/food/######?api_key=DEMO_KEY  */
    //Function that takes in a valid fdcID
    //and then returns the full unmodified JSON
    //api response from the USDA api

    function renderSearchResult(){
    searchResult.innerHTML = "";
        for (var i = 0; i < NUMBEROFSEARCHRESULTS; i++) {
            var searchItem = searchResultList[i];
            if (searchItem == null){
                break;
            }
        
            var li = document.createElement("li");
            li.setAttribute("data-index-search",i);
            var div = document.createElement("div");
            div.setAttribute("style", "overflow: hidden; text-overflow: ellipsis; white-space: nowrap;") 
            div.setAttribute("title", searchItem.description)
            div.textContent = searchItem.description;
            li.appendChild(div);

            var button = document.createElement("button");
            button.className="btn btn-primary"
            button.textContent = "Log 🪵";
            li.appendChild(button);
            
            searchResult.appendChild(li);
        }
    }

function renderCards(){
    cardArea.innerHTML = "";
    for (var i = 0; i < cardFoodList.length; i++) {
        var name =  cardFoodList[i].description

        //get calories for each food
        var calories = 0;
        var carbs = 0;
        var protein = 0;
        var transfat = 0;
        var saturatedfat = 0;
        var listLength = cardFoodList[i].foodNutrients.length
        var nutrientsList = cardFoodList[i].foodNutrients
        var measurementRatio=  userMeasurement[i] /100; 
            for (var j = 0; j < listLength; j++){
              if (nutrientsList[j].nutrientNumber === "208" || nutrientsList[j].nutrientNumber === "958"){//208 is the nutrientNumber for Energy in KCAL
              
                calories = cardFoodList[i].foodNutrients[j].value *measurementRatio ;
              }

              if (nutrientsList[j].nutrientNumber === "205"){//208 is the nutrientNumber for Energy in KCAL
              
                carbs = cardFoodList[i].foodNutrients[j].value *measurementRatio ;
              }
              if (nutrientsList[j].nutrientNumber === "203"){//203 is the nutrientNumber for Energy in KCAL
              
                protein = cardFoodList[i].foodNutrients[j].value *measurementRatio ;
              }
              if (nutrientsList[j].nutrientNumber === "605"){//605 is the nutrientNumber for Energy in KCAL
              
                transfat = cardFoodList[i].foodNutrients[j].value *measurementRatio ;
              }
              if (nutrientsList[j].nutrientNumber === "606"){//605 is the nutrientNumber for Energy in KCAL
              
                saturatedfat = cardFoodList[i].foodNutrients[j].value *measurementRatio ;
              }
            }
          
            var cardColumn = document.createElement("div");
            cardColumn.className="col-md-6";

            var card = document.createElement("div");
            card.setAttribute("data-index", i);
            card.className="card";
            cardColumn.appendChild(card);
            
            var img = document.createElement("img");
            img.className="card-img-top";
            img.setAttribute("src", imageList[i])
            img.setAttribute("alt", name)
            img.setAttribute("style", "width: 100%;  max-height: 250px; object-fit: cover;") 
            card.appendChild(img)
            
            
            var cardbody = document.createElement("div");
            cardbody.className="card-body";
            card.appendChild(cardbody);

            var h5 = document.createElement("h5");
            h5.className="card-title";
            h5.textContent = name;
            h5.setAttribute("style", "overflow: hidden; text-overflow: ellipsis; white-space: nowrap;") 
            h5.setAttribute("title", name)
            cardbody.appendChild(h5)

            var h6 = document.createElement("h6") ;
            h6.className="card-subtitle mb-2 text-muted";
            cardbody.appendChild(h6)

            var p = document.createElement("p") 
            p.textContent = "Calories: " + calories;
            p.className="card-text"
            cardbody.appendChild(p)

            var p = document.createElement("p") 
            p.textContent = "Carbohydrate: " +carbs;
            p.className="card-text"
            cardbody.appendChild(p)

            var p = document.createElement("p") 
            p.textContent = "Protein: " + protein;
            p.className="card-text"
            cardbody.appendChild(p)

            var p = document.createElement("p") 
            p.textContent = "TransFat: " + transfat;
            p.className="card-text"
            cardbody.appendChild(p)

            var p = document.createElement("p") 
            p.textContent = "SaturatedFat: " + saturatedfat;
            p.className="card-text"
            cardbody.appendChild(p)

            var button = document.createElement("button");
            button.className="btn btn-primary"
            button.textContent = "Remove ❌";
            cardbody.appendChild(button)

        cardArea.appendChild(cardColumn);
      }
}
cardArea.addEventListener("click", function(event) {
    var element = event.target;
    event.stopPropagation()
    if (element.matches("button") === true) {
        var index = element.parentElement.parentElement.getAttribute("data-index");
        console.log("Deleting :" + index)
        cardFoodList.splice(index, 1);
        userMeasurement.splice(index, 1);
        imageList.splice(index, 1);
        localStorage.clear();
        localStorage.setItem('imageList', JSON.stringify(imageList));
        localStorage.setItem('cardFoodList', JSON.stringify(cardFoodList));
        localStorage.setItem('userMeasurement', JSON.stringify(userMeasurement));
      renderCards();
    }
  });
/* This function gets the nutrition response JSON from the USDA api for the given food input */
async function getFoodNutritionFromAPI(foodName){
    const json = await getFoodItemFromAPI(foodName); 
    console.log("json data")
    console.log(json)
    searchResultList = [];
    for (var i = 0; i < NUMBEROFSEARCHRESULTS; i++){
        searchResultList.push(json.foods[i])
    }
    
    renderSearchResult();
    //storeSearchResult();
    /*
    fdcID = json.foods[0].fdcId
    const nutritionalJson = await getFoodNutritionalDataFromAPI(fdcID);
    return nutritionalJson*/
}



    async function getFoodImage(foodName) {
        const pexelApiKey = "btswoiW3mp5wsoSHAYVfvUWbUsOJheXW6CkbbYMmv9XVfxUm47vIor6N"
        const url = "https://api.pexels.com/v1/search?page=1&query=" + foodName + " food"

        fetch(url, {
            headers: new Headers({
                'Authorization': pexelApiKey
            }),
        }).then(response => response.json()).then(result => {
            console.log(result)
            $("#search-image").empty().prepend(`
            <div>
                <img class="pexel-img" src="${result.photos[0].src.original}" style="width: 100%;  max-height: 250px; object-fit: cover;"/>
                <a href="https://www.pexels.com">Photos provided by Pexels</a>
            </div>
            `)

        })
    }

    //TODO: create a function that properly adjusts the ratios depending on the 
    //user inputed weight/mass 
    function parseUserInput(){

    }

    document.getElementById("search-form").addEventListener("submit", async function(e) {
        e.preventDefault();
        var searchText = document.getElementById("search-input").value.trim();
        var array = searchText.split(' ')
        console.log(array)
        var mass = Number(array[0].match(/\d+/))
        var foodName = array[1]

        // Return from function early if is blank
        if (searchText === "") {
        return;
        }
        const response = await getFoodNutritionFromAPI(searchText)
        console.log(response)
        getFoodImage(searchText)
    });

    searchResult.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation()
        // Checks if element is a button
        if (event.target.matches("button") === true) {
            var index = event.target.parentElement.getAttribute("data-index-search");
            cardFoodList.push(searchResultList[index])
            imageList.push(document.querySelector(".pexel-img").getAttribute("src"));
            userMeasurement.push(document.getElementById("search-input").value.trim().split(' ')[0].match(/\d+/));
            localStorage.setItem('imageList', JSON.stringify(imageList));
            localStorage.setItem('cardFoodList', JSON.stringify(cardFoodList));
            localStorage.setItem('userMeasurement', JSON.stringify(userMeasurement));
            console.log(imageList)
            console.log(cardFoodList)
            console.log(userMeasurement)

            renderCards();
        }
});

