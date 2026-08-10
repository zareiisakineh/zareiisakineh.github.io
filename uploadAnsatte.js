import { db } from "./firebase.js";

import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

async function lastOppAnsatte() {

    for (const person of ansatte) {

        try {

            await addDoc(
                collection(db, "ansatte"),
                person
            );

            console.log(
                person.navn + " lastet opp"
            );

        } catch (error) {

            console.error(
                "Feil:",
                person.navn,
                error
            );

        }

    }

    console.log("FERDIG");

}

lastOppAnsatte();