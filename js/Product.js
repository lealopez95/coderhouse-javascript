class Product {
    id;
    price;
    name;
    description;
    image;
    categoryId; // reference to class Category

    constructor (id, name, price, description = "", image = "", categoryId = null) {
        this.id = id;
        this.price = price;
        this.name = name;
        this.image = image;
        this.description = description;
        this.categoryId = categoryId;
    }

    static getAll = async () => {
        const response = await fetch('../data/products.json');
        let unformattedProducts = [];
        if(response.status === 200) {
            unformattedProducts = await response.json();
        }
        const products = [];
        for (const product of unformattedProducts) {
            products.push(Product.parseDataFromObject(product));
        }
        return products;
    }

    static searchByNameAndDescription = async search => {
        const words = search.split(" ");
        const productsInStock = await Product.getProductsInStock();
        const regExp = new RegExp(words.join("|"), 'i');
        return productsInStock.filter(product => {
            return (product.name.search(regExp) != -1 || product.description.search(regExp) != -1);
        });
    }

    static parseDataFromObject = product => {
        return new Product(product.id, product.name, product.price, product.description, product.image, product.categoryId);
    }

    static getProductsInStock = async () => {
       return SessionStorage.getProductsInStock();
    }
}