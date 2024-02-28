//Array used to sore sorted property data
let sortedRentals = [];
let sortedSales = [];

function sortAscendingTitle(){
    sortedRentals = rentals.sort((a,b) =>{
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if(titleA < titleB) return -1;
        if(titleA > titleB) return 1;
        return 0;
    });

    sortedSales = sales.sort((a,b) =>{
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if(titleA < titleB) return -1;
        if(titleA > titleB) return 1;
        return 0;
    });
}

function sortDescendingTitle(){
    sortedRentals = rentals.sort((a,b) =>{
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if(titleA > titleB) return -1;
        if(titleA < titleB) return 1;
        return 0;
    });

    sortedSales = sales.sort((a,b) =>{
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if(titleA > titleB) return -1;
        if(titleA < titleB) return 1;
        return 0;
    });
}

function sortHieghestPrice(){
    sortedRentals = rentals.sort((a,b)=>{
        return b.price - a.price
    });

    sortedSales = rentals.sort((a,b)=>{
        return b.price - a.price
    });
}

function lowestHieghestPrice(){
    sortedRentals = rentals.sort((a,b)=>{
        return a.price - b.price
    });

    sortedSales = rentals.sort((a,b)=>{
        return a.price - b.price
    });
}

function handelSort(){

}