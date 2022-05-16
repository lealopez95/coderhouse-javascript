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

    static getAll = () => {
        return [
            new Product(1, "Oniguiri", 50, "Triángulos de arroz rellenos x 2 u.", "media/images/food/oniguiri.webp", 1),
            new Product(2, "Tempura", 75, "Fritura de mariscos, kani-kama o vegetales rebozados en harina", "media/images/food/tempura-de-camarones1.webp", 1),
            new Product(3, "Gyōza", 25, "Empanada japonesa rellena de cerdo o verdura con salsa de soja y ajo x 5 u.", "media/images/food/Gyoza.webp", 1),
            new Product(4, "Tonkotsu Ramen", 100, "Sopa de Fideos, cerdo chashu en trozos, huevos, palillos, caja de cartón, botella de salsa de soja.", "media/images/food/tonkotsu_ramen.webp", 2),
            new Product(5, "Sapporo Ramen", 100, "Fideos gruesos, caldo de cerdo, pollo o pescado y miso rojo acompañado con chasu, huevos pasado por agua, carne de cerdo picada,col, jengibre y maíz dulce", "media/images/food/sapporo_ramen.webp", 2),
            new Product(6, "Tsukemen Ramen", 100, "Se sirve en dos bol distintos: en uno los fideos ligeramente fríos y en un otro el caldo. Los fideos se van sumergiendo poco a poco en el caldo y comiendo acompañado de los aderezos y demás ingredientes.", "media/images/food/tsukemen_ramen.webp", 2),
            new Product(7, "Okonomiyaki", 100, "Tortilla hecha con una masa de harina con repollo, papas, puerros, alga nori, cebolla de verdeo, bacon, langostinos y salsa okonomiyaki", "media/images/food/okonomiyaki.webp", 2),
            new Product(8, "Yakisoba", 100, "Fideos soba fritos con mariscos y verduras", "media/images/food/yakisoba-con-salm195179n.webp", 2),
            new Product(9, "Tonkatsu", 100, "Chueta de cerdo rebosada en Panko frita", "media/images/food/tonkatsu.webp", 2),
            new Product(10, "Katsudon", 100, "Milanesa de cerdo con huevo y cebolla cocidos en caldo dashi sobre arroz japonés", "media/images/food/katsudon.webp", 2),
            new Product(11, "Maki", 100, "Piezas de arroz con salm&oacute;n o At&uacute;n, palta y queso philadephia enrollados en alga nori x 6 u.", "media/images/food/maki-sushi-.webp", 3),
            new Product(12, "Niguiri", 100, "Piezas de arroz cubiertas con una lonja de salm&oacute;n, at&uacute;n rojo, pulpo o langostino x 6 u.", "media/images/food/nigiri.webp", 3),
            new Product(13, "Sashimi", 100, "Lonjas de Salmón cortadas finamente x 6 u.", "media/images/food/sashimi.webp", 3),
            new Product(14, "Dorayaki", 100, "Tortita redonda rellena con una pasta dulce de judías rojas (azuki) x 2 u.", "media/images/food/dorayaki.webp", 4),
            new Product(15, "Mitarashi Dango", 100, "Brochetas de bambú con 3 bolas de masa dulce de harina de arroz x 2 u.", "media/images/food/mitarashi_dango.webp", 4),
            new Product(16, "Hanami dango", 100, "3 bolas de masa dulce de harina de arroz de color verde pálido, blanco y rosa.", "media/images/food/hanami-dango.webp", 4),
            new Product(17, "Ichigo Shortcake", 100, "Mini torta de fresas con crema.", "media/images/food/ichigo_shorcake.webp", 4),
            new Product(18, "Purin", 100, "Delicioso pudin con fresa y chocolate. Se sirve bien frio.", "media/images/food/Purin.webp", 4),
            new Product(19, "Sake", 100, "Alcohol en base a arroz lleva levadura blanca y agua", "media/images/food/sake.webp", 5),
            new Product(20, "Sake junmai", 100, "El único ingrediente necesario para elaborar esta bebida típica de Japón es el arroz.", "media/images/food/sake-junmai.webp", 5),
            new Product(21, "Ramune", 100, "Bebida dulce y refrescante", "media/images/food/Ramune.webp", 5),
            new Product(22, "Té", 100, "Té verde o té oolong embotellado.", "media/images/food/tea.webp", 5),
            new Product(23, "Agua", 100, "Botella de 600ml", "media/images/food/agua.webp", 5),
        ];
    }

    static parseDataFromObject = (product) => {
        return new Product(product.id, product.name, product.price, product.description, product.image, product.caregoryId);
    }

    static getProductsInStock = () => {
       return SessionStorage.getProductsInStock();
    }
}