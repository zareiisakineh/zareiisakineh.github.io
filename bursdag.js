
import { hentAnsatte } from "./ansatteFirestore.js";

document.addEventListener("DOMContentLoaded", async () => {

    console.log("bursdag.js starter");

    // --------------------------------------------------
    // HENT ANSATTE FRA FIRESTORE
    // --------------------------------------------------

    const ansatte = await hentAnsatte();

    console.log("Antall ansatte:", ansatte.length);

    // --------------------------------------------------
    // FINN DAGENS DATO
    // --------------------------------------------------

    const iDag = new Date();

    const dag = iDag.getDate();
    const måned = iDag.getMonth() + 1;

    console.log("Dagens dato:", dag, måned);

    // --------------------------------------------------
    // FINN BURSDAGSBARN
    // --------------------------------------------------

    const bursdagsbarn = ansatte.filter(person => {

        return Number(person.dag) === dag &&
               Number(person.måned) === måned;

    });

    console.log("Bursdagsbarn i dag:", bursdagsbarn);

    // --------------------------------------------------
    // ELEMENTER FRA HTML
    // --------------------------------------------------

    const melding =
        document.getElementById("bursdagMelding");

    const whatsappKnapp =
        document.getElementById("sendWhatsapp");

    // --------------------------------------------------
    // VIS BURSDAGSMELDING
    // --------------------------------------------------

    if (melding && bursdagsbarn.length > 0) {

        const navn = bursdagsbarn
            .map(person => person.navn)
            .join(" og ");

        melding.innerHTML = `
            <div class="card">
                🎂 Gratulerer med dagen kjære
                ❤️<strong>${navn}</strong>❤️  
                <br> Alle oss i Team Sør ønsker deg 
                    en fantastisk dag fylt med glede, 
                    smil og kake! 🎉🎂
                
            </div>
        `;

        // Gjør meldingen synlig
        melding.classList.add("vis");

        // Gjør WhatsApp-knappen synlig
        if (whatsappKnapp) {
            whatsappKnapp.classList.add("vis");
        }

        console.log(
            "Bursdagsmelding vist for:",
            navn
        );

    } else {

        console.log("Ingen bursdag i dag.");

    }

    // --------------------------------------------------
    // BURSDAGSKALENDER
    // --------------------------------------------------

    const container =
        document.getElementById("bursdagsKalender");

    const månedsNavn = [
        "Januar",
        "Februar",
        "Mars",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Desember"
    ];

    // Hvis kalenderen ikke finnes på siden
    // stopper vi her.
    if (!container) {
        console.log(
            "bursdagsKalender finnes ikke i HTML."
        );
    }
    else{


    
    // --------------------------------------------------
    // LAG KALENDER FOR ALLE MÅNEDER
    // --------------------------------------------------

    for (let månedsnummer = 1; månedsnummer <= 12; månedsnummer++) {

        const personer = ansatte.filter(
            person =>
                Number(person.måned) === månedsnummer
        );

        if (personer.length === 0) {
            continue;
        }

        // Sorter etter dag
        personer.sort(
            (a, b) => Number(a.dag) - Number(b.dag)
        );

        let html = `
            <div class="item">

                <button class="question" type="button">

                    <h3>
                        ${månedsNavn[månedsnummer - 1]}
                    </h3>

                    <i class="fas fa-chevron-down icon"></i>

                </button>

                <div class="answer">

                    <div class="bilder">
        `;

        // --------------------------------------------------
        // PERSONER I MÅNEDEN
        // --------------------------------------------------

        personer.forEach(person => {

            html += `
                <div class="person">

                    <img
                        src="${person.bilde}"
                        alt="${person.navn}"
                    >

                    <h3>
                        ${person.navn} -
                        ${person.dag}.
                        ${månedsNavn[månedsnummer - 1]}
                    </h3>

                </div>
            `;

        });

        html += `
                    </div>

                </div>

            </div>
        `;

        container.innerHTML += html;
    }

    // --------------------------------------------------
    // TREKKSPILL
    // --------------------------------------------------

    document
        .querySelectorAll("#bursdagsKalender .question")
        .forEach(button => {

            button.addEventListener("click", () => {

                const item =
                    button.parentElement;

                const answer =
                    item.querySelector(".answer");

                // Lukk andre måneder
                document
                    .querySelectorAll(
                        "#bursdagsKalender .answer"
                    )
                    .forEach(element => {

                        if (element !== answer) {
                            element.classList.remove("open");
                        }

                    });

                // Fjern rotasjon fra andre piler
                document
                    .querySelectorAll(
                        "#bursdagsKalender .icon"
                    )
                    .forEach(icon => {

                        if (
                            icon !==
                            button.querySelector(".icon")
                        ) {
                            icon.classList.remove("rotate");
                        }

                    });

                // Åpne/lukk valgt måned
                answer.classList.toggle("open");

                // Roter pil
                button
                    .querySelector(".icon")
                    ?.classList.toggle("rotate");

            });

        });
    }

    

    // --------------------------------------------------
    // WHATSAPP
    // --------------------------------------------------

    if (whatsappKnapp) {

        whatsappKnapp.addEventListener(
            "click",
            () => {

                if (bursdagsbarn.length === 0) {
                    return;
                }

                const navn = bursdagsbarn
                    .map(person => person.navn)
                    .join(" og ");

                const whatsappMelding =
                    "🎂 Gratulerer med dagen kjære " +
                    navn +
                    "!\n\n" +
                    "Alle oss i Team Sør ønsker deg " +
                    "en fantastisk dag fylt med glede, " +
                    "smil og kake! 🎂❤️";

                const url =
                    "https://wa.me/?text=" +
                    encodeURIComponent(
                        whatsappMelding
                    );

                window.open(url, "_blank");

            }
        );

    }

});

