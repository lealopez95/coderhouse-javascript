// stores data that will persist
class LocalStorage {
    static USER_CART = "userCart";

    static setUserCart = (cart) => {
        localStorage.setItem(LocalStorage.USER_CART + '_' + cart.userId, JSON.stringify(cart));
    }

    static getUserCart = (userId) => {
        let userCart = JSON.parse(localStorage.getItem(LocalStorage.USER_CART + '_' + userId));
        if (!userCart) {
            userCart = new Cart();
            LocalStorage.setUserCart(userCart);
        } else {
            userCart = Cart.parseDataFromObject(userCart, userId);
        }
        return userCart;
    }
}

// stores data that will persist until browser window closes
class SessionStorage {
    static PRODUCTS_IN_STOCK = "productsInStock";

    static setProductsInStock = (products) => {
        sessionStorage.setItem(SessionStorage.PRODUCTS_IN_STOCK, JSON.stringify(products));
    }

    static getProductsInStock = async () => {
        let productsInStock = JSON.parse(sessionStorage.getItem(SessionStorage.PRODUCTS_IN_STOCK));
        if (!productsInStock) {
            productsInStock = await Product.getAll();
            SessionStorage.setProductsInStock(productsInStock);
        }
        return productsInStock;
    }

}
