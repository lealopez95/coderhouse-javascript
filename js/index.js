// GLOBAL FOR ROUTES
let prefixUrl = '';

// ====== CART FUNCTIONS ======
const addToCartEventHandler = async ({ srcElement }) => {
    const productsInStock = await Product.getProductsInStock();
    const productId = parseInt(srcElement.getAttribute("data-id"));
    const showMessageAttr = srcElement.getAttribute("show-message");
    const shouldShowMessage = (showMessageAttr && showMessageAttr==='true') || false;
    const product = productsInStock.find(product => product.id === productId);
    const user = new User();
    const userCart = user.getCart();
    userCart.addProduct(product);
    if (shouldShowMessage) {
        swal({
           text: `Añadiste ${product.name} a tu carrito.`,
            icon: "success",
            button: "Ok",
        });
    }
    drawCart();
    addEventsForCart();
}

const substractFromCartEventHandler = async ({ srcElement }) => {
    const productsInStock = await Product.getProductsInStock();
    const productId = parseInt(srcElement.getAttribute("data-id"));
    const product = productsInStock.find(product => product.id === productId);
    const user = new User();
    const userCart = user.getCart();
    userCart.substractProduct(product);
    drawCart();
    addEventsForCart();
}

const deleteFromCartEventHandler = ({ srcElement }) => {
    const productId = parseInt(srcElement.parentElement.getAttribute("data-id"));
    const user = new User();
    const userCart = user.getCart();
    const productDeleted = userCart.deleteProduct(productId);
    if(productDeleted) {
        swal({
           text: `Eliminaste ${productDeleted.name} de tu carrito.`,
            icon: "success",
            button: "Ok",
        });
    }
    drawCart();
    addEventsForCart();    
}

const addEventByClass = (className, eventHandler) => {
    const productBoxes = document.getElementsByClassName(className);
    for (productBox of productBoxes) {
        productBox.addEventListener("click", eventHandler);
    }
}

const generateCartItemElement = (product) => {
    return `
    <li class="header__basket__section__list__item" >
        <p class="header__basket__section__list__item__text">${product.name}</p>
        <button class="header__basket__section__list__item__button header__basket__section__list__item__button--small substract-item" data-id="${product.id}">-</button>
        <input class="header__basket__section__list__item__qty" type="number" min="0" name="quantity" id="quantity_${product.id}" value="${product.qty}">
        <button class="header__basket__section__list__item__button header__basket__section__list__item__button--small add-item" data-id="${product.id}">+</button>
        <p class="header__basket__section__list__item__price" id="price_${product.id}">$${product.price}</p>
        <button id="trash_${product.id}" href="#" class="delete-item header__basket__section__list__item__trash" data-id="${product.id}">
            <img class="header__basket__section__list__item__icon" src="${prefixUrl}media/images/icons/trash_icon.svg" alt="tacho de basura">
        </button>
    </li>
    `;
}

const drawCartResume = (order) => {
    const cartResumeWrapper = document.getElementById("order-Items");
    const innerHTML = ( order.products?.length > 0 && `
    <li class="header__basket__section__list__item">
        <p class="header__basket__section__list__item__text">Env&iacute;o</p>
        <p class="header__basket__section__list__item__price">$${order.getShipmentCost()}</p>
    </li>
    <li class="header__basket__section__list__item">
        <p class="header__basket__section__list__item__text">Subtotal</p>
        <p class="header__basket__section__list__item__price">$${order.getSubtotal()}</p>
    </li>
    <li class="header__basket__section__list__item">
        <p class="header__basket__section__list__item__text">Total</p>
        <p class="header__basket__section__list__item__price">$${order.getTotal()}</p>
    </li>
    <li class="header__basket__section__list__item header__basket__section__list__item--align_center">
        <button class="header__basket__section__list__item__button">Ir a pagar</button>
    </li>
    `) || ``;
    cartResumeWrapper.innerHTML = innerHTML;

}

const drawCart = (preOrder = null) => {
    if (!preOrder) {
        preOrder = new Order(0, new User(), 45);
    }
    const cartItemsWrapper = document.getElementById("cart-Items");
    let innerHTML = "";
    for (const product of preOrder.getProducts()) {
        innerHTML += generateCartItemElement(product);
    }
    cartItemsWrapper.innerHTML = innerHTML || `No hay productos en su carrito`;
    drawCartResume(preOrder);
}

const addEventsForCart = () => {
    addEventByClass("add-item", addToCartEventHandler);
    addEventByClass("substract-item", substractFromCartEventHandler);
    addEventByClass("delete-item", deleteFromCartEventHandler);
}
 // ====== CART FUNCTIONS END ======
 
 // ====== FUNCTION TO DRAW PRODUCT BOXES ======
 const drawItems = (products) => {
    let content = "";
    for (const product of products) {
        content += 
            `<div class="menu__box__category__plates__item col-sm-12 col-md-6 col-lg-4">
                <img class="menu__box__category__plates__item__img" src="../${product.image}" alt="${product.name}">
                <h3 class="menu__box__category__plates__item__title">${product.name}</h3>
                <p class="menu__box__category__plates__item__description">${product.description}</p>
                <p class="menu__box__category__plates__item__price">$${product.price}</p>
                <button class="add-item menu__box__category__plates__item__button" data-id="${product.id}" show-message="true">Agregar al carro</button>
            </div>`
    }
    return content;
};

// ====== FUNCTION TO DRAW PRODUCTS MENU ======
const drawMenu = (productsByCategory = []) => {
    const menuBox = document.getElementById("menu");
    let content = "";

    for (category of productsByCategory) {
        content += `<section class="menu__box__category menu__box__category--background-lavander menu__box__category--red-border container">
        <div class="row mb-3">
            <div class="menu__box__category__title col-sm-12">
                <h2>${category.name}</h2>
            </div>
        </div>
        <div class="row justify-content-center">`;
        content += drawItems(category.products);
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
    menuBox.innerHTML = content;
}

const urlContains = (page) => {
    const path = window.location.pathname;
    const currPage = path.split('/');
    return currPage.findIndex( str => str === page) !== -1
}

// ======= FILTER METHODS =======
const filter = async () => {
    const filterSelectElem = document.getElementById('food_filter_type');
    const categoryId = filterSelectElem.selectedIndex;
    const productsByCategory = await Category.getProductsCategories();
    if(categoryId > 0) {
        const result = productsByCategory.find(category => category.id == categoryId);
        drawMenu([result]);
    } else {
        drawMenu(productsByCategory);
    }
    addEventsForCart();
}

const addOptionsAndEventListenerToFilter = async () => {
    const filterSelectElem = document.getElementById('food_filter_type');
    const selectOption = document.createElement("option");
    selectOption.value = "0";
    selectOption.innerHTML = "Todos";
    filterSelectElem.append(selectOption);
    const categories = await Category.getAll();
    for (const category of categories ) {
        const option = document.createElement("option");
        option.value = category.id;
        option.innerHTML = category.name;
        filterSelectElem.append(option);
    }
    filterSelectElem.addEventListener('change', filter);
}
// ======= FILTER METHODS END =======


// ======= SEARCH METHODS =======
const searchProducts = async () => {
    const searchInputElem = document.getElementById('search');
    if(searchInputElem.value.length >= 3) {
        const products = await Product.searchByNameAndDescription(searchInputElem.value);
        const searchResult = [{
            name: "Búsqueda",
            products: products,
        }]
        drawMenu(searchResult);
        addEventsForCart();
    }
    if(searchInputElem.value.length == 0) {
        filter();
    }
}

const addEventListenerToSearch = () => {
    const searchInputElem = document.getElementById('search');
    searchInputElem.addEventListener('input', searchProducts);
}
// ======= SEARCH METHODS END =======


// this is the code executed when the page loads
const load = async () => {
    prefixUrl = urlContains('pages') ? "../" : "";
    drawCart();
    if(urlContains('online-order.html')) {
        drawMenu(await Category.getProductsCategories());
        await addOptionsAndEventListenerToFilter();
        addEventListenerToSearch();
    }
    addEventsForCart();
}

// this will wait until page loads
document.addEventListener("DOMContentLoaded", load);

