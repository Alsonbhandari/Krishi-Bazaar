document.addEventListener("DOMContentLoaded", () => {
  // Tab switching
  const loginTab = document.getElementById("login-tab")
  const registerTab = document.getElementById("register-tab")
  const loginFormTab = document.getElementById("login-form")
  const registerFormTab = document.getElementById("register-form")

  loginTab.addEventListener("click", () => {
    loginTab.classList.add("active")
    registerTab.classList.remove("active")
    loginFormTab.classList.add("active")
    registerFormTab.classList.remove("active")
  })

  registerTab.addEventListener("click", () => {
    registerTab.classList.add("active")
    loginTab.classList.remove("active")
    registerFormTab.classList.add("active")
    loginFormTab.classList.remove("active")
  })

  // Check URL parameters for pre-selecting user type
  const urlParams = new URLSearchParams(window.location.search)
  const userType = urlParams.get("type")

  if (userType) {
    // Switch to register tab
    registerTab.click()

    // Select the appropriate user type radio button
    const userTypeRadios = document.querySelectorAll('input[name="user-type"]')
    userTypeRadios.forEach((radio) => {
      if (radio.value === userType) {
        radio.checked = true
      }
    })
  }

  // Login form submission
  const loginForm = document.getElementById("loginForm")
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const email = document.getElementById("login-email").value
    const password = document.getElementById("login-password").value

    // Simple validation
    if (!email || !password) {
      alert("Please fill in all fields")
      return
    }

    // In a real application, you would send this data to a server for authentication
    // For demo purposes, we'll simulate a successful login

    // Store login status in localStorage
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("userEmail", email)

    // Determine user type (in a real app, this would come from the server)
    // For demo, we'll check the email to determine user type
    if (email.includes("farmer")) {
      localStorage.setItem("userType", "farmer")
      window.location.href = "farmer-dashboard.html"
    } else {
      localStorage.setItem("userType", "retailer")
      window.location.href = "retailer-dashboard.html"
    }
  })

  // Register form submission
  const registerForm = document.getElementById("registerForm")
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const userType = document.querySelector('input[name="user-type"]:checked').value
    const name = document.getElementById("register-name").value
    const email = document.getElementById("register-email").value
    const phone = document.getElementById("register-phone").value
    const location = document.getElementById("register-location").value
    const password = document.getElementById("register-password").value
    const confirmPassword = document.getElementById("register-confirm-password").value

    // Simple validation
    if (!name || !email || !phone || !location || !password || !confirmPassword) {
      alert("Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    // In a real application, you would send this data to a server for registration
    // For demo purposes, we'll simulate a successful registration

    // Store user data in localStorage
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("userName", name)
    localStorage.setItem("userEmail", email)
    localStorage.setItem("userPhone", phone)
    localStorage.setItem("userLocation", location)
    localStorage.setItem("userType", userType)

    // Redirect to appropriate dashboard
    if (userType === "farmer") {
      window.location.href = "farmer-dashboard.html"
    } else {
      window.location.href = "retailer-dashboard.html"
    }
  })
})

