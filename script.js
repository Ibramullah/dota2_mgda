
let heroes = [];
let matchups = {};

// HTML elements
const searchInput = document.getElementById("heroSearch");
const searchResults = document.getElementById("searchResults");

const selectedHero = document.getElementById("selectedHero");
const selectedHeroImage = document.getElementById("selectedHeroImage");
const selectedHeroName = document.getElementById("selectedHeroName");

const matchupSection = document.getElementById("matchupSection");

const goodAgainst = document.getElementById("goodAgainst");
const hardToFight = document.getElementById("hardToFight");
const goodAllies = document.getElementById("goodAllies");


// Load both JSON databases
async function loadDatabase() {
    try {
        const [heroResponse, matchupResponse] = await Promise.all([
            fetch("data/heroes.json"),
            fetch("data/matchups.json")
        ]);

        if (!heroResponse.ok || !matchupResponse.ok) {
            throw new Error("Could not load database files.");
        }

        heroes = await heroResponse.json();
        matchups = await matchupResponse.json();

        console.log("Hero database loaded:", heroes.length);
        console.log("Matchup database loaded!");

    } catch (error) {
        console.error(error);
        alert("Could not load the database. Please refresh the page.");
    }
}


// Search heroes
searchInput.addEventListener("input", function () {
    const searchText = searchInput.value.trim().toLowerCase();

    searchResults.innerHTML = "";

    if (searchText === "") {
        searchResults.classList.remove("show");
        return;
    }

    const matchingHeroes = heroes.filter(hero =>
        hero.name.toLowerCase().includes(searchText)
    );

    if (matchingHeroes.length === 0) {
        searchResults.innerHTML =
            '<div class="search-result">No heroes found</div>';

        searchResults.classList.add("show");
        return;
    }

    matchingHeroes.forEach(hero => {
        const result = document.createElement("div");
        result.className = "search-result";

        const image = document.createElement("img");
        image.src = hero.image;
        image.alt = hero.name;

        const name = document.createElement("span");
        name.textContent = hero.name;

        result.appendChild(image);
        result.appendChild(name);

        result.addEventListener("click", function () {
            selectHero(hero);
        });

        searchResults.appendChild(result);
    });

    searchResults.classList.add("show");
});


// Select hero
function selectHero(hero) {
    searchInput.value = hero.name;

    searchResults.classList.remove("show");

    selectedHeroImage.src = hero.image;
    selectedHeroImage.alt = hero.name;
    selectedHeroName.textContent = hero.name;

    selectedHero.classList.remove("hidden");
    matchupSection.classList.remove("hidden");

    const heroData = matchups[hero.name];

    if (!heroData) {
        renderHeroList(goodAgainst, []);
        renderHeroList(hardToFight, []);
        renderHeroList(goodAllies, []);
        return;
    }

    renderHeroList(goodAgainst, heroData.goodAgainst || []);
    renderHeroList(hardToFight, heroData.hardToFight || []);
    renderHeroList(goodAllies, heroData.goodAllies || []);
}


// Display hero lists
function renderHeroList(container, heroNames) {
    container.innerHTML = "";

    heroNames.forEach(heroName => {
        const hero = heroes.find(item => item.name === heroName);

        if (!hero) return;

        const row = document.createElement("div");
        row.className = "hero-row";

        const image = document.createElement("img");
        image.src = hero.image;
        image.alt = hero.name;

        const name = document.createElement("span");
        name.textContent = hero.name;

        row.appendChild(image);
        row.appendChild(name);

        container.appendChild(row);
    });

    if (container.children.length === 0) {
        container.textContent = "No data available";
    }
}


// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
    if (!event.target.closest(".search-wrapper")) {
        searchResults.classList.remove("show");
    }
});


// Start website
loadDatabase();
