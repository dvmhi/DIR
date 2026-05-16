const themeButton = document.querySelector(".theme-toggle");
let theme = localStorage.getItem("bestauth-theme");

if (theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

if (themeButton) {
  themeButton.onclick = function () {
    let currentTheme = document.documentElement.getAttribute("data-theme");

    if (currentTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("bestauth-theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("bestauth-theme", "dark");
    }
  };
}


const cookieBanner = document.querySelector(".cookie-banner");
const cookieButtons = document.querySelectorAll("[data-cookie-choice]");

if (cookieBanner) {
  if (!localStorage.getItem("bestauth-cookie-choice")) {
    cookieBanner.hidden = false;
  }
}

cookieButtons.forEach(function (button) {
  button.onclick = function () {
    let choice = button.getAttribute("data-cookie-choice");

    if (!choice) {
      choice = "necessary";
    }

    localStorage.setItem("bestauth-cookie-choice", choice);

    if (cookieBanner) {
      cookieBanner.hidden = true;
    }
  };
});


const cartButton = document.querySelector("[data-add-subscription]");
const cartMessage = document.querySelector("#cart-message");

if (cartButton && cartMessage) {
  cartButton.onclick = function () {
    cartMessage.textContent = "Abo wurde zum Warenkorb hinzugefuegt. Der Checkout ist nur gemockt.";
    cartMessage.classList.remove("sr-only");
  };
}


const forms = document.querySelectorAll("form[data-demo-form]");

forms.forEach(function (form) {
  form.onsubmit = function (event) {
    event.preventDefault();

    const status = form.querySelector('[role="status"]');
    const requiredFields = form.querySelectorAll("[required]");
    let formIsValid = true;

    requiredFields.forEach(function (field) {
      if (field.value.trim() === "") {
        formIsValid = false;
        field.setAttribute("aria-invalid", "true");
      } else {
        field.removeAttribute("aria-invalid");
      }
    });

    if (status) {
      if (formIsValid) {
        status.textContent = "Danke. Das Formular wurde abgesendet.";
        status.className = "help-text";
      } else {
        status.textContent = "Bitte alle Pflichtfelder ausfuellen.";
        status.className = "form-error";
      }
    }
  };
});