class User {
    id; // id = 0 is a not logged in user
    email;
    fullname;
    dni;
    addressName;
    addressNumber;
    addressPostalCode;
    cart; // object of CART class

    constructor (id = 0, email = "", password = "", fullname = "", dni = "", tel ="", addressName = "", addressNumber = "", addressPostalCode = "") {
        this.id = id;
        this.email = email;
        this.password = password;
        this.fullname = fullname;
        this.dni = dni;
        this.tel = tel;
        this.addressName = addressName;
        this.addressNumber = addressNumber;
        this.addressPostalCode = addressPostalCode;
        this.cart = this.getCart(this.id);
    }

    getCart = () => {
        if(!this.cart) {
            this.cart = Cart.getCartByUserId(this.id);
        }
        return this.cart;
    }

}