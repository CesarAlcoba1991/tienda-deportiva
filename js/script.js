let cart = [];

const products = [
    { id: 1, name: 'Legin deportivo', price: 30, image: 'img/1712023639130.jpg' },
    { id: 2, name: 'Short deportivo', price: 20, image: 'img/1712023705296.jpg' },
    { id: 3, name: 'Top deportivo', price: 15, image: 'img/1712024823858.jpg' }
];

function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-info">
        <h1>${product.name}</h1>
        <p>$${product.price}</p>
        <button onclick="addToCart(${product.id})">Agregar Producto</button>
      </div>
    `;

        productList.appendChild(productCard);
    });
}

function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    const existingProduct = cart.find(item => item.product.id === productId);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ product, quantity: 1 });
    }

    renderCart();
    renderCartItems();
}

function removeProductFromCart(productId) {
    cart = cart.filter(item => item.product.id !== productId);
    renderCart();
    renderCartItems();
}

function renderCart() {
    const cartList = document.getElementById('cart');
    cartList.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.product.name} - Cantidad: ${item.quantity} - Total: $${item.product.price * item.quantity}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.addEventListener('click', () => removeProductFromCart(item.product.id));

        li.appendChild(removeButton);

        cartList.appendChild(li);

        total += item.product.price * item.quantity;
    });

    const totalElement = document.createElement('li');
    totalElement.textContent = `Total: $${total}`;
    cartList.appendChild(totalElement);
}

function renderCartItems() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cartItems.innerHTML = '<h2>Productos Agregados:</h2>';
    cart.forEach(item => {
        const div = document.createElement('div');
        div.textContent = `${item.product.name} - Cantidad: ${item.quantity}`;
        cartItems.appendChild(div);
    });
}

function pay() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
    } else {
        let total = 0;
        cart.forEach(item => {
            total += item.product.price * item.quantity;
        });

        alert(`Gracias por su compra. Monto total: $${total}`);
    }
}

renderProducts();
