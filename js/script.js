const { ready } = require("jquery");

if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoading',ready)
}else {
    ready()
}

function ready(){

$(document).ready(function () {
    $('.card').click(function () {
        $('button').show();
    });
});

var removeCartItem = document.getElementsByClassName("btn-danger");
for (var i = 0; i < removeCartItem.length; i++) {
    // actual button is equal to each element in the loop
    var button = removeCartItem[i];
    button.addEventListener('click', removeCartItem)
}
var quantityInputs = document.getElementsByClassName("input-quantity")
for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i]
    input.addEventListener("change", quantityChanged)
}

var addToCartButton = document.getElementsByClassName("add-cart-button")
for (var i = 0; i< addToCartButton.length; i++){
    var button = addToCartButton[i]
    button.addEventListener('click',addToCartClicked)
}
}


function removeCartItem(event) {
    var clickedButton = event.target
    clickedButton.parentElement.parentElement.remove()
    updateCartTotal()

}

function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName("item-title")[0].innerText
    var price = shopItem.getElementsByClassName("shop-price")[0].innerText
    var imgSrc = shopItem.getElementsByClassName("shop-item-image")[0].src
    addItemToCart(title,price,imgSrc)
    updateCartTotal();
}

function addItemToCart(title,price,imgSrc){
    var cartRows = document.createElement("div")
    cartRows.classList("shop-item")
    var cartItems = document.getElementsByClassName("shop-item")[0]
    var cartItemsNames = cartItems.getElementsByClassName("item-title")
    for (var i = 0; i < cartItemsNames.length; i++){
        if (cartItemsNames[i].innerText == title){
            alert("Item already added in the cart")
            return;
        }
    }
    var cardContent = `
        <div class="card1">
            <img class="card shop-item-image" src="${imgSrc}" alt="roots">
            <div class="card shop-item-body">
                <h4 class="item-title" ><b>${title}</b></h4>
                <p class="shop-price">${price}</p>
            </div>
        </div>
        <div id="add-cart">
            <button class="add-cart-button" type="submit">Add to cart</button>
        </div>
    `
    cartRows.innerHTML = cardContent
    cartItems.append(cartRows)

}

function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartTotal();
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName("cart-items")[0]
    var cartRows = cartItemContainer.getElementsByClassName("cart-row")
    total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName("cart-price")[0];
        var quantityElement = cartRow.getElementsByClassName("input-quantity")[0];
        var price = parseFLoat(priceElement.innerText.replace("Ksh", "")("per Kg",""))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) /100
    document.getElementsByClassName("cart-total-price").innerText = "Ksh" + total

}