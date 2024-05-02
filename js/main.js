/*Hayley Dodkins u21528790*/

//Constants
const apiKey = "a729e2f414c947b786032eba8d8b68d5";
const studentNum = "u21528790";

//Array for Storing rentals for the API
var rentals = [];

//Array for storing sale properties
var sales = [];

//Array for storing favourite properties
var favourites = [];

//Array for storing agents
var agents = [];

var pageNum = 1;

var currSearch = 'sale';




//Function is Used to create property objects
function createPropertyObject(id,title,location,price,bedrooms,bathrooms,parking,amenities,description,url,type,agency,images)
{

    const amenityArray = amenities.replace(/^, */, '').split(', ').map(amenity => amenity.trim());
    //features and images is an array

    return {
        id:id, //int
        title: title,//String
        location: location,//String
        price: price,//int
        type:type, //Rent or sale
        bedrooms: bedrooms,//int
        bathrooms: bathrooms,//int
        parking_spaces: parking, //int
        amenities: amenityArray, //Array of Strings
        description: description, //String
        favorite: false, //boolean
        images: images, //array
        url: url, //String
        agency:agency,
    };
}

//Function is used to create an agent object
function createAgentObject(id,name,desc,logo,url)
{
    return{
        id:id,
        name:name, //String
        description:desc, //String
        logo:logo, //image url
        url:url //String
    }
}

//Function will take in JSON data and create property

function handelPropertyData(id,title,location,price,bedrooms,bathrooms,parking,amenities,description,url,type,agency,images)
{
    //Step 1: Create Property object
    let property = createPropertyObject(id,title,location,price,bedrooms,bathrooms,parking,amenities,description,url,type,agency,images);

    //Add property to the array
    sales.push(property);
    if(sales.length === 300)
    {

        var propertyArr = new Array();
        for(var i = 0; i < 300;i++)
        {
            propertyArr.push(sales[i]);
        }

        const arrayAsString = JSON.stringify(propertyArr);
        sessionStorage.setItem('salesArray', arrayAsString);
        sessionStorage.setItem('page', "1");
        displayContentCards(propertyArr)
    }
}

function handelRentalData(id,title,location,price,bedrooms,bathrooms,parking,amenities,description,url,type,agency,images)
{
    //Step 1: Create Property object
    let property = createPropertyObject(id,title,location,price,bedrooms,bathrooms,parking,amenities,description,url,type,agency,images);

    //Add property to the array
        rentals.push(property);
        if(rentals.length === 300)
        {
            var propertyArr = new Array();
            for(var i = 0; i < 300;i++)
            {
                propertyArr.push(rentals[i]);
            }

            // Serialize the array into a string using JSON.stringify
            const arrayAsString = JSON.stringify(propertyArr);
            sessionStorage.setItem('rentalArray', arrayAsString);
            //displayRentals(propertyArr)
        }

}

function handelAgentDataAgents(agent,logoUrl)
{
    let newAgent = createAgentObject(agent.id,agent.name,agent.description,logoUrl,agent.url);
    agents.push(newAgent);
    if(agents.length === 15)
    {
        var propertyArr = new Array();
        for(var i = 0; i < 15;i++)
        {
            propertyArr.push(agents[i]);
        }
        displayAgentCards(propertyArr)
    }
}

function handelAgentData(agent,logoUrl)
{
    let newAgent = createAgentObject(agent.id,agent.name,agent.description,logoUrl,agent.url);

    agents.push(newAgent);
    if(agents.length === 15)
    {
        displayAgent(agents);
        displayAgentCards(agents);
    }
}
//API Call function
function apiCallProperties(returnFields = "*",limit = 0,sort = '',order = '',search){
    return new Promise((resolve, reject) =>
    {
        //Declare XML Request variable and request url
        let xhr = new XMLHttpRequest();
        let url = "https://wheatley.cs.up.ac.za/u21528790/COS216/PA3/includes/api.php";

        //Declare parameters
        let params = {
            type: `GetAllListings`,
            apikey: `Vb2O3W9DfTZLFwlu`,
            limit:500
        };

        //If the limit param is valid
        if (limit !== 0) {
            console.log("Limit included: " + limit)
            params.limit = limit;
        }

        //if sort was included
        if (sort !== '' && ['id', 'title', 'location', 'price', 'bedrooms', 'bathrooms', 'parking_spaces'].includes(sort)) {
            console.log("Sort Included: " + sort);
            params.sort = sort;
        }

        //If order was included
        if (order === 'ASC' || order === "DESC") {
            console.log("Order Included: " + order)
            params.order = order;
        }

        //If search was included
        if (search && typeof search === 'object') {
            console.log("Search Included:", search);
            params.search = search;
        }

        //Add return
        if (returnFields === "*") {
            console.log("Return *");
            params.return = "*";
        } else if (Array.isArray(returnFields) && returnFields.length > 0) {
            console.log("Returning : " + returnFields);
            params.return = returnFields;
        }

        let requestBody = JSON.stringify(params);

        xhr.open("POST", url, true);

        // Set the Content-Type header
        xhr.setRequestHeader("Content-Type", "application/json");

        let username = "u21528790";
        let password = "345803Moo";
        let credentials = `${username}:${password}`;
        let encodedCredentials = btoa(credentials);
        xhr.setRequestHeader("Authorization", `Basic ${encodedCredentials}`);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    /*returns an array of property objects*/
                    let responseData = JSON.parse(xhr.responseText).data;
                    resolve(responseData);

                } else {
                    // Handle an error
                    console.error("Request failed with status:", xhr.status);
                    reject(new Error("Failed to fetch properties"));
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

function apiCallAgents(limit = 0,callback)
{
    return new Promise((resolve, reject) => {
        //Declare XML Request variable and request url
        let xhr = new XMLHttpRequest();
        let url = "https://wheatley.cs.up.ac.za/u21528790/COS216/PA3/includes/api.php";
        //Declare parameters
        let params = {
            type: `GetAllAgents`,
            apikey: `O3MDpgwGlONHZCfg`
        };

        //If the limit param is valid
        if (limit !== 0 && limit < 100 && limit >= 1) {
            console.log("Limit included: " + limit)
            params.limit = limit;
        }

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
                    reject(new Error("Failed to fetch agents"));
                    /* console.error("Request failed with status:", xhr.status);*/

                }
            }
        };

        console.log(requestBody);
        // Send the request to the API
        xhr.send(requestBody);

        xhr.onerror = function () {
            console.error("Request failed due to a network error or server issue.");
            reject(new Error("Network error or server issue"));
        };
    });
}

function apiCallImages(listingId,property,callback){

    return new Promise((resolve, reject) => {
        //Declare XML Request variable and request url
        let xhr = new XMLHttpRequest();
        let url =  `https://wheatley.cs.up.ac.za/api/getimage?`;
        url += `listing_id=${listingId}`
        //console.log(url);
        xhr.open("GET", url, true);

        // Set the Content-Type header
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200)
                {
                    let responseData = JSON.parse(xhr.responseText).data;
                    //console.log(responseData)
                    resolve(responseData );
                } else {
                    // Reject the promise with an error
                    reject(new Error("Request failed with status: " + xhr.status));
                }
            }
        };

        // Send the request to the API
        xhr.send();

        xhr.onerror = function () {
            reject(new Error("Request failed due to a network error or server issue."));
        };
    });
}

function apiCallImagesAgent(agencyName,agent,callback)
{
    return new Promise((resolve, reject) => {
        //Declare XML Request variable and request url
        let xhr = new XMLHttpRequest();
        let url =  `https://wheatley.cs.up.ac.za/api/getimage?`;
        url += `agency=${agencyName}`
        xhr.open("GET", url, true);

        // Set the Content-Type header
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function ()
        {
            if (xhr.readyState === 4) {
                if (xhr.status === 200)
                {
                    let responseData = JSON.parse(xhr.responseText).data;
                    resolve(responseData);

                } else {
                    // Reject the promise with an error
                    reject(new Error("Request failed with status: " + xhr.status));
                }
            }
        };

        // Send the request to the API
        xhr.send();

        xhr.onerror = function () {
            reject(new Error("Request failed due to a network error or server issue."));
        };
    });
}

async function fetchAllProperties() {
    try {
        toggleSpinner();
        const promises = [];

        // Push all the API calls into the promises array
        promises.push(apiCallProperties("*", 0, '', '', {type:"sale"}),apiCallProperties("*", 0, '', '', {type:"rent"}));
        // If you have more API calls, push them here as well

        // Wait for all the promises to resolve
        const results = await Promise.all(promises);

        const salesArray = results[0];
        const rentalArray = results[1];

        await fetchPropertyImages(salesArray);
        await fetchPropertyImages(rentalArray);

        // Now results will contain an array of fetched data from all API calls
       //console.log("All data fetched:", results);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    finally {
        toggleSpinner();
    }
}

async function fetchAllAgents() {
    try {
        toggleSpinner();
        const promises = [];

        // Push all the API calls into the promises array
        promises.push(apiCallAgents(0));

        // Wait for all the promises to resolve
        const results = await Promise.all(promises);

        await fetchAgentImages(results[0]);

    } catch (error) {
        console.error("Error fetching data:", error);
    }
    finally {
        toggleSpinner();
    }
}
//apiCallImages
async function fetchAgentImages(agents) {

    try {
        const promises = [];

        // Loop through each agent and create a promise for fetching images
        agents.forEach(agent => {
            promises.push(apiCallImagesAgent(agent.name, agent,handelAgentDataAgents));
        });

        // Wait for all promises to resolve
        const results = await Promise.all(promises);


        for(var i = 0; i < agents.length; i++)
        {
            handelAgentData(agents[i],results[i]);
        }


    } catch (error) {
        console.error("Error fetching agent images:", error);
    }
}

async function fetchPropertyImages(properties) {

    try {
        const promises = [];

        // Loop through each agent and create a promise for fetching images
        properties.forEach(property => {
            promises.push(apiCallImages(property.id, property,handelAgentDataAgents));
        });

        // Wait for all promises to resolve
        const results = await Promise.all(promises);
        //console.log("Results: ",results)

        for(var i = 0; i < properties.length; i++)
        {
            if(properties[i].type === 'rent')
            {
                handelRentalData(properties[i].id,properties[i].title,properties[i].location,properties[i].price,properties[i].bedrooms,properties[i].bathrooms,properties[i].parking_spaces,properties[i].amenities,properties[i].description,properties[i].url,properties[i].type,properties[i].agency,results[i]);
            }
            else{
                handelPropertyData(properties[i].id,properties[i].title,properties[i].location,properties[i].price,properties[i].bedrooms,properties[i].bathrooms,properties[i].parking_spaces,properties[i].amenities,properties[i].description,properties[i].url,properties[i].type,properties[i].agency,results[i]);
            }
        }

    } catch (error) {
        console.error("Error fetching agent images:", error);
    }
}









