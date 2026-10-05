export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(button){
    let matchingProduct;
        let selectedCount=Number(document.getElementById(`product-quantity-select-${button.dataset.productId}`).value);

        cart.forEach((item) => {

            if (item.id === button.dataset.productId) {
                matchingProduct = item;
            }

        });

        if (matchingProduct) {
            matchingProduct.count+=selectedCount;
            
        }

        else {
            
            cart.push({
                id: button.dataset.productId,
                count: selectedCount
            });
            
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        

}

export function totalCartNumber(){
    let total=0;
        cart.forEach((item) => {

            total+=item.count;

        });
        
        return total;
}