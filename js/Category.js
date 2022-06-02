class Category {
    id;
    name;
    products; // array of objects of class Product

    constructor(id, name, products = []) {
        this.id = id;
        this.name = name;
        this.products = products;
    }

    setProductsByCategory = (products) => {
        this.products = products.filter(product => product.categoryId === this.id);
    }

    static getAll = () => {
        return [
            new Category(1,"Entradas"),
            new Category(2,"Platos principales"),
            new Category(3,"Sushi"),
            new Category(4,"Postres"),
            new Category(5,"Bebidas"),
        ];
    }

    getProductsWithCategoryName = () => {
        return {
            [this.name]: this.products
        }
    }

    static getProductsOrderedByCategories = async () => {
        const categories = Category.getAll();
        let productsByCategory = {};
        for (const category of categories) {
            category.setProductsByCategory(await SessionStorage.getProductsInStock());
            let productsByCategoryPartial = category.getProductsWithCategoryName();
            productsByCategory = {...productsByCategory, ...productsByCategoryPartial }
        }
        return productsByCategory;
    }
}
