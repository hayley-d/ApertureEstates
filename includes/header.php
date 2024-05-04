<?php
global $currentPage;
?>
    <header>
        <div id = "logo"></div>
        <div id = "nav">
            <div>
                <a <?php if($currentPage == 'listings'){ ?>style="color: #0CC0DF"<?php }?>
                    href = "listings.php">Listings
                </a>
            </div>
            <div>
                <a <?php if($currentPage == 'agents'){ ?>style="color: #0CC0DF"<?php }?>
                    href = "agents.php">Agents
                </a>
            </div>
            <div>
                <a <?php if($currentPage == 'calculator'){ ?>style="color: #0CC0DF"<?php }?>
                   href = "calculator.php">Calculators
                </a>
            </div>
            <div>
                <a <?php if($currentPage == 'favourite'){ ?>style="color: #0CC0DF"<?php }?>
                    href = "favourites.php">Favourites
                </a>
            </div>
            <div class = "user-profile-container">
                <div class = "user-btn" id="ubtn">

                </div>
            </div>
        </div>
        <script>
            $(document).ready(function(){
                if(sessionStorage.getItem('apikey') !== null)
                {
                    //user is logged in
                    // Create the button element
                    var button = $('<button>Logout</button>');

                    // Add onclick attribute to the button
                    button.attr('onclick', 'logout()');

                    // Add the button as a child of the div with class "user-btn" and id "ubtn"
                    $('.user-btn#ubtn').append(button);

                    var nameItem = $(`<div class = "username"><p>${sessionStorage.getItem('name')}</p></div>`)

                    $('.user-btn#ubtn').append(nameItem);
                }
                else{
                    // Create the button element
                    var button = $('<button>Login</button>');

                    // Add onclick attribute to the button
                    button.attr('onclick', 'login()');

                    // Add the button as a child of the div with class "user-btn" and id "ubtn"
                    $('.user-btn#ubtn').append(button);
                }
            });

            function login(){
                window.location.href = './includes/login.php';
            }

            function logout(){
               // window.location.href = './includes/logout.php';
                sessionStorage.clear();
                window.location.href = 'listings.php';
            }
        </script>
    </header>
<?php
