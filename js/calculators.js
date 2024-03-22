/*Hayley Dodkins u21528790*/

/*Get the forms and containers*/
const form = document.getElementById('mortgage-payment-form');
const resultContainer = document.getElementById('monthly-mortgage-container');

const form2 = document.getElementById('property-tax-form');
const resultContainer2 = document.getElementById('property-tax-container');

function calculateMortgage(){
    //get the form values
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const loanTerm = parseFloat(document.getElementById('loanTerm').value);
    const downPayment = parseFloat(document.getElementById('downPayment').value);

    console.log("Loan Amount: "+loanAmount);
    console.log("Interest Rate: "+interestRate);
    console.log("Loan Term: "+loanTerm);
    console.log("Down Payment: "+downPayment);

    //calculate the monthly mortgage amount
    const monthlyInterestRate = (interestRate/100)/12;
    const principal = loanAmount - downPayment;
    const loanTermMonths = loanTerm*12;
    const monthlyPayment = principal * ((monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths)) / (Math.pow(1 + monthlyInterestRate, loanTermMonths) -1));

    //calculate the other data
    const totalMortgagePayments = monthlyPayment * loanTermMonths;
    const totalInterest = totalMortgagePayments - principal;

    //Display the result container
    resultContainer.style.display = 'flex';

    //Display the result
    document.getElementById('mortgage-result').textContent = formatAsZAR(monthlyPayment);
    document.getElementById('total-mortgage-payments').textContent =formatAsZAR(totalMortgagePayments);
    document.getElementById('total-interest').textContent =formatAsZAR(totalInterest);

    //Hide the form
    form.style.display = 'none';
}

function calculateTax(){
    const homeValue = parseFloat(document.getElementById('homeValue').value);
    const taxRate = parseFloat(document.getElementById('taxRate').value);

    //calculate property tax
    const propertyTax = (homeValue* taxRate)/100;

    //Display result container
    resultContainer2.style.display = 'flex';

    //Display the result
    document.getElementById('tax-result').textContent = formatAsZAR(propertyTax);

    //hide the form
    form2.style.display = 'none';
}

//prevent page reload when form is submitted
form.addEventListener('submit',function(event){
    event.preventDefault();
});

form2.addEventListener('submit',function(event){
    event.preventDefault();
});

function formatAsZAR(number) {
    return 'R' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}