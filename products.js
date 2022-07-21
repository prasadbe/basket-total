 class Products {
    constructor() {
        this.products = {};
    }
    add(code = '', name = '', price = 0.00, offer = {}) {
        this.products[code] = {
            'price': price,
            'name': name,
            'offer': offer
        }
    }
}

module.exports = Products;