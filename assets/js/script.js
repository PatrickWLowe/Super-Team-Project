//TODO: add variables for each element we want to change



//global vars
apiKeyUSDA = "s3qx66RYtQUg347PE1INNkwT7uxfU4Ht9YacRcaX"
var apiUrlUSDA_ID = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=s3qx66RYtQUg347PE1INNkwT7uxfU4Ht9YacRcaX"
var apiUrlUSDA_Nutrtition =" https://api.nal.usda.gov/fdc/v1/food/"
var foodName = "banana"


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
///* https://api.nal.usda.gov/fdc/v1/food/######?api_key=DEMO_KEY*/
//Function that takes in a valid fdcID
//and then returns the full unmodified JSON 
//api response from the USDA api
async function getFoodNutritionalDataFromAPI(fdcID){
    return fetch(apiUrlUSDA_Nutrtition + fdcID + "?api_key=s3qx66RYtQUg347PE1INNkwT7uxfU4Ht9YacRcaX")
        .then((response)=>response.json())
        .then((responseJson)=>{return responseJson});
}


/* This function gets the nutrition response JSON from the USDA api for the given food input */
async function getFoodNutritionFromAPI(foodName){
    const json = await getFoodItemFromAPI(foodName); 
    fdcID = json.foods[0].fdcId
    const nutritionalJson = await getFoodNutritionalDataFromAPI(fdcID);
    return nutritionalJson
}


//TODO: create a function that properly adjusts the ratios depending on the 
//user inputed weight/mass 
function parseUserInput(){

}

//


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



});