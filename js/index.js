// CART FUNCTIONS
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

// this is the code executed when the page loads
const load = () => {
    drawCart();
    addEventsForCart();
}

// this will wait until page loads
document.addEventListener("DOMContentLoaded", load);

