async function loadHeader() {
  const headerPlaceholder = document.getElementById("header-placeholder");

  async function updateHeader() {
    const headerResponse = await fetch("./partials/header.html");
    const headerHtml = await headerResponse.text();

    headerPlaceholder.innerHTML = headerHtml;
  }

  await updateHeader();
}

async function loadFooter() {
  const footerPlaceholder = document.getElementById("footer-placeholder");
  async function updateFooter() {
    const footerResponse = await fetch("./partials/footer.html");
    const footerHtml = await footerResponse.text();

    footerPlaceholder.innerHTML = footerHtml;
  }

  await updateFooter();
}

async function initPartials() {
  await loadHeader();
  loadWeatherClock();
  setActiveNavLink();
  setUpMenuBurger();
  await loadFooter();
}

initPartials();
