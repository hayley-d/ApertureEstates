<!--Hayley Dodkins u21528790-->
<?php
require 'config_session.php';
?>
<!doctype html>
<html class="no-js" lang="">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Aperture Listings</title>
    <link rel="stylesheet" href="./css/header.css" type="text/css">
    <link rel="stylesheet" href="./css/view.css" type="text/css">
    <link rel="stylesheet" href="./css/footer.css" type="text/css">
    <meta name="description" content="">
    <link rel="icon" href="./img/companion-cube.svg" sizes="any">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">


</head>

<body>
<?php
include './includes/header.php'
?>

<section id = "listing-01">
    <div class = "top-container">
        <div id = "house-image">
            <div class = "prev-arrow"></div>
            <div class = "next-arrow"></div>
        </div>
        <div id = "like-btn">
            <div id = "button">
                <div id = "heart"></div>
            </div>
        </div>


        <div class="property-score-container">
            <div id = "property-rating-face"></div>
            <div id = "property-score-title"><p>Property Score</p></div>
            <div id = "property-score"></div>
        </div>
    </div>

    <div class = "bottom-container">
        <div class = "property-view-card">
            <div   class = "Listing-name"><h3 id = "view-name">Chell's Chalet</h3></div>
            <div   class = "listing-price"><p id = "view-price">R 900 000 000</p></div>
            <div   class = "location"><p id = "view-location">Paarl</p></div>

            <div class = "property-info-container">
                <div class ="bed-container"> <div id = "bed-icon"></div> <div class = "property-info-value"><p id = "view-beds-value">12</p></div> </div>
                <div class ="bath-container"> <div id = "bath-icon"></div> <div  class = "property-info-value"><p id = "view-bath-value">12</p></div> </div>
                <div class ="car-container"> <div id = "car-icon"></div> <div  class = "property-info-value"><p id = "view-car-value">1</p></div> </div>

            </div>

            <div id = "view-desc" class = "description">
                <p>
                    Chell's Chalet offers the perfect mountain retreat. Our chalets are equipped with all the comforts of home,
                    including cozy fireplaces, spacious living areas, and stunning views of the surrounding mountains.
                    And don't worry, our elevators are completely safe...we promise.
                </p>
            </div>

            <div class = "property-feature-container">
                <div id = "features-heading"><h4>Property Features</h4></div>
                <div id = "view-features-grid"  class ="features-grid">

                </div>
            </div>
        </div>
    </div>
</section>


<?php
include './includes/footer.php'
?>
<script src = "./js/contentCard.js"></script>
<script>

    document.addEventListener('DOMContentLoaded', function() {
        const selectedProperty = JSON.parse(localStorage.getItem('selectedProperty'));
        if (selectedProperty)
        {
            viewCard(selectedProperty);
        }
    });


</script>
</body>

</html>

