class Product {
    price;
    name;

    constructor (name, price) {
        this.price = price;
        this.name = name;
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
        const result = this.products.findIndex( currProduct => currProduct.name === product.name );
        if(result != -1) {
            this.quantities[product.name] += qty;
        } else {
            this.products.push(product);
            this.quantities[product.name] = qty;
        }
    }

    getProducts = () => {
        let products = [];
        this.products.forEach( product => {
            products.push({
                name: product.name,
                price: product.price,
                qty: this.quantities[product.name],
                total: this.quantities[product.name] * product.price,
            })
        });
        return products;
    }
}

validateYesNoPrompt = (message) => {
    const retry = true;
    while(retry) {
        let answer = prompt(message);
        if (!answer) {
            alert("Por favor ingrese una respuesta valida.");
        } else {
            switch(answer.trim().toLowerCase()) {
                case 'y' || 'yes':
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

shouldAddProducts = () => {
    const cart = new Cart();
    let answer;
    do{
        answer = validateYesNoPrompt('Desea ingresar productos a su carrito? y / n');
        if(answer) {
            const productName = validateStringPrompt('Ingrese nombre del producto');
            const productPrice = validateNumberPrompt('Ingrese valor del producto');
            const productQty = validateNumberPrompt('Ingrese cantidad del producto');
            const product = new Product(productName, productPrice);
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

shouldAddProducts();