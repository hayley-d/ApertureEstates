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
                <a <?php if($currentPage == 'favourites'){ ?>style="color: #0CC0DF"<?php }?>
                    href = "favourites.php">Favourites
                </a>
            </div>
            <div class = "user-profile-container">

                    <?php
                        if(isset($_SESSION['apikey'])) {
                            ?>
                                <div class = "user-btn">
                                    <button onclick="logout()">Logout</button>
                                    <div class = "username"><p><?php echo $_SESSION['name']; ?></p></div>
                                    <script>
                                        function logout(){
                                            window.location.href = './includes/logout.php';
                                        }
                                    </script>
                                </div>
                            <?php
                        }
                        else {
                            ?>
                                    <div class = "user-btn">
                                         <button onclick="login()">Login</button>
                                        <script>
                                            function login(){
                                                window.location.href = './includes/login.php';
                                            }
                                        </script>
                                    </div>

                            <?php
                        }
                    ?>


            </div>
        </div>
    </header>
<?php
