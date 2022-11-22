let carts = document.querySelectorAll('.add-cart');
let products = [{
        id: "ban1",
        name: "Bàn Gỗ Đẹp",
        link: "/SanPham/html/category/detail_item/Ban/ban1.html",
        image: "/SanPham/img/category/Ban/cafe-tron-go-dep.png",
        title: "cafe-tron-go-dep",
        type: "Ban",
        price: 4500000,
        inCart: 0
    },
    {
        id: "ban2",
        name: "Bàn Gỗ Đẹp 2",
        link: "/SanPham/html/category/detail_item/Ban/ban2.html",
        image: "/SanPham/img/category/Ban/GTY-091.png",
        title: "GTY-091",
        price: 3500000,
        type: "Ban",
        inCart: 0
    },
    {
        id: "den1",
        name: "Netviet-NV-9005-2",
        link: "/SanPham/html/category/detail_item/den_trang_tri/den2.html",
        image: "/SanPham/img/category/DenTrangTri/Netviet-NV-9005-2.png",
        title: "Netviet-NV-9005-2",
        type: "DenTrangTri",
        price: 97,
        inCart: 0
    },
    {
        id: "ban3",
        name: "Bàn Gỗ tròn",
        link: "/SanPham/html/category/detail_item/Ban/ban3.html",
        image: "/SanPham/img/category/Ban/tron-kinh.png",
        title: "tron-kinh",
        price: 23000000,
        type: "Ban",
        inCart: 0
    },
    {
        id: "ban4",
        name: "Bàn Gỗ dài",
        link: "/SanPham/html/category/detail_item/Ban/ban4.html",
        image: "/SanPham/img/category/Ban/go-dai.png",
        title: "go-dai",
        price: 1890000,
        type: "Ban",
        inCart: 0
    },
    {
        id: "den2",
        name: "Netviet-NV-8825",
        link: "/SanPham/html/category/detail_item/den_trang_tri/den1.html",
        image: "/SanPham/img/category/DenTrangTri/Netviet-NV-8825.png",
        title: "Netviet-NV-8825",
        type: "DenTrangTri",
        price: 780000,
        inCart: 0
    },


    {
        id: "den3",
        name: "Netviet-NV-8205-1",
        link: "/SanPham/html/category/detail_item/den_trang_tri/den4.html",
        image: "/SanPham/img/category/DenTrangTri/Netviet-NV-8205-1.png",
        title: "Netviet-NV-8205-1",
        type: "DenTrangTri",
        price: 590000,
        inCart: 0
    },
    {
        id: "den4",
        name: "Composite-AP-B948",
        link: "/SanPham/html/category/detail_item/den_trang_tri/den3.html",
        image: "/SanPham/img/category/DenTrangTri/Composite-AP-B948.png",
        type: "DenTrangTri",
        title: "Composite-AP-B948",
        price: 10000000,
        inCart: 0
    },
];
for (let j = 0; j < products.length; j++) {
    let qty = localStorage.getItem('newqty');

    qty = parseInt(qty); {
        for (let i = 0; i < carts.length; i++)
            carts[i].addEventListener('click', () => {

                if (carts[i].id === products[j].id) {
                    cartNumbers(products[j]);
                    totalCost(products[j]);
                    // if (qty) {
                    //     for (let q = 0; q < qty; q++) {
                    //         console.log(q);

                    //     }
                    // }

                }
            })
    }
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    console.log("Product is clicked is: ", product);
    let productNumbers = localStorage.getItem('cartNumbers');
    let qty = localStorage.getItem('newqty');
    qty = parseInt(qty);

    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        if (carts.length === 1) {
            localStorage.setItem('cartNumbers', productNumbers + qty);
            document.querySelector('.cart span').textContent = productNumbers + qty;
        } else {
            localStorage.setItem('cartNumbers', productNumbers + 1);
            document.querySelector('.cart span').textContent = productNumbers + 1;
        }
    } else {
        if (carts.length === 1) {
            localStorage.setItem('cartNumbers', qty);
            document.querySelector('.cart span').textContent = qty;
        } else {
            localStorage.setItem('cartNumbers', 1);
            document.querySelector('.cart span').textContent = 1;
        }
    }
    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let qty = localStorage.getItem('newqty');
    qty = parseInt(qty);
    if (cartItems != null) {
        if (cartItems[product.title] == undefined) {
            cartItems = {
                ...cartItems,
                [product.title]: product
            }
        }
        if (carts.length === 1) {
            cartItems[product.title].inCart += qty;
        } else { cartItems[product.title].inCart += 1; }
    } else {
        if (carts.length === 1) {
            product.inCart = qty;
        } else { product.inCart = 1; }
        cartItems = {
            [product.title]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    let qty = localStorage.getItem('newqty');
    console.log(product.price);
    qty = parseInt(qty);
    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        if (carts.length === 1) { localStorage.setItem("totalCost", cartCost + qty * product.price); } else {
            localStorage.setItem("totalCost", cartCost + product.price);
        }
    } else {
        if (carts.length === 1) {
            localStorage.setItem("totalCost", qty * product.price)
        } else { localStorage.setItem("totalCost", product.price); }
    }
}


function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".product");
    let cartCost = localStorage.getItem('totalCost');
    console.log(productContainer);
    let productTotal = document.querySelector(".total");
    if (cartItems && productContainer) {
        productContainer.innerHTML = ' ';
        Object.values(cartItems).map(item => {
            console.log(item.name);
            productContainer.innerHTML += `
            <div class="product-title">
                <img src ="/Facility/SanPham/img/category/${item.type}/${item.title}.png">
                <span >${item.name}</span>
            </div>
            <div class="product-price">${item.price} Đ</div>
            <div class="product-quantity">  ${item.inCart}</div>    
            <div class="product-total">${item.inCart*item.price} Đ</div>
            `

        });
        productTotal.innerHTML += `
        <div class="grandTotal">
        <a class="grandTotal-title">Tổng Cộng:</a>
        <a class="valueTotal">${cartCost} Đ</a>
        </div>
        
        `
    }
}
displayCart();
onLoadCartNumbers();