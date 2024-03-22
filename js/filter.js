/*Hayley Dodkins u21528790*/
//Filtered array
let filteredArray = [];


function filter(array,minBedrooms, minBathrooms, minPrice, maxBedrooms, maxBathrooms,maxPrice){
    filteredArray = array;

    //filter by bedrooms
    filterBedrooms(minBedrooms,maxBedrooms);

    //filter by bathrooms
    filterBathrooms(minBathrooms,maxBathrooms);

    //filter by price
    filterPrice(minPrice,maxPrice);

    return filteredArray;
}

function filterBedrooms(min,max){

        if(min !== -1){
            filteredArray = filteredArray.filter(property =>{
                return property.bedrooms >= min;
            });
        }
        if(max !== -1)
        {
            filteredArray = filteredArray.filter(property =>{
                return property.bedrooms <= max;
            });
        }
}

function filterBathrooms(min,max){
        if(min !== -1){
            filteredArray = filteredArray.filter(property =>{
                return property.bathrooms >= min;
            });
        }
        if(max !== -1)
        {
            filteredArray = filteredArray.filter(property =>{
                return property.bathrooms <= max;
            });
        }
}

function filterPrice(min,max){
        if(min !== -1){
            filteredArray = filteredArray.filter(property =>{
                return property.price >= min;
            });
        }
        if(max !== -1)
        {
            filteredArray = filteredArray.filter(property =>{
                return property.price <= max;
            });
        }
}
