// ====== FUNCTIONS TO DRAW PRODUCT BOXES ======
const drawItems = (products) => {
    let content = "";
    for (const product of products) {
        content += 
            `<div class="menu__box__category__plates__item col-sm-12 col-md-6 col-lg-4">
                <img class="menu__box__category__plates__item__img" src="../${product.image}" alt="${product.name}">
                <h3 class="menu__box__category__plates__item__title">${product.name}</h3>
                <p class="menu__box__category__plates__item__description">${product.description}</p>
                <p class="menu__box__category__plates__item__price">$${product.price}</p>
                <button class="add-cart menu__box__category__plates__item__button" data-id="${product.id}">Agregar al carro</button>
            </div>`
    }
    return content;
};

// ====== FUNCTIONS TO DRAW MENU ======
const drawMenu = (productsByCategory = []) => {
    const menuBox = document.getElementById("menu");
    let content = "";
    for (const key in productsByCategory) {
        content += `<section class="menu__box__category menu__box__category--background-lavander menu__box__category--red-border container">
        <div class="row mb-3">
            <div class="menu__box__category__title col-sm-12">
                <h2>${key}</h2>
            </div>
        </div>
        <div class="row justify-content-center">`;
        content += drawItems(productsByCategory[key]);
        content += `</div></section>`;
    }
    if (content === "") {
        content = `<section class="menu__box__category menu__box__category--background-lavander menu__box__category--red-border container">
        <div class="row mb-3">
            <div class="menu__box__category__title col-sm-12">
                <h2>La carta está vacía</h2>
            </div>
        </div>
        </section>`;
    }
    menuBox.innerHTML += content;
}

// this is the code executed when the online-order page loads
const loadMenu = () => {
    drawMenu(Category.getProductsOrderedByCategories());
}

// this will wait until page loads
document.addEventListener("DOMContentLoaded", loadMenu);