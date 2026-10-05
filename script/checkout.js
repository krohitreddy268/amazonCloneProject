import {products} from "../data/products.js"
import { cart,totalCartNumber } from "../data/cart.js";

let cartProductsHTML='';
let checkoutHTML='';
document.querySelector('.js-total-checkout-items').innerHTML=`(${totalCartNumber()} items)`;


//If there are no items in cart
if(totalCartNumber()===0){
   checkoutHTML='No Items in Cart';
}

//Show Checkout Data
else{
let itemsPrice=0;

//Show each product in cart
cart.forEach((item) => {
    let matchingItem;
    products.forEach((product)=>{
        
        //searchig for this item in products 
        if(item.id===product.id){
            matchingItem=product;
        }

    });
    if(matchingItem){
           itemsPrice+=matchingItem.price*item.count;
           cartProductsHTML+=`
                 
           <div class="cart-products">
                    <div class="delivery-product-container">
                        <p class="delivery-date">Delivery date:${getDate(7)}</p>
                        <div class="cart-product-details-container">
                            <div class="cart-product-image-container">
                                <img class="cart-product-image" src="${matchingItem.image}">
                            </div>
                            <div class="cart-product-details">
                                <p class="cart-product-name">${matchingItem.name}</p>
                                <p class="cart-product-price">$${(matchingItem.price/100).toFixed(2)}</p>
                                <div class="cart-product-edit">
                                    <p class="cart-product-quantity">Quantity:${item.count}
                                    </p>
                                    <div class="js-cart-product-update" style="display:inline-block">
                                    <button class="cart-product-update js-cart-product-update-button" data-product-id="${item.id}">Update</button>
                                    </div>
                                   
                                   <button class="cart-product-delete js-cart-product-delete" data-product-id="${item.id}">Delete</button>
                                
                                </div>

                            </div>
                        </div>
                    </div>


                    <div class="delivery-options">


                        <p class="delivery-option-choose">Choose a Delivery option:</p>
                        <div class="delivery-option">
                            <label for="option-1-${matchingItem.id}" class="delivery-date-checkbox-container">

                                <input type="radio" id="option-1-${matchingItem.id}" name="delivery-date-option" value="yes"
                                    class="delivery-date-checkbox">
                                <div class="delivery-date-checkbox-info">
                                    <p class="delivery-date-checkbox-day">${getDate(7)}</p>
                                    <p class="delivery-date-checkbox-price">FREE Shipping</p>

                                </div>
                            </label>
                        </div>

                        <div class="delivery-option">
                            <label for="option-2-${matchingItem.id}" class="delivery-date-checkbox-container">
                                <input type="radio" id="option-2-${matchingItem.id}" name="delivery-date-option" value="yes"
                                    class="delivery-date-checkbox">
                                <div class="delivery-date-checkbox-info">
                                    <p class="delivery-date-checkbox-day">${getDate(4)}</p>
                                    <p class="delivery-date-checkbox-price">$4.99 - Shipping</p>

                                </div>
                            </label>
                        </div>

                        <div class="delivery-option">
                            <label for="option-3-${matchingItem.id}" class="delivery-date-checkbox-container">

                                <input type="radio" id="option-3-${matchingItem.id}" name="delivery-date-option" value="yes"
                                    class="delivery-date-checkbox">
                                <div class="delivery-date-checkbox-info">
                                    <p class="delivery-date-checkbox-day">${getDate(1)}</p>
                                    <p class="delivery-date-checkbox-price">$9.99 - Shipping</p>

                                </div>
                            </label>

                        </div>
                    </div>
                </div>

           `
        }
});

let totalItems=totalCartNumber();
let deliveryCharges=1000;
if(itemsPrice>=5000){
    deliveryCharges=0;
}
let itemsSubTotal=itemsPrice + deliveryCharges;
let taxPrice=0.1*itemsPrice;
let totalPrice=taxPrice + itemsSubTotal;

checkoutHTML=`
      <p class="review-order-title">Review Your Order</p>

        <div class="order-review">

            <div class="order-review-data">


                <div class="order-summary">

                    <div class="order-summary-title">
                        <p>Order Summary</p>
                    </div>

                    <div class="order-summary-sections">
                        <div class="summary-left-section">

                            <div class="items-only-calculation">
                                <p>Items (${totalItems}):</p>
                                <p>Shipping & Handling:</p>
                            </div>

                            <div class="tax-price-calculation">
                                <p>Total before tax:</p>
                                <p>Estiated tax (10%):</p>
                            </div>

                        </div>

                        <div class="summary-right-section">

                            <div class="items-only-price">
                                <p>$${(itemsPrice/100).toFixed(2)}</p>
                                <p>$${(deliveryCharges/100).toFixed(2)}</p>
                            </div>

                            <div class="tax-price">
                                <p>$${(itemsSubTotal/100).toFixed(2)}</p>
                                <p>$${(taxPrice/100).toFixed(2)}</p>
                            </div>

                        </div>

                    </div>

                    <div class="order-total-calculation">
                        <div class="order-total-title">
                            <p>Order total:</p>
                        </div>

                        <div class="order-total">
                            <p>$${(totalPrice/100).toFixed(2)}</p>
                        </div>

                    </div>

                    <button class="place-your-order">Place Your Order</button>

                </div>

            </div>

            <div class="cart-products-container">${cartProductsHTML}</div>

        </div>
`;

}

document.querySelector('.js-order-review-container').innerHTML=checkoutHTML;


document.querySelectorAll('.js-cart-product-update-button').forEach((button)=>{
    button.addEventListener('click',()=>{
        let matchingItem;
        let element=button.closest('.js-cart-product-update');
        element.innerHTML=`<input type=number min=1 max=10 class="js-cart-product-update-input">
        <button class="js-cart-product-update-input-button cart-product-update">Update</button>
        `
        let updateButton=element.querySelector('.js-cart-product-update-input-button');
        updateButton.addEventListener('click',()=>{

            cart.forEach((item)=>{
                if(item.id===button.dataset.productId){
                    matchingItem=item;
                }
            });

            if(matchingItem){
                matchingItem.count=Number(element.querySelector('.js-cart-product-update-input').value);
            }

            element.innerHTML=`<button class="cart-product-update js-cart-product-update-button" data-product-id="${button.dataset.productId}">Update</button>`
            

            

        });
    })
});



function getDate(days){
    let result=new Date();
    result.setDate(result.getDate() + days);
    return result.toDateString();
}

