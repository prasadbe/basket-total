const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const Products = require('./products');
const Basket = require('./basket');

let products = new Products();
products.add('RO1','Red Plate',32.95, {
    type: 'any',
    percentage: '50'
});

products.add('GO1','Green Plate',24.95);
products.add( 'BO1', 'Blue Plate', 7.95);



let basket = new Basket(products);
(
     () => {
         rl.question("Please enter the products you want to add in cart (RO1, BO1, GO1):", (data) => {
            let products = data.replace(/ /g, '').split(',');
            for(let product of products) {
                basket.add(product);
            }
            rl.question("Please enter the coupon you have:", (data) => {
                if(data != '') {
                    basket.coupon(data);
                }
                basket.tally()
                console.log('Sub Total:', basket.subtotal.toFixed(2))
                console.log('Delivery Charge:', basket.deliveryCharge.toFixed(2))
                console.log('Discount:', basket.offer.toFixed(2))
                console.log('total:', basket.total)
                rl.close();
             });
         });
         
    }
)();

/*basket.add('RO1');
basket.add('BO1');
basket.add('RO1');
basket.coupon('RO1');
basket.tally();
console.log(basket.total)*/