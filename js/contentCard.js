
function createContentCard(listingName, location, price, bedCount,bathCount,size,desc,images)
{
    const property = {
        "name" : listingName,
        "location" : location,
        "price": price,
        "number-of-beds":bedCount,
        "number-of-bath":bathCount,
        "size":size,
        "description":desc,
        "images":images
    }

    /*Create the container for the card*/
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('content-card-container');

    const card = document.createElement('div');
    card.classList.add('content-card');

    const propertyImage = document.createElement('div');
    propertyImage.classList.add('property-img');
    propertyImage.style.backgroundImage = `url('${images[0]}')`;

    const propertyInfoContainer = document.createElement('div');
    propertyInfoContainer.classList.add('property-info-container');

    const propertyHeading = document.createElement('div');
    propertyHeading.classList.add('property-heading');

    /*Property Name Section of the card*/
    const propertyName = document.createElement('a');
    propertyName.href = '#';
    propertyName.textContent = listingName;
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
    propertyLocationDiv.textContent = location;

    /*Property Price element*/
    const propertyPriceDiv = document.createElement('div');
    propertyPriceDiv.classList.add('property-price');
    propertyPriceDiv.innerHTML = `<p>${price}</p>`

    /*Property detains Elements*/
    const propertyDetails = document.createElement('div');
    propertyDetails.classList.add('property-details');
    const details = [
        { iconClass: 'bed-icon', value: bedCount },
        { iconClass: 'bath-icon', value: bathCount },
        { iconClass: 'size-icon', value: size }
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
    propertyDescDiv.innerHTML = `<p>${desc}</p>`;

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


/*
* const property = {
        "name" : listingName,
        "location" : location,
        "price": price,
        "number-of-beds":bedCount,
        "number-of-bath":bathCount,
        "size":size,
        "description":desc,
        "images":images
    }*/
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
    agentHeading.innerHTML = `<p>${agent["agencyName"]}</p>`;

    const agentDesc = document.createElement('div');
    agentDesc.classList.add('agent-desc');
    agentDesc.innerHTML = `<p>${agent["description"]}</p>`;

    /*email button*/
    const agentEmail = document.createElement('div');
    agentEmail.classList.add('agent-email');
    const emailButton = document.createElement('button');
    const emailLink = document.createElement('a');
    emailLink.href = `mailto:${agent["email"]}`;
    emailLink.textContent = "Email Agent";
    emailButton.appendChild(emailLink);
    agentEmail.appendChild(emailButton);

    agentInfo.appendChild(agentHeading);
    agentInfo.appendChild(agentDesc);
    agentInfo.appendChild(agentEmail);

    /*Logo*/
    const agentLogoContainer = document.createElement('div');
    agentLogoContainer.classList.add('agent-logo-container');
    const agentLogo = document.createElement('div');
    agentLogo.classList.add('agent-logo');
    agentLogoContainer.appendChild(agentLogo);

    /*contact*/
    const agentContact = document.createElement('div');
    agentContact.classList.add('agent-contact');

    const agentWebsite = document.createElement('div');
    agentWebsite.classList.add('agent-website');
    const websiteLink = document.createElement('a');
    websiteLink.href = `mailto:${agent["email"]}`;
    websiteLink.textContent = agent["email"];
    agentWebsite.appendChild(websiteLink);

    const agentNumber = document.createElement('div');
    agentNumber.classList.add('agent-number');
    const numberLink = document.createElement('a');
    numberLink.textContent = agent["number"];
    agentNumber.appendChild(numberLink);

    /*assemble*/
    agentContact.appendChild(agentWebsite);
    agentContact.appendChild(agentNumber);

    agentCard.appendChild(agentInfo);
    agentCard.appendChild(agentLogoContainer);
    agentCard.appendChild(agentContact);

    agentCardcontainer.appendChild(agentCard);

    return agentCardcontainer;
}

function viewProperty(property){

}