 // ====== CART FUNCTIONS ======
const addToCartEventHandler = async ({ srcElement }) => {
    const productsInStock = await Product.getProductsInStock();
    const productId = parseInt(srcElement.getAttribute("data-id"));
    const product = productsInStock.find(product => product.id === productId);
    // @TODO: add logic so it can load a User logged
    const user = new User();
    const userCart = user.getCart();
    userCart.addProduct(product);
    swal({
       text: `Añadiste ${product.name} a tu carrito.`,
        icon: "success",
        button: "Ok",
    });
    // @TODO: optimize to just add this new item and not re-draw everything
    drawCart();
    addEventsForCart();
}

const deleteFromCartEventHandler = ({ srcElement }) => {
    const productId = parseInt(srcElement.parentElement.getAttribute("data-id"));
    // @TODO: add logic so it can load a User logged
    const user = new User();
    const userCart = user.getCart();
    const productDeleted = userCart.deleteProduct(productId);
    // @TODO: optimize to just delete this item and not re-draw everything
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

const drawCartItem = (product) => {
    return `
    <li class="header__basket__section__list__item">
        <p class="header__basket__section__list__item__text">${product.name}</p>
        <input class="header__basket__section__list__item__qty" type="number" min="0" name="quantity" id="quantity_${product.id}" value="${product.qty}">
        <p class="header__basket__section__list__item__price" id="price_${product.id}">$${product.price}</p>
        <button id="trash_${product.id}" href="#" class="delete-item header__basket__section__list__item__trash" data-id="${product.id}">
            <img class="header__basket__section__list__item__icon" src="${prefixUrl}media/images/icons/trash_icon.svg" alt="tacho de basura">
        </button>
    </li>
    `;
}

const drawCartResume = (order) => {
    return ( order.products?.length > 0 && `
    <li class="header__basket__section__list__item">
        <label for="discount_code">C&oacute;digo de descuento</label>
        <input class="header__basket__section__list__item__discount_code" type="text" name="discount_code" id="discount_code" placehulder="C&oacute;digo">
        <p class="header__basket__section__list__item__text">-20%</p>
    </li>
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
}

const drawCart = (preOrder = null) => {
    if (!preOrder) {
        preOrder = new Order(0, new User(), 45);
    }
    const cartItemsWrapper = document.getElementById("cart-Items");
    let innerHTML = "";
    for (const product of preOrder.getProducts()) {
        innerHTML += drawCartItem(product);
    }
    cartItemsWrapper.innerHTML = innerHTML || `No hay productos en su carrito`;

    const cartResumeWrapper = document.getElementById("order-Items");
    innerHTML = drawCartResume(preOrder);
    cartResumeWrapper.innerHTML = innerHTML;
}

const addEventsForCart = () => {
    addEventByClass("add-item", addToCartEventHandler);
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
                <button class="add-item menu__box__category__plates__item__button" data-id="${product.id}">Agregar al carro</button>
            </div>`
    }
    return content;
};

// ====== FUNCTION TO DRAW PRODUCTS MENU ======
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

const isPage = (page) => {
    const path = window.location.pathname;
    const currPage = path.split('/');
    return currPage.findIndex( str => str === page) !== -1
}

// this is the code executed when the page loads
const load = async () => {
    drawCart();
    if(isPage('online-order.html')) {
        drawMenu(await Category.getProductsOrderedByCategories());
    }
    addEventsForCart();
}

// this will wait until page loads
document.addEventListener("DOMContentLoaded", load);

