"use strict";
// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};
// sidebar toggle
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
  });
}
// contact form validation
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
if (form && formInputs && formBtn) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const data = {
    fullname: form.fullname.value,
    email: form.email.value,
    message: form.message.value,
  };
  fetch(
    "https://script.google.com/macros/s/AKfycbxrS_Z3X_x2p27QIJbqkYrn96evgNJiLITcpRbubdr2tOcBNvTaWJmm96sT8sOB8UoE/exec",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  )
    .then((res) => res.json())
    .then((response) => {
      const status = document.getElementById("formStatus");
      status.textContent = "Message sent successfully!";
      form.reset();
      formBtn.setAttribute("disabled", "");
    })
    .catch((err) => {
      console.error(err);
      const status = document.getElementById("formStatus");
      status.style.color = "red";
      status.textContent = "Error sending message. Please try again.";
    });
});
// page navigation
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
if (navigationLinks && pages) {
  navigationLinks.forEach((navLink) => {
    navLink.addEventListener("click", function () {
      pages.forEach((page) => {
        if (this.innerHTML.toLowerCase() === page.dataset.page) {
          page.classList.add("active");
          navigationLinks.forEach((link) => link.classList.remove("active"));
          this.classList.add("active");
          window.scrollTo(0, 0);
        } else {
          page.classList.remove("active");
        }
      });
    });
  });
}
