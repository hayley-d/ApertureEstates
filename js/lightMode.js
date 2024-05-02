
function listingMode()
{

    var light = sessionStorage.getItem('light');
    if(light != 'true')
    {
        sessionStorage.setItem('light','true');
        light = 'true';
        const heading1 = document.getElementById("heading1");
        const heading4 = document.getElementById("heading4");
        heading1.style.color = "hotpink";
        heading4.style.color = "hotpink";

        const content = document.getElementById("content");
        content.style.backgroundImage = `url("../img/lightmode-background.png")`;

        const container = document.getElementById("listings-container");
        container.style.backgroundColor = "white";

        const buttonContainer = document.getElementById("page-btn-container");
        buttonContainer.style.backgroundColor = "white";
    }
    else{
        sessionStorage.setItem('light','false');
        light = 'false';
        const heading1 = document.getElementById("heading1");
        const heading4 = document.getElementById("heading4");
        heading1.style.color = "#0CC0DF";
        heading4.style.color = "#0CC0DF";

        const content = document.getElementById("content");
        content.style.backgroundImage = `url("../img/search-background.png")`;
        //
        const container = document.getElementById("listings-container");
        container.style.backgroundColor = "#413D42";

        const buttonContainer = document.getElementById("page-btn-container");
        buttonContainer.style.backgroundColor = "#413D42";
    }

    headerFooterChange();
}

function agentsMode()
{
    var light = sessionStorage.getItem('light');
    if(light != 'true'){
        sessionStorage.setItem('light','true');
        light = 'true';
        //#agent-heading
        const heading = document.getElementById("agent-heading");
        heading.style.backgroundImage = `url("../img/lightmode-background.png")`;

        const container = document.getElementById("agents-container");
        container.style.backgroundColor = "white";
    }
    else{
        sessionStorage.setItem('light','false');
        light = 'false';
        const heading = document.getElementById("agent-heading");
        heading.style.backgroundImage = `url("../img/search-background.png")`;

        const container = document.getElementById("agents-container");
        container.style.backgroundColor = "#413D42";
    }
    headerFooterChange(light);
}

function calculatorMode()
{
    var light = sessionStorage.getItem('light');
    if(light != 'true'){
        sessionStorage.setItem('light','true');
        light = 'true';
        //#agent-heading
        const heading = document.getElementById("header");
        heading.style.backgroundImage = `url("../img/lightmode-background.png")`;

        const container = document.getElementsByTagName("section")[1];
        container.style.backgroundColor = "white";
    }
    else{
        sessionStorage.setItem('light','false');
        light = 'false';
        const heading = document.getElementById("header");
        heading.style.backgroundImage = `url("../img/search-background.png")`;

        const container = document.getElementsByTagName("section")[1];
        container.style.backgroundColor = "#413D42";
    }
    headerFooterChange(light);
}

function favouritesMode()
{
    var light = sessionStorage.getItem('light');
    if(light != 'true'){
        sessionStorage.setItem('light','true');
        light = 'true';
        //#agent-heading
        const heading = document.getElementById("header");
        heading.style.backgroundImage = `url("../img/lightmode-background.png")`;

        const container = document.getElementById("listings-container");
        container.style.backgroundColor = "white";
    }
    else{
        sessionStorage.setItem('light','false');
        light = 'false';
        const heading = document.getElementById("header");
        heading.style.backgroundImage = `url("../img/search-background.png")`;

        const container = document.getElementById("listings-container");
        container.style.backgroundColor = "#413D42";
    }
    headerFooterChange(light);
}

function headerFooterChange(light)
{
    var mode = "light";
    if(light == 'true'){
        mode = "light";
        const footer = document.getElementsByTagName("footer")[0];
        footer.style.backgroundColor ="#413D42";

        const footerSlogan = document.getElementById("footer-slogan");
        footerSlogan.style.color = "white";

        const footerInfo = document.getElementById("footer-info");
        footerInfo.style.color = "white";

        const header = document.getElementsByTagName("header")[0];
        header.style.backgroundColor ="#413D42";

        const nav = document.getElementById("nav");
        nav.style.color = "white";

        const button = document.getElementById("mode-btn");
        button.textContent = "Dark Mode";
    }
    else{
        mode = 'dark';
        const footer = document.getElementsByTagName("footer")[0];
        footer.style.backgroundColor ="white";

        const footerSlogan = document.getElementById("footer-slogan");
        footerSlogan.style.color = "#413D42";

        const footerInfo = document.getElementById("footer-info");
        footerInfo.style.color = "#413D42";

        const header = document.getElementsByTagName("header")[0];
        header.style.backgroundColor ="white";

        const nav = document.getElementById("nav");
        nav.style.color = "#413D42";

        const button = document.getElementById("mode-btn");
        button.textContent = "Light Mode";
    }

    //make api call to the api to change mode preference
    updateTheme(mode)
        .then(response => {
            console.log('Theme updated successfully:', response);
        })
        .catch(error => {
            console.error('Error updating theme:', error);
        });

}


async function updateTheme(theme)
{
    var apikey = document.getElementById('apikey').value;
    return new Promise((resolve, reject) => {
        //Declare XML Request variable and request url
        let xhr = new XMLHttpRequest();
        let url = "https://wheatley.cs.up.ac.za/u21528790/COS216/PA3/includes/api.php";
        //Declare parameters
        const params = {
            type: 'updateTheme',
            apikey: apikey,
            theme: theme
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

function listingModeInitial(){
    var light = sessionStorage.getItem('light');
    var apikey = document.getElementById('apikey').value;
    if(light == 'true')
    {
        const heading1 = document.getElementById("heading1");
        const heading4 = document.getElementById("heading4");
        heading1.style.color = "hotpink";
        heading4.style.color = "hotpink";

        const content = document.getElementById("content");
        content.style.backgroundImage = `url("../img/lightmode-background.png")`;

        const container = document.getElementById("listings-container");
        container.style.backgroundColor = "white";

        const buttonContainer = document.getElementById("page-btn-container");
        buttonContainer.style.backgroundColor = "white";
    }
    else{
        const heading1 = document.getElementById("heading1");
        const heading4 = document.getElementById("heading4");
        heading1.style.color = "#0CC0DF";
        heading4.style.color = "#0CC0DF";

        const content = document.getElementById("content");
        content.style.backgroundImage = `url("../img/search-background.png")`;
        //
        const container = document.getElementById("listings-container");
        container.style.backgroundColor = "#413D42";

        const buttonContainer = document.getElementById("page-btn-container");
        buttonContainer.style.backgroundColor = "#413D42";
    }
    console.log(apikey)
    headerFooterChangeInitial();
}

function agentsModeInitial()
{
    var light = sessionStorage.getItem('light');
    if(light == 'true'){
        //#agent-heading
        const heading = document.getElementById("agent-heading");
        heading.style.backgroundImage = `url("../img/lightmode-background.png")`;

        const container = document.getElementById("agents-container");
        container.style.backgroundColor = "white";
    }
    else{
        const heading = document.getElementById("agent-heading");
        heading.style.backgroundImage = `url("../img/search-background.png")`;

        const container = document.getElementById("agents-container");
        container.style.backgroundColor = "#413D42";
    }
    headerFooterChangeInitial();
}

function calculatorModeInitial()
{
    var light = sessionStorage.getItem('light');
    if(light == 'true'){
        //#agent-heading
        const heading = document.getElementById("header");
        heading.style.backgroundImage = `url("../img/lightmode-background.png")`;

        const container = document.getElementsByTagName("section")[1];
        container.style.backgroundColor = "white";
    }
    else{
        const heading = document.getElementById("header");
        heading.style.backgroundImage = `url("../img/search-background.png")`;

        const container = document.getElementsByTagName("section")[1];
        container.style.backgroundColor = "#413D42";
    }
    headerFooterChangeInitial();
}

function favouritesModeInitial()
{
    var light = sessionStorage.getItem('light');
    if(light == 'true'){
        //#agent-heading
        const heading = document.getElementById("header");
        heading.style.backgroundImage = `url("../img/lightmode-background.png")`;

        const container = document.getElementById("listings-container");
        container.style.backgroundColor = "white";
    }
    else{
        const heading = document.getElementById("header");
        heading.style.backgroundImage = `url("../img/search-background.png")`;

        const container = document.getElementById("listings-container");
        container.style.backgroundColor = "#413D42";
    }
    headerFooterChangeInitial();
}

function headerFooterChangeInitial()
{
    var light = sessionStorage.getItem('light');
    var apikey = document.getElementById('apikey').value;
    var mode = "light";
    if(light == 'true'){
        mode = "light";
        const footer = document.getElementsByTagName("footer")[0];
        footer.style.backgroundColor ="#413D42";

        const footerSlogan = document.getElementById("footer-slogan");
        footerSlogan.style.color = "white";

        const footerInfo = document.getElementById("footer-info");
        footerInfo.style.color = "white";

        const header = document.getElementsByTagName("header")[0];
        header.style.backgroundColor ="#413D42";

        const nav = document.getElementById("nav");
        nav.style.color = "white";

        const button = document.getElementById("mode-btn");
        button.textContent = "Dark Mode";
    }
    else{
        mode = 'dark';
        const footer = document.getElementsByTagName("footer")[0];
        footer.style.backgroundColor ="white";

        const footerSlogan = document.getElementById("footer-slogan");
        footerSlogan.style.color = "#413D42";

        const footerInfo = document.getElementById("footer-info");
        footerInfo.style.color = "#413D42";

        const header = document.getElementsByTagName("header")[0];
        header.style.backgroundColor ="white";

        const nav = document.getElementById("nav");
        nav.style.color = "#413D42";

        const button = document.getElementById("mode-btn");
        button.textContent = "Light Mode";
    }
    console.log("The current light is: "+ light)
    console.log("The current mode is "+ mode)
}
