function setActiveNavLink() {
  const navLinks = document.querySelectorAll(".header__nav--menu-link");
  const currentPage = window.location.pathname.split("/").pop();

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active-link");
    }
  });
}

function setUpMenuBurger() {
  const menuBurgerButton = document.getElementById("menu-toggle");
  const mobilePanel = document.querySelector(".header__mobile-panel");

  menuBurgerButton.addEventListener("click", () => {
    mobilePanel.classList.toggle("open");
    menuBurgerButton.classList.toggle("change");
  });
}
