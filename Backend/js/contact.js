document.addEventListener("DOMContentLoaded", () => {
    // Contact form submission
    const contactForm = document.getElementById("contactForm")
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Get form values
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const phone = document.getElementById("phone").value
        const subject = document.getElementById("subject").value
        const message = document.getElementById("message").value
  
        // In a real application, this would send the data to a server
        // For now, we'll just show an alert
        alert(`Thank you, ${name}! Your message has been sent. We'll get back to you soon.`)
  
        // Reset the form
        contactForm.reset()
      })
    }
  
    // FAQ toggle functionality
    const faqItems = document.querySelectorAll(".faq-item")
  
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question")
  
      question.addEventListener("click", () => {
        // Toggle active class on the clicked item
        item.classList.toggle("active")
  
        // Close other items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active")
          }
        })
      })
    })
  })
  
  