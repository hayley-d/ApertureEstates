<!--Hayley Dodkins u21528790-->
<?php
require 'config_session.php';
$currentPage = "agents";
?>
<!doctype html>
<html class="no-js" lang="">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Aperture Agents</title>
    <!--External CSS Files-->
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/agent.css">
    <link rel="stylesheet" href="css/agent-card.css">
    <link rel="stylesheet" href="css/footer.css">
    <link rel="stylesheet" href="css/spinner.css">

    <meta name="description" content="">
    <!--Favicon-->
    <link rel="icon" href="./img/companion-cube.svg" sizes="any">

    <!--Google Fonts Font-->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
</head>

<body>
<!--Navigation Bar-->
<?php
include './includes/header.php'
?>

<!--Page Heading to let the user know what page they are currently on-->
<section id = "agent-heading">
    <h1>Agents</h1>
</section>

<!--Container to store the agents-->
<section id = "agents-container">
    <h2 id="hide-me">Agents</h2>

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
        fetchAgentData();

    })
</script>

</body>

</html>

