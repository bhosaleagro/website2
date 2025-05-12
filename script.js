document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
    })
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        // Close mobile menu if open
        if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden")
        }

        // Scroll to target
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for fixed header
          behavior: "smooth",
        })

        // Update active nav link
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.remove("active")
        })
        this.classList.add("active")
      }
    })
  })

  // Highlight active nav link on scroll
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY

    document.querySelectorAll("section[id]").forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active")
          }
        })
      }
    })
  })

  // Product Slider
  const productSlider = document.getElementById("product-slider")
  const productDots = document.querySelectorAll(".slider-dot")
  const prevButton = document.getElementById("prev-product")
  const nextButton = document.getElementById("next-product")

  if (productSlider && productDots.length > 0) {
    // Set up dots click handlers
    productDots.forEach((dot) => {
      dot.addEventListener("click", function () {
        const index = Number.parseInt(this.getAttribute("data-index"))
        scrollToSlide(index)
      })
    })

    // Set up navigation buttons
    if (prevButton && nextButton) {
      prevButton.addEventListener("click", () => {
        const currentIndex = getCurrentSlideIndex()
        const prevIndex = Math.max(0, currentIndex - 1)
        scrollToSlide(prevIndex)
      })

      nextButton.addEventListener("click", () => {
        const currentIndex = getCurrentSlideIndex()
        const nextIndex = Math.min(productDots.length - 1, currentIndex + 1)
        scrollToSlide(nextIndex)
      })
    }

    // Handle scroll events to update dots
    productSlider.addEventListener("scroll", () => {
      const currentIndex = getCurrentSlideIndex()
      updateDots(currentIndex)
    })

    function getCurrentSlideIndex() {
      if (!productSlider) return 0
      const slideWidth = productSlider.clientWidth
      const scrollPosition = productSlider.scrollLeft
      return Math.round(scrollPosition / slideWidth)
    }

    function scrollToSlide(index) {
      if (!productSlider) return
      const slideWidth = productSlider.clientWidth
      productSlider.scrollTo({
        left: slideWidth * index,
        behavior: "smooth",
      })
      updateDots(index)
    }

    function updateDots(activeIndex) {
      productDots.forEach((dot, index) => {
        if (index === activeIndex) {
          dot.classList.add("active")
        } else {
          dot.classList.remove("active")
        }
      })
    }
  }

  // Testimonial slider
  const testimonialSlider = document.getElementById("testimonial-slider")
  const testimonialDots = document.querySelectorAll(".testimonial-dot")

  if (testimonialSlider && testimonialDots.length > 0) {
    testimonialDots.forEach((dot) => {
      dot.addEventListener("click", function () {
        const index = this.getAttribute("data-index")
        const slideWidth = testimonialSlider.querySelector(".testimonial-slide").offsetWidth

        testimonialSlider.scrollTo({
          left: slideWidth * index,
          behavior: "smooth",
        })

        testimonialDots.forEach((d) => d.classList.remove("bg-green-600"))
        testimonialDots.forEach((d) => d.classList.add("bg-gray-400"))
        this.classList.remove("bg-gray-400")
        this.classList.add("bg-green-600")
      })
    })

    // Update dots on scroll
    testimonialSlider.addEventListener("scroll", () => {
      const slideWidth = testimonialSlider.querySelector(".testimonial-slide").offsetWidth
      const scrollPosition = testimonialSlider.scrollLeft
      const activeIndex = Math.round(scrollPosition / slideWidth)

      testimonialDots.forEach((d) => d.classList.remove("bg-green-600"))
      testimonialDots.forEach((d) => d.classList.add("bg-gray-400"))

      if (testimonialDots[activeIndex]) {
        testimonialDots[activeIndex].classList.remove("bg-gray-400")
        testimonialDots[activeIndex].classList.add("bg-green-600")
      }
    })
  }

  // Quantity controls for product display
  const decreaseQtyDisplay = document.getElementById("decrease-qty-display")
  const increaseQtyDisplay = document.getElementById("increase-qty-display")
  const qtyDisplay = document.getElementById("qty-display")

  if (decreaseQtyDisplay && increaseQtyDisplay && qtyDisplay) {
    decreaseQtyDisplay.addEventListener("click", () => {
      let qty = Number.parseInt(qtyDisplay.textContent)
      if (qty > 1) {
        qty--
        qtyDisplay.textContent = qty
      }
    })

    increaseQtyDisplay.addEventListener("click", () => {
      let qty = Number.parseInt(qtyDisplay.textContent)
      qty++
      qtyDisplay.textContent = qty
    })
  }

  // Quantity controls for mango pulp
  const decreasePulpQty = document.getElementById("decrease-pulp-qty")
  const increasePulpQty = document.getElementById("increase-pulp-qty")
  const pulpQty = document.getElementById("pulp-qty")

  if (decreasePulpQty && increasePulpQty && pulpQty) {
    decreasePulpQty.addEventListener("click", () => {
      let qty = Number.parseInt(pulpQty.textContent)
      if (qty > 1) {
        qty--
        pulpQty.textContent = qty
      }
    })

    increasePulpQty.addEventListener("click", () => {
      let qty = Number.parseInt(pulpQty.textContent)
      qty++
      pulpQty.textContent = qty
    })
  }

  // Order form product selection and quantity controls
  const productSelect = document.getElementById("product-select")
  const decreaseQty = document.getElementById("decrease-qty")
  const increaseQty = document.getElementById("increase-qty")
  const quantityInput = document.getElementById("quantity")
  const unitLabel = document.getElementById("unit-label")
  const summaryProduct = document.getElementById("summary-product")
  const summaryProductPrice = document.getElementById("summary-product-price")
  const summaryTotal = document.getElementById("summary-total")
  const deliveryCharges = document.getElementById("delivery-charges")

  // Product prices
  const prices = {
    mangoes: 600,
    pulp: 400,
  }

  // Product units
  const units = {
    mangoes: "dozen",
    pulp: "kg",
  }

  if (productSelect && decreaseQty && increaseQty && quantityInput) {
    const updateSummary = () => {
      const product = productSelect.value
      const qty = Number.parseInt(quantityInput.value)
      const pricePerUnit = prices[product]
      const unit = units[product]
      const delivery = 100

      // Update unit label
      if (unitLabel) {
        unitLabel.textContent = unit
      }

      if (summaryProduct) {
        const productName = product === "mangoes" ? "Alphonso Mangoes" : "Alphonso Mango Pulp"
        summaryProduct.textContent = `${productName} (${qty} ${unit})`
      }

      if (summaryProductPrice) {
        const productTotal = qty * pricePerUnit
        summaryProductPrice.textContent = `₹${productTotal}`
      }

      if (summaryTotal && deliveryCharges) {
        const productTotal = qty * pricePerUnit
        const deliveryFee = Number.parseInt(deliveryCharges.textContent.replace("₹", ""))
        summaryTotal.textContent = `₹${productTotal + deliveryFee}`
      }
    }

    // Update when product changes
    productSelect.addEventListener("change", updateSummary)

    decreaseQty.addEventListener("click", () => {
      let qty = Number.parseInt(quantityInput.value)
      if (qty > 1) {
        qty--
        quantityInput.value = qty
        updateSummary()
      }
    })

    increaseQty.addEventListener("click", () => {
      let qty = Number.parseInt(quantityInput.value)
      qty++
      quantityInput.value = qty
      updateSummary()
    })

    // Initialize summary
    updateSummary()
  }

  // Order form submission
  const orderForm = document.getElementById("order-form")

  if (orderForm) {
    orderForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const product = document.getElementById("product-select").value
      const productName = product === "mangoes" ? "Alphonso Mangoes" : "Alphonso Mango Pulp"
      const unit = units[product]
      const name = document.getElementById("name").value
      const phone = document.getElementById("phone").value
      const email = document.getElementById("email").value
      const address = document.getElementById("address").value
      const notes = document.getElementById("notes").value
      const quantity = document.getElementById("quantity").value
      const total = document.getElementById("summary-total").textContent

      // Construct WhatsApp message
      let message = `*New Order from Bhosale Agro Website*%0A%0A`
      message += `*Product:* ${productName}%0A`
      message += `*Quantity:* ${quantity} ${unit}%0A`
      message += `*Total:* ${total}%0A%0A`
      message += `*Customer Details:*%0A`
      message += `Name: ${name}%0A`
      message += `Phone: ${phone}%0A`
      if (email) message += `Email: ${email}%0A`
      message += `Address: ${address}%0A`
      if (notes) message += `Notes: ${notes}%0A`

      // Open WhatsApp with pre-filled message
      window.open(`https://wa.me/919004030525?text=${message}`, "_blank")
    })
  }

  // Contact form submission
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const name = document.getElementById("contact-name").value
      const phone = document.getElementById("contact-phone").value
      const email = document.getElementById("contact-email").value
      const subject = document.getElementById("contact-subject").value
      const message = document.getElementById("contact-message").value

      // Construct WhatsApp message
      let whatsappMessage = `*New Contact from Bhosale Agro Website*%0A%0A`
      whatsappMessage += `*Name:* ${name}%0A`
      whatsappMessage += `*Phone:* ${phone}%0A`
      if (email) whatsappMessage += `*Email:* ${email}%0A`
      if (subject) whatsappMessage += `*Subject:* ${subject}%0A`
      whatsappMessage += `*Message:* ${message}%0A`

      // Open WhatsApp with pre-filled message
      window.open(`https://wa.me/919004030525?text=${whatsappMessage}`, "_blank")
    })
  }

  // Animation on scroll
  const animatedElements = document.querySelectorAll(".animate-on-scroll")

  function checkIfInView() {
    const windowHeight = window.innerHeight
    const windowTopPosition = window.scrollY
    const windowBottomPosition = windowTopPosition + windowHeight

    animatedElements.forEach((element) => {
      const elementHeight = element.offsetHeight
      const elementTopPosition = element.offsetTop
      const elementBottomPosition = elementTopPosition + elementHeight

      // Check if element is in viewport
      if (elementBottomPosition >= windowTopPosition && elementTopPosition <= windowBottomPosition) {
        element.classList.add("visible")
      }
    })
  }

  // Run once on load
  checkIfInView()

  // Run on scroll
  window.addEventListener("scroll", checkIfInView)

  // Enhanced hover effects for cards
  const cards = document.querySelectorAll(".card-natural")
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)"
      this.style.boxShadow = "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
      this.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)"
    })
  })

  // Video container animation
  const videoContainer = document.querySelector(".card-natural iframe")
  if (videoContainer && videoContainer.parentNode && videoContainer.parentNode.parentNode) {
    const container = videoContainer.parentNode.parentNode
    container.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)"
      this.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.15), 0 10px 15px rgba(0, 0, 0, 0.1)"
      this.style.transition = "all 0.3s ease"
    })

    container.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
      this.style.boxShadow = "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)"
    })
  }
})
