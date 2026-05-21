document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in as a farmer
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  const userType = localStorage.getItem("userType")

  if (isLoggedIn !== "true" || userType !== "farmer") {
    // Redirect to login page
    window.location.href = "auth.html?type=farmer"
  }

  // Add product form toggle
  const addProductBtn = document.getElementById("add-product-btn")
  const addProductForm = document.getElementById("add-product-form")
  const cancelAddProductBtn = document.getElementById("cancel-add-product")

  addProductBtn.addEventListener("click", () => {
    addProductForm.style.display = "block"
    // Scroll to form
    addProductForm.scrollIntoView({ behavior: "smooth" })
  })

  cancelAddProductBtn.addEventListener("click", () => {
    addProductForm.style.display = "none"
  })

  // Image upload functionality
  const imageUpload = document.getElementById("image-upload")
  const imageInput = document.getElementById("product-images")

  imageUpload.addEventListener("click", () => {
    imageInput.click()
  })

  imageInput.addEventListener("change", function () {
    // In a real app, this would handle file uploads
    if (this.files.length > 0) {
      alert(`Selected ${this.files.length} files for upload`)
    }
  })

  // Product form submission
  const productForm = document.getElementById("productForm")
  productForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const productName = document.getElementById("product-name").value
    const productCategory = document.getElementById("product-category").value
    const productPrice = document.getElementById("product-price").value
    const productQuantity = document.getElementById("product-quantity").value
    const productDescription = document.getElementById("product-description").value

    // In a real app, this would send the data to a server
    alert(`Product "${productName}" added successfully!`)

    // Reset form and hide it
    productForm.reset()
    addProductForm.style.display = "none"
  })

  // Analytics button functionality
  const viewAnalyticsBtn = document.getElementById("view-analytics-btn")
  viewAnalyticsBtn.addEventListener("click", () => {
    // In a real app, this would navigate to an analytics page
    alert("Navigating to analytics dashboard...")
  })

  // Product action buttons functionality
  const editButtons = document.querySelectorAll(".product-actions .fa-edit")
  const deleteButtons = document.querySelectorAll(".product-actions .fa-trash")

  editButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productItem = this.closest(".product-item")
      const productName = productItem.querySelector(".product-name").textContent

      // In a real app, this would open an edit form with the product details
      alert(`Editing product: ${productName}`)
    })
  })

  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productItem = this.closest(".product-item")
      const productName = productItem.querySelector(".product-name").textContent

      // Confirm deletion
      if (confirm(`Are you sure you want to delete "${productName}"?`)) {
        // In a real app, this would send a delete request to the server
        productItem.remove()
        alert(`Product "${productName}" deleted successfully!`)
      }
    })
  })

  // Order action buttons functionality
  const orderActionButtons = document.querySelectorAll(".recent-orders .action-btn")
  orderActionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const orderRow = this.closest("tr")
      const orderId = orderRow.querySelector("td:first-child").textContent

      // In a real app, this would show a dropdown with actions
      alert(`Managing order: ${orderId}`)
    })
  })
})

