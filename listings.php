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
</head>

<body>
<!--I store all images in a dive element over a img element for the following reasons:
   - Div element can be easily updated using javaScript allowing for dynamic content loading or interactive features without loading the entire page
   - Div element allows me to contain other elements in the same container allowing for more complex layouts
 -->
<?php
include './includes/header.php'
?>

<section id = "content">
    <div id = "greeting-container">
        <div id = "house"></div>
        <div onclick="getLen()"><h1>Properties For Sale</h1></div>
        <div><h4>GLaDOS-Approved Homes: Where Every Room is a Test</h4></div>
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
    <h2 id="hide-me">listings</h2>

    <div id = "spinner-container">
        <div class="loadingio-spinner-bean-eater-8d2rybet7d4"><div class="ldio-f74cwylkeb">
                <div><div></div><div></div><div></div></div><div><div></div><div></div><div></div></div>
            </div></div>
    </div>


</section>

<div id="page-btn-container">
    <div>
        <button class ="page-btn" id="incPage"  onclick="decreasePage()">Previous Page</button>
        <button class ="page-btn" id="decPage"  onclick="increasePage()">Next Page</button>
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
    document.addEventListener('DOMContentLoaded',function(){
        //fetch the data
        fetchData();
    })

    function getLen(){
        console.log(propertiesSale.length)
    }

    async function increasePage(){
        if(pageNum<14)
        {
            pageNum+=1;
        }
        const button = document.getElementById('incPage');
        if(pageNum>=14)
        {
            button.disabled = true;
        }
        const button2 = document.getElementById('decPage');
        button2.disabled = false;

        //call api
        try {
            toggleSpinner();
            if(currSearch==='sale')
            {
                await fetchProperties();
            }
            else{
                await fetchRentals();
            }
            console.log("All data loaded");

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            if(currSearch==='sale')
            {
                search(false,-1);
            }
            else{
                search(true,-1);
            }
            toggleSpinner();
        }
    }

    async function decreasePage(){
        if(pageNum > 1)
        {
            pageNum -=1;
        }
        const button = document.getElementById('incPage');
        const button2 = document.getElementById('decPage');
        if(pageNum===1)
        {
            button.disabled = true;
        }

        button2.disabled = false;

        //call api
        try {
            toggleSpinner();
            if(currSearch==='sale')
            {

                await fetchProperties();

            }
            else{

                await fetchRentals();

            }
            console.log("All data loaded");

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            if(currSearch==='sale')
            {
                search(false,-1);
            }
            else{
                search(true,-1);
            }
            toggleSpinner();
        }
    }

</script>
</body>

</html>

