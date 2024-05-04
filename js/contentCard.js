/*Hayley Dodkins u21528790*/
var propertiesSale = [];
var propertiesRental = [];
var propertyAgents = [];
var favProperties = [];

var populatedProps = false;
var populatedRentals = false;
var populatedAgents = false;
//function takes in a property object and creates a property card for the object
function createContentCard(property)
{
    /*Create the container for the card*/
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('content-card-container');
    cardContainer.id = property.id;

    const card = document.createElement('div');
    card.classList.add('content-card');

    const propertyImage = document.createElement('div');
    propertyImage.classList.add('property-img');
    propertyImage.style.backgroundImage = `url('${property.images[0]}')`;
    let currentImageIndex = 0;
    /*Create inner arrows*/
    const prevArrow = document.createElement('div');
    prevArrow.classList.add('prev-arrow');
    const nextArrow = document.createElement('div');
    nextArrow.classList.add('next-arrow');

    /*add event listners*/
    prevArrow.addEventListener('click', () =>{
        currentImageIndex = (currentImageIndex - 1 + property.images.length) % property.images.length;
        if (currentImageIndex === property.images.length - 1) {
            currentImageIndex = (currentImageIndex - 1 + property.images.length) % property.images.length;
        }
        propertyImage.style.backgroundImage = `url('${property.images[currentImageIndex]}')`;
    });

    nextArrow.addEventListener('click', () =>{
        currentImageIndex = (currentImageIndex + 1) % property.images.length;
        if (currentImageIndex === property.images.length - 1) {
            currentImageIndex = (currentImageIndex + 1) % property.images.length;
        }
        propertyImage.style.backgroundImage = `url('${property.images[currentImageIndex]}')`;
    });
    //append arrows to the image div
    propertyImage.append(prevArrow,nextArrow);

    const propertyInfoContainer = document.createElement('div');
    propertyInfoContainer.classList.add('property-info-container');

    const propertyHeading = document.createElement('div');
    propertyHeading.classList.add('property-heading');

    /*Property Name Section of the card*/
    const propertyName = document.createElement('a');
    propertyName.textContent = property.title;
    propertyName.onclick = function(){
        const sepectedProperty = property;
        localStorage.setItem('selectedProperty',JSON.stringify(sepectedProperty));
        window.location.href = 'view.php';
    };
    const propertyNameDiv = document.createElement('div');
    propertyNameDiv.classList.add('property-name');
    propertyNameDiv.appendChild(propertyName);

    /*Favorite button*/
    const favButtonContainer = document.createElement('div');
    favButtonContainer.classList.add('fav-btn-container');

    const favButton = document.createElement('div');
    favButton.classList.add('fav-btn');

    if(isFavourite(property))
    {
        favButton.style.backgroundImage = `url('../img/Heart/red-heart.png')`;
        card.classList.add(`${property.type}`);
    }

    favButtonContainer.appendChild(favButton);

    favButton.addEventListener('click', function() {
        if(property.favorite === false)
        {
            // Update the property's favorite status
            property.favorite = true;

            // Change the heart to red
            favButton.style.backgroundImage = `url('../img/Heart/red-heart.png')`;

            favProperties.push(property);
            addFavourite(property.id,property);
        }
        else{
            property.favorite = false;

            // Change the heart to red
            favButton.style.backgroundImage = `url('../img/Heart/black-filled-heart.png')`;

            // Find the index of the property in favProperties
            /*const index = favProperties.findIndex(p => p.id === property.id);
            if (index !== -1) {
                // Remove the property from the favProperties array
                favProperties.splice(index, 1);
            }
            console.log(favProperties)*/
            removeFavourite(property.id,property);
        }
    });

    /*Property Location element*/
    const propertyLocationDiv = document.createElement('div');
    propertyLocationDiv.classList.add('property-location');
    propertyLocationDiv.textContent = property.location;

    /*Property Price element*/
    const propertyPriceDiv = document.createElement('div');
    propertyPriceDiv.classList.add('property-price');
    propertyPriceDiv.innerHTML = `<p>${formatAsZAR(property.price)}</p>`

    /*Property detains Elements*/
    const propertyDetails = document.createElement('div');
    propertyDetails.classList.add('property-details');
    const details = [
        { iconClass: 'bed-icon', value: property.bedrooms },
        { iconClass: 'bath-icon', value: property.bathrooms },
        { iconClass: 'car-icon', value: property.parking_spaces }
    ];
    details.forEach(detail=>{
        const detailDiv = document.createElement('div');
        const iconDiv = document.createElement('div');
        const valueDiv = document.createElement('div');

        iconDiv.classList.add(detail.iconClass);
        valueDiv.classList.add('detail-value');
        valueDiv.textContent = detail.value;
        detailDiv.appendChild(iconDiv);
        detailDiv.appendChild(valueDiv);
        propertyDetails.appendChild(detailDiv);
    });

    /*Property Description Elements*/
    const propertyDescDiv = document.createElement('div');
    propertyDescDiv.classList.add('property-desc');
    propertyDescDiv.innerHTML = `<p>${property.description}</p>`;

    /*Assemble*/
    propertyHeading.appendChild(propertyName);
    propertyHeading.appendChild(favButtonContainer);

    propertyInfoContainer.appendChild(propertyHeading);
    propertyInfoContainer.appendChild(propertyLocationDiv);
    propertyInfoContainer.appendChild(propertyPriceDiv);
    propertyInfoContainer.appendChild(propertyDetails);
    propertyInfoContainer.appendChild(propertyDescDiv);

    card.appendChild(propertyImage);
    card.appendChild(propertyInfoContainer);

    cardContainer.appendChild(card);

    return cardContainer;
}



//function takes in an agent object and creates an agent card based off of the agent
function createAgentCard(agent)
{
    const agentCardcontainer = document.createElement('div');
    agentCardcontainer.classList.add('agent-card-container');

    const agentCard = document.createElement('div');
    agentCard.classList.add('agent-card');

    const agentInfo = document.createElement('div');
    agentInfo.classList.add('agent-info');

    const agentHeading = document.createElement('div');
    agentHeading.classList.add('agent-heading');
    agentHeading.innerHTML = `<p>${agent.name}</p>`;

    const agentDesc = document.createElement('div');
    agentDesc.classList.add('agent-desc');
    agentDesc.innerHTML = `<p>${agent.description}</p>`;

    //Append children to parent element
    agentInfo.appendChild(agentHeading);
    agentInfo.appendChild(agentDesc);

    /*Logo*/
    const agentLogoContainer = document.createElement('div');
    agentLogoContainer.classList.add('agent-logo-container');

    const agentLogo = document.createElement('div');
    agentLogo.classList.add('agent-logo');
    agentLogo.style.backgroundImage = `url('${agent.logo}')`;
    agentLogoContainer.appendChild(agentLogo);

    /*contact*/
    const agentContact = document.createElement('div');
    agentContact.classList.add('agent-contact');

    const agentWebsite = document.createElement('div');
    agentWebsite.classList.add('agent-website');

    const websiteLink = document.createElement('a');
    websiteLink.href = `${agent.url}`;
    websiteLink.textContent = agent.url;
    agentWebsite.appendChild(websiteLink);

    /*assemble*/
    agentContact.appendChild(agentWebsite);

    agentCard.appendChild(agentInfo);
    agentCard.appendChild(agentLogoContainer);
    agentCard.appendChild(agentContact);

    agentCardcontainer.appendChild(agentCard);

    return agentCardcontainer;
}


//Function below is used to delete current populated cards so that new cards can be loaded and populated based on a sort or filter
function deleteCards()
{
    console.log("Deleting cards....")
    $('.content-card-container').remove();
}

function deleteAgentCards()
{
    //delete current cards
    const cards = document.getElementsByClassName("agent-card-container");
    const cardsArray = Array.from(cards);

    cardsArray.forEach(function(card) {
        card.remove();
    });

}

//Function to display all the content cards
function displayContentCards(array)
{
   /* console.log(array)*/
    propertiesSale = [];
    for(var i = 0; i < array.length; i++){
        propertiesSale.push(array[i]);
    }
    //const retrievedArrayAsString = sessionStorage.getItem('salesArray');
    sessionStorage.setItem('salesArray2',JSON.stringify(array));
    //console.log(JSON.parse(retrievedArrayAsString))

    array = getPageItems();
    //console.log("For page " + sessionStorage.getItem('page')+ " ",array);

    toggleSpinner();
    const container = document.getElementById('listings-container');
    //Delete Existing cards
    deleteCards();
    console.log("All Cards have been Deleted.")


    //show message if array is empty
    if(array.length === 0)
    {
        const message = document.createElement('h2');
        message.id = 'no-content-message'
        message.style.display = 'flex';
        message.style.justifyContent = 'center';
        message.style.alignItems = 'center';
        message.style.height = '30vh';
        message.style.color = 'white';
        message.textContent = "Sorry no results found :("
        container.appendChild(message);
    }
    else{
        console.log("Looping through ",array);
        array.forEach(property=>{
            //create the new card
            const card = createContentCard(property);
            //add the card to the container
            container.appendChild(card);
        });
        console.log("Finished looping through");

    }

    //hide loading symbol
    toggleSpinner();
}

function displayRentals(array){
    /*console.log(array)
    for(var i = 0; i < array.length; i++){
        propertiesRental.push(array[i]);
    }*/

    sessionStorage.setItem('rentalArray2',JSON.stringify(array));

    array = getPageItemsRentals();

    toggleSpinner();
    const container = document.getElementById('listings-container');
    //Delete Existing cards
    deleteCards();

    //show message if array is empty
    if(array.length === 0)
    {
        const message = document.createElement('h2');
        message.id = 'no-content-message'
        message.style.display = 'flex';
        message.style.justifyContent = 'center';
        message.style.alignItems = 'center';
        message.style.height = '30vh';
        message.style.color = 'white';
        message.textContent = "Sorry no results found :("
        container.appendChild(message);
    }
    else{
        array.forEach(property=>{
            //create the new card
            const card = createContentCard(property);
            //add the card to the container
            container.appendChild(card);
        });
    }

    //hide loading symbol
    toggleSpinner();
}
function displayAgentCards(array)
{
    if(!populatedAgents)
    {
        console.log(array.length)
        for(var i = 0; i < array.length; i++){
            propertyAgents.push(array[i]);
        }
        populatedAgents = true;
    }

    console.log(array)
    //Show loading symbol
    toggleSpinner();
    const container = document.getElementById('agents-container');
    //Delete Existing cards
    deleteAgentCards();

    //show message if array is empty
    if(agents.length === 0)
    {
        const message = document.createElement('h2');
        message.id = 'no-content-message'
        message.style.display = 'flex';
        message.style.justifyContent = 'center';
        message.style.alignItems = 'center';
        message.style.height = '30vh';
        message.style.color = 'white';
        message.textContent = "Sorry no results found :("
        container.appendChild(message);
    }
    else{
        propertyAgents.forEach(agent=>{
            //create the new card
            const card = createAgentCard(agent);

            //add the card to the container
            container.appendChild(card);
        });
    }

    //hide loading symbol
    toggleSpinner();
}

function displayAgent(array)
{
    if(!populatedAgents)
    {
        console.log(array.length)
        for(var i = 0; i < array.length; i++){
            propertyAgents.push(array[i]);
        }
        populatedAgents = true;
    }

}

function getPageItems()
{
    const retrievedArrayAsString = sessionStorage.getItem('salesArray2');
    const data = JSON.parse(retrievedArrayAsString);
    //console.log(data);

    const itemsPerPage = 20;
    const startIndex = (sessionStorage.getItem('page') - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
}

function getPageItemsRentals()
{
    const retrievedArrayAsString = sessionStorage.getItem('rentalArray2');
    const data = JSON.parse(retrievedArrayAsString);

    const itemsPerPage = 20;
    const startIndex = (sessionStorage.getItem('page') - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
}

//changes the view page for the correct data
function viewCard(property){
    console.log(property)
    //top container
    let currentImageIndex = 0;
    const houseImage = document.getElementById('house-image');
    houseImage.style.backgroundImage =`url('${property.images[currentImageIndex]}')`;

    //get the arrows
    const prevArrow = document.getElementsByClassName('prev-arrow')[0];
    const nextArrow = document.getElementsByClassName('next-arrow')[0];


    /*add event listners*/
    prevArrow.addEventListener('click', () =>{
        currentImageIndex = (currentImageIndex - 1 + property.images.length) % property.images.length;
        if (currentImageIndex === property.images.length - 1) {
            currentImageIndex = (currentImageIndex - 1 + property.images.length) % property.images.length;
        }
        houseImage.style.backgroundImage = `url('${property.images[currentImageIndex]}')`;
    });

    nextArrow.addEventListener('click', () =>{
        currentImageIndex = (currentImageIndex + 1) % property.images.length;
        if (currentImageIndex === property.images.length - 1) {
            currentImageIndex = (currentImageIndex + 1) % property.images.length;
        }
        houseImage.style.backgroundImage = `url('${property.images[currentImageIndex]}')`;
    });
    const heartButton = document.getElementById('heart');
    if(property.favorite === true)
    {
        //if it is a fav property make the heart red

        heartButton.style.backgroundImage = `url('../img/Heart/red-heart.png')`;
    }

    heartButton.addEventListener('click', function() {
        if(property.favorite===false)
        {
            // Update the property's favorite status
            property.favorite = true;

            // Change the heart to red
            heartButton.style.backgroundImage = `url('../img/Heart/red-heart.png')`;

            favProperties.push(property);
            console.log(favProperties)
        }
        else{
            property.favorite = false;

            // Change the heart to red
            heartButton.style.backgroundImage = `url('../img/Heart/black-filled-heart.png')`;

            // Find the index of the property in favProperties
            const index = favProperties.findIndex(p => p.id === property.id);
            if (index !== -1) {
                // Remove the property from the favProperties array
                favProperties.splice(index, 1);
            }
            console.log(favProperties)
        }
    });

    if(property.type==='rent')
    {
        propertyScore(property,true);
    }
    else{
        propertyScore(property,false);
    }

    //bottom container
    const listingName = document.getElementById('view-name');
    listingName.textContent = property.title;

    const price = document.getElementById('view-price');
    price.textContent = formatAsZAR(property.price)

    const location = document.getElementById('view-location');
    location.textContent = property.location;

    const beds = document.getElementById('view-beds-value');
    beds.textContent = property.bedrooms;

    const bath = document.getElementById('view-bath-value');
    bath.textContent = property.bathrooms;

    const parking = document.getElementById('view-car-value');
    parking.textContent = property.parking_spaces;

    const description = document.getElementById('view-desc');
    description.innerHTML = `<p>${property.description}</p>`;



    for(let feature of property.amenities){
        const outerDiv = document.createElement('div');
        const IconDiv = document.createElement('div');
        IconDiv.classList.add('location-icon');
        outerDiv.appendChild(IconDiv);
        const featureDiv = document.createElement('div');
        featureDiv.classList.add('feature');
        featureDiv.innerHTML = `<p>${feature}</p>`;
        outerDiv.appendChild(featureDiv);
        const grid = document.getElementById('view-features-grid');
        grid.appendChild(outerDiv);
    }
}

function isFavourite(property){
    return favourites.find(favourite => favourite.id === property.id) !== undefined;
}

function findAgent(agentName){
    return propertyAgents.find(agent => agent.name === agentName);
}

function formatAsZAR(number) {
    return 'R' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function colourCards(){
    //get all the cards
    let allCards = document.getElementsByClassName('content-card-container');
    let cardsArray = Array.from(allCards);

    cardsArray.forEach(function(card) {

    });
}

function propertyScore(property,isRental)
{
    const GREAT = 90;//min precentage
    const GOOD = 70;
    const MEH = 50;
    const BAD = 30;
    const VERYBAD = 0;

    const weights = {
        price: isRental ? 0.1 : 0.3, // Adjusted price weight for rentals
        bedrooms: 0.2,
        bathrooms: 0.2,
        parking: 0.1,
        amenities: 0.1,
        description: 0.1
    };

    var totalScore = 0;
    totalScore += weights.price * (isRental ? (property.price / 1000) : (property.price / 1000000)); // Brings all the properties to the same scale so I can assess equally
    totalScore += weights.bedrooms * property.bedrooms;
    totalScore += weights.bathrooms * property.bathrooms;
    totalScore += weights.parking * property.parking_spaces;
    totalScore += weights.amenities * (property.amenities.length > 8 ? 20 : 10);
    const keywords = ['ensuite', 'modern', 'beautiful','security'];
    totalScore += weights.description * (keywords.some(keyword => property.description.toLowerCase().includes(keyword)) ? 20 : 10);

    //get the wieghts array and reduce it to a single value adding it up to 1.0
    //multiply by 10 to give you each score out of 10
    const maxPossibleScore = Object.values(weights).reduce((acc, curr) => acc + curr, 0) * 10;
    const percentage = Math.round((totalScore / maxPossibleScore) * 100);

    let ratingCategory;
    const RatingLogo = document.getElementById('property-rating-face');
    const score = document.getElementById('property-score');

    if (percentage >= 90)
    {
        ratingCategory = 'Great';
        RatingLogo.style.backgroundImage = `url('./img/greatFace.png')`;
        score.innerHTML = `<p style="color: green">${percentage}%</p>`;

    } else if (percentage >= 70)
    {
        ratingCategory = 'Good';
        RatingLogo.style.backgroundImage = `url('./img/goodFace.png')`;
        score.innerHTML = `<p style="color: yellowgreen">${percentage}%</p>`;
    } else if (percentage >= 50)
    {
        ratingCategory = 'Meh';
        RatingLogo.style.backgroundImage = `url('./img/mehFace.png')`;
        score.innerHTML = `<p style="color: gold">${percentage}%</p>`;
    } else if (percentage >= 30)
    {
        ratingCategory = 'Bad';
        RatingLogo.style.backgroundImage = `url('./img/BadFace.png')`;
        score.innerHTML = `<p style="color: orange">${percentage}%</p>`;
    } else
    {
        ratingCategory = 'Very Bad';
        RatingLogo.style.backgroundImage = `url('./img/VeryBadFace.png')`;
        score.innerHTML = `<p style="color: red">${percentage}%</p>`;
    }

}

function displayContentCards2(array)
{
    /* console.log(array)*/
    /*for(var i = 0; i < array.length; i++){
        propertiesSale.push(array[i]);
    }*/


    array = getPageItems();

    //Show loading symbol
    toggleSpinner();
    const container = document.getElementById('listings-container');
    //Delete Existing cards
    deleteCards();

    //show message if array is empty
    if(array.length === 0)
    {
        const message = document.createElement('h2');
        message.id = 'no-content-message'
        message.style.display = 'flex';
        message.style.justifyContent = 'center';
        message.style.alignItems = 'center';
        message.style.height = '30vh';
        message.style.color = 'white';
        message.textContent = "Sorry no results found :("
        container.appendChild(message);
    }
    else{
        array.forEach(property=>{
            //create the new card
            const card = createContentCard(property);


            //add the card to the container
            container.appendChild(card);
        });
    }

    //hide loading symbol
    toggleSpinner();
}

function displayRentals2(array){

    toggleSpinner();
    const container = document.getElementById('listings-container');
    //Delete Existing cards
    deleteCards();

    //show message if array is empty
    if(array.length === 0)
    {
        const message = document.createElement('h2');
        message.id = 'no-content-message'
        message.style.display = 'flex';
        message.style.justifyContent = 'center';
        message.style.alignItems = 'center';
        message.style.height = '30vh';
        message.style.color = 'white';
        message.textContent = "Sorry no results found :("
        container.appendChild(message);
    }
    else{
        array.forEach(property=>{
            //create the new card
            const card = createContentCard(property);
            //add the card to the container
            container.appendChild(card);
        });
    }

    //hide loading symbol
    toggleSpinner();
}

function saveFilters()
{
    //Get the value of the min bathrooms number input
    var min_bathrooms = checkState($('#minBathrooms').val());
    var max_bathrooms = checkState($('#maxBathrooms').val());

    var min_bedrooms = checkState($('#minBedrooms').val());
    var max_bedrooms = checkState($('#maxBedrooms').val());

    var min_price = checkState($('#minPrice').val());
    var max_price = checkState($('#maxPrice').val());


    //send to the api to update the values
    //make api call to the api to change mode preference
    updatePrefrences(min_bathrooms,max_bathrooms,min_bedrooms,max_bedrooms,min_price,max_price)
        .then(response => {
            console.log('Preferences updated successfully:', response);
        })
        .catch(error => {
            //console.error('Error updating Preferences:', error);
        });

}

async function updatePrefrences(min_bathrooms,max_bathrooms,min_bedrooms,max_bedrooms,min_price,max_price){
    var apikey = $('#apikey').val();
    return new Promise((resolve, reject) => {
        //Declare XML Request variable and request url
        let xhr = new XMLHttpRequest();
        let url = "https://wheatley.cs.up.ac.za/u21528790/COS216/PA3/includes/api.php";
        //Declare parameters
        const params = {
            type: 'save',
            apikey: apikey,
            min_bathrooms: min_bathrooms,
            max_bathrooms:max_bathrooms,
            min_bedrooms:min_bedrooms,
            max_bedrooms:max_bedrooms,
            min_price:min_price,
            max_price:max_price
        };

        console.log(params);

        let requestBody = JSON.stringify(params);

        xhr.open("POST", url, true);

        // Set the Content-Type header BEFORE sending the request
        xhr.setRequestHeader("Content-Type", "application/json");

        let username = "u21528790";
        let password = "345803Moo";
        let credentials = `${username}:${password}`;
        let encodedCredentials = btoa(credentials);
        xhr.setRequestHeader("Authorization", `Basic ${encodedCredentials}`);

        console.log(requestBody);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    /*returns an array of property objects*/
                    let responseData = JSON.parse(xhr.responseText).data;
                    resolve(responseData);
                    //callback(responseData); // Call the callback function with the response data
                } else {
                    // Handle an error
                    reject(new Error("Failed to update preferences"));
                    /* console.error("Request failed with status:", xhr.status);*/

                }
            }
        };

        // Send the request to the API
        xhr.send(requestBody);

        xhr.onerror = function () {
            console.error("Request failed due to a network error or server issue.");
            reject(new Error("Network error or server issue"));
        };
    });
}

function checkState(x)
{
    if (x.trim() === '')
    {
        // If it's empty, set the value to null
        x = null;
    }
    else
    {
        //Convert into an integer
        x = parseInt(x);
    }
    return x;
}

function displayFavouriteCards()
{

    const array = JSON.parse(sessionStorage.getItem('favourites'));
    const array2 = JSON.parse(sessionStorage.getItem('salesArray'));
    //console.log("Favourites Array: ",array)
    var favIds = [];

    for(var i = 0; i < array.length; i++)
    {
        favIds.push(array[i].id);
    }
    console.log(favIds);
    //store
    sessionStorage.setItem('favIds',JSON.stringify(favIds));

    var array3 = [];

    for(var j = 0; j < array2.length; j++)
    {
        if(favIds.includes(array2[j].id))
        {
            array3.push(array2[j]);
        }
    }

    console.log("Favourites Array: ",array3)


    toggleSpinner();
    const container = document.getElementById('listings-container');
    //Delete Existing cards
    deleteCards();
    console.log("All Cards have been Deleted.")


    //show message if array is empty
    if(array3.length === 0)
    {
        const message = document.createElement('h2');
        message.id = 'no-content-message'
        message.style.display = 'flex';
        message.style.justifyContent = 'center';
        message.style.alignItems = 'center';
        message.style.height = '30vh';
        message.style.color = 'white';
        message.textContent = "Sorry no results found :("
        container.appendChild(message);
    }
    else{
        console.log("Looping through ",array3);
        array3.forEach(property=>{
            //create the new card
            const card = createContentCard(property);
            //add the card to the container
            container.appendChild(card);
        });
        console.log("Finished looping through");

    }
    //hide loading symbol
    toggleSpinner();
}

function addFavourite(id,property){
    var apikey = $('#apikey').val();
    const array = JSON.parse(sessionStorage.getItem('favourites'));

    var favIds = [];

    for(var i = 0; i < array.length; i++)
    {
        favIds.push(array[i].id);
    }

    favIds.push(id);

    array.push(property);
    sessionStorage.setItem('favourites',JSON.stringify(array));

    //Turn into a string
    const idsString = favIds.join(',');
    //call the api
    fetchUpdateFavourites(apikey, idsString).then(r => console.log("Added to favourites: ",id));
}

function removeFavourite(id,property){
    var apikey = $('#apikey').val();
    const array = JSON.parse(sessionStorage.getItem('favourites'));

    var favIds = [];

    for(var i = 0; i < array.length; i++)
    {
        if(array[i].id != id)
        {
            favIds.push(array[i].id);
        }
        if(array[i].id == id)
        {
            array.splice(i, 1);
        }
    }

    sessionStorage.setItem('favourites',JSON.stringify(array));

    //new ids
    console.log("New IDs: ",favIds);

    //turn into a string
    const idsString = favIds.join(',');

    //call the api
    fetchUpdateFavourites(apikey, idsString).then(r => console.log("Removed from favourites: ",id));
}



