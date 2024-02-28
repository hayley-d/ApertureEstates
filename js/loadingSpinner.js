const spinnerContainer = document.getElementById('spinner-container');

let isSpinnerShowing = false;

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

