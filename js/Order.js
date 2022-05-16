class Order {
    id;
    userId;
    products;
    subtotal;
    shipmentCost;
    disscounts; // @TODO add Discount class
    total;

    constructor(id, user = new User(), shipmentCost = 0, disscounts = []) {
        this.id = id;
        this.userId = user.id;
        this.products = user.getCart().getProducts();
        this.shipmentCost = shipmentCost;
        this.subtotal = this.summarizeProducts();
        this.total = this.summarizeTotal();
        this.disscounts = disscounts;
    }

    setSubtotal = (subtotal) => {
        this.subtotal = subtotal;
    }

    getProducts = () => {
        return this.products;
    }

    getTotal = () => {
        return this.total;
    }

    getSubtotal = () => {
        return this.subtotal;
    }

    getShipmentCost = () => {
        return this.shipmentCost;
    }

    summarizeProducts = () => {
        let subtotal = 0;
        for (const product of this.products) {
            subtotal += product.price;
        }
        return subtotal;
    }

    summarizeTotal = () => {
        if(!this.subtotal) {
            this.setSubtotal(this.summarizeProducts());
        }

        // TODO: add a logic to apply discounts
        return this.subtotal + this.shipmentCost;
    }
}