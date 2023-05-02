$(function() {
    //TODO: add variables for each element we want to change
    var searchResult = document.querySelector(".foodlist")
    var cardArea = document.querySelector("#card-display")
    //global vars
    apiKeyUSDA = "s3qx66RYtQUg347PE1INNkwT7uxfU4Ht9YacRcaX"
    var apiUrlUSDA_ID = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=s3qx66RYtQUg347PE1INNkwT7uxfU4Ht9YacRcaX"
    var apiUrlUSDA_Nutrtition =" https://api.nal.usda.gov/fdc/v1/food/"
    var searchResultList = [];
    var cardFoodList = [];
    const NUMBEROFSEARCHRESULTS = 5

    /*https://api.nal.usda.gov/fdc/v1/foods/search?query=%22cheddar%20cheese%22&api_key=s3qx66RYtQUg347PE1INNkwT7uxfU4Ht9YacRcaX
    */
    //Function that takes in a string input representing
    //a food, and then returns the full unmodified JSON 
    //api response from the USDA api
    async function getFoodItemFromAPI(foodName){
        return fetch(apiUrlUSDA_ID + "&query=" + foodName)
            .then((response)=>response.json())
            .then((responseJson)=>{return responseJson});
    }

    //TODO: Now that we have the data, what do we want to do with it? We can 
    ///* https://api.nal.usda.gov/fdc/v1/food/######?api_key=DEMO_KEY  */
    //Function that takes in a valid fdcID
    //and then returns the full unmodified JSON
    //api response from the USDA api
    async function getFoodNutritionalDataFromAPI(fdcID){
        return fetch(apiUrlUSDA_Nutrtition + fdcID + "?api_key=s3qx66RYtQUg347PE1INNkwT7uxfU4Ht9YacRcaX")
            .then((response)=>response.json())
            .then((responseJson)=>{return responseJson});
    }

    function renderSearchResult(){
    searchResult.innerHTML = "";
        for (var i = 0; i < NUMBEROFSEARCHRESULTS; i++) {
            var searchItem = searchResultList[i];
        
            var li = document.createElement("li");
            li.textContent = searchItem.description;
            li.setAttribute("data-index", i);
        
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
            calories = -1;
            var listLength = cardFoodList[i].foodNutrients.length
            var nutrientsList = cardFoodList[i].foodNutrients

            for (var j = 0; j < listLength; j++){
              if (nutrientsList[j].nutrientName === "Energy"){
                if(nutrientsList[j].unitName === "KCAL"){
                  calories = cardFoodList[i].foodNutrients[j].nutrientNumber;
                }
                else{
                  calories = Math.round(cardFoodList[i].foodNutrients[j].nutrientNumber *  4.184);
                }
              }
            /*
            <div class="col-md-6">
            <div class="card">
                <div class="card-body">
                <h5 class="card-title">Nutritional Value:</h5>
                <h6 class="card-subtitle mb-2 text-muted"></h6>
                <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse fugiat veniam commodi
                    voluptatem accusamus possimus a fugit, consectetur iure doloribus? Nemo, molestias? Rerum, dignissimos
                    obcaecati
                    accusamus error voluptates doloribus repudiandae.</p>
                </div>
            </div>
            </div> */
            var cardColumn = document.createElement("div");
            cardColumn.className="col-md-6";

            var card = document.createElement("div");
            card.setAttribute("data-index", i);
            card.className="card";
            cardColumn.appendChild(card);
            
            var cardbody = document.createElement("div");
            cardbody.className="card-body";
            card.appendChild(cardbody);

            var h5 = document.createElement("h5");
            h5.className="card-title";
            h5.textContent = name;
            cardbody.appendChild(h5)

            var h6 = document.createElement("h6") ;
            h6.className="card-subtitle mb-2 text-muted";
            cardbody.appendChild(h6)

            var p = document.createElement("p") 
            p.className="card-text"
            p.textContent = calories;
            cardbody.appendChild(p)

            var button = document.createElement("button");
            button.className="btn btn-primary"
            button.textContent = "Remove ❌";
            cardbody.appendChild(button)

            cardArea.appendChild(cardColumn);
        }
    }
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
        fdcID = json.foods[0].fdcId
        const nutritionalJson = await getFoodNutritionalDataFromAPI(fdcID);
        return nutritionalJson
    }

    async function getFoodImage(foodName) {
        const pexelApiKey = "btswoiW3mp5wsoSHAYVfvUWbUsOJheXW6CkbbYMmv9XVfxUm47vIor6N"
        const url = "https://api.pexels.com/v1/search?page=1&query=" + foodName

        fetch(url, {
            headers: new Headers({
                'Authorization': pexelApiKey
            }),
        }).then(response => response.json()).then(result => {
            console.log(result)
            $("#nutritional-card").empty().prepend(`
            <div class="pexel-img">
                <img src="${result.photos[0].src.original}" height="300" width="300"/>
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
            // Get its data-index value and remove the todo element from the list
            var index = event.target.parentElement.getAttribute("data-index");
            cardFoodList.push(searchResultList[index])
            renderCards();
        }
    });
});
