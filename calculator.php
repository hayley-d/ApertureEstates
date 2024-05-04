<!--Hayley Dodkins u21528790-->
<?php
require 'config_session.php';
$currentPage = "calculator";
?>
<!doctype html>
<html class="no-js" lang="">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Aperture Listings</title>
    <!--External CSS links-->
    <link rel="stylesheet" href="css/calculator.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/footer.css">
    <link rel="stylesheet" href="css/spinner.css">
    <meta name="description" content="">
    <!--Favicon-->
    <link rel="icon" href="./img/companion-cube.svg" sizes="any">
    <!--Google fonts font-->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
</head>

<body>
<?php
include './includes/header.php'
?>

<section id = "header">
    <h1>Calculators</h1>
</section>

<!--Section for the forms-->
<section>
    <!--Form #1 is the mortgage payment form which will calculate the mortgage payment monthly based on the 4 inputs-->
    <form id = "mortgage-payment-form">
        <div class = "form-heading"><h2>Monthly Mortgage Payment</h2></div>
        <div class = "form-label"><label for="loanAmount">Loan Amount:</label></div>
        <div class = "form-input"><input type="number" id="loanAmount" name="loanAmount" placeholder="Amount" required><br><br></div>

        <div class = "form-label"><label for="interestRate">Interest Rate:</label></div>
        <div class = "form-input"><input type="number" id="interestRate" name="interestRate" placeholder="Percentage" required><br><br></div>

        <div class = "form-label"><label for="loanTerm">Loan Term:</label></div>
        <div class = "form-input"><input type="number" id="loanTerm" name="loanTerm"  placeholder="Years" required><br><br></div>

        <div class = "form-label"><label for="downPayment">Down Payment:</label></div>
        <div class = "form-input"><input type="number" id="downPayment" name="downPayment" placeholder="Amount" required><br><br></div>

        <div class = "submit-btn"><button type = "submit" onclick="calculateMortgage()">Calculate</button></div>
    </form>
    <!--This is the container to display the form result, when javaSctipt is added the form element will be hidden and the div below will be displayed-->
    <div id = "monthly-mortgage-container">
        <div class = "form-heading"><h2>Monthly Mortgage Payment</h2></div>
        <div class = "result-container"><p id = "mortgage-result">R 429</p></div>
        <div class = "results-table">
            <div><h3>Total Mortgage Payments:</h3> <p id = "total-mortgage-payments"></p></div>
            <div><h3>Total Interest:</h3> <p id = "total-interest"></p></div>
        </div>
    </div>
    <br/>
    <hr/>
    <br/>
    <!--Form to calculate the property tax-->
    <form id = "property-tax-form">
        <div class = "form-heading"><h2>Property Taxes</h2></div>

        <div class = "form-label"><label for="homeValue">Assessed Home Value:</label></div>
        <div class = "form-input"><input type="number" id="homeValue" name="homeValue" required><br><br></div>

        <div class = "form-label"><label for="taxRate">Local Tax Rate:</label></div>
        <div class = "form-input"><input type="number" id="taxRate" name="taxRate" required><br><br></div>

        <div class = "submit-btn"><button type = "submit" onclick="calculateTax()">Calculate</button></div>
    </form>
    <!--This is the container to display the form result, when javaSctipt is added the form element will be hidden and the div below will be displayed-->
    <div id = "property-tax-container">
        <div class = "form-heading"><h2>Property Taxes</h2></div>
        <div class = "result-container"><p id = "tax-result"></p></div>
    </div>
</section>

<?php
include './includes/footer.php'
?>

<script src = "./js/calculators.js"></script>
</body>

</html>
