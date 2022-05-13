// CART FUNCTIONS
const addToCartEventHandler = (event) => {
    const productsInStock = SessionStorage.getProductsInStock();
    const productId = parseInt(event.srcElement.getAttribute("data-id"));
    const product = productsInStock.find(product => product.id === productId);
    
    const userCart = LocalStorage.getUserCart();
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

const drawCart = () => {
    const cartItemsBox = document.getElementById("cart-Items");
    // continue from here
    cartItemsBox.appendChild();
}

// this is the code executed when the page loads
const load = () => {
    addEventAddToCartByClass("add-cart");
}

// this will wait until page loads
document.addEventListener("DOMContentLoaded", load);

