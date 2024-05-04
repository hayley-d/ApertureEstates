<?php
session_start();
$_SESSION['error_signup'] = null;
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
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

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
if(isset($_SESSION['errors_login']))
{
?>
<div id="error-container">
    <div id="errors">
        <p>
            <?php
                //Errors Occured
                $errors = $_SESSION['errors_login'];
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

    <form id="login-form"><!-- method="POST"--> <!--action="https://wheatley.cs.up.ac.za/u21528790/COS216/PA4/includes/login_validate.php"-->

        <div class="heading"><h1>Login</h1></div>
        <!--Email input-->
        <div class="label-container">
            <label for="email">Email</label>
        </div>
        <div><input type="email" id="email" name="email" placeholder="Enter your email" required></div>
        <div class="label-container">
            <label for="password">Password</label>
        </div>
        <div><input type="password" id="password" name="password" placeholder="Enter password" required></div>

        <div class="submit"><button class="btn"  onclick="login(event)">Login</button> </div>
        <div class="submit"><button class="btn" onclick="redirect()"><a href="./signup.php">Create Account</a></button></div>

    </form>
</div>
<div class="errors">
    <?php

    ?>
</div>

<script>
    function validateInformation()
    {
        //document.getElementById('login-form').submit();
    }

    function redirect(){
        window.location.href = './signup.php';
    }

    function login(event){
        event.preventDefault();
        //get the elements
        const email = $('#email').val();
        const password = $('#password').val();

        /*if(!isValidEmail(email))
        {
            sessionStorage.setItem("LoginError","Invalid Email")
            window.location.href = "https://example.com";
        }*/

        const params = {
            type:'Login2',
            email:email,
            password:password
        }


        let xhr = new XMLHttpRequest();
        let url = "https://wheatley.cs.up.ac.za/u21528790/COS216/PA3/includes/api.php";

        let requestBody = JSON.stringify(params);
        console.log(requestBody);
        xhr.open("POST", url, false);

        xhr.setRequestHeader("Content-Type", "application/json");
        let username = "u21528790";
        let adminpassword = "345803Moo";
        let credentials = `${username}:${adminpassword}`;
        let encodedCredentials = btoa(credentials);
        xhr.setRequestHeader("Authorization", `Basic ${encodedCredentials}`);

        xhr.send(requestBody); // Send the request synchronously

        if (xhr.status === 200) {
            let responseData = JSON.parse(xhr.responseText).data;
            sessionStorage.setItem('apikey',responseData.apikey);
            sessionStorage.setItem('name',responseData.name);
            window.location.href = "../listings.php";
        } else {
            console.error("Request failed with status:", xhr.status);
        }
    }

    /*function getTheme(apikey)
    {
        const params = {
            type:'GetTheme',
            apikey:apikey,
        }


        let xhr = new XMLHttpRequest();
        let url = "https://wheatley.cs.up.ac.za/u21528790/COS216/PA3/includes/api.php";

        let requestBody = JSON.stringify(params);
        console.log(requestBody);
        xhr.open("POST", url, false);

        xhr.setRequestHeader("Content-Type", "application/json");
        let username = "u21528790";
        let adminpassword = "345803Moo";
        let credentials = `${username}:${adminpassword}`;
        let encodedCredentials = btoa(credentials);
        xhr.setRequestHeader("Authorization", `Basic ${encodedCredentials}`);

        xhr.send(requestBody); // Send the request synchronously

        if (xhr.status === 200) {
            let responseData = JSON.parse(xhr.responseText).data;
            if(responseData == "dark")
            {

            }
            else{

            }

        } else {
            console.error("Request failed with status:", xhr.status);
        }
    }*/



</script>

</body>
</html>
