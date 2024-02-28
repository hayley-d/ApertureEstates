
//Search Type
let searchType = "sales";

//Search Arrays
let searchArray = [];


const searchInput = document.querySelector('input[type="search"]');
const buyButton = document.getElementById('buy-search-btn');
const rentButton = document.getElementById('rent-search-btn');

function search(rental,location){
    //get filter values
    let minBedrooms = document.getElementById('minBedrooms').value;
    let maxBedrooms = document.getElementById('maxBedrooms').value;
    let minBathrooms = document.getElementById('minBathrooms').value;
    let maxBathrooms = document.getElementById('maxBathrooms').value;
    let minPrice = document.getElementById('minBathrooms').value;
    let maxPrice = document.getElementById('maxBathrooms').value;
    if(minBedrooms === "")
    {
        minBedrooms = -1;
    }
    else{
        minBedrooms = parseInt(minBedrooms,10);
    }
    if(maxBedrooms === "")
    {
        maxBedrooms = -1;
    }
    else{
        maxBedrooms = parseInt(maxBedrooms,10);
    }

    if(minBathrooms === "")
    {
        minBathrooms = -1;
    }
    else{
        minBathrooms = parseInt(minBathrooms,10);
    }
    if(maxBathrooms === "")
    {
        maxBathrooms = -1;
    }
    else{
        maxBathrooms = parseInt(maxBathrooms,10);
    }

    if(minPrice === "")
    {
        minPrice = -1;
    }
    else{
        minPrice = parseInt(minPrice,10);
    }
    if(maxPrice === "")
    {
        maxPrice = -1;
    }
    else{
        maxPrice = parseInt(maxPrice,10);
    }
    //rental is a boolean value
    if(rental){
        searchArray = rentals;
    }
    else{
        searchArray = sales;
    }

    //Step 1: Declare array
    searchArray = rentals;

    //Step 2: Search Array for property search
    searchArray = searchArray.filter(property => {
        property.location.toLowerCase().includes(location.toLowerCase()) ||
        property.title.toLowerCase().includes(location.toLowerCase())
    });

    //Step 3: Apply filters
    searchArray = filter(searchArray,minBedrooms,minBathrooms,minPrice,maxBedrooms,maxBathrooms,maxPrice);

    //Step 4: Apply sort
    const sortOption = document.getElementsByClassName('sortBy')[0];
    console.log(sortOption.textContent);
    if(sortOption.textContent === 'Ascending Title'){
        searchArray = sortAscendingTitle(searchArray);
    }
    else if(sortOption.textContent === 'Descending Title'){
        searchArray = sortDescendingTitle(searchArray);
    }
    else if(sortOption.textContent === 'Highest Price'){
        searchArray = sortHieghestPrice(searchArray);
    }
    else if(sortOption.textContent === 'Lowest Price'){
        searchArray = sortLowestPrice(searchArray);
    }

    //Step 5: Display the searched results
    displayContentCards(searchArray);
}

//Add event listeners to the buttons
buyButton.addEventListener('click', function() {
    const location = searchInput.value.trim(); // Trim removes any leading or trailing whitespace
    const message = document.getElementById('no-content-message');
    if(message)
    {
        message.remove();
    }
    search(false,location);
});

rentButton.addEventListener('click', function() {
    const location = searchInput.value.trim(); // Trim removes any leading or trailing whitespace
    const message = document.getElementById('no-content-message');
    if(message)
    {
        message.remove();
    }
    search(true,location);
});