document.addEventListener("DOMContentLoaded", () => {
  // Sample product data (in a real app, this would come from a server)
  const products = [
    {
      id: 1,
      name: "Organic Tomatoes",
      category: "vegetables",
      price: 40,
      location: "punjab",
      image: "images/tomatoes.jpg",
      farmer: {
        name: "Ramesh Singh",
        image: "images/farmer1.jpg",
      },
      quantity: "500 kg",
      date: "June 15, 2023",
    },
    {
      id: 2,
      name: "Fresh Potatoes",
      category: "vegetables",
      price: 30,
      location: "haryana",
      image: "images/potatoes.jpg",
      farmer: {
        name: "Suresh Kumar",
        image: "images/farmer2.jpg",
      },
      quantity: "1000 kg",
      date: "June 14, 2023",
    },
    {
      id: 3,
      name: "Red Onions",
      category: "vegetables",
      price: 25,
      location: "punjab",
      image: "images/onions.jpg",
      farmer: {
        name: "Mahesh Sharma",
        image: "images/farmer3.jpg",
      },
      quantity: "800 kg",
      date: "June 13, 2023",
    },
    {
      id: 4,
      name: "Bell Peppers",
      category: "vegetables",
      price: 60,
      location: "up",
      image: "images/capsicum.jpg",
      farmer: {
        name: "Rajesh Patel",
        image: "images/farmer4.jpg",
      },
      quantity: "300 kg",
      date: "June 12, 2023",
    },
    {
      id: 5,
      name: "Fresh Carrots",
      category: "vegetables",
      price: 35,
      location: "mp",
      image: "images/carrots.jpg",
      farmer: {
        name: "Dinesh Yadav",
        image: "images/farmer5.jpg",
      },
      quantity: "600 kg",
      date: "June 11, 2023",
    },
    {
      id: 6,
      name: "Alphonso Mangoes",
      category: "fruits",
      price: 120,
      location: "maharashtra",
      image: "images/mangoes.jpg",
      farmer: {
        name: "Prakash Desai",
        image: "images/farmer6.jpg",
      },
      quantity: "400 kg",
      date: "June 10, 2023",
    },
  ]

  // Function to render products
  function renderProducts(productsToRender) {
    const productsContainer = document.getElementById("products-container")
    productsContainer.innerHTML = ""

    if (productsToRender.length === 0) {
      productsContainer.innerHTML = '<div class="no-products">No products found matching your criteria.</div>'
      return
    }

    productsToRender.forEach((product) => {
      const productCard = document.createElement("div")
      productCard.className = "product-card"

      productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">₹${product.price} per kg</div>
                    <div class="product-meta">
                        <div>${product.location.charAt(0).toUpperCase() + product.location.slice(1)}</div>
                        <div>Available: ${product.quantity}</div>
                    </div>
                    <div class="product-farmer">
                        <img src="${product.farmer.image}" alt="${product.farmer.name}" class="farmer-image">
                        <div class="farmer-name">${product.farmer.name}</div>
                    </div>
                    <div class="product-actions">
                        <button class="view-btn" onclick="location.href='product-details.html?id=${product.id}'">View Details</button>
                        <button class="contact-btn">Contact Farmer</button>
                    </div>
                </div>
            `

      productsContainer.appendChild(productCard)
    })
  }

  // Initial render
  renderProducts(products)

  // Filter functionality
  const searchInput = document.getElementById("search-input")
  const categoryFilter = document.getElementById("category-filter")
  const locationFilter = document.getElementById("location-filter")
  const priceFilter = document.getElementById("price-filter")
  const sortFilter = document.getElementById("sort-filter")

  function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase()
    const category = categoryFilter.value
    const location = locationFilter.value
    const priceRange = priceFilter.value
    const sortBy = sortFilter.value

    const filteredProducts = products.filter((product) => {
      // Search term filter
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm)) {
        return false
      }

      // Category filter
      if (category && product.category !== category) {
        return false
      }

      // Location filter
      if (location && product.location !== location) {
        return false
      }

      // Price range filter
      if (priceRange) {
        const [min, max] = priceRange.split("-")
        if (min && max && (product.price < Number.parseInt(min) || product.price > Number.parseInt(max))) {
          return false
        } else if (min && !max && product.price < Number.parseInt(min)) {
          return false
        }
      }

      return true
    })

    // Sort products
    switch (sortBy) {
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case "newest":
        filteredProducts.sort((a, b) => new Date(b.date) - new Date(a.date))
        break
      case "popular":
        // In a real app, this would sort by popularity metrics
        // For demo, we'll just use a random sort
        filteredProducts.sort(() => Math.random() - 0.5)
        break
    }

    renderProducts(filteredProducts)
  }

  // Add event listeners to filters
  searchInput.addEventListener("input", applyFilters)
  categoryFilter.addEventListener("change", applyFilters)
  locationFilter.addEventListener("change", applyFilters)
  priceFilter.addEventListener("change", applyFilters)
  sortFilter.addEventListener("change", applyFilters)

  // Pagination (simplified for demo)
  const paginationButtons = document.querySelectorAll(".pagination button")
  paginationButtons.forEach((button) => {
    button.addEventListener("click", function () {
      paginationButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")
      // In a real app, this would load the appropriate page of products
    })
  })
})

