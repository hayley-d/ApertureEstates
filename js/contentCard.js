
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
        viewProperty(property);
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

//takes the user to the view page with the correct property data
function viewProperty(property){
    console.log("Property name clicked!")
    window.location.href = '../View.html';
    viewCard(property);
}

//Function below is used to delete current populated cards so that new cards can be loaded and populated based on a sort or filter
function deleteCards()
{
    //delete current cards
    const cards = document.getElementsByClassName("content-card-container");
    const cardsArray = Array.from(cards);

    cardsArray.forEach(function(card) {
        //get the property
    });
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
    console.log(array.length)
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

function displayAgentCards()
{
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
        agents.forEach(agent=>{
            //create the new card
            const card = createAgentCard(agent);

            //add the card to the container
            container.appendChild(card);
        });
    }

    //hide loading symbol
    toggleSpinner();
}


//changes the view page for the correct data
function viewCard(property){
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
        houseImage.style.backgroundImage = `url('${property.images[currentImageIndex]}')`;
    });

    nextArrow.addEventListener('click', () =>{
        currentImageIndex = (currentImageIndex + 1) % property.images.length;
        houseImage.style.backgroundImage = `url('${property.images[currentImageIndex]}')`;
    });

    if(isFavourite(property))
    {
        //if it is a fav property make the heart red
        const heartButton = document.getElementById('heart');
        heartButton.style.backgroundImage = `url('../img/Heart/red-heart.png')`;
    }

    //populate agent data
    const agentName = document.getElementById('view-agent-name');
    const agent = findAgent(property.agency);
    agentName.innerHTML = `<p>${agent.name}</p>`;

    const agentLogo = document.getElementById('view-agent-logo');
    agentLogo.style.backgroundImage = `url('${agent.logo}')`;

    const agentWebsite = document.getElementById('view-website-button');
    agentWebsite.href = agent.url;


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
    return agents.find(agent => agent.name === agentName);
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

