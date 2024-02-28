//Constants
const apiKey = "";
const studentNum = "u21528790";

//Array for Storing rentals for the API
let rentals = [];

//Array for storing sale properties
let sales = [];

//Array for storing favourite properties
let favourites = [];

//Array for storing agents
let agents = [];




//Function is Used to create property objects
function createPropertyObject(id,title,location,price,bedrooms,bathrooms,parking,amenities,description,url,type,agency,images)
{
    //features and images is an array
    return {
        "id":id, //int
        "title": title,//String
        "location": location,//String
        "price": price,//int
        "type":type, //Rent or sale
        "bedrooms": bedrooms,//int
        "bathrooms": bathrooms,//int
        "parking_spaces": parking, //int
        "amenities": amenities, //Array of Strings
        "description": description, //String
        "favorite": false, //boolean
        "images": images, //array
        "url": url, //String
        "agency":agency,
    };
}

//Function is used to create an agent object
function createAgentObject(id,name,desc,logo,url)
{
    return{
        "id":id,
        "name":name, //String
        "description":desc, //String
        "logo":logo, //image url
        "url":url //String
    }
}

//Function will take in JSON data and create property

function handelPropertyData(id,title,location,price,bedrooms,bathrooms,parking,amenities,description,url,type,agency,images)
{
    //Step 1: Create Property object
    let property = createPropertyObject(id,title,location,price,bedrooms,bathrooms,parking,amenities,description,url,type,agency,images);

    //Add property to the array
    if(type === 'rent')
    {
        rentals.push(property);
    }
    else{
        sales.push(property);
    }
}

function handelAgentData(agent,logoUrl)
{
    let newAgent = createAgentObject(agent.id,agent.name,agent.description,logoUrl,agent.url);

    agents.push(newAgent);
}
//API Call function
function apiCallProperties(returnFields = "*",limit = 0,sort = '',order = '',search = [],callback){
    //Declare XML Request variable and request url
    let xhr = new XMLHttpRequest();
    let url =  "https://wheatley.cs.up.ac.za/api/";
    //Declare parameters
    let params = {
        studentnum:`${studentNum}`,
        type:`GetAllListings`,
        apikey:`${apiKey}`
    };

    //If the limit param is valid
    if(limit !== 0)
    {
        console.log("Limit included: "+limit)
        params.limit = limit;
    }

    //if sort was included
    if(sort !== '' && ['id', 'title', 'location', 'price', 'bedrooms', 'bathrooms', 'parking_spaces'].includes(sort))
    {
        console.log("Sort Included: " + sort);
        params.sort = sort;
    }

    //If order was included
    if(order === 'ASC' || order === "DESC")
    {
        console.log("Order Included: "+order)
        params.order = order;
    }

    //If search was included
    if(search.length > 0 && Array.isArray(search)){
        console.log("Search Included: " + search)
        params.search = search;
    }

    //Add return
    if(returnFields === "*")
    {
        console.log("Return *");
        params.return = "*";
    }
    else if(Array.isArray(returnFields) && returnFields.length > 0)
    {
        console.log("Returning : "+ returnFields);
        params.return = returnFields;
    }

    let requestBody = JSON.stringify(params);

    xhr.open("POST", url, true);

    // Set the Content-Type header BEFORE sending the request
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                /*returns an array of property objects*/
                let responseData = JSON.parse(xhr.responseText).data;
                callback(responseData); // Call the callback function with the response data
            } else {
                // Handle an error
                console.error("Request failed with status:", xhr.status);

            }
        }
    };

    // Send the request to the API
    xhr.send(requestBody);

    xhr.onerror = function () {
        console.error("Request failed due to a network error or server issue.");
    };
}

function apiCallAgents(limit,callback)
{
    //Declare XML Request variable and request url
    let xhr = new XMLHttpRequest();
    let url =  "https://wheatley.cs.up.ac.za/api/";
    //Declare parameters
    let params = {
        studentnum:`${studentNum}`,
        type:`GetAllAgents`,
        apikey:`${apiKey}`
    };

    //If the limit param is valid
    if(limit !== 0 && limit < 100 && limit >= 1)
    {
        console.log("Limit included: "+limit)
        params.limit = limit;
    }

    let requestBody = JSON.stringify(params);

    xhr.open("POST", url, true);

    // Set the Content-Type header BEFORE sending the request
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                /*returns an array of property objects*/
                let responseData = JSON.parse(xhr.responseText).data;
                callback(responseData); // Call the callback function with the response data
            } else {
                // Handle an error
                console.error("Request failed with status:", xhr.status);

            }
        }
    };

    // Send the request to the API
    xhr.send(requestBody);

    xhr.onerror = function () {
        console.error("Request failed due to a network error or server issue.");
    };
}

function apiCallImages(listingId,agencyName,property,agent,callback){
    //Declare XML Request variable and request url
    let xhr = new XMLHttpRequest();
    let url =  `https://wheatley.cs.up.ac.za/api/getimage?`;
    if(listingId !== -1)
    {
        url += `listing_id=${listingId}`
    }
    if(agencyName !== "")
    {
        url += `agency=${agencyName}`
    }

    xhr.open("GET", url, true);

    // Set the Content-Type header BEFORE sending the request
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let responseData = JSON.parse(xhr.responseText).data;
                // Call the callback function with the response data
                if(listingId !== -1)
                {
                    callback(property.id,property.title,property.location,property.price,property.bedrooms,property.bathrooms,property.parking_spaces,property.amenities,property.description,property.url,property.type,property.agency,responseData);
                }
                else{
                    callback(agent,responseData[0]);
                }
            } else {
                // Handle an error (e.g., display an error message)
                console.error("Request failed with status:", xhr.status);
            }
        }
    };

    // Send the request to the API
    xhr.send();

    xhr.onerror = function () {
        console.error("Request failed due to a network error or server issue.");
    };
}

function callApiAndStoreData() {
    apiCallProperties(function (propertyData) {
        // Store the data in an array
        for(let property of propertyData)
        {
            //get the agency
            const propertyAgencyName = getAgencyNameFromUrl(property.url);

            //Find the matching agency
            const matchingAgency = agents.find(agent => {
                const agentUrl = agent.url.toLowerCase();
                return agenturl.includes(propertyAgencyName.toLowerCase());
            });

            if(matchingAgency)
            {
                property.agency = matchingAgency.name;
            }

            //Now call images api
            apiCallImages(property.id,"",property,"",handelPropertyData)
        }
    });
    console.log("Properties have been Loaded")
}

function apiCallAndStoreAgents()
{
    apiCallAgents(function (agentData) {
        for(let agent of agentData){
            //get the agent logo
            apiCallImages(-1,agent.name,"",agent,handelAgentData);
        }
    });
}


//function to get the agency name from the url
function getAgencyNameFromUrl(url){
    const parts = url.split('/');
    return parts[2];
}

