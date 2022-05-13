class User {
    id;
    email;
    fullname;
    dni;
    addressName;
    addressNumber;
    addressPostalCode;
    cart; // object of CART class

    constructor (id, email = "", password = "", fullname = "", dni = "", tel ="", addressName = "", addressNumber = "", addressPostalCode = "", cart = new Cart()) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.fullname = fullname;
        this.dni = dni;
        this.tel = tel;
        this.addressName = addressName;
        this.addressNumber = addressNumber;
        this.addressPostalCode = addressPostalCode;
        this.cart = cart;
    }

}