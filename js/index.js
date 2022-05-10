// ========== DEFINITION OF CLASSES ==========

class Product {
    id;
    price;
    name;
    description;
    image;

    constructor (id, name, price, description = "", image = "") {
        this.id = id;
        this.price = price;
        this.name = name;
        this.image = image;
        this.description = description;
    }
}

class Cart {
    products;
    quantities;

    constructor () {
       this.products = []; 
       this.quantities = {}; 
    }

    addProduct(product, qty) {
        const result = this.products.findIndex( currProduct => currProduct.id === product.id );
        if(result != -1) {
            this.quantities[product.id] += qty;
        } else {
            this.products.push(product);
            this.quantities[product.id] = qty;
        }
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

// ========== DEFINITION OF PROMPT FUNCTIONS ==========

validateYesNoPrompt = (message) => {
    const retry = true;
    while(retry) {
        let answer = prompt(message);
        if (!answer) {
            alert("Por favor ingrese una respuesta valida.");
        } else {
            switch(answer.trim().toLowerCase()) {
                case 's' || 'si':
                   return true;
                case 'n' || 'no':
                    return false;
                default:
                    alert("Por favor ingrese una respuesta valida.");
                    break;
            }
        }
    }
}

validateStringPrompt = (message) => {
    const retry = true;
    while(retry) {
        const answer = prompt(message);
        if (!answer || answer === '' || answer === undefined ) {
            alert("Por favor ingrese un texto valido.");
        } else {
            return answer.trim().toLowerCase();
        }
    }
}

validateNumberPrompt = (message) => {
    let retry = true;
    while(retry) {
        const answer = parseInt(prompt(message));
        if (isNaN(answer)) {
            alert("Por favor ingrese un numero valido.");
        } else {
            return answer;
        }
    }
}

// ========== DEFINITION OF MAIN FUNCTIONS ==========

shouldAddProducts = () => {
    const cart = new Cart();
    let answer;
    do{
        answer = validateYesNoPrompt('Desea ingresar productos a su carrito? s / n');
        if(answer) {
            const productId = validateNumberPrompt('Ingrese id del producto');
            const productName = validateStringPrompt('Ingrese nombre del producto');
            const productPrice = validateNumberPrompt('Ingrese valor del producto');
            const productQty = validateNumberPrompt('Ingrese cantidad del producto');
            const product = new Product(productId, productName, productPrice);
            cart.addProduct(product, productQty);
        }
    } while (answer);
    const products = cart.getProducts();
    if(products.length === 0) {
        alert('No hay productos en el carrito');
    } else {
        let message = 'Sus productos en el carrito son: \n';
        let total = 0;
        products.forEach(product => {
            message += `${product.name}: ${product.price} * ${product.qty} = ${product.total} \n`;
            total += product.total;
        });
        message +=  `TOTAL: $${total}`;
        alert(message);
    }
}


// PRODUCTS TO BE DRAWN IN THE HTML
const productsByCategory = {
    "Entradas": [
        new Product(1, "Oniguiri", 50, "Triángulos de arroz rellenos x 2 u.", "media/images/food/oniguiri.webp"),
        new Product(2, "Tempura", 75, "Fritura de mariscos, kani-kama o vegetales rebozados en harina", "media/images/food/tempura-de-camarones1.webp"),
        new Product(3, "Gyōza", 25, "Empanada japonesa rellena de cerdo o verdura con salsa de soja y ajo x 5 u.", "media/images/food/Gyoza.webp"),
    ],
    "Platos principales": [
        new Product(4, "Tonkotsu Ramen", 100, "Sopa de Fideos, cerdo chashu en trozos, huevos, palillos, caja de cartón, botella de salsa de soja.", "media/images/food/tonkotsu_ramen.webp"),
        new Product(5, "Sapporo Ramen", 100, "Fideos gruesos, caldo de cerdo, pollo o pescado y miso rojo acompañado con chasu, huevos pasado por agua, carne de cerdo picada,col, jengibre y maíz dulce", "media/images/food/sapporo_ramen.webp"),
        new Product(6, "Tsukemen Ramen", 100, "Se sirve en dos bol distintos: en uno los fideos ligeramente fríos y en un otro el caldo. Los fideos se van sumergiendo poco a poco en el caldo y comiendo acompañado de los aderezos y demás ingredientes.", "media/images/food/tsukemen_ramen.webp"),
        new Product(7, "Okonomiyaki", 100, "Tortilla hecha con una masa de harina con repollo, papas, puerros, alga nori, cebolla de verdeo, bacon, langostinos y salsa okonomiyaki", "media/images/food/okonomiyaki.webp"),
        new Product(8, "Yakisoba", 100, "Fideos soba fritos con mariscos y verduras", "media/images/food/yakisoba-con-salm195179n.webp"),
        new Product(9, "Tonkatsu", 100, "Chueta de cerdo rebosada en Panko frita", "media/images/food/tonkatsu.webp"),
        new Product(10, "Katsudon", 100, "Milanesa de cerdo con huevo y cebolla cocidos en caldo dashi sobre arroz japonés", "media/images/food/katsudon.webp"),
    ],
    "Sushi": [
        new Product(11, "Maki", 100, "Piezas de arroz con salm&oacute;n o At&uacute;n, palta y queso philadephia enrollados en alga nori x 6 u.", "media/images/food/maki-sushi-.webp"),
        new Product(12, "Niguiri", 100, "Piezas de arroz cubiertas con una lonja de salm&oacute;n, at&uacute;n rojo, pulpo o langostino x 6 u.", "media/images/food/nigiri.webp"),
        new Product(13, "Sashimi", 100, "Lonjas de Salmón cortadas finamente x 6 u.", "media/images/food/sashimi.webp"),
    ],
    "Postres": [
        new Product(14, "Dorayaki", 100, "Tortita redonda rellena con una pasta dulce de judías rojas (azuki) x 2 u.", "media/images/food/dorayaki.webp"),
        new Product(15, "Mitarashi Dango", 100, "Brochetas de bambú con 3 bolas de masa dulce de harina de arroz x 2 u.", "media/images/food/mitarashi_dango.webp"),
        new Product(16, "Hanami dango", 100, "3 bolas de masa dulce de harina de arroz de color verde pálido, blanco y rosa.", "media/images/food/hanami-dango.webp"),
        new Product(17, "Ichigo Shortcake", 100, "Mini torta de fresas con crema.", "media/images/food/ichigo_shorcake.webp"),
        new Product(18, "Purin", 100, "Delicioso pudin con fresa y chocolate. Se sirve bien frio.", "media/images/food/Purin.webp"),
    ],
    "Bebidas": [
        new Product(19, "Sake", 100, "Alcohol en base a arroz lleva levadura blanca y agua", "media/images/food/sake.webp"),
        new Product(20, "Sake junmai", 100, "El único ingrediente necesario para elaborar esta bebida típica de Japón es el arroz.", "media/images/food/sake-junmai.webp"),
        new Product(21, "Ramune", 100, "Bebida dulce y refrescante", "media/images/food/Ramune.webp"),
        new Product(22, "Té", 100, "Té verde o té oolong embotellado.", "media/images/food/tea.webp"),
        new Product(23, "Agua", 100, "Botella de 600ml", "media/images/food/agua.webp"),
    ],
};

// ====== FUNCTIONS TO DRAW MENU ======
const drawItems = (products) => {
    let content = "";
    for (const product of products) {
        content += 
            `<div class="product-item menu__box__category__plates__item col-sm-12 col-md-6 col-lg-4" id="product_${product.id}">
                <img class="menu__box__category__plates__item__img" src="../${product.image}" alt="${product.name}">
                <h3 class="menu__box__category__plates__item__title">${product.name}</h3>
                <p class="menu__box__category__plates__item__description">${product.description}</p>
                <p class="menu__box__category__plates__item__price">$${product.price}</p>
            </div>`
    }
    console.log(content);
    return content;
};

const drawMenu = () => {
    const menuBox = document.getElementById("menu");
    let content = "";
    for (const key in productsByCategory) {
        content += `<section class="menu__box__category menu__box__category--background-lavander menu__box__category--red-border container">
        <div class="row mb-3">
            <div class="menu__box__category__title col-sm-12">
                <h2>${key}</h2>
            </div>
        </div>
        <div class="row justify-content-center">`;
        content += drawItems(productsByCategory[key]);
        content += `</div></section>`;
    }
    menuBox.innerHTML += content;
}
// ====== FUNCTIONS TO DRAW MENU END ======

// this is the code executed when the page loads
const load = () => {
    drawMenu();
}

// this will wait until page loads
document.addEventListener("DOMContentLoaded", load);

