class Cart {
    products;
    quantities;
    userId; // reference to a User id

    constructor (products = [], quantities = {}, userId = null) {
        this.products = products;
        this.quantities = quantities;
        this.user = userId;
    }

    static loadFromStorage = (unparsedCart) => {
        const products = unparsedCart.products;
        const parsedProducts = products.map(product => Product.loadFromStorage(product));
        return new Cart(parsedProducts, unparsedCart.quantities);
    }

    addProduct(product, qty = 1) {
        const result = this.products.findIndex( currProduct => currProduct.id === product.id );
        if(result != -1) {
            this.quantities[product.id] += qty;
        } else {
            this.products.push(product);
            this.quantities[product.id] = qty;
        }
        LocalStorage.setUserCart(this);
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