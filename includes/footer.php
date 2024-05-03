<!--Footer section-->
<?php
global $currentPage;
?>
<script src = "./js/lightMode.js"></script>
<input type="hidden" id="apikey" value="<?php
if(isset($_SESSION['apikey']) && $_SESSION['apikey'] != null){
    echo $_SESSION['apikey'];
}else {
    $_SESSION['apikey'] = false;
    echo 'none';
} ?>">
<script>


    document.addEventListener("DOMContentLoaded", function()
    {

        <?php if($currentPage == 'listings')
            {
            ?>listingModeInitial(); <?php
        }
        else if($currentPage == 'agents')
        {
        ?>agentsModeInitial(); <?php
        }
        else if($currentPage == 'calculator')
        {
        ?>calculatorModeInitial(); <?php
        }
        else if($currentPage == 'favourite')
        {
        ?>favouritesModeInitial(); <?php
        }
        ?>


    });

    function getTheme()
    {
        var apikey = document.getElementById('apikey').value;
        return new Promise((resolve, reject) => {
            //Declare XML Request variable and request url
            let xhr = new XMLHttpRequest();
            let url = "https://wheatley.cs.up.ac.za/u21528790/COS216/PA3/includes/api.php";
            //Declare parameters
            const params = {
                type: 'GetTheme',
                apikey: apikey
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
                        sessionStorage.setItem('light',responseData);
                        console.log("Set the theme to: "+ responseData);
                        resolve(responseData);

                    } else {
                        // Handle an error
                        reject(new Error("Failed to fetch agents"));
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
</script>
<footer>
    <div id = "footer-logo-container">
        <div id = "footer-logo"></div>

    </div>
    <div id = "footer-slogan">
        <div>The Cake is a lie, but our listings are real. Aperture Estates, your gateway to genuine luxury properties .</div>
    </div>
    <div id = "footer-info">
        <div id = "footer-about">
            <?php
            if(isset($_SESSION['apikey']) && $_SESSION['apikey'] != null)
            {

            ?>
            <button id="mode-btn"
                    <?php if($currentPage == 'listings')
                            {
                                ?>onclick="listingMode()" <?php
                            }
                            else if($currentPage == 'agents')
                            {
                                ?>onclick="agentsMode()" <?php
                            }
                            else if($currentPage == 'calculator')
                            {
                                ?>onclick="calculatorMode()" <?php
                            }
                            else if($currentPage == 'favourite')
                            {
                                ?>onclick="favouritesMode()" <?php
                            }
                    ?>
            >Light Mode</button>
                <?php
            }
            ?>
        </div>
        <div id = "socials">
            <div class = "footer-heading">Socials<hr></div>
            <div id = "instagram"></div>
            <div id = "facebook"></div>
            <div id = "x"></div>
        </div>
    </div>

</footer>
