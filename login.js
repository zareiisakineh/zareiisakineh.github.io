import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const loginBtn =
document.getElementById("loginBtn");

if (loginBtn) {

    loginBtn.addEventListener("click", async () => {

        const email =
        document.getElementById("email").value;

        const password =
        document.getElementById("password").value;

        try {

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            alert("Innlogging vellykket");

            location.reload();

        } catch (error) {

            alert("Feil brukernavn eller passord");

        }

    });

}