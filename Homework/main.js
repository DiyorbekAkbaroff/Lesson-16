const countriesContainer = document.getElementById("countries-container");
const regionFilter = document.getElementById("region-filter");
const searchInput = document.getElementById("search-input");
const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;

let allCountries = [];

const savedTheme = localStorage.getItem("theme") || "light";
root.setAttribute("data-theme", savedTheme);
themeToggle.textContent = savedTheme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";

themeToggle.addEventListener("click", () => {
  const newTheme = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  root.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  themeToggle.textContent = newTheme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
});

fetch("https://restcountries.com/v3.1/all")
  .then(res => res.json())
  .then(data => {
    allCountries = data;
    renderCountries(allCountries);
  });

function renderCountries(countries) {
  countriesContainer.innerHTML = "";
  countries.forEach(country => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${country.flags.png}" alt="${country.name.common} flag">
      <div class="card-body">
        <h2>${country.name.common}</h2>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Capital:</strong> ${country.capital?.[0] || "N/A"}</p>
      </div>
    `;

    countriesContainer.appendChild(card);
  });
}

regionFilter.addEventListener("change", () => {
  const region = regionFilter.value;
  const filtered = region ? allCountries.filter(c => c.region === region) : allCountries;
  renderCountries(filtered);
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = allCountries.filter(country => 
    country.name.common.toLowerCase().includes(query)
  );
  renderCountries(filtered);
});