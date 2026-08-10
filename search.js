// ==============================================
// search.js
// Søker gjennom searchData.js
// ==============================================

// Hent HTML-elementene
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

// Finnes søkefeltet på denne siden?
if (searchInput && searchResults) {

    // Søker mens brukeren skriver
    searchInput.addEventListener("input", function () {

        const text = this.value.trim().toLowerCase();

        // Tøm gamle resultater
        searchResults.innerHTML = "";

        // Hvis søkefeltet er tomt
        if (text.length === 0) {
            return;
        }

        // Finn alle treff
        const matches = searchData.filter(item => {

            return (
                item.title.toLowerCase().includes(text) ||
                item.keywords.toLowerCase().includes(text)
            );

        });

        // Ingen treff
        if (matches.length === 0) {

            searchResults.innerHTML = `
                <div class="result">
                    Ingen treff.
                </div>
            `;

            return;
        }

        // Vis maks 10 treff
        matches.slice(0, 10).forEach(item => {

            const div = document.createElement("div");
            div.className = "result";

            const link = document.createElement("a");

            // Har elementet et anchor?
            if (item.anchor !== "") {
                link.href = `${item.page}#${item.anchor}`;
            } else {
                link.href = item.page;
            }

            link.textContent = item.title;

            div.appendChild(link);

            searchResults.appendChild(div);

        });

    });

    // Lukk søkeresultat når man klikker utenfor
    document.addEventListener("click", function (event) {

        if (!event.target.closest(".search-box")) {

            searchResults.innerHTML = "";

        }

    });

    // Ikke lukk når man klikker inne i søkeboksen
    searchInput.addEventListener("click", function (event) {

        event.stopPropagation();

    });

}