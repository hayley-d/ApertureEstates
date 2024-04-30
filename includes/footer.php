<!--Footer section-->
<?php
global $currentPage;
?>
<script src = "./js/lightMode.js"></script>
<script>
    document.addEventListener("DOMContentLoaded", function(){
        var thisLight = <?php
            if(isset($_SESSION['light']) && $_SESSION['light'] != null){
                echo $_SESSION['light'];
            }else {
                $_SESSION['light'] = false;
                echo 'false';
            } ?>;
            <?php if($currentPage == 'listings')
                {
                ?>listingMode(thisLight)<?php
            }
            else if($currentPage == 'agents')
            {
            ?>agentsMode(thisLight)<?php
            }
            else if($currentPage == 'calculator')
            {
            ?>calculatorMode(thisLight)<?php
            }
            else if($currentPage == 'favourite')
            {
            ?>favouritesMode(thisLight)<?php
        }
        ?>

    });
</script>
<footer>
    <div id = "footer-logo-container">
        <div id = "footer-logo"></div>

    </div>
    <div id = "footer-slogan">
        <div>The Cake is a lie, but our listings are real. Aperture Estates, your gateway to genuine luxury properties <?php echo $_SESSION['light'];  ?>.</div>
    </div>
    <div id = "footer-info">
        <div id = "footer-about">
            <button id="mode-btn"
                    <?php if($currentPage == 'listings')
                            {
                                ?>onclick="listingMode(true)" <?php
                            }
                            else if($currentPage == 'agents')
                            {
                                ?>onclick="agentsMode(true)"<?php
                            }
                            else if($currentPage == 'calculator')
                            {
                                ?>onclick="calculatorMode(true)"<?php
                            }
                            else if($currentPage == 'favourite')
                            {
                                ?>onclick="favouritesMode(true)"<?php
                            }

                            /*if($_SESSION['light'] == true)
                            {
                                $_SESSION['light'] = false;
                            }
                            else{
                                $_SESSION['light'] = true;
                            }*/

                            //call function to update database
                    ?>
            >Light Mode</button>
        </div>
        <div id = "socials">
            <div class = "footer-heading">Socials<hr></div>
            <div id = "instagram"></div>
            <div id = "facebook"></div>
            <div id = "x"></div>
        </div>
    </div>

</footer>
