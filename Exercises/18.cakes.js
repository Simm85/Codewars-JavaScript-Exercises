function cakes(recipe, available) {    
    let cakesCount = 0;
    for (const key in recipe) {
        if (!available.hasOwnProperty(key) || available[key] < recipe[key]) return cakesCount;
    }

    let productsCount = Object.keys(recipe).length;
    let letsCook = true;

    while (letsCook) {
        for (const key in recipe) {
            available[key] -= recipe[key];
            productsCount--;
            if (productsCount === 0) {
                cakesCount++;
                productsCount = Object.keys(recipe).length;
            }
            if (available[key] < recipe[key]) letsCook = false;
        }
    }
    return cakesCount;
}

// must return 2
cakes({ flour: 500, sugar: 200, eggs: 1 }, { flour: 1200, sugar: 1200, eggs: 5, milk: 200 });
// must return 0
cakes({ apples: 3, flour: 300, sugar: 150, milk: 100, oil: 100 }, { sugar: 500, flour: 2000, milk: 2000 }); 