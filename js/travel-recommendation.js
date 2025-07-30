let recommendation;

fetch("data/travel-recommendation-api.json")
  .then((response) => response.json())
  .then((data) => {
    recommendation = data;
  })
  .catch((error) => console.error("Error fetching travel data: ", error));

const search = () => {
  const input = document.getElementById("search-input");
  const query = input.value.toLowerCase().trim();

  if (!query.length) return;

  let results = [];
  if (query.includes("beach")) {
    results = recommendation.beaches;
  } else if (query.includes("temple")) {
    results = recommendation.temples;
  } else if (query.includes("country")) {
    results = recommendation.countries.map((country) => country.cities[0]);
  } else {
    results = recommendation.countries.flatMap((country) =>
      country.cities.filter((city) => city.name.toLowerCase().includes(query))
    );
  }

  const resultsContainer = document.getElementById("results-container");

  let items = "";

  if (results.length) {
    results.forEach((item) => {
      items += `
      <div class="result-item">
        <span class="result-img">
          <img src="${item.imageUrl}" alt="${item.name}" />
        </span>
        <p class="result-title">${item.name}</p>
        <p class="result-desc">${item.description}</p>
        <a href="#">More...</a>
      </div>
    `;
    });
  } else {
    items = `
    <div class="result-item">
      <p class="nothingFound">Nothing found for your request <b>${query}</b></p>
    </div>
  `;
  }

  resultsContainer.innerHTML = items;

  console.log("End function");
};

const clearResults = () => {
  const input = document.getElementById("search-input");
  input.value = "";

  const resultsContainer = document.getElementById("results-container");
  resultsContainer.innerHTML = "";
};
