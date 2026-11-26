
// Temporary hero database
// We will replace this with your actual database later.

const heroes = [
    {
        name: "Axe",
        image: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/axe.png",
        goodAgainst: ["Sniper", "Drow Ranger"],
        hardToFight: ["Viper", "Necrophos"],
        goodAllies: ["Crystal Maiden", "Dazzle"]
    },
    {
        name: "Anti-Mage",
        image: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/antimage.png",
        goodAgainst: ["Storm Spirit"],
        hardToFight: ["Axe"],
        goodAllies: ["Crystal Maiden"]
    },
    {
        name: "Crystal Maiden",
        image: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/crystal_maiden.png",
        goodAgainst: ["Anti-Mage"],
        hardToFight: ["Pudge"],
        goodAllies: ["Axe", "Dazzle"]
    },
    {
        name: "Dazzle",
        image: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/dazzle.png",
        goodAgainst: ["Axe"],
        hardToFight: ["Silencer"],
        goodAllies: ["Crystal Maiden"]
    },
    {
        name: "Drow Ranger",
        image: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/drow_ranger.png",
        goodAgainst: ["Crystal Maiden"],
        hardToFight: ["Axe"],
        goodAllies: ["Dazzle"]
    },
    {
        name: "Necrophos",
        image: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/necrolyte.png",
        goodAgainst: ["Axe"],
        hardToFight: ["Anti-Mage"],
        goodAllies: ["Dazzle"]
    },
    {
        name: "Sniper",
        image: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/sniper.png",
        goodAgainst: ["Crystal Maiden"],
        hardToFight: ["Axe"],
        goodAllies: ["Dazzle"]
    },
    {
        name: "Viper",
        image: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/viper.png",
        goodAgainst: ["Axe"],
        hardToFight: ["Sniper"],
        goodAllies: ["Crystal Maiden"]
    }
];


// Get HTML elements
const searchInput = document.getElementById("heroSearch");
const searchResults = document.getElementById("searchResults");

const selectedHero = document.getElementById("selectedHero");
const selectedHeroImage = document.getElementById("selectedHeroImage");
const selectedHeroName = document.getElementById("selectedHeroName");

const matchupSection = document.getElementById("matchupSection");

const goodAgainst = document.getElementById("goodAgainst");
const hardToFight = document.getElementById("hardToFight");
const goodAllies = document.getElementById("goodAllies");


// Search heroes as the user types
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


// Select a hero
function selectHero(hero) {
    searchInput.value = hero.name;

    searchResults.classList.remove("show");

    selectedHeroImage.src = hero.image;
    selectedHeroImage.alt = hero.name;
    selectedHeroName.textContent = hero.name;

    selectedHero.classList.remove("hidden");
    matchupSection.classList.remove("hidden");

    renderHeroList(goodAgainst, hero.goodAgainst);
    renderHeroList(hardToFight, hero.hardToFight);
    renderHeroList(goodAllies, hero.goodAllies);
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

    if (heroNames.length === 0) {
        container.textContent = "No data available";
    }
}


// Close dropdown when clicking outside the search area
document.addEventListener("click", function (event) {
    if (!event.target.closest(".search-wrapper")) {
        searchResults.classList.remove("show");
    }
});
