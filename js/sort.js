/*Hayley Dodkins u21528790*/
//Array used to sore sorted property data
let sortedArray = [];


function sortAscendingTitle(array){

    sortedArray = array.sort((a,b) =>{
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if(titleA < titleB) return -1;
        if(titleA > titleB) return 1;
        return 0;
    });

    return sortedArray;
}

function sortDescendingTitle(array){
    sortedArray = array.sort((a,b) =>{
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if(titleA > titleB) return -1;
        if(titleA < titleB) return 1;
        return 0;
    });
    return sortedArray;
}

function sortHieghestPrice(array){
    sortedArray = array.sort((a,b)=>{
        return b.price - a.price
    });
    return sortedArray;
}

function sortLowestPrice(array){
    sortedArray = array.sort((a,b)=>{
        return a.price - b.price
    });
    return sortedArray;
}

//add event listeners
let sortOptions = document.querySelectorAll('.dropdown-content a');

sortOptions.forEach(option =>{
    option.addEventListener('click',function(){
        //remove class from all elements
        sortOptions.forEach(opt=>{
            opt.classList.remove('sortBy');
        });

        //add sort
        this.classList.add('sortBy');
    });
});

