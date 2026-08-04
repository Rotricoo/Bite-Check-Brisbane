const brisbaneTime = new Intl.DateTimeFormat("en-AU", {
  timeZone: "Australia/Brisbane",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

const headerTimer = document.getElementById("weather--time");

function updateBrisbaneTime() {
  const BrisbaneActualTime = new Date();

  brisbaneTime.format(BrisbaneActualTime);

  headerTimer.textContent = brisbaneTime;
}

setInterval(updateBrisbaneTime, 1000);

updateBrisbaneTime();
