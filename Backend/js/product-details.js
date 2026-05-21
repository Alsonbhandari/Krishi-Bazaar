document.addEventListener("DOMContentLoaded", () => {
  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search)
  const productId = urlParams.get("id")

  // In a real app, you would fetch the product details from a server
  // For demo purposes, we'll use hardcoded data

  // Thumbnail gallery functionality
  const thumbnails = document.querySelectorAll(".thumbnail")
  const mainImage = document.getElementById("main-product-image")

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      // Update active thumbnail
      thumbnails.forEach((thumb) => thumb.classList.remove("active"))
      this.classList.add("active")

      // Update main image
      const imgSrc = this.getAttribute("data-img")
      mainImage.src = imgSrc
    })
  })

  // Quantity selector functionality
  const decreaseBtn = document.getElementById("decrease-quantity")
  const increaseBtn = document.getElementById("increase-quantity")
  const quantityInput = document.getElementById("quantity")

  decreaseBtn.addEventListener("click", () => {
    const quantity = Number.parseInt(quantityInput.value)
    if (quantity > Number.parseInt(quantityInput.min)) {
      quantityInput.value = quantity - 1
    }
  })

  increaseBtn.addEventListener("click", () => {
    const quantity = Number.parseInt(quantityInput.value)
    if (quantity < Number.parseInt(quantityInput.max)) {
      quantityInput.value = quantity + 1
    }
  })

  // Tab switching functionality
  const tabs = document.querySelectorAll(".tab")
  const tabContents = document.querySelectorAll(".tab-content")

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Update active tab
      tabs.forEach((t) => t.classList.remove("active"))
      this.classList.add("active")

      // Show corresponding tab content
      const tabId = this.getAttribute("data-tab")
      tabContents.forEach((content) => content.classList.remove("active"))
      document.getElementById(`${tabId}-content`).classList.add("active")
    })
  })

  // Buy now button functionality
  const buyNowBtn = document.querySelector(".buy-now")
  buyNowBtn.addEventListener("click", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")

    if (isLoggedIn === "true") {
      // In a real app, this would add the product to cart or initiate checkout
      alert("Proceeding to checkout...")
    } else {
      // Redirect to login page
      window.location.href = "auth.html"
    }
  })

  // Contact seller button functionality
  const contactSellerBtn = document.querySelector(".contact-seller")
  contactSellerBtn.addEventListener("click", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")

    if (isLoggedIn === "true") {
      // In a real app, this would open a chat or contact form
      alert("Opening chat with seller...")
    } else {
      // Redirect to login page
      window.location.href = "auth.html"
    }
  })
})

