
//function takes in a property object and creates a property card for the object
function createContentCard(property)
{
    /*Create the container for the card*/
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('content-card-container');

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
    prevArrow.classList.add('next-arrow');

    /*add event listners*/
    prevArrow.addEventListener('click', () =>{
        currentImageIndex = (currentImageIndex - 1 + property.images.length) % property.images.length;
        propertyImage.style.backgroundImage = `url('${property.images[currentImageIndex]}')`;
    });

    nextArrow.addEventListener('click', () =>{
        currentImageIndex = (currentImageIndex + 1) % property.images.length;
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

    favButtonContainer.appendChild(favButton);

    /*Property Location element*/
    const propertyLocationDiv = document.createElement('div');
    propertyLocationDiv.classList.add('property-location');
    propertyLocationDiv.textContent = property.location;

    /*Property Price element*/
    const propertyPriceDiv = document.createElement('div');
    propertyPriceDiv.classList.add('property-price');
    propertyPriceDiv.innerHTML = `<p>R ${property.price}</p>`

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
}

//Function below is used to delete current populated cards so that new cards can be loaded and populated based on a sort or filter
function deleteCards()
{
    //delete current cards
    const cards = document.getElementsByClassName("content-card-container");
    const cardsArray = Array.from(cards);

    cardsArray.forEach(function(card) {
        card.remove();
    });
}



