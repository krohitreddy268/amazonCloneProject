import {cart,addToCart,totalCartNumber} from "../data/cart.js";
import {products} from "../data/products.js";

let productsHTML = '';
document.querySelector('.js-cart-number').innerHTML=totalCartNumber();

products.forEach((product) => {
    productsHTML += `
    <div class="products-container">

            <div class="product-image-container">
                <img src="${product.image}" class="product-image">
            </div>

            <p class="product-name">${product.name}</p>

            <div class="product-rating">
                <img src="${product.rating.stars}" class="rating-stars">
                <p class="no-of-ratings">${product.rating.count}</p>
            </div>

            <p class="product-price">$${(product.price / 100).toFixed(2)}</p>

            <div class="product-quantity js-product-quantity" >
                <select class="product-quantity-select" id="product-quantity-select-${product.id}" name="product-quantity">
                    <option value="1">1 item</option>
                    <option value="2">2 item</option>
                    <option value="3">3 item</option>
                    <option value="4">4 item</option>
                    <option value="5">5 item</option>
                    <option value="6">6 item</option>
                    <option value="7">7 item</option>
                    <option value="8">8 item</option>
                    <option value="9">9 item</option>
                    <option value="10">10 item</option>
                </select>
            </div>

            <button class="add-to-cart-button js-add-to-cart-button" data-product-id="${product.id}">Add to Cart</button>

        </div>
    `
})

document.querySelector('.js-products-main-container').innerHTML = productsHTML;

document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {

    button.addEventListener('click', () => {

        addToCart(button);
        document.querySelector('.js-cart-number').innerHTML=totalCartNumber();
        
    })

});









