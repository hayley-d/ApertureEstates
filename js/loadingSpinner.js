/*Hayley Dodkins u21528790*/
const spinnerContainer = document.getElementById('spinner-container');

var isSpinnerShowing = false;

function showSpinner()
{
    spinnerContainer.style.display = 'flex';
}

function hideSpinner(){
    spinnerContainer.style.display = 'none';
}

function toggleSpinner(){
    if(isSpinnerShowing)
    {
        isSpinnerShowing = false;
        hideSpinner();
    }
    else{
        isSpinnerShowing = true;
        showSpinner();
    }
}

