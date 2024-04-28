/*Hayley Dodkins u21528790*/
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
    let minPrice = document.getElementById('minPrice').value;
    let maxPrice = document.getElementById('maxPrice').value;
    // Convert empty strings to -1
    minBedrooms = minBedrooms === "" ? -1 : parseInt(minBedrooms, 10);
    maxBedrooms = maxBedrooms === "" ? -1 : parseInt(maxBedrooms, 10);
    minBathrooms = minBathrooms === "" ? -1 : parseInt(minBathrooms, 10);
    maxBathrooms = maxBathrooms === "" ? -1 : parseInt(maxBathrooms, 10);
    minPrice = minPrice === "" ? -1 : parseInt(minPrice, 10);
    maxPrice = maxPrice === "" ? -1 : parseInt(maxPrice, 10);

    const retrievedArrayAsString = sessionStorage.getItem('salesArray');
    const data = JSON.parse(retrievedArrayAsString);

    /*console.log(sessionStorage.getItem('salesArray'))*/
    //rental is a boolean value
    let searchArray = rental ? JSON.parse(sessionStorage.getItem('rentalArray')) : JSON.parse(sessionStorage.getItem('salesArray'));
    console.log(searchArray)

    //Step 1: Declare array
    console.log("Size of array "+searchArray.length)

    //Step 2: Search Array for property search if location was used
    if (location !== -1) {
        searchArray = searchArray.filter(property => {
            return property.location.toLowerCase().includes(location.toLowerCase()) ||
                property.title.toLowerCase().includes(location.toLowerCase());
        });
    }

    //Step 3: Apply filters if input was given
    searchArray = filter(searchArray, minBedrooms, minBathrooms, minPrice, maxBedrooms, maxBathrooms, maxPrice);


    //Step 4: Apply sort
    const sortOption = document.getElementsByClassName('sortBy')[0];
    if (sortOption) { // Check if a sort option is selected
        if (sortOption.textContent === 'Ascending Title') {
            searchArray = sortAscendingTitle(searchArray);

        } else if (sortOption.textContent === 'Descending Title') {
            searchArray = sortDescendingTitle(searchArray);
        } else if (sortOption.textContent === 'Highest Price') {
            searchArray = sortHieghestPrice(searchArray);
        } else if (sortOption.textContent === 'Lowest Price') {
            searchArray = sortLowestPrice(searchArray);
        }
    }

    //Step 5: Display the searched results
    var func = !rental ? displayContentCards : displayRentals;
    func(searchArray);
}

//Add event listeners to the buttons
buyButton.addEventListener('click', function()
{
    currSearch = 'sale';
    //fetchSales();
    let location = searchInput.value.trim(); // Trim removes any leading or trailing whitespace
    const message = document.getElementById('no-content-message');
    if(message)
    {
        message.remove();
    }
    if (location === '') {
        location = -1; // Set location to -1 if search location is empty
    }
    const button = document.getElementById('incPage');
    const button2 = document.getElementById('decPage');
    button.disabled = false;
    button2.disabled = false;
    search(false, location);
});

rentButton.addEventListener('click', function() {
    currSearch = 'rent';
    //fetchRentalsData();
    let location = searchInput.value.trim(); // Trim removes any leading or trailing whitespace
    let message = document.getElementById('no-content-message');
    if(message)
    {
        message.remove();
    }
    if (location === '') {
        location = -1; // Set location to -1 if search location is empty
    }
    const button = document.getElementById('incPage');
    const button2 = document.getElementById('decPage');
    button.disabled = false;
    button2.disabled = false;
   search(true,location);
});

function searchPage(rental,location){
    //get filter values
    let minBedrooms = document.getElementById('minBedrooms').value;
    let maxBedrooms = document.getElementById('maxBedrooms').value;
    let minBathrooms = document.getElementById('minBathrooms').value;
    let maxBathrooms = document.getElementById('maxBathrooms').value;
    let minPrice = document.getElementById('minPrice').value;
    let maxPrice = document.getElementById('maxPrice').value;
    // Convert empty strings to -1
    minBedrooms = minBedrooms === "" ? -1 : parseInt(minBedrooms, 10);
    maxBedrooms = maxBedrooms === "" ? -1 : parseInt(maxBedrooms, 10);
    minBathrooms = minBathrooms === "" ? -1 : parseInt(minBathrooms, 10);
    maxBathrooms = maxBathrooms === "" ? -1 : parseInt(maxBathrooms, 10);
    minPrice = minPrice === "" ? -1 : parseInt(minPrice, 10);
    maxPrice = maxPrice === "" ? -1 : parseInt(maxPrice, 10);

    const retrievedArrayAsString = sessionStorage.getItem('salesArray');
    const data = JSON.parse(retrievedArrayAsString);

    /*console.log(sessionStorage.getItem('salesArray'))*/
    //rental is a boolean value
    let searchArray = rental ? getPageItemsRentals() : getPageItems();
    console.log(searchArray)

    //Step 1: Declare array
    console.log("Size of array "+searchArray.length)

    //Step 2: Search Array for property search if location was used
    if (location !== -1) {
        searchArray = searchArray.filter(property => {
            return property.location.toLowerCase().includes(location.toLowerCase()) ||
                property.title.toLowerCase().includes(location.toLowerCase());
        });
    }

    //Step 3: Apply filters if input was given
    searchArray = filter(searchArray, minBedrooms, minBathrooms, minPrice, maxBedrooms, maxBathrooms, maxPrice);


    //Step 4: Apply sort
    const sortOption = document.getElementsByClassName('sortBy')[0];
    if (sortOption) { // Check if a sort option is selected
        if (sortOption.textContent === 'Ascending Title') {
            searchArray = sortAscendingTitle(searchArray);

        } else if (sortOption.textContent === 'Descending Title') {
            searchArray = sortDescendingTitle(searchArray);
        } else if (sortOption.textContent === 'Highest Price') {
            searchArray = sortHieghestPrice(searchArray);
        } else if (sortOption.textContent === 'Lowest Price') {
            searchArray = sortLowestPrice(searchArray);
        }
    }

    //Step 5: Display the searched results
    var func = !rental ? displayContentCards2 : displayRentals2;
    func(searchArray);
}