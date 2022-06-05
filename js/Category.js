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

    static getProductsCategories = async () => {
        const categories = await Category.getAll();
        let categoriesWithProducts = [];
        for (const category of categories) {
            category.setProductsByCategory(await SessionStorage.getProductsInStock());
            categoriesWithProducts.push(category);
        }
        return categoriesWithProducts;
    }
}
