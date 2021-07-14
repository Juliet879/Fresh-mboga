if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}


function ready() {
    // carousel code 
    var myIndex = 0;
    carousel();
    
    function carousel() {
      var i;
      var x = document.getElementsByClassName("mySlides");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      myIndex++;
      if (myIndex > x.length) {myIndex = 1}
      x[myIndex-1].style.display = "block";
      setTimeout(carousel, 3000);
    }
    
    // $(document).ready(function () {
    //     $('.card').click(function () {
    //         $('button').show();
    //     });
    // });
    var clickedButton = document.getElementsByClassName("btn-danger")
    for (var i = 0; i < clickedButton.length; i++) {
        var button = clickedButton[i]
        button.addEventListener('click', removeDeletedItem)
    }
    var quantityInput = document.getElementsByClassName("input-quantity")
    for (var i = 0; i < quantityInput.length; i++) {
        var input = quantityInput[i]
        input.addEventListener('change', inputChange)
    }
    var addToCartButton = document.getElementsByClassName("add-cart-button")
    for (var i = 0; i < addToCartButton.length; i++) {
        var button = addToCartButton[i]
        button.addEventListener('click', addItemClicked)

    }
    document.getElementsByClassName('cart-purchase')[0].addEventListener('click',purchaseCLicked)
}

function removeDeletedItem(event) {
    var clickedButton = event.target
    clickedButton.parentElement.parentElement.remove()
    updateCartTotal()

}

function inputChange(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addItemClicked(event) {
    var button = event.target
    var shoppedItem = button.parentElement.parentElement
    var title = shoppedItem.getElementsByClassName('item-title')[0].innerText
    var price = shoppedItem.getElementsByClassName('shop-price')[0].innerText
    var imgSrc = shoppedItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imgSrc)
}

function addItemToCart(title, price, imgSrc) {
    var itemAddedCart = document.createElement('div')
    itemAddedCart.classList.add('cart-row')
    // itemAddedCart.innerText = title
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('item-title')
    for(var i = 0; i< cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title){
            alert("The item already exists in the cart")
            return
        }
    }
    var cartItemContents = `
        <div class="col-md-4">
            <img class="card shop-item-image" src="${imgSrc}" alt="">
            <span class="item-title">${title}</span>
        </div>
        <span class="col-md-4 cart-price">${price}</span>
        <div class="col-md-4 cart-quantity">
            <input class="input-quantity" type="number" value="2">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>
    `
    itemAddedCart.innerHTML = cartItemContents
    cartItems.append(itemAddedCart)
    updateCartTotal()
    itemAddedCart.getElementsByClassName('btn-danger')[0].addEventListener('click',removeDeletedItem)
    itemAddedCart.getElementsByClassName('input-quantity')[0].addEventListener('change',inputChange)
    
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('input-quantity')[0]
        var price = parseInt(priceElement.innerText.replace('Ksh.', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)

    }
    document.getElementsByClassName("cart-total-price")[0].innerText = 'Ksh.' + total
}

function purchaseCLicked(){
    var cart = document.getElementsByClassName("cart-container")
    cart.style.display = "block"
    alert('Thank you for working with us.Welcome Again')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while( cartItems.hasChildNodes){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
  
}

