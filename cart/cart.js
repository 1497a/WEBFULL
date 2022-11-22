function displayCheckOut() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".input-checkout");
    let cartCost = localStorage.getItem('totalCost');
    let productTotal = document.querySelector(".total");
    if (cartItems && productContainer) {
        console.log("Runing");
        productContainer.innerHTML = ' ';
        Object.values(cartItems).map(item => {
            console.log(item.name);
            productContainer.innerHTML += `
            <li class="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                    <h6 >${item.name}</h6>  
                    <small class="text-muted">${item.price}tr Đ x ${item.inCart}</small>
                </div>
                <span class="text-muted">${item.inCart*item.price}tr Đ</span>
                <li class="list-group-item d-flex justify-content-between">
                
            </li>
            </li>
    `

        });
    }
    productContainer.innerHTML += `<li class="list-group-item d-flex justify-content-between lh-condensed"><span>Tổng thành tiền: </span>
    <strong>${cartCost}tr Đ</strong></li>`
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart1 span').textContent = productNumbers;
    }
}
onLoadCartNumbers()
displayCheckOut();