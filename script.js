
"use strict";

/* =========================
   MENU DATA
========================= */

const menuItems = [
  {
    id: 1,
    name: "Classic Burger",
    category: "Burgers",
    price: 8.50,
    description: "Juicy beef, fresh lettuce, tomato and our signature sauce.",
    ingredients: "Beef, lettuce, tomato, cheese, burger bun, signature sauce",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Cheese Burger",
    category: "Burgers",
    price: 9.50,
    description: "A delicious burger loaded with melted cheese.",
    ingredients: "Beef, cheddar cheese, lettuce, tomato, burger bun",
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Pepperoni Pizza",
    category: "Pizza",
    price: 12.00,
    description: "Classic pizza with tomato sauce and pepperoni.",
    ingredients: "Pizza dough, tomato sauce, mozzarella, pepperoni",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 10.00,
    description: "A timeless combination of cheese, tomato and basil.",
    ingredients: "Pizza dough, tomato sauce, mozzarella, basil",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Creamy Alfredo",
    category: "Pasta",
    price: 11.00,
    description: "Creamy pasta with parmesan and herbs.",
    ingredients: "Pasta, cream, parmesan, garlic, herbs",
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "Chicken Pasta",
    category: "Pasta",
    price: 12.50,
    description: "Tender chicken served with flavorful pasta.",
    ingredients: "Pasta, chicken, cream, parmesan, seasoning",
    image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    name: "Club Sandwich",
    category: "Sandwiches",
    price: 7.50,
    description: "A satisfying sandwich with fresh ingredients.",
    ingredients: "Bread, chicken, lettuce, tomato, cheese",
    image: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    name: "Crispy Chicken",
    category: "Sandwiches",
    price: 8.00,
    description: "Crispy chicken with a delicious house sauce.",
    ingredients: "Chicken, bread, lettuce, pickles, house sauce",
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 9,
    name: "Chocolate Cake",
    category: "Desserts",
    price: 5.00,
    description: "Rich chocolate cake for a sweet finish.",
    ingredients: "Chocolate, flour, sugar, eggs, butter",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 10,
    name: "Cheesecake",
    category: "Desserts",
    price: 5.50,
    description: "Creamy cheesecake with a buttery biscuit base.",
    ingredients: "Cream cheese, biscuit base, sugar, vanilla",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 11,
    name: "Fresh Lemonade",
    category: "Drinks",
    price: 3.00,
    description: "A refreshing drink with fresh lemon flavor.",
    ingredients: "Lemon, water, sugar, ice",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 12,
    name: "Iced Coffee",
    category: "Drinks",
    price: 4.00,
    description: "Cold coffee served over ice.",
    ingredients: "Coffee, milk, ice",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80"
  }
];

/* =========================
   STATE
========================= */

let selectedCategory = "All";
let searchTerm = "";
let cart = new Map();
let activeModalItemId = null;

/* =========================
   ELEMENTS
========================= */

const menuGrid = document.getElementById("menuGrid");
const categoriesContainer = document.getElementById("categories");
const searchInput = document.getElementById("searchInput");
const resultsMessage = document.getElementById("resultsMessage");

const cartCount = document.getElementById("cartCount");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartOverlay = document.getElementById("cartOverlay");

const foodModal = document.getElementById("foodModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalIngredients = document.getElementById("modalIngredients");
const modalPrice = document.getElementById("modalPrice");
const modalAddButton = document.getElementById("modalAddButton");

const toast = document.getElementById("toast");

let toastTimeout;

/* =========================
   HELPERS
========================= */

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, function (character) {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entities[character];
  });
}

function formatPrice(price) {
  return "$" + price.toFixed(2);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(function () {
    toast.classList.remove("show");
  }, 2400);
}

function getItemById(id) {
  return menuItems.find(function (item) {
    return item.id === Number(id);
  });
}

function getCartQuantity() {
  let quantity = 0;

  cart.forEach(function (item) {
    quantity += item.quantity;
  });

  return quantity;
}

function getCartTotal() {
  let total = 0;

  cart.forEach(function (item) {
    total += item.price * item.quantity;
  });

  return total;
}

/* =========================
   RENDER CATEGORIES
========================= */

function renderCategories() {
  const categoryNames = [
    "All",
    ...new Set(menuItems.map(function (item) {
      return item.category;
    }))
  ];

  categoriesContainer.innerHTML = categoryNames.map(function (category) {
    const activeClass = category === selectedCategory ? "active" : "";

    return `
      <button
        type="button"
        class="category-button ${activeClass}"
        data-category="${escapeHTML(category)}"
      >
        ${escapeHTML(category)}
      </button>
    `;
  }).join("");
}

/* =========================
   RENDER MENU
========================= */

function renderMenu() {
  const filteredItems = menuItems.filter(function (item) {
    const matchesCategory =
      selectedCategory === "All" ||
      item.category === selectedCategory;

    const searchContent = (
      item.name + " " +
      item.category + " " +
      item.description + " " +
      item.ingredients
    ).toLowerCase();

    const matchesSearch = searchContent.includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  resultsMessage.textContent =
    filteredItems.length + (filteredItems.length === 1
      ? " item found"
      : " items found");

  if (filteredItems.length === 0) {
    menuGrid.innerHTML = `
      <div class="empty-state">
        <h3>No meals found</h3>
        <p>Try another search or choose a different category.</p>
      </div>
    `;

    return;
  }

  menuGrid.innerHTML = filteredItems.map(function (item) {
    return `
      <article class="food-card">
        <div class="food-image">
          <img
            src="${escapeHTML(item.image)}"
            alt="${escapeHTML(item.name)}"
            loading="lazy"
          >

          <span class="food-category">
            ${escapeHTML(item.category)}
          </span>
        </div>

        <div class="food-info">
          <h3>${escapeHTML(item.name)}</h3>

          <p class="food-description">
            ${escapeHTML(item.description)}
          </p>

          <div class="food-bottom">
            <span class="food-price">
              ${formatPrice(item.price)}
            </span>

            <div class="food-actions">
              <button
                type="button"
                class="small-button"
                data-action="details"
                data-id="${item.id}"
              >
                Details
              </button>

              <button
                type="button"
                class="small-button"
                data-action="add"
                data-id="${item.id}"
              >
                + Add
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

/* =========================
   CART ACTIONS
========================= */

function addToCart(id) {
  const item = getItemById(id);

  if (!item) {
    showToast("This item could not be found.");
    return;
  }

  const existingItem = cart.get(item.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.set(item.id, {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    });
  }

  renderCart();
  showToast(item.name + " added to cart.");
}

function changeQuantity(id, change) {
  const item = cart.get(Number(id));

  if (!item) {
    return;
  }

  item.quantity += change;

  if (item.quantity <= 0) {
    cart.delete(Number(id));
  }

  renderCart();
}

function removeFromCart(id) {
  const item = cart.get(Number(id));

  if (!item) {
    return;
  }

  cart.delete(Number(id));
  renderCart();
  showToast(item.name + " removed from cart.");
}

function renderCart() {
  cartCount.textContent = getCartQuantity();
  cartTotal.textContent = formatPrice(getCartTotal());

  if (cart.size === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty">
        <h3>Your cart is empty</h3>
        <p>Add something delicious from our menu.</p>
      </div>
    `;

    return;
  }

  cartItemsContainer.innerHTML = Array.from(cart.values()).map(function (item) {
    return `
      <div class="cart-item">
        <img
          src="${escapeHTML(item.image)}"
          alt="${escapeHTML(item.name)}"
          loading="lazy"
        >

        <div class="cart-item-info">
          <h3>${escapeHTML(item.name)}</h3>

          <p class="cart-item-price">
            ${formatPrice(item.price * item.quantity)}
          </p>

          <div class="cart-item-controls">
            <button
              type="button"
              class="quantity-button"
              data-action="decrease"
              data-id="${item.id}"
              aria-label="Decrease ${escapeHTML(item.name)} quantity"
            >−</button>

            <span class="quantity-number">${item.quantity}</span>

            <button
              type="button"
              class="quantity-button"
              data-action="increase"
              data-id="${item.id}"
              aria-label="Increase ${escapeHTML(item.name)} quantity"
            >+</button>

            <button
              type="button"
              class="remove-button"
              data-action="remove"
              data-id="${item.id}"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

/* =========================
   FOOD DETAILS MODAL
========================= */

function openFoodModal(id) {
  const item = getItemById(id);

  if (!item) {
    return;
  }

  activeModalItemId = item.id;

  modalImage.src = item.image;
  modalImage.alt = item.name;
  modalTitle.textContent = item.name;
  modalDescription.textContent = item.description;
  modalIngredients.textContent = item.ingredients;
  modalPrice.textContent = formatPrice(item.price);

  foodModal.classList.add("open");
  foodModal.setAttribute("aria-hidden", "false");
  updateBodyScroll();
}

function closeFoodModal() {
  foodModal.classList.remove("open");
  foodModal.setAttribute("aria-hidden", "true");
  activeModalItemId = null;
  updateBodyScroll();
}

/* =========================
   CART DRAWER
========================= */

function openCart() {
  cartOverlay.classList.add("open");
  cartOverlay.setAttribute("aria-hidden", "false");
  updateBodyScroll();
}

function closeCart() {
  cartOverlay.classList.remove("open");
  cartOverlay.setAttribute("aria-hidden", "true");
  updateBodyScroll();
}

function updateBodyScroll() {
  const modalOpen = foodModal.classList.contains("open");
  const cartOpen = cartOverlay.classList.contains("open");

  document.body.classList.toggle(
    "no-scroll",
    modalOpen || cartOpen
  );
}

/* =========================
   EVENT LISTENERS
========================= */

categoriesContainer.addEventListener("click", function (event) {
  const button = event.target.closest("[data-category]");

  if (!button) {
    return;
  }

  selectedCategory = button.dataset.category;

  renderCategories();
  renderMenu();
});

menuGrid.addEventListener("click", function (event) {
  const button = event.target.closest("[data-action]");

  if (!button) {
    return;
  }

  const id = Number(button.dataset.id);

  if (button.dataset.action === "add") {
    addToCart(id);
  }

  if (button.dataset.action === "details") {
    openFoodModal(id);
  }
});

cartItemsContainer.addEventListener("click", function (event) {
  const button = event.target.closest("[data-action]");

  if (!button) {
    return;
  }

  const id = Number(button.dataset.id);
  const action = button.dataset.action;

  if (action === "increase") {
    changeQuantity(id, 1);
  } else if (action === "decrease") {
    changeQuantity(id, -1);
  } else if (action === "remove") {
    removeFromCart(id);
  }
});

searchInput.addEventListener("input", function () {
  searchTerm = searchInput.value.trim().toLowerCase();
  renderMenu();
});

document.getElementById("openCart").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);

document.getElementById("closeFoodModal").addEventListener(
  "click",
  closeFoodModal
);

foodModal.addEventListener("click", function (event) {
  if (event.target === foodModal) {
    closeFoodModal();
  }
});

cartOverlay.addEventListener("click", function (event) {
  if (event.target === cartOverlay) {
    closeCart();
  }
});

modalAddButton.addEventListener("click", function () {
  if (activeModalItemId !== null) {
    addToCart(activeModalItemId);
    closeFoodModal();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeFoodModal();
    closeCart();
  }
});

/* =========================
   DEMO CHECKOUT
========================= */

document.getElementById("checkoutButton").addEventListener("click", function () {
  if (cart.size === 0) {
    showToast("Your cart is empty.");
    return;
  }

  const total = formatPrice(getCartTotal());

  alert(
    "Thank you for choosing dive.m2!\n\n" +
    "Your demo order total is " + total + ".\n\n" +
    "This is a demonstration only. No real order or payment was sent."
  );
});

/* =========================
   INITIALIZE WEBSITE
========================= */

document.getElementById("currentYear").textContent =
  new Date().getFullYear();

renderCategories();
renderMenu();
renderCart();
