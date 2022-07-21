class Basket {
    //basket constructor wull create property for available products, total, offerCode
    constructor(products) {
        this.products = products.products;
        this.total = 0;
        this.subtotal = 0;
        this.couponApplied = ''
        this.offer = 0;
        this.deliveryCharge = 0;
        this.cart = [];
        //keep price in desc to reduct 0(n)
        this.deliveryPrices = [{
            price: 90,
            value: 0
        }, {
            price: 50,
            value: 2.95
        }, {
            price: 1,
            value: 4.95
        }];
        this.error = {};
    }


    //calcualte delivery proce
    delivery(amount) {
        this.deliveryCharge =  0;
        for(const delivery of this.deliveryPrices) {
            if(delivery.price <= amount) {
                this.deliveryCharge = delivery.value
                break;
            }
        }
    }

    //final basket calcualtion with all discount delivery floe

    tally() {
        let offer = false;
        let offerProduct = {};
        this.subtotal = 0;
        this.total = 0;

        //basket calculation with coupon
        this.cart.map((v, k) => {
            this.subtotal += v.price;
            if( this.couponApplied && this.couponApplied == v.code && !offer) {
                offerProduct[v.code] = v.offer;
                offer = true;
            } else if (this.couponApplied && offer && offerProduct[v.code].type && (offerProduct[v.code].type == 'any' || 
                (offerProduct[v.code].type == 'same' && v.code == this.couponApplied))) {
                this.offer  = parseFloat(v.price - (v.price * (offerProduct[this.couponApplied].percentage / 100)))
                offer = false;
            }
            return v;
        });

        if(this.couponApplied && this.offer == 0) {
            this.error.coupon = 'Coupon Not Valid';
        }

        //delivery calcualtion
        this.delivery(this.subtotal);
        this.total = this.subtotal+this.deliveryCharge-this.offer;
        this.total = parseFloat(this.total).toFixed(2);
    }

    //the function will assign the applied discount value in class property

    coupon(code) {
        this.couponApplied = code.toUpperCase();
    }

    // function will add the items in cart and will run tally
    add(code) {
        code = code.toUpperCase();
        if(this.products[code]) {
            this.cart.push({...this.products[code], code: code});
            this.cart.sort((a, b) => {
                return this.products[a.code].price 
                > this.products[b.code].price ? 1 : -1;
            });
        }
       this.tally();
    }

}

module.exports = Basket;