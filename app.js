// ==========================================================
// TEAM SØR - app.js
// ==========================================================

console.log("app.js loaded");

// ----------------------------------------------------------
// HENT ANSATTE FRA FIRESTORE
// ----------------------------------------------------------

import { hentAnsatte } from "./ansatteFirestore.js";


// ==========================================================
// TREKKSPILL
// ==========================================================

function toggleAccordion(button) {

    // Finn tilhørende item
    const item = button.parentElement;

    // Finn svarfeltet
    const answer = item.querySelector(".answer");

    if (!answer) {
        console.warn("Fant ikke .answer for trekkspill:", button);
        return;
    }

    // ------------------------------------------------------
    // Lukk alle andre svar
    // ------------------------------------------------------

    document.querySelectorAll(".answer").forEach(element => {

        if (element !== answer) {
            element.classList.remove("open");
        }

    });

    // ------------------------------------------------------
    // Fjern rotasjon fra alle andre piler
    // ------------------------------------------------------

    document.querySelectorAll(".icon").forEach(icon => {

        if (icon !== button.querySelector(".icon")) {
            icon.classList.remove("rotate");
        }

    });

    // ------------------------------------------------------
    // Åpne / lukk valgt trekkspill
    // ------------------------------------------------------

    answer.classList.toggle("open");

    // ------------------------------------------------------
    // Roter pil
    // ------------------------------------------------------

    const icon = button.querySelector(".icon");

    if (icon) {
        icon.classList.toggle("rotate");
    }

}


// ----------------------------------------------------------
// Aktiver alle trekkspillknapper
// ----------------------------------------------------------

document.querySelectorAll(".question").forEach(button => {

    button.addEventListener("click", () => {
        toggleAccordion(button);
    });

});


// ==========================================================
// FIRESTORE - HENT ANSATTE
// ==========================================================

const ansatte = await hentAnsatte();

console.log("Antall ansatte:", ansatte.length);


// ==========================================================
// DEL ANSATTE INN I GRUPPER
// ==========================================================

const sykepleier = ansatte.filter(person =>
    person.gruppe === "Sykepleiere"
);

const hjelpepleier = ansatte.filter(person =>
    person.gruppe === "Helsefagarbeidere"
);

const praktiskBistand = ansatte.filter(person =>
    person.gruppe === "PraktiskBistand"
);

const ekstravakt = ansatte.filter(person =>
    person.gruppe === "Ekstravakter"
);

const fysioterapeut = ansatte.filter(person =>
    person.gruppe === "fysioterapeuter"
);

const ergoterapeut = ansatte.filter(person =>
    person.gruppe === "ergoterapeuter"
);

const AKS = ansatte.filter(person =>
    person.gruppe === "AKS"
);

const ernæringsfysiolog = ansatte.filter(person =>
    person.gruppe === "ernæringsfysiologer"
);

const leder = ansatte.filter(person =>
    person.gruppe === "ledere"
);

const merkantil = ansatte.filter(person =>
    person.gruppe === "merkantiler"
);

const nattevakt = ansatte.filter(person =>
    person.gruppe === "nattevakter"
);

const vurderingsteam = ansatte.filter(person =>
    person.gruppe === "vurderingsteam"
);

const responssenter = ansatte.filter(person =>
    person.gruppe === "responssenter"
);

const fagsykepleier = ansatte.filter(person =>
    person.gruppe === "fagsykepleiere"
);


// ==========================================================
// VIS ANSATTE
// ==========================================================

function visGruppe(containerId, liste) {

    const container = document.getElementById(containerId);

    // Hvis containeren ikke finnes på denne siden,
    // gjør vi ingenting.
    if (!container) {
        return;
    }

    // Tøm containeren før vi legger inn ansatte
    container.innerHTML = "";

    // Legg inn hver person
    liste.forEach(person => {

        container.innerHTML += `

            <div class="ansattKort">

                <h3>${person.navn ?? ""}</h3>

                <p>${person.rolle ?? ""}</p>

                <div class="ikoner">

                    <a href="${person.bilde ?? "#"}"
                       class="glightbox"
                       title="${person.navn ?? ""}">
                        <i class="fas fa-image"></i>
                    </a>

                    <a href="tel:${person.telefon ?? ""}">
                        <i class="fas fa-phone"></i>
                    </a>

                    <a href="mailto:${person.epost ?? ""}">
                        <i class="fas fa-envelope"></i>
                    </a>

                </div>

            </div>

        `;

    });

}


// ==========================================================
// VIS GRUPPENE
// ==========================================================

if (document.getElementById("SPL")) {
    visGruppe("SPL", sykepleier);
}

if (document.getElementById("HPL")) {
    visGruppe("HPL", hjelpepleier);
}

if (document.getElementById("PB")) {
    visGruppe("PB", praktiskBistand);
}

if (document.getElementById("ekstravakt")) {
    visGruppe("ekstravakt", ekstravakt);
}

if (document.getElementById("fysio")) {
    visGruppe("fysio", fysioterapeut);
}

if (document.getElementById("ergo")) {
    visGruppe("ergo", ergoterapeut);
}

if (document.getElementById("AKS")) {
    visGruppe("AKS", AKS);
}

if (document.getElementById("ernæringFysio")) {
    visGruppe("ernæringFysio", ernæringsfysiolog);
}

if (document.getElementById("leder")) {
    visGruppe("leder", leder);
}

if (document.getElementById("merkantil")) {
    visGruppe("merkantil", merkantil);
}

if (document.getElementById("nattevakt")) {
    visGruppe("nattevakt", nattevakt);
}

if (document.getElementById("vurderingsteam")) {
    visGruppe("vurderingsteam", vurderingsteam);
}

if (document.getElementById("responssenter")) {
    visGruppe("responssenter", responssenter);
}

if (document.getElementById("fagSPL")) {
    visGruppe("fagSPL", fagsykepleier);
}


// ==========================================================
// MOBILMENY
// ==========================================================

const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

if (menuToggle && menu) {

    // ------------------------------------------------------
    // Åpne / lukke hamburgermeny
    // ------------------------------------------------------

    menuToggle.addEventListener("click", event => {

        event.stopPropagation();

        menu.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            menu.classList.contains("open")
        );

    });


    // ------------------------------------------------------
    // Lukk meny når en lenke klikkes
    // ------------------------------------------------------

    const menuLinks = document.querySelectorAll("#menu a");

    menuLinks.forEach(link => {

        link.addEventListener("click", () => {

            menu.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    // ------------------------------------------------------
    // Lukk meny ved klikk utenfor
    // ------------------------------------------------------

    document.addEventListener("click", event => {

        if (!menu.classList.contains("open")) {
            return;
        }

        // Klikk på menyknappen?
        if (menuToggle.contains(event.target)) {
            return;
        }

        // Klikk inne i menyen?
        if (menu.contains(event.target)) {
            return;
        }

        // Ellers lukk menyen
        menu.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    });

}


// ==========================================================
// ÅPNE RIKTIG TREKKSPILL VED HASH / SØK
// ==========================================================

window.addEventListener("load", () => {

    if (!location.hash) {
        return;
    }

    let element;

    try {

        element = document.querySelector(location.hash);

    } catch (error) {

        console.warn(
            "Ugyldig URL-hash:",
            location.hash
        );

        return;
    }

    if (!element) {
        return;
    }

    const button = element.querySelector(".question");

    if (!button) {
        return;
    }

    toggleAccordion(button);

    element.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});


// ==========================================================
// SERVICE WORKER
// ==========================================================

console.log("KOM TIL SERVICE WORKER DELEN");
if ("serviceWorker" in navigator) {

    console.log(
        "Prøver å registrere service worker..."
    );

    navigator.serviceWorker.register(
        "/Team-S-r/sw.js"
    )

    .then(registration => {

        console.log(
            "Service Worker registrert:",
            registration.scope
        );

    })

    .catch(error => {

        console.error(
            "Service Worker kunne ikke registreres:",
            error
        );

    });

}
// ==========================================================
// INSTALLER TEAM SØR – ENKEL LØSNING
// Android / iPhone / iPad / PC----Installasjonsboks
// ==========================================================

const installButton = document.getElementById("installApp");
const installModal = document.getElementById("installModal");
const closeInstallModal =
document.getElementById("closeInstallModal");

if (installButton) {

    installButton.hidden = false;

    installButton.addEventListener("click", () => {

        installModal.style.display = "block";

    });

}

if (closeInstallModal) {

    closeInstallModal.addEventListener("click", () => {

        installModal.style.display = "none";

    });

}

window.addEventListener("click", (event) => {

    if (event.target === installModal) {

        installModal.style.display = "none";

    }

});



