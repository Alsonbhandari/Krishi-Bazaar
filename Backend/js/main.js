// Mobile menu toggle
function showMenu() {
  const navLinks = document.getElementById("navLinks")
  navLinks.style.right = "0"
}

function hideMenu() {
  const navLinks = document.getElementById("navLinks")
  navLinks.style.right = "-200px"
}

// Scroll to top button
document.addEventListener("DOMContentLoaded", () => {
  // Check if scroll to top button exists
  const scrollTopBtn = document.getElementById("scrollTopBtn")

  if (scrollTopBtn) {
    // When the user scrolls down 300px from the top of the document, show the button
    window.onscroll = () => {
      if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollTopBtn.style.display = "block"
      } else {
        scrollTopBtn.style.display = "none"
      }
    }

    // When the user clicks on the button, scroll to the top of the document
    scrollTopBtn.addEventListener("click", () => {
      document.body.scrollTop = 0 // For Safari
      document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
    })
  }

  // Initialize any sliders if they exist
  const productSliders = document.querySelectorAll(".products-slider")
  if (productSliders.length > 0) {
    // Simple horizontal scroll for touch devices
    productSliders.forEach((slider) => {
      let isDown = false
      let startX
      let scrollLeft

      slider.addEventListener("mousedown", (e) => {
        isDown = true
        slider.style.cursor = "grabbing"
        startX = e.pageX - slider.offsetLeft
        scrollLeft = slider.scrollLeft
      })

      slider.addEventListener("mouseleave", () => {
        isDown = false
        slider.style.cursor = "grab"
      })

      slider.addEventListener("mouseup", () => {
        isDown = false
        slider.style.cursor = "grab"
      })

      slider.addEventListener("mousemove", (e) => {
        if (!isDown) return
        e.preventDefault()
        const x = e.pageX - slider.offsetLeft
        const walk = (x - startX) * 2 // Scroll speed
        slider.scrollLeft = scrollLeft - walk
      })
    })
  }
})

