// CART FUNCTIONS
const addToCartEventHandler = (event) => {
    const productsInStock = Product.getProductsInStock();
    const productId = parseInt(event.srcElement.getAttribute("data-id"));
    const product = productsInStock.find(product => product.id === productId);
    const user = new User();
    const userCart = user.getCart();
    userCart.addProduct(product);
    console.log("product añadido", product);
    console.log("actual status del carrito:");
    const productsInCart = userCart.getProducts();
    if(productsInCart.length === 0) {
        console.log('No hay productos en el carrito');
    } else {
        let message = 'Sus productos en el carrito son: \n';
        let total = 0;
        productsInCart.forEach(product => {
            message += `${product.name}: ${product.price} * ${product.qty} = ${product.total} \n`;
            total += product.total;
        });
        message +=  `TOTAL: $${total}`;
        console.log(message);
    }
}

const addEventAddToCartByClass = (className) => {
    const productBoxes = document.getElementsByClassName(className);
    for (productBox of productBoxes) {
        productBox.addEventListener("click", addToCartEventHandler);
    }
}


/* return {
    id: product.id,
    name: product.name,
    price: product.price,
    qty: this.quantities[product.id],
    total: this.quantities[product.id] * product.price,
} */

const drawCartItem = (product) => {
    return `
    <li class="header__basket__section__list__item">
        <p class="header__basket__section__list__item__text">${product.name}</p>
        <input class="header__basket__section__list__item__qty" type="number" min="0" name="quantity" id="quantity_${product.id}" value="${product.qty}" data-id="${product.id}">
        <p class="header__basket__section__list__item__price" id="price_${product.id}">$${product.price}</p>
        <a id="trash_${product.id}" href="#">
            <img class="header__basket__section__list__item__icon" src="${prefixUrl}media/images/icons/trash_icon.svg" alt="tacho de basura">
        </a>
    </li>
    `;
}

const drawCartResume = (order) => {

    return `
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
    `;
}

const drawCart = (preOrder) => {
    const cartItemsWrapper = document.getElementById("cart-Items");
    let innerHTML = "";
    for (const product of preOrder.getProducts()) {
        innerHTML += drawCartItem(product);
    }
    cartItemsWrapper.innerHTML = innerHTML;

    const cartResumeWrapper = document.getElementById("order-Items");
    innerHTML = drawCartResume(preOrder);
    cartResumeWrapper.innerHTML = innerHTML;
}

const addEventsForCart = () => {
    // @TODO: add events for delete cart items
}

// this is the code executed when the page loads
const load = () => {
    addEventAddToCartByClass("add-cart");
    drawCart(new Order(0, new User(), 45));
    addEventsForCart();
}

// this will wait until page loads
document.addEventListener("DOMContentLoaded", load);

