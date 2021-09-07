if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready()
}

function ready(){
    var removeCartItem = document.getElementsByClassName('btn-danger')
    for(var i=0;i<removeCartItem.length;i++){
        var button = removeCartItem[i]
        button.addEventListener('click',function(event){
                var buttonClicked = event.target
                buttonClicked.parentElement.parentElement.remove()
                updateCartTotal()
        })
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for(var i=0;i<quantityInputs.length;i++){
        var input = quantityInputs[i]
        input.addEventListener('change',quantitychange)
    }
    var addToCartButtons = document.getElementsByClassName('btn btn-primary shop-item-btn')
    for(var i=0;i<addToCartButtons.length;i++){
        var button = addToCartButtons[i]
        button.addEventListener('click',addToCart)
    }
    var purcahse = document.getElementsByClassName('purchase-btn')[0].addEventListener('click',purchaseClicked)
}

function quantitychange(event){
    var input = event.target
    if(isNaN(input.value)||input.value<=0){
        input.value=1
    }
    updateCartTotal()
}

function addToCart(event){
    var button =event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    console.log(title ,price,imageSrc)
    addItemToCart(title,price,imageSrc)
    updateCartTotal()
}

function addItemToCart(title,price,imageSrc){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = document.getElementsByClassName('cart-item-title')
    for(var i=0;i<cartItemNames.length;i++){
        if(cartItemNames[i].innerText == title){
            alert("This item is already added to cart")
            return
        }
    }
    var cartRowContents = 
    `<div class="cart-item cart-column">
        <img class="cart-item-img" src="${imageSrc}" alt="This image isn't available!" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-item cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">Remove</button>
    </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',function(event){
        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
        updateCartTotal()
    })
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantitychange)
}

function purchaseClicked(event){
    alert("Thank you for your purchase")
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}
    
function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total =0
    for(var i=0;i<cartRows.length;i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$',''))
        var quantity = quantityElement.value
        total += (price*quantity)
    }
    total = Math.round(total*100)/100

    document.getElementsByClassName('cart-total-price')[0].innerText='$'+total
}

