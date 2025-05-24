// Global Variables
const cart = [];
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartSidebar = document.getElementById("cart");
const priceFilter = document.getElementById("price-filter");
const upiScanner = document.getElementById("upi-scanner");
const paymentMethod = document.getElementById("payment-method");
const deliveryOption = document.getElementById("delivery-option");
const addressInput = document.getElementById("address");
const emailInput = document.getElementById("email");      // fixed id, should be lowercase and no spaces
const mobileInput = document.getElementById("mobile");    // fixed id

// Sample Products (Replace with real data if required)
const products = [
  { name: "Little women", price: 500, img: "book2.webp" },
  { name: "The Book Theif", price: 800, img: "book2.png" },
  { name: "The Big Deal", price: 1200, img: "book3.jpg" },
  { name: "The Call of the Wild", price: 270, img: "book1.jpg" },
  { name: "The Great GATSBY", price: 899, img: "book4.jpg" },
  { name: "It Ends With Us", price: 699, img: "book5.png" },
  { name: "How To Die Famous", price: 350, img: "book6.jpg" }
  
];

// Render Products
function renderProducts(filteredProducts = products) {
  const productContainer = document.getElementById("products");
  productContainer.innerHTML = "";

  filteredProducts.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("bg-white", "shadow-md", "rounded-lg", "overflow-hidden", "product-card");
    productDiv.dataset.name = product.name;
    productDiv.dataset.price = product.price;

    productDiv.innerHTML = `
      <img src="${product.img}" alt="${product.name}" class="w-full">
      <div class="p-4">
        <h3 class="text-lg font-semibold">${product.name}</h3>
        <p class="text-gray-600">${product.price}</p>
        <button onclick="addToCart(this)" class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add to Cart</button>
      </div>
    `;
    productContainer.appendChild(productDiv);
  });
}

// Add Product to Cart
function addToCart(button) {
  const productCard = button.closest('.product-card');
  const productName = productCard.dataset.name;
  const productPrice = parseInt(productCard.dataset.price);

  // Check if the product is already in the cart
  const existingProduct = cart.find(item => item.name === productName);
  
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({ name: productName, price: productPrice, quantity: 1 });
  }

  updateCart();
}

// Remove Product from Cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Update Cart
function updateCart() {
  cartCount.textContent = cart.length;
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  cartTotal.textContent = total;

  // Update Cart Items
  cartItems.innerHTML = '';
  cart.forEach((item, index) => {
    const cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('flex', 'justify-between', 'items-center');
    cartItemDiv.innerHTML = `
      <span>${item.name} - $${item.price} x ${item.quantity}</span>
      <button onclick="removeFromCart(${index})" class="text-red-500 hover:text-red-700">Remove</button>
    `;
    cartItems.appendChild(cartItemDiv);
  });
}

// Toggle Cart Sidebar
function toggleCart() {
  cartSidebar.classList.toggle("hidden");
}

// Handle Checkout
function handleCheckout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
  } else {
    alert("Thank you for your purchase!");
    cart.length = 0; // Clear the cart
    updateCart(); // Refresh the cart
    toggleCart(); // Hide the cart
  }
}

// Filter Products by Price
priceFilter.addEventListener('change', function(e) {
  const selectedValue = e.target.value;
  let filteredProducts = products;

  if (selectedValue === '0-500') {
    filteredProducts = products.filter(product => product.price <= 500);
  } else if (selectedValue === '500-1000') {
    filteredProducts = products.filter(product => product.price > 500 && product.price <= 1000);
  } else if (selectedValue === '1000+') {
    filteredProducts = products.filter(product => product.price > 1000);
  }

  renderProducts(filteredProducts);
});

//Handle Checkout
function handleCheckout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const address = addressInput.value.trim();
  const email = emailInput.value.trim();
  const mobile = mobileInput.value.trim();

  if (address === "") {
    alert("Please enter your delivery address.");
    return;
  }
  if (email === "") {
    alert("Please enter your email address.");
    return;
  }
  if (mobile === "") {
    alert("Please enter your phone number.");
    return;
  }

  const order = {
    cart,
    total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    deliveryOption: deliveryOption.value,
    paymentMethod: paymentMethod.value,
    address,
    email,
    mobile,
  };

  // Save order details to localStorage
  localStorage.setItem("order", JSON.stringify(order));

  // Redirect to confirmation page
  window.location.href = "confirmation.html";
}

// Initial Rendering of Products
renderProducts();