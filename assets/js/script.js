//TODO: add variables for each element we want to change

apiKeyUSDA = "s3qx66RYtQUg347PE1INNkwT7uxfU4Ht9YacRcaX"
var apiUrlUSDA = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=s3qx66RYtQUg347PE1INNkwT7uxfU4Ht9YacRcaX"
var foodName = "banana"
/*https://api.nal.usda.gov/fdc/v1/foods/search?query=%22cheddar%20cheese%22&api_key=s3qx66RYtQUg347PE1INNkwT7uxfU4Ht9YacRcaX





 */
//TODO: add function that takes in a string input representing
//a food, and then returns the JSON api response from the USDA api
async function getFoodItemFromAPI(foodName){
    const response = await fetch(apiUrlUSDA + "&query=" + foodName);
    console.log(response.json())
}

//TODO: create a function that properly adjusts the ratios depending on the 
//user inputed weight/mass 
function getCorrectNutritionRatios(){

}

//
getFoodItemFromAPI(foodName)