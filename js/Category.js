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

    static getAll = async () => {
        const response = await fetch('../data/categories.json');
        let unformattedCategories = [];
        if(response.status === 200) {
            unformattedCategories = await response.json();
        }
        const categories = [];
        for (const category of unformattedCategories) {
            categories.push(Category.parseDataFromObject(category));
        }
        return categories;
    }

    static parseDataFromObject = (category) => {
        return new Category(category.id, category.name);
    }

    getProductsWithCategoryName = () => {
        return {
            [this.name]: this.products
        }
    }

    static getProductsOrderedByCategories = async () => {
        const categories = await Category.getAll();
        let productsByCategory = {};
        for (const category of categories) {
            category.setProductsByCategory(await SessionStorage.getProductsInStock());
            let productsByCategoryPartial = category.getProductsWithCategoryName();
            productsByCategory = {...productsByCategory, ...productsByCategoryPartial }
        }
        return productsByCategory;
    }
}
