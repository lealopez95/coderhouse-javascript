class Cart {
    userId; // reference to a User id
    products;
    quantities;

    constructor (userId = 0, products = [], quantities = {}) {
        this.userId = userId;
        this.products = products;
        this.quantities = quantities;
    }

    static parseDataFromObject = (unparsedCart, userId) => {
        const products = unparsedCart.products;
        const parsedProducts = products.map(product => Product.parseDataFromObject(product));
        return new Cart(userId, parsedProducts, unparsedCart.quantities);
    }

    static getCartByUserId = (userId) => {
        return LocalStorage.getUserCart(userId);
    }

    addProduct = (product, qty = 1) => {
        const result = this.products.findIndex( currProduct => currProduct.id === product.id );
        if(result != -1) {
            this.quantities[product.id] += qty;
        } else {
            this.products.push(product);
            this.quantities[product.id] = qty;
        }
        LocalStorage.setUserCart(this);
    }

    deleteProduct = (productId) => {
        const result = this.products.findIndex( currProduct => currProduct.id === productId );
        if(result != -1) {
            const  [ deletedProduct ]  = this.products.splice(result, 1);
            delete this.quantities.productId;
            LocalStorage.setUserCart(this);
            return deletedProduct;
        }
        
        return false;
    }

    getProducts = () => this.products.map( product => {
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            qty: this.quantities[product.id],
            total: this.quantities[product.id] * product.price,
        }
    });
}