// Import the API client
import { api } from "./api.js"

// Global state
let currentUser = null
let products = []
let cart = []
let orders = []
let notifications = []

// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
  // Initialize the dashboard
  initDashboard()

  // Sidebar toggle
  const menuToggle = document.getElementById("menu-toggle")
  const sidebar = document.querySelector(".sidebar")
  const closeSidebar = document.getElementById("close-sidebar")

  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("show")
  })

  closeSidebar.addEventListener("click", () => {
    sidebar.classList.remove("show")
  })

  // Tab navigation
  const sidebarItems = document.querySelectorAll(".sidebar-menu ul li[data-tab]")
  const tabContents = document.querySelectorAll(".tab-content")

  sidebarItems.forEach((item) => {
    item.addEventListener("click", () => {
      const tabId = item.getAttribute("data-tab")

      // Update active sidebar item
      sidebarItems.forEach((i) => i.classList.remove("active"))
      item.classList.add("active")

      // Show active tab content
      tabContents.forEach((content) => {
        content.classList.remove("active")
        if (content.id === tabId) {
          content.classList.add("active")
        }
      })

      // Close sidebar on mobile
      if (window.innerWidth < 768) {
        sidebar.classList.remove("show")
      }
    })
  })

  // View all links
  const viewAllLinks = document.querySelectorAll(".view-all")
  viewAllLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const tabId = link.getAttribute("data-tab")

      // Find and click the corresponding sidebar item
      const sidebarItem = document.querySelector(`.sidebar-menu ul li[data-tab="${tabId}"]`)
      if (sidebarItem) {
        sidebarItem.click()
      }
    })
  })

  // Notification dropdown
  const notificationBell = document.querySelector(".notification-bell")
  const notificationDropdown = document.getElementById("notification-dropdown")

  notificationBell.addEventListener("click", (e) => {
    e.stopPropagation()
    notificationDropdown.classList.toggle("show")
  })

  document.addEventListener("click", (e) => {
    if (!notificationBell.contains(e.target)) {
      notificationDropdown.classList.remove("show")
    }
  })

  // Mark all notifications as read
  const markAllRead = document.getElementById("mark-all-read")
  markAllRead.addEventListener("click", () => {
    markAllNotificationsAsRead()
  })

  // Logout button
  const logoutBtn = document.getElementById("logout-btn")
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault()
    logout()
  })

  // Product search
  const productSearch = document.getElementById("product-search")
  if (productSearch) {
    productSearch.addEventListener("input", () => {
      filterProducts()
    })
  }

  // Category filter
  const categoryFilter = document.getElementById("category-filter")
  if (categoryFilter) {
    categoryFilter.addEventListener("change", () => {
      filterProducts()
    })
  }

  // Sort filter
  const sortFilter = document.getElementById("sort-filter")
  if (sortFilter) {
    sortFilter.addEventListener("change", () => {
      filterProducts()
    })
  }

  // Order status filter
  const orderStatusFilter = document.getElementById("order-status-filter")
  if (orderStatusFilter) {
    orderStatusFilter.addEventListener("change", () => {
      filterOrders()
    })
  }

  // Order date filter
  const orderDateFilter = document.getElementById("order-date-filter")
  if (orderDateFilter) {
    orderDateFilter.addEventListener("change", () => {
      filterOrders()
    })
  }

  // Edit profile button
  const editProfileBtn = document.getElementById("edit-profile-btn")
  if (editProfileBtn) {
    editProfileBtn.addEventListener("click", () => {
      showEditProfileModal()
    })
  }

  // Change password button
  const changePasswordBtn = document.getElementById("change-password-btn")
  if (changePasswordBtn) {
    changePasswordBtn.addEventListener("click", () => {
      showChangePasswordModal()
    })
  }

  // Delete account button
  const deleteAccountBtn = document.getElementById("delete-account-btn")
  if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener("click", () => {
      confirmDeleteAccount()
    })
  }

  // Close modals
  const closeModalButtons = document.querySelectorAll(".close-modal")
  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      closeAllModals()
    })
  })

  // Edit profile form
  const editProfileForm = document.getElementById("edit-profile-form")
  if (editProfileForm) {
    editProfileForm.addEventListener("submit", (e) => {
      e.preventDefault()
      updateProfile()
    })
  }

  // Change password form
  const changePasswordForm = document.getElementById("change-password-form")
  if (changePasswordForm) {
    changePasswordForm.addEventListener("submit", (e) => {
      e.preventDefault()
      updatePassword()
    })
  }

  // Checkout form
  const checkoutForm = document.getElementById("checkout-form")
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault()
      placeOrder()
    })
  }

  // Review form
  const reviewForm = document.getElementById("review-form")
  if (reviewForm) {
    reviewForm.addEventListener("submit", (e) => {
      e.preventDefault()
      submitReview()
    })
  }

  // Event delegation for products grid
  const productsGrid = document.getElementById("products-grid")
  if (productsGrid) {
    productsGrid.addEventListener("click", (e) => {
      const viewBtn = e.target.closest(".btn-view")
      const addCartBtn = e.target.closest(".btn-add-cart")

      if (viewBtn) {
        const productId = viewBtn.getAttribute("data-id")
        showProductDetails(productId)
      } else if (addCartBtn) {
        const productId = addCartBtn.getAttribute("data-id")
        addToCart(productId)
      }
    })
  }

  // Event delegation for cart container
  const cartContainer = document.getElementById("cart-container")
  if (cartContainer) {
    cartContainer.addEventListener("click", (e) => {
      const decreaseBtn = e.target.closest(".decrease-quantity")
      const increaseBtn = e.target.closest(".increase-quantity")
      const removeBtn = e.target.closest(".cart-item-remove")

      if (decreaseBtn) {
        const productId = decreaseBtn.getAttribute("data-id")
        updateCartQuantity(productId, -1)
      } else if (increaseBtn) {
        const productId = increaseBtn.getAttribute("data-id")
        updateCartQuantity(productId, 1)
      } else if (removeBtn) {
        const productId = removeBtn.getAttribute("data-id")
        removeFromCart(productId)
      }
    })
  }

  // Checkout button
  const checkoutBtn = document.getElementById("checkout-btn")
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      showCheckoutModal()
    })
  }

  // Event delegation for orders list
  const ordersList = document.getElementById("orders-list")
  if (ordersList) {
    ordersList.addEventListener("click", (e) => {
      const viewOrderBtn = e.target.closest(".btn-view-order")

      if (viewOrderBtn) {
        const orderId = viewOrderBtn.getAttribute("data-id")
        showOrderDetails(orderId)
      }
    })
  }

  // Event delegation for recent orders
  const recentOrders = document.getElementById("recent-orders")
  if (recentOrders) {
    recentOrders.addEventListener("click", (e) => {
      const viewOrderBtn = e.target.closest(".btn-view-order")

      if (viewOrderBtn) {
        const orderId = viewOrderBtn.getAttribute("data-id")
        showOrderDetails(orderId)
      }
    })
  }

  // Event delegation for featured products
  const featuredProducts = document.getElementById("featured-products")
  if (featuredProducts) {
    featuredProducts.addEventListener("click", (e) => {
      const viewBtn = e.target.closest(".btn-view")
      const addCartBtn = e.target.closest(".btn-add-cart")

      if (viewBtn) {
        const productId = viewBtn.getAttribute("data-id")
        showProductDetails(productId)
      } else if (addCartBtn) {
        const productId = addCartBtn.getAttribute("data-id")
        addToCart(productId)
      }
    })
  }
})

// DOM Elements
const productListContainer = document.getElementById("product-list")
const orderHistoryContainer = document.getElementById("order-history")
const profileContainer = document.getElementById("profile-info")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotalElement = document.getElementById("cart-total")
const searchInput = document.getElementById("search-products")
const filterSelect = document.getElementById("filter-category")
const sortSelect = document.getElementById("sort-products")
const notificationContainer = document.getElementById("notifications")

// State management
// let products = []
// let cart = []
// let orders = []
let userProfile = {}
// let notifications = []

// Initialize the dashboard
async function initDashboard() {
  try {
    // Check if user is logged in
    currentUser = await checkAuth()

    if (!currentUser) {
      window.location.href = "auth.html"
      return
    }

    // Check if user is a retailer
    if (currentUser.role !== "retailer") {
      showToast("Access Denied", "You do not have permission to access this page.", "error")
      setTimeout(() => {
        window.location.href = "index.html"
      }, 2000)
      return
    }

    // Update UI with user info
    updateUserInfo()

    // Load data
    await Promise.all([loadProducts(), loadOrders(), loadNotifications()])

    // Load cart from localStorage
    loadCart()

    // Update dashboard stats
    updateDashboardStats()

    // Load recent orders
    loadRecentOrders()

    // Load featured products
    loadFeaturedProducts()
  } catch (error) {
    console.error("Failed to initialize dashboard:", error)
    showToast("Error", "Failed to load dashboard data.", "error")
  }
}

// Check if user is authenticated
async function checkAuth() {
  try {
    const user = await api.auth.getCurrentUser()
    return user
  } catch (error) {
    console.error("Auth check failed:", error)
    return null
  }
}

// Update UI with user info
function updateUserInfo() {
  // Update welcome message
  const welcomeName = document.getElementById("welcome-name")
  if (welcomeName) {
    welcomeName.textContent = currentUser.name
  }

  // Update user name in header
  const userName = document.getElementById("user-name")
  if (userName) {
    userName.textContent = currentUser.name
  }

  // Update user avatar
  const userAvatar = document.getElementById("user-avatar")
  const profileAvatar = document.getElementById("profile-avatar")

  if (userAvatar) {
    userAvatar.src = currentUser.avatar || "images/user-placeholder.jpg"
  }

  if (profileAvatar) {
    profileAvatar.src = currentUser.avatar || "images/user-placeholder.jpg"
  }

  // Update profile info
  const profileName = document.getElementById("profile-name")
  const profileEmail = document.getElementById("profile-email")
  const profilePhone = document.getElementById("profile-phone")

  if (profileName) {
    profileName.textContent = currentUser.name
  }

  if (profileEmail) {
    profileEmail.textContent = currentUser.email
  }

  if (profilePhone) {
    profilePhone.textContent = currentUser.phone || "No phone number"
  }

  // Update business details
  const businessName = document.getElementById("business-name")
  const gstNumber = document.getElementById("gst-number")
  const businessType = document.getElementById("business-type")

  if (businessName) {
    businessName.textContent = currentUser.businessName || "Not provided"
  }

  if (gstNumber) {
    gstNumber.textContent = currentUser.gstNumber || "Not provided"
  }

  if (businessType) {
    businessType.textContent = currentUser.businessType || "Not provided"
  }

  // Update address
  const streetAddress = document.getElementById("street-address")
  const city = document.getElementById("city")
  const state = document.getElementById("state")
  const pincode = document.getElementById("pincode")

  if (streetAddress) {
    streetAddress.textContent = currentUser.streetAddress || "Not provided"
  }

  if (city) {
    city.textContent = currentUser.city || "Not provided"
  }

  if (state) {
    state.textContent = currentUser.state || "Not provided"
  }

  if (pincode) {
    pincode.textContent = currentUser.pincode || "Not provided"
  }
}

// Load products from API
async function loadProducts() {
  try {
    const response = await api.products.getProducts()
    products = response.data

    // Render products
    renderProducts(products)

    return products
  } catch (error) {
    console.error("Failed to load products:", error)
    showToast("Error", "Failed to load products.", "error")
    return []
  }
}

// Render products to the DOM
function renderProducts(productsToRender) {
  const productsGrid = document.getElementById("products-grid")

  if (!productsGrid) return

  // Clear loading spinner
  productsGrid.innerHTML = ""

  if (productsToRender.length === 0) {
    productsGrid.innerHTML = `
            <div class="no-products">
                <p>No products found.</p>
            </div>
        `
    return
  }

  productsToRender.forEach((product) => {
    const inCart = cart.find((item) => item.productId === product._id)

    const productCard = document.createElement("div")
    productCard.className = "product-card"
    productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.imageUrl || "images/product-placeholder.jpg"}" alt="${product.name}">
            </div>
            <div class="product-details">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">₹${product.price.toFixed(2)} / ${product.unit}</p>
                <p class="product-farmer">By: ${product.farmer.name}</p>
                <div class="product-actions">
                    <button class="btn-view" data-id="${product._id}">View Details</button>
                    <button class="btn-add-cart" data-id="${product._id}">
                        ${inCart ? "Added to Cart" : "Add to Cart"}
                    </button>
                </div>
            </div>
        `

    productsGrid.appendChild(productCard)
  })
}

// Filter products
function filterProducts() {
  const searchTerm = document.getElementById("product-search").value.toLowerCase()
  const category = document.getElementById("category-filter").value
  const sortBy = document.getElementById("sort-filter").value

  let filteredProducts = [...products]

  // Apply search filter
  if (searchTerm) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm),
    )
  }

  // Apply category filter
  if (category !== "all") {
    filteredProducts = filteredProducts.filter((product) => product.category === category)
  }

  // Apply sorting
  switch (sortBy) {
    case "name-asc":
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
      break
    case "name-desc":
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name))
      break
    case "price-asc":
      filteredProducts.sort((a, b) => a.price - b.price)
      break
    case "price-desc":
      filteredProducts.sort((a, b) => b.price - a.price)
      break
  }

  renderProducts(filteredProducts)
}

// Load orders from API
async function loadOrders() {
  try {
    const response = await api.orders.getOrders()
    orders = response.data

    // Render orders
    renderOrders(orders)

    return orders
  } catch (error) {
    console.error("Failed to load orders:", error)
    showToast("Error", "Failed to load orders.", "error")
    return []
  }
}

// Render order history to the DOM
function renderOrderHistory(ordersToRender) {
  if (!orderHistoryContainer) return

  orderHistoryContainer.innerHTML = ""

  if (ordersToRender.length === 0) {
    orderHistoryContainer.innerHTML = `
            <div class="no-orders">
                <p>You haven't placed any orders yet.</p>
            </div>
        `
    return
  }

  ordersToRender.forEach((order) => {
    const orderCard = document.createElement("div")
    orderCard.className = "order-card"

    const orderDate = new Date(order.createdAt).toLocaleDateString()
    const totalAmount = order.items.reduce((total, item) => total + item.price * item.quantity, 0)

    orderCard.innerHTML = `
            <div class="order-header">
                <div class="order-id">
                    <span>Order ID:</span>
                    <strong>#${order._id.substring(0, 8)}</strong>
                </div>
                <div class="order-date">
                    <span>Placed on:</span>
                    <strong>${orderDate}</strong>
                </div>
                <div class="order-status ${order.status.toLowerCase()}">
                    <span>Status:</span>
                    <strong>${order.status}</strong>
                </div>
            </div>
            <div class="order-items">
                <h4>Items (${order.items.length})</h4>
                <ul>
                    ${order.items
                      .map(
                        (item) => `
                        <li>
                            <span class="item-name">${item.product.name}</span>
                            <span class="item-quantity">${item.quantity} ${item.product.unit}</span>
                            <span class="item-price">₹${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                    `,
                      )
                      .join("")}
                </ul>
            </div>
            <div class="order-footer">
                <div class="order-total">
                    <span>Total Amount:</span>
                    <strong>₹${totalAmount.toFixed(2)}</strong>
                </div>
                <button class="btn view-order-details" data-id="${order._id}">View Details</button>
            </div>
        `

    orderHistoryContainer.appendChild(orderCard)
  })
}

// Render orders
function renderOrders(ordersToRender) {
  const ordersList = document.getElementById("orders-list")

  if (!ordersList) return

  // Clear loading spinner
  ordersList.innerHTML = ""

  if (ordersToRender.length === 0) {
    ordersList.innerHTML = `
            <div class="no-orders">
                <p>You haven't placed any orders yet.</p>
            </div>
        `
    return
  }

  ordersToRender.forEach((order) => {
    const orderDate = new Date(order.createdAt).toLocaleDateString()
    const totalAmount = order.items.reduce((total, item) => total + item.price * item.quantity, 0)

    const orderCard = document.createElement("div")
    orderCard.className = "order-card"
    orderCard.innerHTML = `
            <div class="order-header">
                <div class="order-number">Order #${order._id.substring(0, 8)}</div>
                <div class="order-date">${orderDate}</div>
                <div class="order-status ${order.status.toLowerCase()}">${order.status}</div>
            </div>
            <div class="order-details">
                <div class="order-items">
                    ${order.items
                      .map(
                        (item) => `
                        <div class="order-item-row">
                            <div class="order-item-name">${item.product.name}</div>
                            <div class="order-item-quantity">${item.quantity} ${item.product.unit}</div>
                            <div class="order-item-price">₹${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            </div>
            <div class="order-footer">
                <div class="order-total">Total: ₹${totalAmount.toFixed(2)}</div>
                <button class="btn-view-order" data-id="${order._id}">View Details</button>
            </div>
        `

    ordersList.appendChild(orderCard)
  })
}

// Filter orders
function filterOrders() {
  const status = document.getElementById("order-status-filter").value
  const date = document.getElementById("order-date-filter").value

  let filteredOrders = [...orders]

  // Apply status filter
  if (status !== "all") {
    filteredOrders = filteredOrders.filter((order) => order.status.toLowerCase() === status)
  }

  // Apply date filter
  if (date) {
    const filterDate = new Date(date)
    filteredOrders = filteredOrders.filter((order) => {
      const orderDate = new Date(order.createdAt)
      return orderDate.toDateString() === filterDate.toDateString()
    })
  }

  renderOrders(filteredOrders)
}

// Load user profile from API
async function loadProfile() {
  try {
    if (!profileContainer) return

    profileContainer.innerHTML = `
            <div class="profile-header">
                <div class="profile-avatar">
                    <img src="${userProfile.avatar || "/images/user-placeholder.jpg"}" alt="${userProfile.name}">
                </div>
                <div class="profile-info">
                    <h2>${userProfile.name}</h2>
                    <p>${userProfile.email}</p>
                    <p>${userProfile.phone || "No phone number"}</p>
                </div>
                <button class="btn edit-profile-btn">Edit Profile</button>
            </div>
            <div class="profile-details">
                <div class="profile-section">
                    <h3>Business Details</h3>
                    <p><strong>Business Name:</strong> ${userProfile.businessName || "Not provided"}</p>
                    <p><strong>GST Number:</strong> ${userProfile.gstNumber || "Not provided"}</p>
                </div>
                <div class="profile-section">
                    <h3>Address</h3>
                    <p>${userProfile.address || "No address provided"}</p>
                </div>
            </div>
        `
  } catch (error) {
    console.error("Failed to load profile:", error)
    showAlert("Failed to load profile information. Please try again.", "error")
  }
}

// Load notifications
async function loadNotifications() {
  try {
    // In a real app, this would be an API call
    // For now, we'll use dummy data
    notifications = [
      {
        id: 1,
        message: "Your order #12345 has been shipped",
        read: false,
        createdAt: new Date(),
      },
      {
        id: 2,
        message: "New products available from your favorite farmers",
        read: true,
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
      },
      {
        id: 3,
        message: "Special discount on seasonal vegetables",
        read: true,
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
      },
    ]

    renderNotifications()

    return notifications
  } catch (error) {
    console.error("Failed to load notifications:", error)
    return []
  }
}

// Render notifications
function renderNotifications() {
  const notificationList = document.getElementById("notification-list")
  const notificationCount = document.getElementById("notification-count")

  if (!notificationList || !notificationCount) return

  // Update notification count
  const unreadCount = notifications.filter((notification) => !notification.read).length
  notificationCount.textContent = unreadCount

  if (unreadCount === 0) {
    notificationCount.style.display = "none"
  } else {
    notificationCount.style.display = "flex"
  }

  // Clear notification list
  notificationList.innerHTML = ""

  if (notifications.length === 0) {
    notificationList.innerHTML = `
            <div class="notification-item">
                <div class="notification-content">No notifications</div>
            </div>
        `
    return
  }

  notifications.forEach((notification) => {
    const notificationTime = new Date(notification.createdAt).toLocaleString()

    const notificationItem = document.createElement("div")
    notificationItem.className = `notification-item ${notification.read ? "" : "unread"}`
    notificationItem.innerHTML = `
            <div class="notification-content">${notification.message}</div>
            <div class="notification-time">${notificationTime}</div>
        `

    notificationList.appendChild(notificationItem)
  })
}

// Mark all notifications as read
function markAllNotificationsAsRead() {
  notifications.forEach((notification) => {
    notification.read = true
  })

  renderNotifications()
  showToast("Success", "All notifications marked as read.", "success")
}

// Render notifications
function renderNotifications1() {
  if (!notificationContainer) return

  const unreadCount = notifications.filter((n) => !n.read).length

  document.getElementById("notification-count").textContent = unreadCount > 0 ? unreadCount : ""

  notificationContainer.innerHTML = ""

  if (notifications.length === 0) {
    notificationContainer.innerHTML = '<p class="no-notifications">No notifications</p>'
    return
  }

  notifications.forEach((notification) => {
    const notificationItem = document.createElement("div")
    notificationItem.className = `notification-item ${notification.read ? "read" : "unread"}`

    const notificationDate = new Date(notification.createdAt).toLocaleDateString()

    notificationItem.innerHTML = `
            <div class="notification-content">
                <p>${notification.message}</p>
                <span class="notification-date">${notificationDate}</span>
            </div>
            <button class="mark-read-btn" data-id="${notification.id}">
                ${notification.read ? "Mark as unread" : "Mark as read"}
            </button>
        `

    notificationContainer.appendChild(notificationItem)
  })
}

// Load cart from localStorage
function loadCart() {
  const savedCart = localStorage.getItem("retailerCart")

  if (savedCart) {
    try {
      cart = JSON.parse(savedCart)
      renderCart()
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error)
      cart = []
    }
  }
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("retailerCart", JSON.stringify(cart))
}

// Render cart
function renderCart() {
  const cartContainer = document.getElementById("cart-container")
  const cartSummary = document.getElementById("cart-summary")

  if (!cartContainer || !cartSummary) return

  // Clear cart container
  cartContainer.innerHTML = ""

  if (cart.length === 0) {
    cartContainer.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is empty.</p>
                <button class="btn-primary" data-tab="browse-products">Browse Products</button>
            </div>
        `

    cartSummary.innerHTML = ""
    return
  }

  // Calculate totals
  let subtotal = 0
  let totalItems = 0

  cart.forEach((item) => {
    const product = products.find((p) => p._id === item.productId)

    if (product) {
      const itemTotal = product.price * item.quantity
      subtotal += itemTotal
      totalItems += item.quantity

      const cartItem = document.createElement("div")
      cartItem.className = "cart-item"
      cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${product.imageUrl || "images/product-placeholder.jpg"}" alt="${product.name}">
                </div>
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${product.name}</h3>
                    <p class="cart-item-price">₹${product.price.toFixed(2)} / ${product.unit}</p>
                    <p class="cart-item-farmer">By: ${product.farmer.name}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease-quantity" data-id="${product._id}">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn increase-quantity" data-id="${product._id}">+</button>
                </div>
                <div class="cart-item-total">₹${itemTotal.toFixed(2)}</div>
                <button class="cart-item-remove" data-id="${product._id}">×</button>
            `

      cartContainer.appendChild(cartItem)
    }
  })

  // Delivery fee (could be calculated based on distance, weight, etc.)
  const deliveryFee = subtotal > 0 ? 40 : 0

  // Total
  const total = subtotal + deliveryFee

  // Render cart summary
  cartSummary.innerHTML = `
        <div class="cart-total">
            <span>Subtotal (${totalItems} items)</span>
            <span>₹${subtotal.toFixed(2)}</span>
        </div>
        <div class="cart-total">
            <span>Delivery Fee</span>
            <span>₹${deliveryFee.toFixed(2)}</span>
        </div>
        <div class="cart-total">
            <span>Total</span>
            <span>₹${total.toFixed(2)}</span>
        </div>
        <div class="cart-actions">
            <button class="btn-checkout" id="checkout-btn">Proceed to Checkout</button>
        </div>
    `
}

// Load cart from localStorage
function loadCart1() {
  const savedCart = localStorage.getItem("retailerCart")

  if (savedCart) {
    try {
      cart = JSON.parse(savedCart)
      updateCartUI()
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error)
      cart = []
    }
  }
}

// Save cart to localStorage
function saveCart1() {
  localStorage.setItem("retailerCart", JSON.stringify(cart))
}

// Update cart UI
function updateCartUI() {
  if (!cartItemsContainer || !cartTotalElement) return

  cartItemsContainer.innerHTML = ""

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>'
    cartTotalElement.textContent = "₹0.00"

    if (checkoutBtn) {
      checkoutBtn.disabled = true
    }

    return
  }

  let total = 0

  cart.forEach((item) => {
    const product = products.find((p) => p._id === item.productId)

    if (!product) return

    const itemTotal = product.price * item.quantity
    total += itemTotal

    const cartItem = document.createElement("div")
    cartItem.className = "cart-item"

    cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${product.name}</h4>
                <p>₹${product.price.toFixed(2)} × ${item.quantity} ${product.unit}</p>
            </div>
            <div class="cart-item-total">
                ₹${itemTotal.toFixed(2)}
            </div>
            <div class="cart-item-actions">
                <button class="decrease-quantity" data-id="${product._id}">-</button>
                <span class="item-quantity">${item.quantity}</span>
                <button class="increase-quantity" data-id="${product._id}">+</button>
                <button class="remove-item" data-id="${product._id}">×</button>
            </div>
        `

    cartItemsContainer.appendChild(cartItem)
  })

  cartTotalElement.textContent = `₹${total.toFixed(2)}`

  if (checkoutBtn) {
    checkoutBtn.disabled = false
  }
}

// Add to cart
function addToCart(productId) {
  const product = products.find((p) => p._id === productId)

  if (!product) {
    showToast("Error", "Product not found.", "error")
    return
  }

  // Check if product is already in cart
  const existingItem = cart.find((item) => item.productId === productId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      productId,
      quantity: 1,
    })
  }

  saveCart()
  renderCart()

  // Re-render products to update "Add to Cart" buttons
  renderProducts(products)

  showToast("Success", `${product.name} added to cart.`, "success")
}

// Remove from cart
function removeFromCart(productId) {
  const product = products.find((p) => p._id === productId)

  if (!product) {
    showToast("Error", "Product not found.", "error")
    return
  }

  cart = cart.filter((item) => item.productId !== productId)

  saveCart()
  renderCart()

  // Re-render products to update "Add to Cart" buttons
  renderProducts(products)

  showToast("Success", `${product.name} removed from cart.`, "success")
}

// Update cart quantity
function updateCartQuantity(productId, change) {
  const item = cart.find((item) => item.productId === productId)

  if (!item) {
    showToast("Error", "Product not found in cart.", "error")
    return
  }

  item.quantity += change

  if (item.quantity <= 0) {
    removeFromCart(productId)
    return
  }

  saveCart()
  renderCart()
}

// Add item to cart
function addToCart1(productId, quantity = 1) {
  const product = products.find((p) => p._id === productId)

  if (!product) {
    showAlert("Product not found", "error")
    return
  }

  const existingItem = cart.find((item) => item.productId === productId)

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.push({
      productId,
      quantity,
    })
  }

  saveCart()
  updateCartUI()
  renderProducts(products) // Re-render products to update buttons
  showAlert(`${product.name} added to cart`, "success")
}

// Remove item from cart
function removeFromCart1(productId) {
  const product = products.find((p) => p._id === productId)

  if (!product) {
    showAlert("Product not found", "error")
    return
  }

  cart = cart.filter((item) => item.productId !== productId)

  saveCart()
  updateCartUI()
  renderProducts(products) // Re-render products to update buttons
  showAlert(`${product.name} removed from cart`, "success")
}

// Update item quantity in cart
function updateCartItemQuantity(productId, change) {
  const item = cart.find((item) => item.productId === productId)

  if (!item) return

  item.quantity += change

  if (item.quantity <= 0) {
    removeFromCart(productId)
    return
  }

  saveCart()
  updateCartUI()
}

// Show checkout modal
function showCheckoutModal() {
  if (cart.length === 0) {
    showToast("Error", "Your cart is empty.", "error")
    return
  }

  const checkoutModal = document.getElementById("checkout-modal")
  const checkoutSummary = document.getElementById("checkout-summary")
  const deliveryAddress = document.getElementById("delivery-address")

  // Calculate totals
  let subtotal = 0
  let totalItems = 0

  cart.forEach((item) => {
    const product = products.find((p) => p._id === item.productId)

    if (product) {
      subtotal += product.price * item.quantity
      totalItems += item.quantity
    }
  })

  const deliveryFee = 40
  const total = subtotal + deliveryFee

  // Render checkout summary
  checkoutSummary.innerHTML = `
        <h3>Order Summary</h3>
        <div class="checkout-items">
            ${cart
              .map((item) => {
                const product = products.find((p) => p._id === item.productId)
                return `
                    <div class="checkout-item">
                        <span>${product.name} × ${item.quantity}</span>
                        <span>₹${(product.price * item.quantity).toFixed(2)}</span>
                    </div>
                `
              })
              .join("")}
        </div>
        <div class="checkout-total">
            <div class="total-row">
                <span>Subtotal (${totalItems} items)</span>
                <span>₹${subtotal.toFixed(2)}</span>
            </div>
            <div class="total-row">
                <span>Delivery Fee</span>
                <span>₹${deliveryFee.toFixed(2)}</span>
            </div>
            <div class="total-row total-amount">
                <span>Total</span>
                <span>₹${total.toFixed(2)}</span>
            </div>
        </div>
    `

  // Pre-fill delivery address if available
  if (currentUser.streetAddress) {
    deliveryAddress.value = `${currentUser.streetAddress}, ${currentUser.city}, ${currentUser.state}, ${currentUser.pincode}`
  }

  // Show modal
  checkoutModal.classList.add("show")
}

// Checkout process
async function checkout() {
  try {
    if (cart.length === 0) {
      showAlert("Your cart is empty", "error")
      return
    }

    // Prepare order items
    const items = cart.map((item) => {
      const product = products.find((p) => p._id === item.productId)

      return {
        product: item.productId,
        quantity: item.quantity,
        price: product.price,
      }
    })

    // Create order
    const response = await api.post("/orders", { items })

    // Clear cart
    cart = []
    saveCart()
    updateCartUI()

    // Show success message
    showAlert("Order placed successfully!", "success")

    // Reload orders
    await loadOrders()

    // Switch to orders tab
    document.getElementById("orders-tab").click()
  } catch (error) {
    console.error("Checkout failed:", error)
    showAlert("Failed to place order. Please try again.", "error")
  }
}

// Place order
async function placeOrder() {
  try {
    if (cart.length === 0) {
      showToast("Error", "Your cart is empty.", "error")
      return
    }

    const deliveryAddress = document.getElementById("delivery-address").value
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value

    if (!deliveryAddress) {
      showToast("Error", "Please enter a delivery address.", "error")
      return
    }

    // Prepare order items
    const items = cart.map((item) => {
      const product = products.find((p) => p._id === item.productId)

      return {
        product: item.productId,
        quantity: item.quantity,
        price: product.price,
      }
    })

    // Create order
    const orderData = {
      items,
      deliveryAddress,
      paymentMethod,
    }

    const response = await api.orders.createOrder(orderData)

    // Clear cart
    cart = []
    saveCart()
    renderCart()

    // Close modal
    closeAllModals()

    // Show success message
    showToast("Success", "Order placed successfully!", "success")

    // Reload orders
    await loadOrders()

    // Update dashboard stats
    updateDashboardStats()

    // Load recent orders
    loadRecentOrders()

    // Switch to orders tab
    document.querySelector('.sidebar-menu ul li[data-tab="orders"]').click()
  } catch (error) {
    console.error("Failed to place order:", error)
    showToast("Error", "Failed to place order. Please try again.", "error")
  }
}

// Search and filter products
function searchAndFilterProducts() {
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : ""
  const category = filterSelect ? filterSelect.value : "all"
  const sortBy = sortSelect ? sortSelect.value : "name-asc"

  let filteredProducts = [...products]

  // Apply search
  if (searchTerm) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm),
    )
  }

  // Apply category filter
  if (category !== "all") {
    filteredProducts = filteredProducts.filter((product) => product.category === category)
  }

  // Apply sorting
  switch (sortBy) {
    case "name-asc":
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
      break
    case "name-desc":
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name))
      break
    case "price-asc":
      filteredProducts.sort((a, b) => a.price - b.price)
      break
    case "price-desc":
      filteredProducts.sort((a, b) => b.price - a.price)
      break
    default:
      break
  }

  renderProducts(filteredProducts)
}

// Show product details
function showProductDetails(productId) {
  const product = products.find((p) => p._id === productId)

  if (!product) {
    showToast("Error", "Product not found.", "error")
    return
  }

  const productDetailModal = document.getElementById("product-detail-modal")
  const productDetailContent = document.getElementById("product-detail-content")

  productDetailContent.innerHTML = `
        <div class="product-detail">
            <div class="product-detail-image">
                <img src="${product.imageUrl || "images/product-placeholder.jpg"}" alt="${product.name}">
            </div>
            <div class="product-detail-info">
                <h3>${product.name}</h3>
                <p class="product-detail-price">₹${product.price.toFixed(2)} / ${product.unit}</p>
                <p class="product-detail-farmer">By: ${product.farmer.name}</p>
                <div class="product-detail-description">
                    <h4>Description</h4>
                    <p>${product.description || "No description available."}</p>
                </div>
                <div class="product-detail-meta">
                    <div class="meta-item">
                        <span class="meta-label">Category:</span>
                        <span class="meta-value">${product.category || "Uncategorized"}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Available Quantity:</span>
                        <span class="meta-value">${product.quantity} ${product.unit}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Harvest Date:</span>
                        <span class="meta-value">${product.harvestDate ? new Date(product.harvestDate).toLocaleDateString() : "Not specified"}</span>
                    </div>
                </div>
                <div class="product-detail-actions">
                    <button class="btn-primary add-to-cart-btn" data-id="${product._id}">Add to Cart</button>
                </div>
            </div>
        </div>
    `

  // Show modal
  productDetailModal.classList.add("show")

  // Add event listener to "Add to Cart" button
  const addToCartBtn = productDetailContent.querySelector(".add-to-cart-btn")
  addToCartBtn.addEventListener("click", () => {
    addToCart(product._id)
    closeAllModals()
  })
}

// Show alert message
function showAlert(message, type = "info") {
  const alertContainer = document.createElement("div")
  alertContainer.className = `alert alert-${type}`
  alertContainer.textContent = message

  document.body.appendChild(alertContainer)

  setTimeout(() => {
    alertContainer.classList.add("show")
  }, 10)

  setTimeout(() => {
    alertContainer.classList.remove("show")
    setTimeout(() => {
      document.body.removeChild(alertContainer)
    }, 300)
  }, 3000)
}

// Show order details
function showOrderDetails(orderId) {
  const order = orders.find((o) => o._id === orderId)

  if (!order) {
    showToast("Error", "Order not found.", "error")
    return
  }

  const orderDetailModal = document.getElementById("order-detail-modal")
  const orderDetailContent = document.getElementById("order-detail-content")

  const orderDate = new Date(order.createdAt).toLocaleDateString()
  const totalAmount = order.items.reduce((total, item) => total + item.price * item.quantity, 0)

  orderDetailContent.innerHTML = `
        <div class="order-detail">
            <div class="order-detail-header">
                <div class="order-detail-number">
                    <span class="detail-label">Order Number:</span>
                    <span class="detail-value">#${order._id.substring(0, 8)}</span>
                </div>
                <div class="order-detail-date">
                    <span class="detail-label">Order Date:</span>
                    <span class="detail-value">${orderDate}</span>
                </div>
                <div class="order-detail-status">
                    <span class="detail-label">Status:</span>
                    <span class="detail-value status-badge ${order.status.toLowerCase()}">${order.status}</span>
                </div>
            </div>
            
            <div class="order-detail-section">
                <h3>Items</h3>
                <table class="order-detail-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.items
                          .map(
                            (item) => `
                            <tr>
                                <td>
                                    <div class="order-product">
                                        <img src="${item.product.imageUrl || "images/product-placeholder.jpg"}" alt="${item.product.name}">
                                        <div>
                                            <div class="order-product-name">${item.product.name}</div>
                                            <div class="order-product-farmer">By: ${item.product.farmer.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>₹${item.price.toFixed(2)}</td>
                                <td>${item.quantity} ${item.product.unit}</td>
                                <td>₹${(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                        `,
                          )
                          .join("")}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3">Subtotal</td>
                            <td>₹${totalAmount.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colspan="3">Delivery Fee</td>
                            <td>₹40.00</td>
                        </tr>
                        <tr class="total-row">
                            <td colspan="3">Total</td>
                            <td>₹${(totalAmount + 40).toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            
            <div class="order-detail-section">
                <h3>Delivery Information</h3>
                <div class="detail-item">
                    <span class="detail-label">Address:</span>
                    <span class="detail-value">${order.deliveryAddress}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Payment Method:</span>
                    <span class="detail-value">${order.paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment"}</span>
                </div>
            </div>
            
            <div class="order-detail-section">
                <h3>Order Timeline</h3>
                <div class="order-timeline">
                    <div class="timeline-item ${order.status !== "Cancelled" ? "completed" : ""}">
                        <div class="timeline-point"></div>
                        <div class="timeline-content">
                            <h4>Order Placed</h4>
                            <p>${orderDate}</p>
                        </div>
                    </div>
                    <div class="timeline-item ${order.status === "Processing" || order.status === "Shipped" || order.status === "Delivered" ? "completed" : ""}">
                        <div class="timeline-point"></div>
                        <div class="timeline-content">
                            <h4>Processing</h4>
                            <p>${order.processingDate ? new Date(order.processingDate).toLocaleDateString() : "Pending"}</p>
                        </div>
                    </div>
                    <div class="timeline-item ${order.status === "Shipped" || order.status === "Delivered" ? "completed" : ""}">
                        <div class="timeline-point"></div>
                        <div class="timeline-content">
                            <h4>Shipped</h4>
                            <p>${order.shippedDate ? new Date(order.shippedDate).toLocaleDateString() : "Pending"}</p>
                        </div>
                    </div>
                    <div class="timeline-item ${order.status === "Delivered" ? "completed" : ""}">
                        <div class="timeline-point"></div>
                        <div class="timeline-content">
                            <h4>Delivered</h4>
                            <p>${order.deliveredDate ? new Date(order.deliveredDate).toLocaleDateString() : "Pending"}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            ${
              order.status === "Delivered" && !order.reviewed
                ? `
                <div class="order-detail-section">
                    <h3>Leave a Review</h3>
                    <button class="btn-primary write-review-btn" data-order-id="${order._id}">Write a Review</button>
                </div>
            `
                : ""
            }
        </div>
    `

  // Show modal
  orderDetailModal.classList.add("show")

  // Add event listener to "Write a Review" button
  const writeReviewBtn = orderDetailContent.querySelector(".write-review-btn")
  if (writeReviewBtn) {
    writeReviewBtn.addEventListener("click", () => {
      showReviewModal(order._id)
    })
  }
}

// Initialize event listeners
function initEventListeners() {
  // Tab navigation
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabId = btn.getAttribute("data-tab")

      // Update active tab button
      document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      // Show active tab content
      document.querySelectorAll(".tab-content").forEach((content) => (content.style.display = "none"))
      document.getElementById(tabId).style.display = "block"
    })
  })

  // Product list event delegation
  if (productListContainer) {
    productListContainer.addEventListener("click", (e) => {
      const target = e.target

      if (target.classList.contains("add-to-cart")) {
        const productId = target.getAttribute("data-id")
        addToCart(productId)
      } else if (target.classList.contains("remove-from-cart")) {
        const productId = target.getAttribute("data-id")
        removeFromCart(productId)
      } else if (target.classList.contains("view-product")) {
        const productId = target.getAttribute("data-id")
        window.location.href = `/product-details.html?id=${productId}`
      }
    })
  }

  // Cart event delegation
  if (cartItemsContainer) {
    cartItemsContainer.addEventListener("click", (e) => {
      const target = e.target
      const productId = target.getAttribute("data-id")

      if (!productId) return

      if (target.classList.contains("increase-quantity")) {
        updateCartItemQuantity(productId, 1)
      } else if (target.classList.contains("decrease-quantity")) {
        updateCartItemQuantity(productId, -1)
      } else if (target.classList.contains("remove-item")) {
        removeFromCart(productId)
      }
    })
  }

  // Checkout button
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", checkout)
  }

  // Search and filter
  if (searchInput) {
    searchInput.addEventListener("input", searchAndFilterProducts)
  }

  if (filterSelect) {
    filterSelect.addEventListener("change", searchAndFilterProducts)
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", searchAndFilterProducts)
  }

  // Order history event delegation
  if (orderHistoryContainer) {
    orderHistoryContainer.addEventListener("click", (e) => {
      const target = e.target

      if (target.classList.contains("view-order-details")) {
        const orderId = target.getAttribute("data-id")
        showOrderDetails(orderId)
      }
    })
  }

  // Edit profile button
  const editProfileBtn = document.querySelector(".edit-profile-btn")
  if (editProfileBtn) {
    editProfileBtn.addEventListener("click", showEditProfileModal)
  }

  // Notification event delegation
  if (notificationContainer) {
    notificationContainer.addEventListener("click", (e) => {
      const target = e.target

      if (target.classList.contains("mark-read-btn")) {
        const notificationId = Number.parseInt(target.getAttribute("data-id"))
        toggleNotificationRead(notificationId)
      }
    })
  }

  // Notification toggle
  const notificationToggle = document.getElementById("notification-toggle")
  if (notificationToggle) {
    notificationToggle.addEventListener("click", () => {
      const dropdown = document.getElementById("notification-dropdown")
      dropdown.classList.toggle("show")
    })

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      const dropdown = document.getElementById("notification-dropdown")
      const toggle = document.getElementById("notification-toggle")

      if (!dropdown || !toggle) return

      if (!dropdown.contains(e.target) && !toggle.contains(e.target)) {
        dropdown.classList.remove("show")
      }
    })
  }

  // Logout button
  const logoutBtn = document.getElementById("logout-btn")
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout)
  }
}

// Show review modal
function showReviewModal(orderId) {
  const order = orders.find((o) => o._id === orderId)

  if (!order) {
    showToast("Error", "Order not found.", "error")
    return
  }

  const reviewModal = document.getElementById("review-modal")
  const reviewProductId = document.getElementById("review-product-id")
  const reviewOrderId = document.getElementById("review-order-id")

  // Set hidden fields
  reviewProductId.value = order.items[0].product._id // For simplicity, we'll review the first product
  reviewOrderId.value = order._id

  // Show modal
  reviewModal.classList.add("show")
}

// Show order details modal
function showOrderDetails1(orderId) {
  const order = orders.find((o) => o._id === orderId)

  if (!order) {
    showAlert("Order not found", "error")
    return
  }

  const orderDate = new Date(order.createdAt).toLocaleDateString()
  const totalAmount = order.items.reduce((total, item) => total + item.price * item.quantity, 0)

  const modalContent = `
        <div class="modal-header">
            <h2>Order Details</h2>
            <button class="close-modal">&times;</button>
        </div>
        <div class="modal-body">
            <div class="order-details-header">
                <div>
                    <strong>Order ID:</strong> #${order._id.substring(0, 8)}
                </div>
                <div>
                    <strong>Date:</strong> ${orderDate}
                </div>
                <div>
                    <strong>Status:</strong> <span class="status-badge ${order.status.toLowerCase()}">${order.status}</span>
                </div>
            </div>
            
            <h3>Items</h3>
            <table class="order-items-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Farmer</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${order.items
                      .map(
                        (item) => `
                        <tr>
                            <td>${item.product.name}</td>
                            <td>${item.product.farmer.name}</td>
                            <td>₹${item.price.toFixed(2)}</td>
                            <td>${item.quantity} ${item.product.unit}</td>
                            <td>₹${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    `,
                      )
                      .join("")}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="4" class="text-right"><strong>Total Amount:</strong></td>
                        <td>₹${totalAmount.toFixed(2)}</td>
                    </tr>
                </tfoot>
            </table>
            
            <div class="order-timeline">
                <h3>Order Timeline</h3>
                <ul class="timeline">
                    <li class="timeline-item ${order.status === "Pending" || order.status === "Processing" || order.status === "Shipped" || order.status === "Delivered" ? "completed" : ""}">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content">
                            <h4>Order Placed</h4>
                            <p>${orderDate}</p>
                        </div>
                    </li>
                    <li class="timeline-item ${order.status === "Processing" || order.status === "Shipped" || order.status === "Delivered" ? "completed" : ""}">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content">
                            <h4>Processing</h4>
                            <p>${order.processingDate ? new Date(order.processingDate).toLocaleDateString() : "Pending"}</p>
                        </div>
                    </li>
                    <li class="timeline-item ${order.status === "Shipped" || order.status === "Delivered" ? "completed" : ""}">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content">
                            <h4>Shipped</h4>
                            <p>${order.shippedDate ? new Date(order.shippedDate).toLocaleDateString() : "Pending"}</p>
                        </div>
                    </li>
                    <li class="timeline-item ${order.status === "Delivered" ? "completed" : ""}">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content">
                            <h4>Delivered</h4>
                            <p>${order.deliveredDate ? new Date(order.deliveredDate).toLocaleDateString() : "Pending"}</p>
                        </div>
                    </li>
                </ul>
            </div>
            
            ${
              order.status === "Delivered" && !order.reviewed
                ? `
                <div class="review-section">
                    <h3>Leave a Review</h3>
                    <form id="review-form" data-order-id="${order._id}">
                        <div class="rating">
                            <input type="radio" id="star5" name="rating" value="5" /><label for="star5"></label>
                            <input type="radio" id="star4" name="rating" value="4" /><label for="star4"></label>
                            <input type="radio" id="star3" name="rating" value="3" /><label for="star3"></label>
                            <input type="radio" id="star2" name="rating" value="2" /><label for="star2"></label>
                            <input type="radio" id="star1" name="rating" value="1" /><label for="star1"></label>
                        </div>
                        <textarea name="review" placeholder="Write your review here..."></textarea>
                        <button type="submit" class="btn submit-review">Submit Review</button>
                    </form>
                </div>
            `
                : ""
            }
        </div>
    `

  showModal(modalContent)

  // Add event listener for review form
  const reviewForm = document.getElementById("review-form")
  if (reviewForm) {
    reviewForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const orderId = reviewForm.getAttribute("data-order-id")
      const rating = document.querySelector('input[name="rating"]:checked')?.value
      const review = document.querySelector('textarea[name="review"]').value

      if (!rating) {
        showAlert("Please select a rating", "error")
        return
      }

      try {
        // Submit review for each product in the order
        const promises = order.items.map((item) =>
          api.post(`/products/${item.product._id}/reviews`, {
            rating: Number.parseInt(rating),
            comment: review,
          }),
        )

        await Promise.all(promises)

        // Update order as reviewed
        await api.put(`/orders/${orderId}`, {
          reviewed: true,
        })

        showAlert("Review submitted successfully", "success")
        closeModal()

        // Reload orders
        await loadOrders()
      } catch (error) {
        console.error("Failed to submit review:", error)
        showAlert("Failed to submit review. Please try again.", "error")
      }
    })
  }
}

// Submit review
async function submitReview() {
  try {
    const productId = document.getElementById("review-product-id").value
    const orderId = document.getElementById("review-order-id").value
    const rating = document.querySelector('input[name="rating"]:checked').value
    const comment = document.getElementById("review-comment").value

    if (!rating) {
      showToast("Error", "Please select a rating.", "error")
      return
    }

    if (!comment) {
      showToast("Error", "Please write a review.", "error")
      return
    }

    // Submit review
    const reviewData = {
      rating: Number.parseInt(rating),
      comment,
    }

    await api.reviews.addReview(productId, reviewData)

    // Update order as reviewed
    const order = orders.find((o) => o._id === orderId)
    if (order) {
      order.reviewed = true
    }

    // Close modal
    closeAllModals()

    // Show success message
    showToast("Success", "Review submitted successfully!", "success")
  } catch (error) {
    console.error("Failed to submit review:", error)
    showToast("Error", "Failed to submit review. Please try again.", "error")
  }
}

// Show edit profile modal
function showEditProfileModal() {
  const editProfileModal = document.getElementById("edit-profile-modal")

  // Pre-fill form with current user data
  document.getElementById("edit-name").value = currentUser.name || ""
  document.getElementById("edit-phone").value = currentUser.phone || ""
  document.getElementById("edit-business-name").value = currentUser.businessName || ""
  document.getElementById("edit-gst").value = currentUser.gstNumber || ""
  document.getElementById("edit-business-type").value = currentUser.businessType || "grocery"
  document.getElementById("edit-street").value = currentUser.streetAddress || ""
  document.getElementById("edit-city").value = currentUser.city || ""
  document.getElementById("edit-state").value = currentUser.state || ""
  document.getElementById("edit-pincode").value = currentUser.pincode || ""

  // Show modal
  editProfileModal.classList.add("show")
}

// Show edit profile modal
function showEditProfileModal1() {
  const modalContent = `
        <div class="modal-header">
            <h2>Edit Profile</h2>
            <button class="close-modal">&times;</button>
        </div>
        <div class="modal-body">
            <form id="edit-profile-form">
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" name="name" value="${userProfile.name || ""}" required>
                </div>
                <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" value="${userProfile.phone || ""}">
                </div>
                <div class="form-group">
                    <label for="businessName">Business Name</label>
                    <input type="text" id="businessName" name="businessName" value="${userProfile.businessName || ""}">
                </div>
                <div class="form-group">
                    <label for="gstNumber">GST Number</label>
                    <input type="text" id="gstNumber" name="gstNumber" value="${userProfile.gstNumber || ""}">
                </div>
                <div class="form-group">
                    <label for="address">Address</label>
                    <textarea id="address" name="address">${userProfile.address || ""}</textarea>
                </div>
                <button type="submit" class="btn save-profile">Save Changes</button>
            </form>
        </div>
    `

  showModal(modalContent)

  // Add event listener for profile form
  const profileForm = document.getElementById("edit-profile-form")
  if (profileForm) {
    profileForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const formData = new FormData(profileForm)
      const profileData = Object.fromEntries(formData.entries())

      try {
        const response = await api.put("/users/profile", profileData)

        userProfile = response.data

        showAlert("Profile updated successfully", "success")

        closeModal()

        // Reload profile
        await loadProfile()
      } catch (error) {
        console.error("Failed to update profile:", error)
        showAlert("Failed to update profile. Please try again.", "error")
      }
    })
  }
}

// Update profile
async function updateProfile() {
  try {
    const name = document.getElementById("edit-name").value
    const phone = document.getElementById("edit-phone").value
    const businessName = document.getElementById("edit-business-name").value
    const gstNumber = document.getElementById("edit-gst").value
    const businessType = document.getElementById("edit-business-type").value
    const streetAddress = document.getElementById("edit-street").value
    const city = document.getElementById("edit-city").value
    const state = document.getElementById("edit-state").value
    const pincode = document.getElementById("edit-pincode").value

    // Update user data
    const userData = {
      name,
      phone,
      businessName,
      gstNumber,
      businessType,
      streetAddress,
      city,
      state,
      pincode,
    }

    // In a real app, this would be an API call
    // For now, we'll just update the current user object
    Object.assign(currentUser, userData)

    // Close modal
    closeAllModals()

    // Update UI
    updateUserInfo()

    // Show success message
    showToast("Success", "Profile updated successfully!", "success")
  } catch (error) {
    console.error("Failed to update profile:", error)
    showToast("Error", "Failed to update profile. Please try again.", "error")
  }
}

// Show change password modal
function showChangePasswordModal() {
  const changePasswordModal = document.getElementById("change-password-modal")

  // Clear form
  document.getElementById("current-password").value = ""
  document.getElementById("new-password").value = ""
  document.getElementById("confirm-password").value = ""

  // Show modal
  changePasswordModal.classList.add("show")
}

// Toggle notification read status
function toggleNotificationRead(notificationId) {
  const notification = notifications.find((n) => n.id === notificationId)

  if (!notification) return

  notification.read = !notification.read
  renderNotifications1()

  // In a real app, you would update this on the server
  // api.put(`/notifications/${notificationId}`, { read: notification.read });
}

// Update password
async function updatePassword() {
  try {
    const currentPassword = document.getElementById("current-password").value
    const newPassword = document.getElementById("new-password").value
    const confirmPassword = document.getElementById("confirm-password").value

    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast("Error", "Please fill in all fields.", "error")
      return
    }

    if (newPassword !== confirmPassword) {
      showToast("Error", "New passwords do not match.", "error")
      return
    }

    // In a real app, this would be an API call
    // For now, we'll just show a success message

    // Close modal
    closeAllModals()

    // Show success message
    showToast("Success", "Password updated successfully!", "success")
  } catch (error) {
    console.error("Failed to update password:", error)
    showToast("Error", "Failed to update password. Please try again.", "error")
  }
}

// Confirm delete account
function confirmDeleteAccount() {
  if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
    deleteAccount()
  }
}

// Show modal
function showModal(content) {
  // Create modal container if it doesn't exist
  let modalContainer = document.getElementById("modal-container")

  if (!modalContainer) {
    modalContainer = document.createElement("div")
    modalContainer.id = "modal-container"
    document.body.appendChild(modalContainer)
  }

  modalContainer.innerHTML = `
        <div class="modal">
            ${content}
        </div>
        <div class="modal-overlay"></div>
    `

  // Show modal
  setTimeout(() => {
    modalContainer.classList.add("show")
  }, 10)

  // Add event listeners
  const closeButtons = modalContainer.querySelectorAll(".close-modal")
  closeButtons.forEach((button) => {
    button.addEventListener("click", closeModal)
  })

  const overlay = modalContainer.querySelector(".modal-overlay")
  overlay.addEventListener("click", closeModal)
}

// Delete account
async function deleteAccount() {
  try {
    // In a real app, this would be an API call
    // For now, we'll just redirect to the home page

    showToast("Success", "Account deleted successfully!", "success")

    setTimeout(() => {
      logout()
    }, 2000)
  } catch (error) {
    console.error("Failed to delete account:", error)
    showToast("Error", "Failed to delete account. Please try again.", "error")
  }
}

// Close modal
function closeModal() {
  const modalContainer = document.getElementById("modal-container")

  if (!modalContainer) return

  modalContainer.classList.remove("show")

  setTimeout(() => {
    modalContainer.innerHTML = ""
  }, 300)
}

// Logout
async function logout() {
  try {
    await api.auth.logout()
    window.location.href = "index.html"
  } catch (error) {
    console.error("Failed to logout:", error)
    showToast("Error", "Failed to logout. Please try again.", "error")
  }
}

// Logout
async function logout1() {
  try {
    await api.get("/auth/logout")
    window.location.href = "/auth.html"
  } catch (error) {
    console.error("Logout failed:", error)
    showAlert("Failed to logout. Please try again.", "error")
  }
}

// Close all modals
function closeAllModals() {
  const modals = document.querySelectorAll(".modal")
  modals.forEach((modal) => {
    modal.classList.remove("show")
  })
}

// Show toast notification
function showToast(title, message, type = "info") {
  const toastContainer = document.getElementById("toast-container")

  if (!toastContainer) return

  const toast = document.createElement("div")
  toast.className = `toast toast-${type}`
  toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : type === "warning" ? "exclamation-triangle" : "info-circle"}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close">&times;</button>
    `

  toastContainer.appendChild(toast)

  // Show toast
  setTimeout(() => {
    toast.classList.add("show")
  }, 10)

  // Auto-hide toast after 5 seconds
  setTimeout(() => {
    toast.classList.remove("show")

    // Remove toast from DOM after animation
    setTimeout(() => {
      toastContainer.removeChild(toast)
    }, 300)
  }, 5000)

  // Close toast on click
  const closeBtn = toast.querySelector(".toast-close")
  closeBtn.addEventListener("click", () => {
    toast.classList.remove("show")

    // Remove toast from DOM after animation
    setTimeout(() => {
      toastContainer.removeChild(toast)
    }, 300)
  })
}

// Initialize the dashboard when the DOM is loaded
document.addEventListener("DOMContentLoaded", initDashboard)

