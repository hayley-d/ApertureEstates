<?php
session_start();
$_SESSION['errors_login'] = null;
?>

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Aperture Auctions</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="../css/login.css">
        <style>
            #errors{
                width:30vw;
                height:fit-content;
                color: red;
                font-size: 20px;
                background-color: white;
                border-radius: 20px;
                padding:20px;
            }

            #error-container{
                display: flex;
                justify-content: center;
                align-items: center;
            }
        </style>

    </head>
    <body>
    <div><a id="back-btn" href="../listings.php">Back</a></div>
    <?php
    if(isset($_SESSION['error_signup']))
    {
        ?>
        <div id="error-container">
            <div id="errors">
                <p>
                    <?php
                    //Errors Occured
                    $errors = $_SESSION['error_signup'];
                    foreach ($errors as $error)
                    {
                        echo $error;
                    }

                    ?>

                </p>
            </div>
        </div>
        <?php
    }
    ?>
    <div id="login-container">
        <form id="signup-form" method="POST" action="signup_validate.php">

            <div class="heading"><h1>Signup</h1></div>
            <!--Name input-->
            <div class="label-container">
                <label for="name">Name</label>
            </div>
            <div><input type="text" id="name" name="name" placeholder="Enter your name" required></div>
            <!--Surname input-->
            <div class="label-container">
                <label for="surname">Surname</label>
            </div>
            <div><input type="text" id="surname" name="surname" placeholder="Enter your surname" required></div>
            <!--Email input-->
            <div class="label-container">
                <label for="email">Email</label>
            </div>
            <div><input type="email" id="email" name="email" placeholder="Enter your email" required></div>

            <div class="label-container">
                <label for="password">Password</label>
            </div>
            <div><input type="password" id="password" name="password" placeholder="Enter password" required title="Contain at least 8 characters, 1 digit and 1 special character"></div>

            <div class="label-container">
                <label for="confirm_password">Confirm Password</label>
            </div>
            <div><input type="password" id="confirm_password" name="confirm_password" placeholder="Enter password" required></div>

            <div class="submit"><button class="btn" type="submit" onclick="validateInformation()">Create Account</button> </div>
            <div class="submit"><button class="btn"><a href="./login.php">Login</a></button></div>

        </form>
    </div>
    <!--<div class="errors">
        <?php
/*            if(isset($_SESSION['error_signup']))
            {
                $errors = $_SESSION['error_signup'];
                $length = count($errors);
                for($i=0;$i<$length;$i++)
                {
                     */?>
                        <p>
                            <?php /*echo $errors[$i]  */?>
                        </p>
                    <?php
/*                }
            }
        */?>
    </div>-->

    <script>
        function validateInformation()
        {
            document.getElementById('signup-form').submit();
        }

        function redirect(){
            window.location.href = './signup.php';
        }
    </script>

    </body>
    </html>
<?php
