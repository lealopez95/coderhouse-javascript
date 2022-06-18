// GLOBAL FOR ROUTES
let prefixUrl = '';

// ====== CART FUNCTIONS ======
const addCartItem = (product) => {
    const productElem = document.getElementById(`quantity_${product.id}`);
    if(!productElem) {
        const listElement = generateCartItemElement(product);
        const cartItemsWrapper = document.getElementById("cart-Items");
        if(cartItemsWrapper.innerHTML === `No hay productos en su carrito`) {
            cartItemsWrapper.innerHTML = '';
        }
        cartItemsWrapper.append(listElement);
    } else {
        productElem.value = productElem.value ? parseInt(productElem.value) + 1 : 1;
    }
    drawCartResume();
}

const addToCartEventHandler = async ({ srcElement }) => {
    const productsInStock = await Product.getProductsInStock();
    const productId = parseInt(srcElement.getAttribute("data-id"));
    const showMessageAttr = srcElement.getAttribute("show-message");
    const shouldShowMessage = (showMessageAttr && showMessageAttr==='true') || false;
    const product = productsInStock.find(product => product.id === productId);
    const user = new User();
    const userCart = user.getCart();
    const prodAdded = userCart.addProduct(product);
    if (shouldShowMessage) {
        swal({
           text: `Añadiste ${prodAdded.name} a tu carrito.`,
            icon: "success",
            button: "Ok",
        });
    }
    addCartItem(prodAdded);
}

const removeCartItem = (product) =>  {
    console.log(product)
    if(product.qty > 0) {
        const productElemQty = document.getElementById(`quantity_${product.id}`);
        productElemQty.value = parseInt(productElemQty.value) - 1;
    } else{
        const productElem = document.getElementById(`cartItem_${product.id}`);
        productElem.remove();
        const cartItemsWrapper = document.getElementById("cart-Items");
        if(cartItemsWrapper.innerHTML === '') {
            cartItemsWrapper.innerHTML = 'No hay productos en su carrito';
        }
    }
    drawCartResume();
}

const substractFromCartEventHandler = async ({ srcElement }) => {
    const productsInStock = await Product.getProductsInStock();
    const productId = parseInt(srcElement.getAttribute("data-id"));
    const product = productsInStock.find(product => product.id === productId);
    const user = new User();
    const userCart = user.getCart();
    const removedProduct = userCart.substractProduct(product);
    removeCartItem(removedProduct);
}

const deleteFromCartEventHandler = ({ srcElement }) => {
    const productId = parseInt(srcElement.parentElement.getAttribute("data-id"));
    const user = new User();
    const userCart = user.getCart();
    const productDeleted = userCart.deleteProduct(productId);
    if(productDeleted) {
        swal({
           text: `Eliminaste ${productDeleted.name} de tu carrito.`,
            icon: "success",
            button: "Ok",
        });
    }
    removeCartItem(productDeleted);
}

const generateCartItemElement = (product) => {
    const listItem = document.createElement('li');
    listItem.classList.add('header__basket__section__list__item');
    listItem.setAttribute('id', `cartItem_${product.id}`);

    const nameElem = document.createElement('p');
    nameElem.classList.add('header__basket__section__list__item__text');
    nameElem.append(product.name);    
    
    const minusButton = document.createElement('button');
    minusButton.classList.add('header__basket__section__list__item__button', 'header__basket__section__list__item__button--small', 'substract-item');
    minusButton.append('-');
    minusButton.setAttribute('data-id', product.id);
    minusButton.addEventListener('click', substractFromCartEventHandler);


    const qtyInput = document.createElement('input');
    qtyInput.classList.add('header__basket__section__list__item__qty');
    qtyInput.type = "number";
    qtyInput.min = "0";
    qtyInput.name = "quantity";
    qtyInput.id = `quantity_${product.id}`;
    qtyInput.value = product.qty;

    const plusButton = document.createElement('button');
    plusButton.classList.add('header__basket__section__list__item__button', 'header__basket__section__list__item__button--small', 'add-item');
    plusButton.append('+');
    plusButton.setAttribute('data-id', product.id);
    plusButton.addEventListener('click', addToCartEventHandler);

    const priceElem = document.createElement('p');
    priceElem.classList.add('header__basket__section__list__item__price');
    priceElem.id = `price_${product.id}`;
    priceElem.append(`$${product.price}`); 

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-item', 'header__basket__section__list__item__trash');
    deleteButton.setAttribute('data-id', product.id);
    deleteButton.innerHTML = `<img class="header__basket__section__list__item__icon" src="${prefixUrl}media/images/icons/trash_icon.svg" alt="tacho de basura">`;
    deleteButton.addEventListener('click', deleteFromCartEventHandler);

    listItem.append(
        nameElem,
        minusButton,
        qtyInput,
        plusButton,
        priceElem,
        deleteButton
    );

    return listItem;
}

const drawCartResume = (order = null) => {
    if(!order) {
        order = new Order(0, new User(), 45)
    }
    const cartResumeWrapper = document.getElementById("order-Items");
    const innerHTML = ( order.products?.length > 0 && `
    <li class="header__basket__section__list__item">
        <p class="header__basket__section__list__item__text">Env&iacute;o</p>
        <p class="header__basket__section__list__item__price">$${order.getShipmentCost()}</p>
    </li>
    <li class="header__basket__section__list__item">
        <p class="header__basket__section__list__item__text">Subtotal</p>
        <p class="header__basket__section__list__item__price">$${order.getSubtotal()}</p>
    </li>
    <li class="header__basket__section__list__item">
        <p class="header__basket__section__list__item__text">Total</p>
        <p class="header__basket__section__list__item__price">$${order.getTotal()}</p>
    </li>
    <li class="header__basket__section__list__item header__basket__section__list__item--align_center">
        <button class="header__basket__section__list__item__button">Ir a pagar</button>
    </li>
    `) || ``;
    cartResumeWrapper.innerHTML = innerHTML;

}

const drawCart = () => {
    preOrder = new Order(0, new User(), 45);
    const cartItemsWrapper = document.getElementById("cart-Items");
    cartItemsWrapper.innerHTML = '';
    for (const product of preOrder.getProducts()) {
        cartItemsWrapper.append( generateCartItemElement(product) );
    }
    if (cartItemsWrapper.innerHTML === '') {
        cartItemsWrapper.innerHTML = `No hay productos en su carrito`;
    }
    drawCartResume(preOrder);
}

 // ====== CART FUNCTIONS END ======
 
 // ====== FUNCTION TO DRAW PRODUCT BOXES ======
 const createItemsElements = (products) => {
    const productElements = [];
    for (const product of products) {
        const prodElem = document.createElement('div');
        prodElem.classList.add(
            'menu__box__category__plates__item', 
            'col-sm-12',
            'col-md-6',
            'col-lg-4'
        );
        prodElem.innerHTML = `
            <img class="menu__box__category__plates__item__img" src="../${product.image}" alt="${product.name}">
            <h3 class="menu__box__category__plates__item__title">${product.name}</h3>
            <p class="menu__box__category__plates__item__description">${product.description}</p>
            <p class="menu__box__category__plates__item__price">$${product.price}</p>`;

        const addToCartButton = document.createElement('button');
        addToCartButton.classList.add('add-item', 'menu__box__category__plates__item__button');
        addToCartButton.setAttribute('data-id', product.id);
        addToCartButton.setAttribute('show-message', 'true');
        addToCartButton.append('Agregar al carro');
        addToCartButton.addEventListener('click', addToCartEventHandler);

        prodElem.append(addToCartButton);
        productElements.push(prodElem);
    }
    return productElements;
};

// ====== FUNCTION TO DRAW PRODUCTS MENU ======
const drawMenu = (productsByCategory = []) => {
    const menuBox = document.getElementById("menu");
    menuBox.innerHTML = '';
    let categorySection = null;
    for (category of productsByCategory) {
        categorySection = createCategorySectionElem();

        const categoryTitle = document.createElement('div');
        categoryTitle.classList.add('row', 'mb-3');
        categoryTitle.innerHTML =  `
            <div class="menu__box__category__title col-sm-12">
                <h2>${category.name}</h2>
            </div>`;
        categorySection.append(categoryTitle);

        const listElements = document.createElement('div');
        listElements.classList.add('row', 'justify-content-center');
        const products = createItemsElements(category.products);
        products.forEach(elem => listElements.append(elem));
        categorySection.append(listElements);

        menuBox.append(categorySection);
    }

    if(!categorySection) {
        categorySection = createCategorySectionElem();

        const emptyMenu = document.createElement('div');
        emptyMenu.classList.add('row', 'mb-3');
        emptyMenu.innerHTML =  `
            <div class="menu__box__category__title col-sm-12">
                <h2>La carta está vacía</h2>
            </div>`;
        categorySection.append(emptyMenu);
        menuBox.append(categorySection);
    }
}

const createCategorySectionElem = () => {
    const categorySection = document.createElement('section');
    categorySection.classList.add('menu__box__category', 'menu__box__category--background-lavander', 'menu__box__category--red-border', 'container');
    return categorySection;
}

const urlContains = (page) => {
    const path = window.location.pathname;
    const currPage = path.split('/');
    return currPage.findIndex( str => str === page) !== -1
}

// ======= FILTER METHODS =======
const filter = async () => {
    const filterSelectElem = document.getElementById('food_filter_type');
    const categoryId = filterSelectElem.selectedIndex;
    const productsByCategory = await Category.getProductsCategories();
    if(categoryId > 0) {
        const result = productsByCategory.find(category => category.id == categoryId);
        drawMenu([result]);
    } else {
        drawMenu(productsByCategory);
    }
}

const addOptionsAndEventListenerToFilter = async () => {
    const filterSelectElem = document.getElementById('food_filter_type');
    const selectOption = document.createElement("option");
    selectOption.value = "0";
    selectOption.innerHTML = "Todos";
    filterSelectElem.append(selectOption);
    const categories = await Category.getAll();
    for (const category of categories ) {
        const option = document.createElement("option");
        option.value = category.id;
        option.innerHTML = category.name;
        filterSelectElem.append(option);
    }
    filterSelectElem.addEventListener('change', filter);
}
// ======= FILTER METHODS END =======


// ======= SEARCH METHODS =======
const searchProducts = async () => {
    const searchInputElem = document.getElementById('search');
    if(searchInputElem.value.length >= 3) {
        const products = await Product.searchByNameAndDescription(searchInputElem.value);
        const searchResult = [{
            name: "Búsqueda",
            products: products,
        }]
        drawMenu(searchResult);
    }
    if(searchInputElem.value.length == 0) {
        filter();
    }
}

const addEventListenerToSearch = () => {
    const searchInputElem = document.getElementById('search');
    searchInputElem.addEventListener('input', searchProducts);
}
// ======= SEARCH METHODS END =======


// this is the code executed when the page loads
const load = async () => {
    prefixUrl = urlContains('pages') ? "../" : "";
    drawCart();
    if(urlContains('online-order.html')) {
        drawMenu(await Category.getProductsCategories());
        await addOptionsAndEventListenerToFilter();
        addEventListenerToSearch();
    }
}

// this will wait until page loads
document.addEventListener("DOMContentLoaded", load);

