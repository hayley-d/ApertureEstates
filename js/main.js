/*Hayley Dodkins u21528790*/

//Constants
const apiKey = "a729e2f414c947b786032eba8d8b68d5";
const studentNum = "u21528790";

//Array for Storing rentals for the API
var rentals = [];

//Array for storing sale properties
var sales = new Array();

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
    if(sales.length === 20)
    {

        var propertyArr = new Array();
        for(var i = 0; i < 20;i++)
        {
            propertyArr.push(sales[i]);
        }
        displayContentCards(propertyArr)
    }
}

function handelRentalData(id,title,location,price,bedrooms,bathrooms,parking,amenities,description,url,type,agency,images)
{
    //Step 1: Create Property object
    let property = createPropertyObject(id,title,location,price,bedrooms,bathrooms,parking,amenities,description,url,type,agency,images);

    //Add property to the array
        rentals.push(property);
        if(rentals.length === 20)
        {
            var propertyArr = new Array();
            for(var i = 0; i < 20;i++)
            {
                propertyArr.push(rentals[i]);
            }
            displayRentals(propertyArr)
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

        var propertyArr = new Array();
        for(var i = 0; i < 15;i++)
        {
            propertyArr.push(agents[i]);
        }
        displayAgent(propertyArr)
    }
}
//API Call function
function apiCallProperties(returnFields = "*",limit = 0,sort = '',order = '',search,callback){
    return new Promise((resolve, reject) => {
        //Declare XML Request variable and request url
        let xhr = new XMLHttpRequest();
        let url = "../includes/api.php";
        //Declare parameters
        let params = {
            type: `GetAllListings`,
            apikey: `Vb2O3W9DfTZLFwlu`,
            page:pageNum,
            limit:20
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

        // Set the Content-Type header BEFORE sending the request
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    /*returns an array of property objects*/
                    let responseData = JSON.parse(xhr.responseText).data;
                    console.log(responseData);
                    resolve(responseData);
                   // callback(responseData); // Call the callback function with the response data
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
        let url = "../includes/GetAllAgents.php";
        //Declare parameters
        let params = {
            type: `GetAllAgents`,
            apikey: `${apiKey}`
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

        // Send the request to the API
        xhr.send(requestBody);

        xhr.onerror = function () {
            console.error("Request failed due to a network error or server issue.");
            reject(new Error("Network error or server issue"));
        };
    });
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

                    callback(agent,responseData);
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


//function to get the agency name from the url
function getAgencyNameFromUrl(url){
    const urlObject = new URL(url);
    return urlObject.hostname;
}


async function fetchAgents(){
    try {
        let agentData = await apiCallAgents(0);
        for (let agent of agentData) {
            await apiCallImages(-1, agent.name, "", agent, handelAgentData);
        }
    } catch (error) {
        console.error("Error fetching agents:", error);
    }
}

async function fetchAgentsAgent(){
    try {
        let agentData = await apiCallAgents(0);
        for (let agent of agentData) {
            await apiCallImages(-1, agent.name, "", agent, handelAgentDataAgents);
        }
    } catch (error) {
        console.error("Error fetching agents:", error);
    }
}

//fetch properties and return promise
async function fetchProperties(){
    try {
        let propertyData = await apiCallProperties("*", 0, '', '', {type:"sale"});
        for (let property of propertyData) {
            const propertyAgencyName = getAgencyNameFromUrl(property.url);
            const matchingAgency = agents.find(agent => new URL(agent.url).hostname === propertyAgencyName);
            if (matchingAgency) {
                property.agency = "Private Property";
            }
            property.agency = "Private Property";
            sales = new Array();
            await apiCallImages(property.id, "", property, "", handelPropertyData);
        }
    } catch (error) {
        console.error("Error fetching properties:", error);
    }
}

async function fetchRentals(){
    try {
        let propertyData = await apiCallProperties("*", 0, '', '', {type:"rent"});
        for (let property of propertyData) {
            const propertyAgencyName = getAgencyNameFromUrl(property.url);
            const matchingAgency = agents.find(agent => new URL(agent.url).hostname === propertyAgencyName);
            if (matchingAgency) {
                property.agency = "Private Property";
            }
            property.agency = "Private Property";
            rentals = new Array();
            await apiCallImages(property.id, "", property, "", handelRentalData);
        }
    } catch (error) {
        console.error("Error fetching properties:", error);
    }
}

//function to fetch agents first the fetch properties
async function fetchData(){
    try {
        toggleSpinner();
        await fetchAgents();
        await fetchProperties();
        await fetchRentals();
        console.log("All data loaded");

    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        toggleSpinner();
    }
}

async function fetchAgentData(){
    try {
        toggleSpinner();
        await fetchAgentsAgent();
        console.log("All data loaded");

    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        toggleSpinner();
    }
}

async function fetchSales(){
    try {
        toggleSpinner();
        await fetchProperties();
        console.log("All data loaded");

    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        toggleSpinner();
    }
}

async function fetchRentalsData(){
    try {
        toggleSpinner();
        rentals = new Array();
        await fetchRentals();
        console.log("All data loaded");

    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        toggleSpinner();
    }
}




