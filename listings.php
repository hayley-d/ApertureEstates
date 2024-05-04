<!--Hayley Dodkins u21528790-->
<?php
require 'config_session.php';
$currentPage = "listings";
?>

<!doctype html>
<html class="no-js" lang="">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Aperture Listings</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/search-section.css">
    <link rel="stylesheet" href="css/content-card.css">
    <link rel="stylesheet" href="css/footer.css">
    <link rel="stylesheet" href="css/spinner.css">
    <meta name="description" content="">
    <link rel="icon" href="./img/companion-cube.svg" sizes="any">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <style>
        body{
            margin:0;
            padding:0;
        }
        #content{
            background-color: white;
            width: 110vw;
            overflow: hidden;
            background-image: url("img/search-background.png");
            /*background-image: url("https://wheatley.cs.up.ac.za/u21528790/COS216/PA4/img/search-background.png");*/
            background-size: cover;
            background-repeat: no-repeat;
            height:fit-content;
            padding:20px;
        }
    </style>
</head>

<body style="margin: 0; padding:0;">
<!--I store all images in a dive element over a img element for the following reasons:
   - Div element can be easily updated using javaScript allowing for dynamic content loading or interactive features without loading the entire page
   - Div element allows me to contain other elements in the same container allowing for more complex layouts
 -->
<?php
include './includes/header.php';

?>

<section id = "content" style="background-image: url('img/search-background.png')">
    <div id = "greeting-container">
        <div id = "house"></div>
        <div onclick="getLen()"><h1 id="heading1">Properties For Sale</h1></div>
        <div><h4 id="heading4">GLaDOS-Approved Homes: Where Every Room is a Test</h4></div>
    </div>
    <div id = "search-container">
        <input type="search" placeholder="Location">
        <div class = "button-container">
            <button type = "submit" id = "buy-search-btn">Buy</button>
            <button type = "submit" id = "rent-search-btn">Rent</button>
        </div>
    </div>
    <div id = "sort-fliter-continer">
        <!--Sort Dropdown dutton-->
        <div class="dropdown">
            <button class="dropbtn"><div id = "sort"></div>Sort</button>
            <div class="dropdown-content">
                <a >Ascending Title</a>
                <a >Descending Title</a>
                <a >Highest Price</a>
                <a >Lowest Price</a>
            </div>
        </div>

        <!--Bedroom Filter-->
        <div class = "bedroom-dropdown">
            <button class="dropbtn"><span><div id = "bedroom"></div></span>Bedrooms</button>
            <div class="dropdown-content input-fields">
                <label for="minBedrooms">Min Bedrooms:</label>
                <input type="number" id="minBedrooms" name="minBedrooms" min="0">
                <br>
                <label for="maxBedrooms">Max Bedrooms:</label>
                <input type="number" id="maxBedrooms" name="maxBedrooms" min="0">
            </div>
        </div>

        <!--Bathroom Filter-->
        <div class = "bathroom-dropdown">
            <button class="dropbtn"><span><div id = "bathroom"></div></span>Bathrooms</button>
            <div class="dropdown-content input-fields">
                <label for="minBedrooms">Min Bathrooms:</label>
                <input type="number" id="minBathrooms" name="minBathrooms" min="0">
                <br>
                <label for="maxBedrooms">Max Bathrooms:</label>
                <input type="number" id="maxBathrooms" name="maxBathrooms" min="0">
            </div>
        </div>

        <!--Price Filter-->
        <div class = "price-dropdown">
            <button class="dropbtn"><span><div id = "price"></div></span>Price</button>
            <div class="dropdown-content input-fields">
                <label for="minPrice">Min Price:</label>
                <input type="number" id="minPrice" name="minPrice" min="0">
                <br>
                <label for="maxPrice">Max Price:</label>
                <input type="number" id="maxPrice" name="maxPrice" min="0">
            </div>
        </div>
    </div>

</section>


<section id = "listings-container">

    <div id="save-btn-container">
        <button id="save-btn" onclick="saveFilters()">Save Filters</button>
    </div>


    <h2 id="hide-me">listings</h2>

    <div id = "spinner-container">
        <div class="loadingio-spinner-bean-eater-8d2rybet7d4"><div class="ldio-f74cwylkeb">
                <div><div></div><div></div><div></div></div><div><div></div><div></div><div></div></div>
            </div></div>
    </div>


</section>

<div id="page-btn-container">
    <div>
        <button class ="page-btn" id="decPage"  onclick="decreasePage()">Previous Page</button>
        <button class ="page-btn" id="incPage"  onclick="increasePage()">Next Page</button>
    </div>
</div>



<?php
include './includes/footer.php'
?>


<script src = "./js/loadingSpinner.js"></script>
<script src = "./js/main.js"></script>
<script src = "./js/search.js"></script>
<script src = "./js/sort.js"></script>
<script src = "./js/filter.js"></script>
<script src = "./js/contentCard.js"></script>

<script>
    document.addEventListener('DOMContentLoaded',function()
    {
        const button2 = document.getElementById('decPage');
        button2.disabled = true;
        fetchAllProperties();

        if(sessionStorage.getItem('apikey') === null)
        {
            $('#save-btn-container').hide();
        }

    })

    function getLen(){
        console.log(propertiesSale.length)
    }

     function increasePage(){
        //Get the current page and increase by 1
        var page = parseInt(sessionStorage.getItem('page'));

        //makes sure that the page is less than 14
        if(page < 14)
        {
            page+=1;
            sessionStorage.setItem('page', page);
        }
        const button = document.getElementById('incPage');

        //if the page is greater than 14 disable the next page button
        if(page >= 14)
        {
            button.disabled = true;
        }
        const button2 = document.getElementById('decPage');
        button2.disabled = false;


        try {
            //If the current search is for the sales properties then display the next page of sales properties else display rentals
            if(currSearch ==='sale')
            {
               displayContentCards(JSON.parse(sessionStorage.getItem('salesArray')));
            }
            else{
                displayRentals(JSON.parse(sessionStorage.getItem('rentalArray')));
            }

        } catch (error) {
            console.error("Error displaying data:", error);
        }

        //after loading the next page scroll the user to the top of the page
        scrollToTop();

    }

    function scrollToTop() {
        // Scroll to the top of the page
        document.documentElement.scrollTop = 0; // For modern browsers
        document.body.scrollTop = 0; // For older browsers
    }

    function decreasePage(){
        //Get the current page and increase by 1
        var page = parseInt(sessionStorage.getItem('page'));

        //makes sure that the page is greater than 1
        if(page > 1)
        {
            page-=1;
            sessionStorage.setItem('page', page+"");
        }

        const button = document.getElementById('incPage');
        const button2 = document.getElementById('decPage');

        //If the page is 1 then disable the prev page button
        if(page === 1)
        {
            button2.disabled = true;
        }

        button.disabled = false;

        //Display the property cards
        try {

            if(currSearch === 'sale')
            {

                displayContentCards(JSON.parse(sessionStorage.getItem('salesArray')))

            }
            else{

                displayRentals(JSON.parse(sessionStorage.getItem('rentalArray')));

            }

        } catch (error) {
            console.error("Error displaying data:", error);
        }

        //after loading the next page scroll the user to the top of the page
        scrollToTop();
    }

</script>
</body>

</html>

