<!--Hayley Dodkins u21528790-->
<?php
$currentPage = "favourite";
?>
<!doctype html>
<html class="no-js" lang="">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Aperture Listings</title>
    <!--External SCC Links-->
    <link rel="stylesheet" href="css/style.css" type="text/css">
    <link rel="stylesheet" href="css/header.css" type="text/css">
    <link rel="stylesheet" href="css/content-card.css" type="text/css">
    <link rel="stylesheet" href="css/favourites.css" type="text/css">
    <link rel="stylesheet" href="css/footer.css" type="text/css">
    <link rel="stylesheet" href="css/spinner.css" type="text/css">
    <meta name="description" content="">
    <!--Favicon-->
    <link rel="icon" href="./img/companion-cube.svg" sizes="any">

    <!--google fonts font-->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
</head>

<body>
<?php
require 'config_session.php';
include './includes/header.php'
?>
<section id = "header">
    <h1>My List</h1>
    <h3>View saved properties</h3>
</section>
<section id = "listings-container">
    <h2 id="hide-me">Listings</h2>

    <div id = "spinner-container">
        <div class="loadingio-spinner-bean-eater-8d2rybet7d4"><div class="ldio-f74cwylkeb">
                <div><div></div><div></div><div></div></div><div><div></div><div></div><div></div></div>
            </div></div>
    </div>



</section>

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
        displayContentCards(favProperties);
        //populate the content cards

        //colour cards based on rent = orange sales = blue

    })




</script>

</body>

</html>

